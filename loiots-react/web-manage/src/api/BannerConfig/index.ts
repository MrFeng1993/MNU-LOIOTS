import request from '../../utils/api/index';

export const AddBanner = (data) => {
  return request.post('flink/update', data);
};

export const getBannerList = (data) => {
  return request.get('flink/ig/findAll', data);
};

export const getBanner = (id) => {
  return request.get(`flink/ig/findOne/${id}`);
};

export const delBanner = (id) => {
  return request.delete(`flink/deleteOne/${id}`);
};

export const createBanner = (data) => {
  return request.post('flink/update', data);
};


