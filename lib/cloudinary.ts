import { v2 as cloudinary } from "cloudinary";

// Cloudinary is configured from env (a FREE account is enough — see
// .env.example). Uploads are always server-side and admin-authenticated
// (app/api/admin/upload), so the API secret never reaches the browser.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// When any credential is missing the upload route returns a clear 503 instead
// of throwing, so the rest of the app keeps working without media uploads.
export const isCloudinaryConfigured = Boolean(
  cloudName && apiKey && apiSecret,
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export { cloudinary };
