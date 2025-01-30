import { asyncHandler } from "../utils/AsyncHandler.js";
import AppError from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import ProductMaterial from "../models/productMaterial.models.js";

// Create a new material
export const createMaterial = asyncHandler(async (req, res, next) => {
    const { name, price, description } = req.body;
    console.log(name,price)

    // Validation: Check for required fields
    if (!name || price === undefined) {
        return next(new AppError("Name and price are required fields", 400));
    }

    let image;
    // Handle image upload if provided
    if (req.file) {
        try {
            const result = await uploadOnCloudinary(req.file.path);
            if (result) {
                image = result.secure_url;
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            return next(new AppError("Failed to upload image. Please try again.", 500));
        }
    }

    try {
        const material = await ProductMaterial.create({
            name,
            price,
            description,
            image
        });

        res.status(201).json(new AppResponse(201, material, "Product-Material added successfully"));
    } catch (error) {
        console.error("Material creation failed:", error);
        next(new AppError("Failed to add material. Please try again.", 500));
    }
});

// Get all materials with filtering and sorting
export const getAllMaterials = asyncHandler(async(req,res,next)=>{
    try {
        const materials = await ProductMaterial.find();
        res.status(200).json(new AppResponse(200, materials, "Materials fetched successfully"));
    } catch (error) {
        next(new AppError("Failed to fetch materials. Please try again.", 500));
    }
})

// Get a single material by ID
export const getMaterialById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const material = await ProductMaterial.findById(id);

        if (!material) {
            return next(new AppError("Material not found", 404));
        }

        res.status(200).json(new AppResponse(200, material, "Material fetched successfully"));
    } catch (error) {
        next(new AppError("Failed to fetch material. Please try again.", 500));
    }
});

// Update a material
export const updateMaterial = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    try {
        // Find the material
        const material = await ProductMaterial.findById(id);
        if (!material) {
            return next(new AppError("Material not found", 404));
        }

        // Prepare updates object
        const updates = {
            ...(name && { name }),
            ...(price !== undefined && { price }),
            ...(description && { description })
        };

        // Handle new image if provided
        if (req.file) {
            try {
                const result = await uploadOnCloudinary(req.file.path);
                // Delete old image if it exists
                if (material.image) {
                    const publicId = material.image.split('/').pop().split('.')[0];
                    await deleteFromCloudinary(publicId);
                }
                updates.image = result.secure_url;
            } catch (err) {
                console.error("Image upload failed:", err);
                return next(new AppError("Failed to upload image. Please try again.", 500));
            }
        }

        // Update the material
        const updatedMaterial = await ProductMaterial.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        res.status(200).json(new AppResponse(200, updatedMaterial, "Material updated successfully"));
    } catch (error) {
        console.error("Material update failed:", error);
        next(new AppError("Failed to update material. Please try again.", 500));
    }
});

// Delete a material
export const deleteMaterial = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const material = await ProductMaterial.findById(id);

        if (!material) {
            return next(new AppError("Material not found", 404));
        }

        // Delete image from Cloudinary if it exists
        if (material.image) {
            const publicId = material.image.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        }

        await ProductMaterial.findByIdAndDelete(id);

        res.status(200).json(new AppResponse(200, null, "Material deleted successfully"));
    } catch (error) {
        next(new AppError("Failed to delete material. Please try again.", 500));
    }
});