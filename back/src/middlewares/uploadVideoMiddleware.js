import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sanitizeFilename(originalName) {
  const base = path.basename(originalName);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function isAllowedVideoMime(mimeType) {
  return (
    mimeType === "video/mp4" ||
    mimeType === "video/webm" ||
    mimeType === "video/quicktime"
  );
}

const uploadFolder = path.join(__dirname, "..", "uploads", "videos");
ensureDirExists(uploadFolder);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadFolder);
  },
  filename(req, file, cb) {
    const safe = sanitizeFilename(file.originalname);
    const unique = Date.now() + "-" + Math.floor(Math.random() * 1e6);
    cb(null, `${unique}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200 MB
  },
  fileFilter(req, file, cb) {
    if (isAllowedVideoMime(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("TYPE_NOT_ALLOWED"));
    }
  },
});

export default upload;
