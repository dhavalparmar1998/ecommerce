import express from "express";
import { registerpage,loginpage,passwordpage,forgotpage,profilepage,indexpage, loginactionpage, registeractionpage,  passwordactionpage, singleproductpage, filterproductbycategory,addincart,cartpage, deletefromcart, checkoutpage, successdata, failuredata, paymentaction} from "../../controllers/user/controller.js";
const userroute = express.Router();



userroute
.get("/" , indexpage)
.get("/single-product/:productid" , singleproductpage)
.get("/register", registerpage)
.get("/login", loginpage)
.get("/password", passwordpage)
.get("/forgot-password", forgotpage)
.get("/profile", profilepage)
.get("/cart", cartpage)
.get("/checkout", checkoutpage)
.post("/login-action", loginactionpage )
.post("/register-action", registeractionpage)
.post("/password-action", passwordactionpage)
.post("/filter-by-category", filterproductbycategory)
.post("/add-in-cart" , addincart)
.post("/delete-from-cart" , deletefromcart)
.post("/success" , successdata)
.post("/failure" , failuredata)
.post("/payment-action" , paymentaction)

export default userroute;