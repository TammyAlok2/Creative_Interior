import Carousel from "../models/carousel.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import AppError from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// get all carousel items 

export const getAllCarouselItems = asyncHandler(async (req, res, next) => {
    try {
      const carouselItems = await Carousel.find();
  
      res.status(200).json(
        new AppResponse(200, carouselItems, "Carousel items fetched successfully")
      )

    } catch (error) {
      console.error("Failed to fetch carousel items:", error);
      next(new AppError("Failed to fetch carousel items. Please try again.", 500));
    }
  });

// Add a new carousel item
export const addCarouselItem = asyncHandler(async (req, res, next) => {
  // Initialize the images array
  const images = [];

  // Check if files were uploaded for the carousel images
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
      return next(
        new AppError("Failed to upload images. Please try again.", 500)
      );
    }
  }

  // Create the carousel item
  try {
    const carouselItem = await Carousel.create({
      images, // Assign the images array
    });

    res
      .status(201)
      .json(
        new AppResponse(201, carouselItem, "Carousel item Added successfully")
      );
  } catch (error) {
    console.error("Carousel item creation failed:", error);
    next(new AppError("Failed to add carousel item. Please try again.", 500));
  }
});

// Update a carousel item

export const updateCarouselItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the carousel item
    const carouselItem = await Carousel.findById(id);
    if (!carouselItem) {
      return next(new AppError("Carousel item not found", 404));
    }

    // Initialize the images array
    const images = [];

    // Check if files were uploaded for the carousel images
    if (req.files && req.files.length > 0) {
      try {
        // Delete the previous images from Cloudinary
        for (const img of carouselItem.images) {
          await deleteFromCloudinary(img.public_id);
        }

        // Upload the new images to Cloudinary
        for (const file of req.files) {
          const result = await uploadOnCloudinary(file.path);
          if (result) {
            images.push({
              public_id: result.public_id,
              secure_url: result.secure_url,
            });
          }
        }
        updates.images = images;
      } catch (error) {
        console.error("Image upload failed:", error);
        return next(
          new AppError("Failed to upload images. Please try again.", 500)
        );
      }
    }


    // Update the carousel item
    const updatedCarouselItem = await Carousel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    // Send response
    res
      .status(200)
      .json(
        new AppResponse(
          200,
          updatedCarouselItem,
          "Carousel item updated successfully"
        )
      );
  } catch (error) {
    console.error("Failed to update carousel item:", error);
    next(
      new AppError("Failed to update carousel item. Please try again.", 500)
    );
  }
});



// Delete a carousel item
export const deleteCarouselItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the carousel item
    const carouselItem = await Carousel.findById(id);
    if (!carouselItem) {
      return next(new AppError("Carousel item not found", 404));
    }

    // Delete the images from Cloudinary
    for (const img of carouselItem.images) {
      await deleteFromCloudinary(img.public_id);
    }

    // Delete the carousel item
    await Carousel.findByIdAndDelete(id);

    // Send response
    res
      .status(200)
      .json(new AppResponse(200, null, "Carousel item deleted successfully"));
  } catch (error) {
    console.error("Failed to delete carousel item:", error);
    next(
      new AppError("Failed to delete carousel item. Please try again.", 500)
    );
  }
});
