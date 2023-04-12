import type { AxiosInstance } from 'axios';
import { HttpAxios } from './http-common-v1';

class UploadService {
  constructor(
    private http:AxiosInstance = HttpAxios.getHttp()
  ){}
  uploadUsers(file: File, onUploadProgress: any) {
    const formData = new FormData()
    formData.append("file", file);
    return this.http.post("/upload/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    })

  }
  
  uploadFile(path:string, file: File, onUploadProgress: any) {
    const formData = new FormData()
    formData.append("file", file);
    return this.http.post(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    })

  }
}

export default new UploadService();