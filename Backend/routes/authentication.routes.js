import express from 'express';
import {isLoggedIn} from '../middlewares/auth.middlewares.js'

import { googleSignIn,googleLogin, googleSignup, forgotPassword, logOut, getUserDetails, updateUserProfile } from '../controllers/authentication.controllers.js';

const router = express.Router();

router.post('/login', googleLogin);
router.post('/register', googleSignup);
router.post('/forget',forgotPassword);
router.post('/logout',logOut);
router.get('/getUserDetails',isLoggedIn,getUserDetails)
router.post('/google-signin',googleSignIn);
router.post('/update-user',isLoggedIn,updateUserProfile)


export default router;