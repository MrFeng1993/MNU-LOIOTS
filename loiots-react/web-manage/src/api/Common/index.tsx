import request from '../../utils/api/index';

export const uoloadImg = (formData) => {
  console.log(formData);
  return request.post('media/upload', formData);
};
