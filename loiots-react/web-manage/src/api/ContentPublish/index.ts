import request from '../../utils/api/index';

export const AddArticle = (data) => {
  return request.post('article/update', data);
};

export const getMenuDict = () => {
  return request.get('article/getPartMap');
};

export const getArticleList = (data) => {
  return request.post('article/ig/search', data);
};

export const getArticle = (id) => {
  return request.get(`article/ig/findOne/${id}`);
};

export const ListOnArticle = (path) => {
  return request.get(`/article/launch/1/${path}`);
};


export const TakeDownArticle = (path) => {
  return request.get(`/article/launch/0/${path}`);
};

export const DelArticle = (path) => {
  return request.delete(`/article/deleteOne/${path}`);
}


