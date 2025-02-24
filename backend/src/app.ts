import cors from "cors";
import "dotenv/config";
import express from "express";
import env from "./env";
import NewServiceRequestRoute from "./routes/ElegoRoute";

const app = express();

// Basic middleware - should be first
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [env.WEBSITE_URL] // In production, only allow the production URL
    : ['http://localhost:3000']; // In development, allow localhost:3000

console.log('Environment:', process.env.NODE_ENV);
console.log('Allowed Origins:', allowedOrigins);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

// Routes

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