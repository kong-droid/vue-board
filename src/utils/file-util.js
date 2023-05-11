import { updateFilesMapping } from "@/assets/api/attachment";

export const updateFile = (files, tableName, tableId) => {
  let ids = [];

  files.value.forEach(file => {
    ids.push(file.id);
  });

  let params = {
    ids: ids,
    tableName: tableName,
    tableId: tableId
  };

  updateFilesMapping(params).then(res => {
    if(res.data) {
      console.log("파일 정보 업데이트 완료");
    } else {
      console.log("파일 정보를 업데이트 할 수 없습니다.");
    }
  }).catch(e => {
    console.log(e.response.data.message);
  });
};

export const isValidFileSize = (fileSize, limitSize) => {
  const maxSize = limitSize * 1024 * 1024 ; // 1kb : 1024
  if(fileSize > maxSize) {
    alert("파일 사이즈는 " + limitSize + "MB 내로 등록가능합니다.");
    document.getElementById("file-form").value = "";
    return false;
  } else {
    return true;
  }
};