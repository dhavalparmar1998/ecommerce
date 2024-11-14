import {  emptyvalidator } from "../../middlewares/validation.js";
import categorymodel from "../../models/category/model.js";

const categorypage = function(req, res){
    res.render('admin/categorypage');
}

const categoryactionpage = async function(req, res){
    var{categoryName} = req.body;
    var msg = '';
    if(emptyvalidator (categoryName)){
        msg= 'Category Name is Required';
    }
    else{
        var resultfromfind = await categorymodel.find({categoryName:categoryName});
        if(resultfromfind.length>0){
            msg = "Category Exists";
        }
        else{
            const categoryinstance = new categorymodel();
            categoryinstance.categoryName = categoryName;
            var resultafterinsert = await categoryinstance.save();
            console.log(resultafterinsert);
            msg = "Category Inserted"
        }
      
    }
    res.send({message:msg});
}

export{
    categorypage,
    categoryactionpage
}