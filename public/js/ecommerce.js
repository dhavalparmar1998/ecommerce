// const { response } = require("express");

$(function(){
    const api = "http://localhost:9000";
    console.log("test");

    $("#categoryform").submit(function(ev){
      
        ev.preventDefault();
        var record = $("#categoryform").serialize();
        $.ajax({
            type: "post",
            data:record,
            url: api + "/category",
            success: function(data){
                console.log(data);
                $("#errmsg").html(data.message);
            },
            error:function(err){

            }
        });
    })
})
// ////////////////////////////

$(function(){
    // const api = "http://localhost:9000";

    $("#brandform").submit(function(ev){
        ev.preventDefault();
        var record = $("#brandform").serialize();
        $.ajax({
            type: "post",
            data:record,
            url: "/brand",
            success: function(data){
                console.log(data);
                $("#errmsg").html(data.message);
            },
            error:function(err){

            }
        });
    })
})

/////////////////////

$(".category-filter").click(function(ev){
    const api = "http://localhost:9000";
    ev.preventDefault();

    $.ajax({
        type: "post",
        data:{catid : $(this).attr("for")},
        url: api + "/filter-by-category",
        success: function(data){
            console.log(data);
            if(data.resultfromdb.length == 0){
                $(".features_items").html("No Records Found")
            }
            else{
                var result = ``;
                data.resultfromdb.forEach(obj=>{
                    console.log(obj);
                    result = result + `
                     <div class="col-sm-4">
                      <div class="product-image-wrapper">
              <div class="single-products">
                <div class="productinfo text-center">
                  <img src="/public/products/${obj.filepath}" alt="" />
                  <h2>
                    <del>${obj.price}</del>

                  </h2>
                  <p>${obj.productname}</p>
                  <a href="#" class="btn btn-default add-to-cart"
                    ><i class="fa fa-shopping-cart"></i>Add to cart</a
                  >
                </div>
                <div class="product-overlay">
                  <div class="overlay-content">
                    <h2>
                      <del>${obj.price}</del>
                     

                    </h2>
                    <p><a href="/single-product/${obj._id}">${obj.productname}</a></p>
                    <a href="#" class="btn btn-default add-to-cart"
                      ><i class="fa fa-shopping-cart"></i>Add to cart</a
                    >
                  </div>
                </div>
              </div>
              <div class="choose">
                <ul class="nav nav-pills nav-justified">
                  <li>
                    <a href="#"
                      ><i class="fa fa-plus-square"></i>Add to wishlist</a
                    >
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fa fa-plus-square"></i>Add to compare</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            </div>
                    
                    `
                });
                $('.features_items').html(result);
            }
        },
        error:function(err){

        }
    });
});
// ///////////////

$(".add-cart").click(function(ev){
    const api = "http://localhost:9000";
    var id = $(this).attr("for");
    console.log(id);
    $.ajax({
        type: "post",
        data:{proid:id},
        url:api + "/add-in-cart",
        success: function(data){
            console.log(data);
            alert(data.msg);
            window.location.href = api + "/cart";
        },
        error:function(err){

        }
    });
});
/////////

$(".delete-cart").click(function(e){
  const api = "http://localhost:9000";
  e.preventDefault();
  console.log($(this));
  console.log($(this).attr("for"));

  var atag = $(this)
  $.ajax({
    type: "post",
    data:{proid:$(this).attr("for")},
    url:api + "/delete-from-cart",
    success: function(data){
        console.log(data);
        atag.parent().parent().fadeOut();
        
    },
    error:function(err){

    }
});
})
////////

$("#productform").submit(function(e){
  const api = "http://localhost:9000";
  e.preventDefault();
  var categoryid = $("#categoryid").val();
  var brandid = $("#brandid").val();
  var productname = $("#productname").val();
  var price = $("#price").val();
  var discount = $("#discount").val();
  var filepath = $("#filepath");
  var description = $("#description").val();
  var filedata = filepath[0]['files'][0];
  var formobj = new FormData();
  formobj.append("categoryid", categoryid);
  formobj.append("brandid", brandid);
  formobj.append("productname", productname);
  formobj.append("discount", discount);
  formobj.append("description", description);
  formobj.append("price", price);
  formobj.append("filepath", filedata);

  $.ajax({
     type: "post",
     data:formobj,
     url: api + "/product",
     contentType: false,
     processData: false,
     success: function(response){
      console.log(response);
      $("#result").html(response.msg);
     },
     error: function(err){
      console.log(response);

     }


  })


})
///////////

$(function(){
  const api = "http://localhost:9000";

  $("#loginform").submit(function(ev){
      ev.preventDefault();
      var record = $("#loginform").serialize();
      $.ajax({
          type: "post",
          data:record,
          url: api + "/login-action",
          success: function(data){
              console.log(data);
              $("#login-err").html(data.message);
          },
          error:function(err){

          }
      });
  })
})

/////////
$(function(){
  const api = "http://localhost:9000";

  $("#resgisterform").submit(function(ev){
      ev.preventDefault();
      var record = $("#resgisterform").serialize();
      $.ajax({
          type: "post",
          data:record,
          url: api + "/register-action",
          success: function(data){
              console.log(data);
              $("#register-err").html(data.message);
          },
          error:function(err){

          }
      });
  })
})
/////////



