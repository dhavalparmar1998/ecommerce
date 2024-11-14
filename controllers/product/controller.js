import multer from "multer";
import fileupload from "../../middlewares/multer.js";
import brandmodel from "../../models/brand/model.js";
import categorymodel from "../../models/category/model.js";
import productmodel from "../../models/product/model.js";

// import {  emptyvalidator } from "../../middlewares/validation.js";


const productpage = async function(req, res){
    var ansbrand = await brandmodel.find();
    var anscategory = await categorymodel.find();
    console.log(ansbrand);
    console.log(anscategory);
    res.render('admin/productpage' , {x1:ansbrand , x2:anscategory});
}

const productactionpage = function(req, res){
    var curtimestamp = Date.now();
    var upload = fileupload('./public/products' , 'filepath',curtimestamp)
    upload(req, res, async function (err){
        if(err instanceof multer.MulterError){
            
        }
        else if (err){
           
        }
        // console.log(req.body);
        // console.log(req.file);
        var record = {...req.body, filepath:req.file.filename}
        console.log(record);

        try {
            var instance = new productmodel(record);

            var ans = await instance.save();
            res.send({msg:"Product saved"})
            
        } catch (e) {
            
            res.send({err:"Error saving product"})
        }

    })

  
}

export{
    productpage,
    productactionpage
}