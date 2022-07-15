// @ts-nocheck
import { uploadImg } from '../../../api/Common'

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then(uploadedFile => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', uploadedFile)
          formData.append('mark', uploadedFile?.name)
          uploadImg(formData).then(response => {
            if (response) {
              resolve({
                default: response
              });
            } else {
              reject(response);
            }
          }).catch(response => {
            reject('Upload failed');
          });

        });
      });
  }

  abort() {
  }
}

export default MyUploadAdapter
