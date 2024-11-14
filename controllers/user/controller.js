import payUMoney from "payumoney_nodejs";
payUMoney.setProdKeys("6PqKSK15", "sAOVPuJG2X");
payUMoney.isProdMode(true);


// import { json } from "body-parser";
import { emailvalidation,passwordvalidation,stringmatchvalidation,mobilevalidation,emptyvalidator } from "../../middlewares/validation.js";
import brandmodel from "../../models/brand/model.js";
import categorymodel from "../../models/category/model.js";
import productmodel from "../../models/product/model.js";
import { checkencryptvalue, dataencrypt } from "../../middlewares/encryptdata.js";
import usermodel from "../../models/user/model.js";



const registerpage = function(req,res){
    res.render("user/registerpage");
}
const loginpage = function(req,res){
    res.render("user/loginpage");
}
const passwordpage = function(req,res){
    res.render("user/passwordpage");
}
const forgotpage = function(req,res){
    res.render("user/forgotpasswordpage");
}
const profilepage = function(req,res){
    res.render("user/profilepage");
}
const indexpage = async function(req,res){
    try {
        var ansbrand = await brandmodel.find();
        var anscategory = await categorymodel.find();
        var ansproduct = await productmodel.find();
        res.render("index" , {x1:ansbrand , x2:anscategory , x3:ansproduct});

        
    } catch (err) {
         
    }
    
}
const loginactionpage = async function(req,res){
//    console.log(req.body);
var{email,password} = req.body;
var msg = "";
if(emailvalidation(email)){
    msg = "Email Id Required or Invalid"
}
else if(passwordvalidation(password)){
    msg = "Password is  Required or Invalid"
}
else{
    var resultfromdb = await usermodel.find({email:email});
    if(resultfromdb.length > 0){
        var dbpassword = resultfromdb[0].password;
        console.log(dbpassword);
        var ansaftercompare = checkencryptvalue(password, dbpassword);
        console.log(ansaftercompare);
        if(ansaftercompare){
            msg = "success";
        }
        else{
            msg = "Invalid Email Id or Password";
        }
    }
    else{
        msg = "Invalid Email Id or Password";
    }
}
res.send({message:msg});
}
const registeractionpage = async function(req,res){
    // console.log(req.body);

    var {name,mobile,confirmpassword,email,password} = req.body;
    var msg = "";
    if(emptyvalidator(name)){
        msg = "Name Required"
    }
    else if(mobilevalidation(mobile)){
        msg = "Mobile Required or Invalid"
    }

    else if(emailvalidation(email)){
        msg = "Email Id Required or Invalid"
    }
    else if(passwordvalidation(password)){
        msg = "Password is  Required or Invalid"
    }
    else if(stringmatchvalidation(password,confirmpassword)){
        msg = "Password and Confirm Password Does Not Match"
    }
    else{
         var dataset = await usermodel.find({email:email});
         console.log(dataset);
         if(dataset.length>0){
            msg = "User Exists With Given Email Id"
         }
         else{
            var anspassword = dataencrypt(password);
            console.log(anspassword);

            var datatoinsert = {
                name:name,
                mobile:mobile,
                email:email,
                password:anspassword
            }
            var instance = new usermodel(datatoinsert);
            var resultafterinsert = await instance.save();
            msg = "User Added Successfully";
         }
    }
    res.send({message:msg});


}
const passwordactionpage = function(req, res){
    var{cpassword, npassword, cnpassword} = req.body;

    var msg = "";
    if(emptyvalidator(cpassword) || passwordvalidation(cpassword)){
        msg = 'Current Password is incorrect';
    }
    else if(emptyvalidator(npassword) || passwordvalidation(npassword)){
        msg = 'New Password is incorrect';
    }    
    else if(cpassword == npassword){
        msg = 'New Password must be different from current password';
    }
    else if(npassword != cnpassword){
        msg = 'New Passsword does not match confirm new password';
    }
    else{
        msg = 'update password';
    }
    res.send({message:msg});
}

const singleproductpage = async function(req,res){
    var {productid} = req.params;
    try {
        var resultfromdb = await productmodel.findById(productid);
        res.render("singleproductpage",{x1:resultfromdb});
        
    } catch (err) {
        
    }
    
} 
const filterproductbycategory = async function(req,res){
    var {catid} = req.body;

    try {
        var resultfromdb = await productmodel.find({categoryid:catid});
        console.log(resultfromdb);
        res.send({resultfromdb:resultfromdb});
        
    } catch (err) {
        
    }

}
const addincart = (req,res)=>{
    var proid = req.body.proid;
    console.log(req.cookies);
    let count = Object.keys(req.cookies).length;
    console.log(count);
    var expirydate = new Date(Date.now() + (3600000));
    if(count == 0){
        var arr = [proid];
        res.cookie("mycart" , JSON.stringify(arr) , {expires:expirydate} ).send({msg:"Record Added In Cart"});
    }
    else{
        console.log("2nd Product Onward");
        var arrnew = JSON.parse(req.cookies.mycart);
        if(arrnew.includes(proid)){
            res.send({msg:"Product Exists In Cart"});
        }
        else{
            arrnew.push(proid);
            res.cookie("mycart" , JSON.stringify(arrnew) , {expires:expirydate} ).send({msg:"Record Updated In Cart"});
        }
    }
   
}
const cartpage = async function(req,res){
    // console.log(req.cookies);
    // console.log(req.cookies["mycart"] !== undefined);

    if(req.cookies["mycart"] !== undefined){
            // console.log(req.cookies["mycart"]);
            // console.log(typeof req.cookies["mycart"]);
            var allid = JSON.parse(req.cookies["mycart"]);
            // console.log(allid);

            try {
                var dataset = await productmodel.find({_id:{$in:allid}});
                console.log(dataset);

                res.render("cartpageview",{status:true , data:dataset});
                
            } catch (err) {
                  
            }


    }
    else{
        res.render("cartpageview", {status:false})
    }
}
function deletefromcart(req,res){
    console.log(req.body);
    var id = req.body.proid;
    console.log(id);

    var dataset = JSON.parse(req.cookies.mycart);
    console.log(dataset);

    if(dataset.length == 1){
        res.clearCookie("mycart").send({msg:"product Deleted"})
    }
    else{
        var indexno = dataset.indexOf(id);
        console.log(indexno);
        dataset.splice(indexno, 1);
        console.log(dataset);

        var expirydate = new Date(Date.now() + (3600000));
        res.cookie("mycart" , JSON.stringify(dataset),
        {expires:expirydate} ).send({msg:"Record Deleted From Cart"});

    }
}

const checkoutpage = async function(req,res){
    if(req.cookies["mycart"] !== undefined){
        // console.log(req.cookies["mycart"]);
        // console.log(typeof req.cookies["mycart"]);
        var allid = JSON.parse(req.cookies["mycart"]);
        // console.log(allid);

        try {
            var dataset = await productmodel.find({_id:{$in:allid}});
            // console.log(dataset);

            res.render("checkoutpageview",{status:true , data:dataset});
            
        } catch (err) {
              
        }


}
}

function successdata(req,res){
    console.log(req.body);
    res.send("success")
}
function failuredata(req,res){
    console.log(req.body);
    res.send("failure")
}

function paymentaction(req,res){
    var randomnumber = Math.round(Math.random()*10000000000);
    req.body.txnid=randomnumber;
    req.body.surl = "http:localhost:9000/success";
    req.body.furl = "http:localhost:9000/failure";
    console.log(req.body);

    payUMoney.pay(req.body, function(error, response) {
        if (error) {
          console.log(response);
        } else {
            console.log(response);
          res.redirect(response);
        }
      });
}



export{
    registerpage,
    loginpage,
    passwordpage,
    forgotpage,
    profilepage,
    indexpage,
    loginactionpage,
    registeractionpage,
    passwordactionpage,
    singleproductpage,
    filterproductbycategory,
    addincart,
    cartpage,
    deletefromcart,
    checkoutpage,
    successdata,
    failuredata,
    paymentaction

}