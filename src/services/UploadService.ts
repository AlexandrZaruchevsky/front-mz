
import http from './http-common';

class UploadService {

  uploadUsers(file: File, onUploadProgress: any) {
    const formData = new FormData()
    formData.append("file", file);
    return http.post("/upload/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    })

  }
  
  uploadFile(path:string, file: File, onUploadProgress: any) {
    const formData = new FormData()
    formData.append("file", file);
    return http.post(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    })

  }
}

export default new UploadService();