import Enquiry from "../models/enquiry.models.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import AppResponse from "../utils/AppResponse.js";

// Create a new enquiry
export const createEnquiry = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        throw new AppError("Name and Email are required", 400);
    }
    
    const enquiry = await Enquiry.create({
        name,
        email
    });
    
    res.status(201).json(
        new AppResponse(201, enquiry, 'Enquiry created successfully')
    );
});

// Get all enquiries
export const getAllEnquiries = asyncHandler(async (req, res, next) => {
    const enquiries = await Enquiry.find();
    
    if (!enquiries.length) {
        throw new AppError("No enquiries found", 404);
    }
    
    res.status(200).json(
        new AppResponse(200, enquiries, 'Enquiries retrieved successfully')
    );
});

// Get single enquiry by ID
export const getEnquiryById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    const enquiry = await Enquiry.findById(id);
    
    if (!enquiry) {
        throw new AppError("Enquiry not found", 404);
    }
    
    res.status(200).json(
        new AppResponse(200, enquiry, 'Enquiry retrieved successfully')
    );
});

// Update enquiry
export const updateEnquiry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const enquiry = await Enquiry.findById(id);
    
    if (!enquiry) {
        throw new AppError("Enquiry not found", 404);
    }
    
    if (!name && !email) {
        throw new AppError("Please provide at least one field to update", 400);
    }
    
    // Only update provided fields
    if (name) enquiry.name = name;
    if (email) enquiry.email = email;
    
    await enquiry.save();
    
    res.status(200).json(
        new AppResponse(200, enquiry, 'Enquiry updated successfully')
    );
});

// Delete enquiry
export const deleteEnquiry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    const enquiry = await Enquiry.findById(id);
    
    if (!enquiry) {
        throw new AppError("Enquiry not found", 404);
    }
    
    await Enquiry.findByIdAndDelete(id);
    
    res.status(200).json(
        new AppResponse(200, null, 'Enquiry deleted successfully')
    );
});