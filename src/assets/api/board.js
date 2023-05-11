import client from './client';

export const getBoard = (page, size, params) => client.post(`/board/read?page=${page}&size=${size}`, params);
export const getBoardView = (id) => client.get(`/board/read/${id}`);
export const getCheckPassword = (params) => client.post(`/board/read/check-password`, params);
export const addBoard = (params) => client.post(`/board/register`, params);
export const setBoard = (params) => client.post(`/board/modify`, params);
export const removeBoard = (params) => client.post(`/board/remove`, params);