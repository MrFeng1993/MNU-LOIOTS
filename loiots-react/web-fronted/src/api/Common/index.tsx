import request from '../../utils/api/index';

export const uploadImg = (formData) => {
  return request.post('media/upload', formData);
};

