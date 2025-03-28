import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import env from "./env";
import NewServiceRequestRoute from "./routes/ElegoRoute";

const app = express();

// Basic middleware - should be first
app.use(express.json({ limit: '50mb' }));  // Increased JSON size limit
app.use(express.urlencoded({ extended: true, limit: '50mb' }));  // Added for form data with increased limit
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [env.WEBSITE_URL, 'https://www.elegoprime.com', 'https://elegoprime.com', 'http://localhost:3000'] // Include localhost for testing
    : ['http://localhost:3000']; // In development, allow localhost:3000

console.log('Environment:', process.env.NODE_ENV);
console.log('Allowed Origins:', allowedOrigins);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            console.log('CORS blocked origin:', origin);
            return callback(null, false);
        }
        
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    maxAge: 86400, // CORS preflight request cache for 24 hours
}));

// Routes
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/new-service-request", NewServiceRequestRoute);

// app.use("/bar-service-quotations", BarServicequotationRoutes);

// Add a basic route handler for Socket.IO health check
app.get('/socket.io/', (req, res) => {
    res.send('Socket.IO endpoint');
});

// Error handling middleware - should be last
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;