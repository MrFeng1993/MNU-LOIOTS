import request from '../../utils/api/index';

export const AddArticle = (data) => {
  console.log(data);
  return request.post('article/update', data);
};

export const getArticle = (data) => {
  console.log(data);
  return request.post('article/ig/search', data);
};

export const ListOnArticle = (path) => {
  console.log(path);
  return request.get(`/article/launch/1/${path}`);
};


export const TakeDownArticle = (path) => {
  console.log(path);
  return request.get(`/article/launch/0/${path}`);
};

export const DelArticle = (path) => {
  return request.delete(`/article/deleteOne/${path}`);
}


