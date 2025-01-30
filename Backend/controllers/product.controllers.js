import { asyncHandler } from "../utils/AsyncHandler.js";

import AppError from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import Product from '../models/product.models.js'
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import ProductMaterial from "../models/productMaterial.models.js";
import ProductService from "../models/productServices.models.js";


export const addProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    subCategory,
    specifications,
  } = req.body;

  let materialsAvailable = [];
  let servicesAvailable = [];

  // Parse materialsAvailable if it's a string
  try {
    materialsAvailable = typeof req.body.materialsAvailable === 'string' 
      ? JSON.parse(req.body.materialsAvailable)
      : req.body.materialsAvailable || [];
  } catch (error) {
    return next(new AppError("Invalid materialsAvailable format", 400));
  }

  // Parse servicesAvailable if it's a string
  // try {
  //   servicesAvailable = typeof req.body.servicesAvailable === 'string'
  //     ? JSON.parse(req.body.servicesAvailable)
  //     : req.body.servicesAvailable || [];
  // } catch (error) {
  //   return next(new AppError("Invalid servicesAvailable format", 400));
  // }

  // Validation: Check for required fields
  if (!name || !description || price === undefined || stock === undefined || !category || !Array.isArray(materialsAvailable) || !materialsAvailable.length) {
    return next(new AppError("All required fields must be provided including at least one material", 400));
  }

  // Validate if all materials exist
  try {
    const materialIds = materialsAvailable.map(id => new mongoose.Types.ObjectId(id));
    const existingMaterials = await ProductMaterial.find({ _id: { $in: materialIds } });
    
    if (existingMaterials.length !== materialsAvailable.length) {
      return next(new AppError("One or more materials do not exist", 400));
    }
  } catch (error) {
    console.error("Material validation failed:", error);
    return next(new AppError("Invalid material IDs provided", 400));
  }

  // Validate services if provided
  // if (servicesAvailable.length > 0) {
  //   try {
  //     const servicesIds = servicesAvailable.map(id => new mongoose.Types.ObjectId(id));
  //     const existingServices = await ProductService.find({ _id: { $in: servicesIds } });
      
  //     if (existingServices.length !== servicesAvailable.length) {
  //       return next(new AppError("One or more services do not exist", 400));
  //     }
  //   } catch (error) {
  //     console.error("Services validation failed:", error);
  //     return next(new AppError("Invalid service IDs provided", 400));
  //   }
  // }

  const images = [];
  
  // Handle image uploads
  if (req.files && req.files.length > 0) {
    try {
      for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);
        if (result) {
          images.push({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      return next(new AppError("Failed to upload images. Please try again.", 500));
    }
  }

  // Create product
  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      materialsAvailable,
      servicesAvailable,
      specifications: specifications || [],
      images,
    });

    // Populate the materials data before sending response
    const populatedProduct = await Product.findById(product._id)
      .populate('materialsAvailable', 'name price')
      .populate('category', 'name')
      // .populate('servicesAvailable', 'name image')
      // .populate('subCategory', 'name');

    res.status(201).json(new AppResponse(201, populatedProduct, "Product added successfully"));
  } catch (error) {
    console.error("Product creation failed:", error);
    return next(new AppError("Failed to add product. Please try again.", 500));
  }
});

//products
export const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    // Build query object based on request query parameters
    const queryObj = {};

    // Category filter
    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    // Subcategory filter
    if (req.query.subCategory) {
      queryObj.subCategory = req.query.subCategory;
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      queryObj.price = {};
      if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
    }

    // Ratings filter
    if (req.query.ratings) {
      queryObj.ratings = { $gte: Number(req.query.ratings) };
    }

    // Search by name
    if (req.query.search) {
      queryObj.name = { $regex: req.query.search, $options: "i" };
    }

    // Build the query
    let query = Product.find(queryObj)
      .populate("category", "name")
      .populate("subCategory", "name");

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt"); // Default sort by newest
    }

    // Execute query
    const products = await query;

    // Get total count
    const totalProducts = await Product.countDocuments(queryObj);

    res.status(200).json(
      new AppResponse(200, {
        products,
        totalProducts
      }, "Products fetched successfully")
    );

  } catch (error) {
    console.error("Error in getAllProducts:", error);
    next(new AppError("Failed to fetch products. Please try again.", 500));
  }
});



// Get a single product by ID
export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json(new AppResponse(200, product, "Product fetched successfully"));
  } catch (error) {
    next(new AppError("Failed to fetch product. Please try again.", 500));
  }
});

// Update a product
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    stock,
    category,
    subCategory,
    specifications,
    images,
  } = req.body;

  try {
    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // Prepare updates object
    const updates = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price !== undefined && { price }),
      ...(stock !== undefined && { stock }),
      ...(category && { category }),
      ...(subCategory && { subCategory }),
    };

    // Handle specifications if provided
    if (specifications && Array.isArray(specifications)) {
      updates.specifications = specifications.map((spec) => {
        const key = Object.keys(spec)[0]; // First key in the specification object
        const value = spec[key]; // Corresponding value
        return { key, value };
      });
    }

    // Handle new images if provided
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        try {
          const result = await uploadOnCloudinary(file.path);
          newImages.push({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        } catch (err) {
          console.error("Image upload failed:", err);
          return next(
            new AppError("Failed to upload images. Please try again.", 500)
          );
        }
      }

      // Optionally delete old images from Cloudinary
      // if (product.images.length > 0) {
      //   for (const oldImage of product.images) {
      //     await deleteFromCloudinary(oldImage.public_id); // Custom function to delete from Cloudinary
      //   }
      // }

      updates.images = newImages;
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("category subCategory", "name");

    res
      .status(200)
      .json(new AppResponse(200, updatedProduct, "Product updated successfully"));
  } catch (error) {
    console.error("Product update failed:", error);
    next(new AppError("Failed to update product. Please try again.", 500));
  }
});

// Delete a product
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json(new AppResponse(200, null, "Product deleted successfully"));
  } catch (error) {
    next(new AppError("Failed to delete product. Please try again.", 500));
  }
});

export const deleteProductImage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { publicId } = req.params;
  console.log(id, publicId)
  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
    const updatedImages = product.images.filter(image => image.public_id !== publicId);
    product.images = updatedImages;
    await product.save();
    await deleteFromCloudinary(publicId);
    res.status(200).json(new AppResponse(200, product, "Product image deleted successfully"));
  } catch (error) {
    next(new AppError("Failed to delete product image. Please try again.", 500));
  }

})