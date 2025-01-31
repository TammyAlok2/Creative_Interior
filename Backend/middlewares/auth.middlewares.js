
import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  // extracting token from the cookies

  const { token } = req.cookies;
 // console.log(token)

  // If no token send unauthorized message
  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decode send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue false token", 401));
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.user = decoded;

  // Do not forget to call the next other wise the flow of execution will not be passed further
  next();
});

export const authorizeRoles = (...roles) =>

    asyncHandler(async (req, _res, next) => {
        console.log(roles)
        console.log(req.user)
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to view this route", 403)
        );
      }
  
      next();
    });