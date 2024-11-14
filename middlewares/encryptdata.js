import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
function dataencrypt(data){
    var hash = bcrypt.hashSync(data, salt);
    return hash;

}

function checkencryptvalue(content , encrytedstring){
    return bcrypt.compareSync(content,encrytedstring);
}

export{
    dataencrypt,checkencryptvalue
}