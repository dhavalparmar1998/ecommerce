import validator  from "validator";


const emailvalidation = function(txtdata){
    return (validator.isEmpty(txtdata) || !validator.isEmail(txtdata))?
    true:false;
}
const passwordvalidation = function(txtdata){
    return (validator.isEmpty(txtdata) || !validator.isStrongPassword(txtdata,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}))?
    true:false;
}
const stringmatchvalidation = function(txtdata1,txtdata2){
    return (validator.isEmpty(txtdata2) || !validator.equals(txtdata1,txtdata2))?
    true:false;
}
const mobilevalidation = function(txtdata){
    return (validator.isEmpty(txtdata) || !validator.isMobilePhone(txtdata,'en-IN'))?
    true:false;
}
const emptyvalidator = function(txtdata){
    return (validator.isEmpty(txtdata) )?
    true:false;
}

export{
    emailvalidation,
    passwordvalidation,
    stringmatchvalidation,
    mobilevalidation,
    emptyvalidator
}


