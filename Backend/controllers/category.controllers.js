import { asyncHandler } from "../utils/AsyncHandler.js";
import AppError from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import Category from '../models/category.models.js';
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";

// Add a new category
export const addCategory = asyncHandler(async (req, res, next) => {
  const { name, description, subCategory } = req.body;
  
  // Validation: Check for required fields
  if (!name) {
    return next(new AppError("Category name is required", 400));
  }
  
  // Initialize the image object
  let image = {};

  // Check if a file was uploaded for the category image
  if (req.file) {
    try {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      return next(new AppError("Failed to upload image. Please try again.", 500));
    }
  }
  
  // Create the category
  try {
    const category = await Category.create({
      name,
      description,
      subCategory,
      image, // Assign the image object
    });

    res
      .status(201)
      .json(new AppResponse(201, category, "Category added successfully"));
  } catch (error) {
    console.error("Category creation failed:", error);
    next(new AppError("Failed to add category. Please try again.", 500));
  }
});

// Get all categories
export const getAllCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(new AppResponse(200, categories, "Categories fetched successfully"));
  } catch (error) {
    next(new AppError("Failed to fetch categories. Please try again.", 500));
  }
});

// Get a single category by ID
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const category = await Category.findById(id).populate("parentCategory");
  
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
  
    res.status(200).json(new AppResponse(200, category, "Category fetched successfully"));
  } catch (error) {
    next(new AppError("Failed to fetch category. Please try again.", 500));
  }
});

// Update a category
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, subCategory } = req.body;


  try {
    // Find the category
    const category = await Category.findById(id);
    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    // Prepare updates object
    const updates = {
      ...(name && { name }),
      ...(description && { description }),
      ...(subCategory && { subCategory }),
    };

    // Initialize the image object
    let image = {};

    // Check if a file was uploaded for the category image
    if (req.file) {
      try {
        // Delete the previous image from Cloudinary
        if (category.image && category.image.public_id) {
          await deleteFromCloudinary(category.image.public_id);
        }

        // Upload the new image to Cloudinary
        const result = await uploadOnCloudinary(req.file.path);
        if (result) {
          image = {
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
          updates.image = image;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        return next(new AppError("Failed to upload image. Please try again.", 500));
      }
    }

    // Update the category
    const updatedCategory = await Category.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    // Send response
    res.status(200).json({
      status: "success",
      data: {
        category: updatedCategory,
      },
    });
  } catch (error) {
    console.error("Failed to update category:", error);
    next(new AppError("Failed to update category. Please try again.", 500));
  }
});

// Delete a category
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json(new AppResponse(200, null, "Category deleted successfully"));
  } catch (error) {
    next(new AppError("Failed to delete category. Please try again.", 500));
  }
});




