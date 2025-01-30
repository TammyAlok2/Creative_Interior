import express from 'express'
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductImage,

} from '../controllers/product.controllers.js'
import upload from '../middlewares/multer.middleware.js';
import { authorizeRoles, isLoggedIn } from '../middlewares/auth.middlewares.js';
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controllers.js';
import { addCarouselItem, deleteCarouselItem, getAllCarouselItems, updateCarouselItem } from '../controllers/carousel.controllers.js';
import { createCoupon, deleteCoupon, getAllCoupons, updateCoupon } from '../controllers/coupon.controllers.js';
import { allAdminOrders } from '../controllers/order.controllers.js';
import { allUsers } from '../controllers/authentication.controllers.js';
import { getAddressesById } from '../controllers/address.controllers.js';
import { createEnquiry, deleteEnquiry, getAllEnquiries, updateEnquiry } from '../controllers/enquiry.controller.js';
import { createMaterial, deleteMaterial, getAllMaterials, getMaterialById, updateMaterial } from '../controllers/productMaterial.controllers.js';
import { createService, deleteService, getAllServices, getServiceById, updateService } from '../controllers/productService.controllers.js';

const router = express.Router();



// Adding Products  Routes 
router.post("/addProduct",upload.array("images",10),isLoggedIn,authorizeRoles("admin"),addProduct); // Add product
router.get("/allProducts", getAllProducts); // Get all products
router.get("/getProducts/:id", getProductById); // Get product by ID
router.put("/updateProduct/:id",upload.array("images",10),isLoggedIn,authorizeRoles("admin"), updateProduct); // Update product
router.delete("/deleteProduct/:id",isLoggedIn,authorizeRoles("admin"), deleteProduct); // Delete product
router.delete("/deleteProductImage/:id/:publicId",isLoggedIn,authorizeRoles("admin"),deleteProductImage ) // delete product image


// Adding Categories Routes 
router.post("/addCategory",upload.single("image"),isLoggedIn,authorizeRoles("admin"),addCategory); // Add category
router.get("/allCategory", getAllCategories); // Get all Categories 
router.get("/getCategory/:id", getCategoryById); // Get category  by ID
router.put("/updateCategory/:id",upload.single("image"),isLoggedIn,authorizeRoles("admin"), updateCategory); // Update category 
router.delete("/deleteCategory/:id",isLoggedIn,authorizeRoles("admin"), deleteCategory); // Delete category


// Adding Carousel Routes 
router.post("/addCarousel",isLoggedIn,authorizeRoles("admin"),upload.array("images",10), addCarouselItem)
router.put("/updateCarousel/:id",isLoggedIn,authorizeRoles("admin"),upload.array("images",10),updateCarouselItem)
router.delete("/deleteCarousel:/id",isLoggedIn,authorizeRoles("admin"),deleteCarouselItem)
router.get("/allCarousel",getAllCarouselItems)
export default router


// Adding Coupons Routes 
router.post("/createCoupon",isLoggedIn,authorizeRoles("admin"),createCoupon);
router.delete("/deleteCoupon/:id", isLoggedIn,authorizeRoles("admin"),deleteCoupon);
router.get("/allCoupons",isLoggedIn,authorizeRoles("admin"),getAllCoupons)
router.put('/updateCoupons',isLoggedIn,authorizeRoles("admin"),updateCoupon)


// all orders 
router.get("/allOrders",isLoggedIn,authorizeRoles("admin"),allAdminOrders)

// all users 
router.get("/allUsers",isLoggedIn,authorizeRoles("admin"),allUsers)

// all address by id 
router.get("/getAddressById/:addressId",isLoggedIn,authorizeRoles("admin"),getAddressesById)

// all enquriy 
router.get('/allEnquiry',authorizeRoles("admin"),getAllEnquiries)
router.post('/add-enquiry',createEnquiry)
router.delete('/delete-enquiry',authorizeRoles("admin"),deleteEnquiry)
router.put('/update-enquiry',authorizeRoles("admin"),updateEnquiry)


// all product materials 
router.get("/allMaterials",getAllMaterials)
router.post("/add-material",upload.single("image"),isLoggedIn,authorizeRoles("admin"),createMaterial)
router.delete("/delete-material/:id",isLoggedIn,authorizeRoles("admin"),deleteMaterial)
router.put("/update-material/:id",upload.single("image"),isLoggedIn,authorizeRoles("admin"),updateMaterial)
router.get("/getMaterial/:id",getMaterialById)

 // all prouct services 
 router.get("/allServices",getAllServices)
 router.post("/add-service",upload.single("image"),isLoggedIn,authorizeRoles("admin"),createService)
 router.delete("/delete-service/:id",isLoggedIn,authorizeRoles("admin"),deleteService)
 router.put("/update-service/:id",upload.single("image"),isLoggedIn,authorizeRoles("admin"),updateService)
 router.get("/getService/:id",getServiceById)

