import {  emptyvalidator } from "../../middlewares/validation.js";
import brandmodel from "../../models/brand/model.js";

const brandpage = function(req, res){
    res.render('admin/brandpage');
}

const brandactionpage = async function(req, res){
    console.log(req.body);
    var{brandName} = req.body;
    var msg = '';
    if(emptyvalidator(brandName)){
        msg= 'BRAND Name is Required';
    }
    else{
        var resultfromfind = await brandmodel.find({brandName:brandName});
        if(resultfromfind.length>0){
            msg = "Brand Exists";
        }
        else{
            const brandinstance = new brandmodel();
            brandinstance.brandName = brandName;
            var resultafterinsert = await brandinstance.save();
            console.log(resultafterinsert);
            msg = "Brand Inserted"
        }
      
    }
    res.send({message:msg});
}

export{
    brandpage,
    brandactionpage
}