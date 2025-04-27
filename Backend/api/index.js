import express from 'express';
import authenticationRoutes from '../routes/authentication.routes.js';
import adminRoutes from '../routes/admin.routes.js';
import userRoutes from '../routes/user.routes.js';
import bodyParser from 'body-parser';
import '../utils/firebase.js';
import connectToDB from '../configs/dbConn.js';
import { configDotenv } from 'dotenv';
import { v2 } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import functions from 'firebase-functions';


const app = express();
const PORT = process.env.PORT

// Load environment variables
configDotenv();

// Cloudinary configuration
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://creative-interior.vercel.app',
    'https://creative-interior-h96r.vercel.app',
   
    'https://creative-interior-admin.vercel.app'
];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        exposedHeaders: ['set-cookie']
    })
);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes setup
app.use('/api/v1/auth', authenticationRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(5000,()=>{
    console.log(`Server is listening in port on ${5000}`)
})

// Initialize the application
const initializeApp = async () => {
    try {
        // Connect to database
        await connectToDB();
        // Initialize Firebase Admin
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        // });
        
        console.log('Database connected and Firebase initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        process.exit(1);
    }
};

// Call initialization function
initializeApp();

// Export the handler for Vercel
export default app;
