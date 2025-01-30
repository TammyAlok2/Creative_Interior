import { asyncHandler } from "../utils/AsyncHandler.js";
import AppError from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import ProductService from "../models/productServices.models.js";

// Create a new service
export const createService = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    // Validation: Check for required field
    if (!name) {
        return next(new AppError("Service name is required", 400));
    }

    let image = {};
    // Handle image upload if provided
    if (req.file) {
        try {
            const result = await uploadOnCloudinary(req.file.path);
            if (result) {
                image = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            return next(new AppError("Failed to upload image. Please try again.", 500));
        }
    }

    try {
        const service = await ProductService.create({
            name,
            image
        });

        res.status(201).json(new AppResponse(201, service, "Service added successfully"));
    } catch (error) {
        console.error("Service creation failed:", error);
        next(new AppError("Failed to add service. Please try again.", 500));
    }
});

// Get all services with search functionality
export const getAllServices = asyncHandler(async (req, res, next) => {
    try {
        const services = await ProductService.find();
        res.status(200).json(new AppResponse(200, services, "Services fetched successfully"));
    } catch (error) {
        next(new AppError("Failed to fetch services. Please try again.", 500));
    }
});

// Get a single service by ID
export const getServiceById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const service = await ProductService.findById(id);

        if (!service) {
            return next(new AppError("Service not found", 404));
        }

        res.status(200).json(new AppResponse(200, service, "Service fetched successfully"));
    } catch (error) {
        next(new AppError("Failed to fetch service. Please try again.", 500));
    }
});

// Update a service
export const updateService = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // Find the service
        const service = await ProductService.findById(id);
        if (!service) {
            return next(new AppError("Service not found", 404));
        }

        // Prepare updates object
        const updates = {
            ...(name && { name })
        };

        // Handle new image if provided
        if (req.file) {
            try {
                const result = await uploadOnCloudinary(req.file.path);
                // Delete old image if it exists
                if (service.image && service.image.public_id) {
                    await deleteFromCloudinary(service.image.public_id);
                }
                updates.image = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };
            } catch (err) {
                console.error("Image upload failed:", err);
                return next(new AppError("Failed to upload image. Please try again.", 500));
            }
        }

        // Update the service
        const updatedService = await ProductService.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        res.status(200).json(new AppResponse(200, updatedService, "Service updated successfully"));
    } catch (error) {
        console.error("Service update failed:", error);
        next(new AppError("Failed to update service. Please try again.", 500));
    }
});

// Delete a service
export const deleteService = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const service = await ProductService.findById(id);

        if (!service) {
            return next(new AppError("Service not found", 404));
        }

        // Delete image from Cloudinary if it exists
        if (service.image && service.image.public_id) {
            await deleteFromCloudinary(service.image.public_id);
        }

        await ProductService.findByIdAndDelete(id);

        res.status(200).json(new AppResponse(200, null, "Service deleted successfully"));
    } catch (error) {
        next(new AppError("Failed to delete service. Please try again.", 500));
    }
});

