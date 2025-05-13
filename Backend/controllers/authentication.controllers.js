import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,

} from "firebase/auth";



import AppResponse from "../utils/AppResponse.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/user.models.js";

//For development
const devOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/"
};

// For production
const prodOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
  domain: process.env.COOKIE_DOMAIN || "creative-interior-h96r.vercel.app" || 'creativeinterior.aloktamrakar.me',

};

const cookieOptions = process.env.NODE_ENV === "production" ? prodOptions : devOptions;

//const cookieOptions =  prodOptions;
/**
 * @SIGNIN
 * @ROUTE @POST {{URL}}/api/auth/login
 * @ACCESS Public
 */
export const googleLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Log input for debugging
  console.log("Login attempt with email:", email);

  // Validate input
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const auth = getAuth();
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Check if the email is verified
    if (!userCredential.user.emailVerified) {
      return next(
        new AppError("Email not verified, please verify your email.", 400)
      );
    }

    // Retrieve user from MongoDB
    const user = await User.findOne({ email: email });

    const token = await user.generateJWTToken();

    // Check if user exists in the database
    if (!user) {
      return next(new AppError("User not found in the database.", 404));
    }

    // Update the verifyEmail field
    user.verifyEmail = true; // Ensure your schema includes this field
    await user.save();

    res.cookie('token', token, cookieOptions);

    // Respond with success
    res
      .status(200)
      .json(
        new AppResponse(
          200,
          {
            user: userCredential.user,
            token
          },
          
          "User logged in successfully."
        )
      );
  } catch (error) {
    console.log("Error during user login:", error);

    // Handle specific Firebase Auth errors
    let errorMessage = "User login failed, please try again later.";
    if (error.code === "auth/user-not-found") {
      errorMessage = "No user found with this email address.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password. Please try again.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "The email address is not valid.";
    } else if (error.code === "auth/user-disabled") {
      errorMessage =
        "This user account has been disabled. Contact support for assistance.";
    }

    // Return error with appropriate message
    return next(new AppError(errorMessage, 400));
  }
});




/**
 * @Register
 * @ROUTE @POST {{URL}}/api/auth/signup
 * @ACCESS Public
 */
export const googleSignup = asyncHandler(async (req, res, next) => {
  const { email, password, role, name, _id } = req.body;

  // Validate request body
  if (!email || !password || !role) {
    return next(new AppError("Please provide email , password and role", 400));
  }

  const auth = getAuth();
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
   // console.log("user creddentioal ", userCredential);

    // Send email verification
    await sendEmailVerification(userCredential.user);

    const UserData = await User.create({
      _id: userCredential.user.uid,
      email: userCredential.user.email,
      name: name,
      role: role,
    });
    
    const token = await UserData.generateJWTToken();
   // console.log(token);
    // set cookie options do not send cookie on register 
  //  res.cookie("token", token, cookieOptions);

    // Respond with success
    res
      .status(201)
      .json(
        new AppResponse(
          200,
          userCredential,
          `${role} created successfully and Verify your email.`
        )
      );
  } catch (error) {
    console.log("Error during user registration:", error);

    // Handle specific Firebase Auth errors
    let errorMessage = "User registration failed, please try again later.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email Already Exits.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "The email address is not valid.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "The password is too weak.";
    } else if (error.code === "auth/operation-not-allowed") {
      errorMessage = "Email/password accounts are not enabled.";
    }
    else if(error.code === "auth/invalid-password"){
errorMessage = "The password is invalid";
    }
    else if (error.code === "auth/invalid-credential"){
      errorMessage = "  found"
    }

    // Return error with appropriate message
    return next(new AppError(errorMessage, 400));
  }
});

/**
 * @Fetch user details
 * @ROUTE @get {{URL}}/api/auth/getUserDetails/:id
 * @ACCESS Public
 */

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res
      .status(200)
      .json(new AppResponse(200, user, "User details fetched successfully"));
  } catch (error) {
    console.error("Error fetching user details:", error);
    next(new AppError("Error fetching user details", 500));
  }
});

/**
 * @Forgot Password
 * @ROUTE @POST {{URL}}/api/auth/forget-password
 * @ACCESS Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide an email address", 400));
  }

  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    res
      .status(200)
      .json(
        new AppResponse(200, null, "Password reset email sent successfully")
      );
  } catch (error) {
    return next(
      new AppError(
        "Failed to send password reset email, please try again later",
        400
      )
    );
  }
});
export const logOut = asyncHandler(async (req, res, next) => {
  const auth = getAuth();

  try {
    await signOut(auth);
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
         domain: process.env.COOKIE_DOMAIN || "bombooworld.com"
          // This is the important addition
      })
      .json(new AppResponse(200, null, "User logged out successfully"));
  } catch (error) {
    console.error("Error during sign out:", error); // Log the error for debugging
    return next(new AppError("Failed to log out, please try again later", 400));
  }
});
// Google Sign-In
export const googleSignIn = asyncHandler(async (req, res) => {
  try {
    const { name, email, role, _id } = req.body;

    // Find existing user
    let user = await User.findOne({ email });

    // If user doesn't exist, create new user
    if (!user) {
      user = await User.create({
        _id: _id,
        name: name,
        email: email,
        role: role,
      });
      
      // Generate token for new user
      const token = await user.generateJWTToken();
      
      res.cookie("token", token, cookieOptions);
      return res
        .status(200)
        .json(new AppResponse(200, { user, token }, "User Registered Successfully"));
    }

    // For existing user
    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);
    return res
      .status(200)
      .json(new AppResponse(200, { user, token }, "User Login Successfully"));

  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return res
      .status(500)
      .json(new AppResponse(500, null, "Internal Server Error"));
  }
});

// update user details 
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { name,phoneNumber } = req.body;

  // Retrieve user from MongoDB
  const user = await User.findById(userId);

  // Check if user exists in the database
  if (!user) {
    return next(new AppError('User not found in the database.', 404));
  }

  // Update user details
  if (name) user.name = name;
  if(phoneNumber) user.phoneNumber = phoneNumber;
 
  await user.save();

  res.status(200).json(new AppResponse(200, user, 'User profile updated successfully'));
});


export const allUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page if not provided

  const skip = (page - 1) * limit;

  const totalUsers = await User.countDocuments();
  const users = await User.find().skip(skip).limit(limit);

  res.status(200).json(new AppResponse(200, {
    users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page
  }, "All Users"));
});