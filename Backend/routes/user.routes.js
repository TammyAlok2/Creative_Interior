import express from "express";
import {
  addItemToCart,
  clearCart,
  deleteCartItem,
  getUserCart,
} from "../controllers/cart.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import { addProductToWishlist, getUserWishlist, removeProductFromWishlist } from "../controllers/wishlist.controllers.js";
import { addAddress, deleteAddress, editAddress, getAddresses } from "../controllers/address.controllers.js";
import { addOrder, allOrders, deleteOrder, editOrder, getOrderById, getProductItemByOrderIdAndProductItemId,verifyOrderPayment } from "../controllers/order.controllers.js";
import { addReview, deleteReview, getReviewsByProduct, getReviewsByUser } from "../controllers/review.controllers.js";
import { applyCoupon, getAllCoupons } from "../controllers/coupon.controllers.js";

const router = express.Router();

// cart routes
router.post("/addCartProduct", isLoggedIn, addItemToCart);
router.put("/updateCartProduct", isLoggedIn);
router.delete("/deleteCartProduct/:productId", isLoggedIn,deleteCartItem);
router.get("/allCartProduct",isLoggedIn, getUserCart);
router.delete("/clearCart",isLoggedIn,clearCart)
// wishlist routes

router.post("/addItemsToWishList/:productId", isLoggedIn, addProductToWishlist);
router.delete("/deleteItemsFromWishList/:productId",isLoggedIn,removeProductFromWishlist);
router.get("/allWishListItems",isLoggedIn,getUserWishlist);

// Address routes 
router.post("/add-address",isLoggedIn,addAddress);
router.put("/edit-address/:addressId",isLoggedIn,editAddress)
router.delete("/delete-address/:addressId",isLoggedIn,deleteAddress);
router.get("/all-address",isLoggedIn,getAddresses)
// Order routes 
router.post("/add-order",isLoggedIn,addOrder);
router.put("/edit-order/:orderId",isLoggedIn,editOrder)
router.delete("/delete-order/:orderId",isLoggedIn,deleteOrder);
router.get("/all-orders",isLoggedIn,allOrders)
router.get("/getOrder/:orderId",isLoggedIn,getOrderById)
router.get("/getOrderItem/:orderId/:productItemId",isLoggedIn,getProductItemByOrderIdAndProductItemId)

// review routes 
router.post("/add-review",isLoggedIn,addReview);
//router.put("/edit-review/:reviewId",isLoggedIn,e);
router.delete("/delete-review/:reviewId",isLoggedIn,deleteReview);
router.get("/your-reviews",isLoggedIn,getReviewsByUser);
//router.get("/getReview/:reviewId",isLoggedIn);
router.get("/getReviewByProduct/:productId",getReviewsByProduct);



// Payment routes 
router.post('/verify-payment',isLoggedIn,verifyOrderPayment)

// coupon routes 
router.get('/allCoupons',getAllCoupons)
router.post('/applyCoupon',isLoggedIn,applyCoupon)


export default router;
