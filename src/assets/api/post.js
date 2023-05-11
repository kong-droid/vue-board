import client from './client';

// post
export const getPost = (page, size, params) => client.post(`/post/read?page=${page}&size=${size}`, params);
export const getPostView = (id) => client.get(`/post/read/${id}`);
export const getCheckPasswordByPost = (params) => client.post(`/post/read/check-password`, params);
export const addPost = (params) => client.post(`/post/register`, params);
export const setPost = (params) => client.post(`/post/modify`, params);
export const removePost = (params) => client.post(`/post/remove`, params);

// post comment
// export const getComment = (page, size, params) => client.post(`/post-comment/read?page=${page}&size=${size}`, params);
export const getCheckPasswordByComment = (params) => client.post(`/post-comment/read/check-password`, params);
export const addComment = (params) => client.post(`/post-comment/register`, params);
// export const setComment = (params) => client.post(`/post-comment/modify`, params);
export const removeComment = (params) => client.post(`/post-comment/remove`, params);
