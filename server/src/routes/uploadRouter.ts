import express, { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// Custom storage for dynamic folder creation
const multerStorage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        const id = req.params.id;

        if (!id) {
            return cb(new Error("ID parameter is missing"), "");
        }

        const uploadPath = path.join("src/uploads", id);

        // Check if the folder exists and create it if not
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating directory:", err);
                return cb(err, "");
            }
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const uniqueSuffix = `${timestamp}-${Math.round(Math.random() * 1e9)}`;
        const extension =
            path.extname(file.originalname) ||
            `.${file.mimetype.split("/")[1]}`;
        const sanitizedFilename = `${file.fieldname}-${uniqueSuffix}${extension}`;
        cb(null, sanitizedFilename);
    },
});

const upload = multer({ storage: multerStorage });

// Route to upload a single file
router.post(
    "/single/:id",
    upload.single("file"),
    (req: Request, res: Response) => {
        try {
            const file = req.file;
            res.status(200).json(file);
        } catch (err) {
            if (err instanceof multer.MulterError) {
                res.status(400).json(err);
            } else {
                res.status(500).json({ error: "Failed to upload file" });
            }
        }
    }
);

// Route to upload multiple files
router.post(
    "/multiple/:id",
    upload.array("files", 5), // Adjust the limit (5) based on your requirements
    (req: Request, res: Response) => {
        try {
            const files = req.files;
            res.status(200).json(files);
        } catch (err) {
            if (err instanceof multer.MulterError) {
                res.status(400).json(err);
            } else {
                res.status(500).json({ error: "Failed to upload files" });
            }
        }
    }
);

export default router;
