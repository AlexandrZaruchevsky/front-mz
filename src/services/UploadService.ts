
import http from './http-common';

class UploadService {

  upload(file: File, onUploadProgress: any) {
    let formData = new FormData()
    formData.append("file", file);
    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    })

  }
}

export default new UploadService();