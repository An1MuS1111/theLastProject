import express, { Request, Response } from "express";
import multer from "multer";
import { fileUploader } from "../middlewares/fileUploader";

const router = express.Router();

// Route to upload a single file
router.post(
    "/single/:id",
    fileUploader.single("file"),
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
    fileUploader.array("files", 5), // Adjust the limit (5) based on your requirements
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
