// in upload.services.js

import service from "./service.config";

const uploadImageService = (imageFile, bookId) => {
    return service.post(`/${bookId}/upload`, imageFile);
};

export { uploadImageService };