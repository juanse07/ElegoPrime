import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Ensure upload directory exists
const uploadDir = path.resolve(__dirname, '../../uploads/jobServiceImages');
if (!fs.existsSync(uploadDir)) {
    console.log(`Creating upload directory: ${uploadDir}`);
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer with disk storage for debugging
const storage = multer.memoryStorage();

export const jobImageUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 25, // 25MB (increased from 10MB)
    },
    fileFilter: (req, file, cb) => {
        console.log("Multer processing file:", file.originalname, file.mimetype);
        
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            console.log("Rejected file type:", file.mimetype);
            cb(new Error(`Invalid file type: ${file.mimetype}. Only JPEG and PNG are allowed.`));
        }
    },
});
