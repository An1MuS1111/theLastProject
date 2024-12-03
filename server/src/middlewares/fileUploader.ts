import multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

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

export const fileUploader = multer({ storage: multerStorage });
