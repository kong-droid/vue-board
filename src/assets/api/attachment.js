import client from './client';

export const download = (id) => client.get(`/attachment/download/${id}`, { responseType: "blob" });
export const uploadFiles = (params) => client.post(`/attachment/register`, params);
export const updateFilesMapping = (params) => client.post(`/attachment/modify`, params);
export const removeFile = (id) => client.post(`/attachment/remove/${id}`);
