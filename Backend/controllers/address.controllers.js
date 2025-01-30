import {asyncHandler} from '../utils/AsyncHandler.js'
import AppError from '../utils/AppError.js';
import AppResponse from '../utils/AppResponse.js';
import Address from '../models/address.models.js';



// Fetch all addresses for a user
export const getAddresses = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const addresses = await Address.find({ user: userId });

  if (!addresses) {
    return next(new AppError('No addresses found', 404));
  }

  res.status(200).json(new AppResponse(200, addresses, 'Addresses fetched successfully'));
});

export const getAddressesById = asyncHandler(async (req, res, next) => {
  const {addressId} = req.params;

  const addresses = await Address.findById(addressId);

  if (!addresses) {
    return next(new AppError('No addresses found', 404));
  }

  res.status(200).json(new AppResponse(200, addresses, 'Address fetched By Id successfully'));
});



/**
 * @Add Address 
 * @ROUTE @POST {{URL}}/api/user/add-address
 * @ACCESS Public
 */


export const addAddress = asyncHandler(async (req, res, next) => {
  const { name, mobileNumber, address, locality, landmark, city, state, pinCode } = req.body;
  const userId = req.user.id;

  // Validate required fields
  if (!name || !mobileNumber || !address || !locality || !city || !state || !pinCode) {
    return next(new AppError('All fields are required', 400));
  }

  const newAddress = new Address({
    name,
    mobileNumber,
    address,
    locality,
    landmark,
    city,
    state,
    pinCode,
    user: userId,
  });

  await newAddress.save();

  res.status(200).json(new AppResponse(200, newAddress, 'Address added successfully'));
});


/**
 * @Edit Address 
 * @ROUTE @Put {{URL}}/api/user/edit-address/:addressId
 * @ACCESS Public
 */

export const editAddress = asyncHandler(async (req, res, next) => {
    const { addressId } = req.params;
    const { name, mobileNumber, address, locality, landmark, city, state, pinCode } = req.body;
    const userId = req.user.id;
  
    // Validate address ID
    if (!addressId) {
      return next(new AppError('Address ID is required', 400));
    }
  
    const existingAddress = await Address.findOne({ _id: addressId, user: userId });
    if (!existingAddress) {
      return next(new AppError('Address not found', 404));
    }
  
    // Update address fields
    existingAddress.name = name || existingAddress.name;
    existingAddress.mobileNumber = mobileNumber || existingAddress.mobileNumber;
    existingAddress.address = address || existingAddress.address;
    existingAddress.locality = locality || existingAddress.locality;
    existingAddress.landmark = landmark || existingAddress.landmark;
    existingAddress.city = city || existingAddress.city;
    existingAddress.state = state || existingAddress.state;
    existingAddress.pinCode = pinCode || existingAddress.pinCode;
  
    await existingAddress.save();
  
    res.status(200).json(new AppResponse(200, existingAddress, 'Address updated successfully'));
  });

  /**
 * Delete Address 
 * @ROUTE @Delete {{URL}}/api/user/delete-address/:addressId
 * @ACCESS Public
 */


  export const deleteAddress = asyncHandler(async (req, res, next) => {
    const { addressId } = req.params;
    console.log(addressId)
    const userId = req.user.id;
  
    // Validate address ID
    if (!addressId) {
      return next(new AppError('Address ID is required', 400));
    }
  
    const existingAddress = await Address.findOne({ _id: addressId, user: userId });
    if (!existingAddress) {
      return next(new AppError('Address not found', 404));
    }
  
    // Use deleteOne() instead of remove()
    await Address.deleteOne({ _id: addressId, user: userId });
    // OR use findOneAndDelete
    // await Address.findOneAndDelete({ _id: addressId, user: userId });
  
    res.status(200).json(new AppResponse(200, null, 'Address deleted successfully'));
  });

