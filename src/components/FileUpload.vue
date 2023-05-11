<template>
  <!-- 파일 크기에 따라 멘트 조정 -->
  <div v-if="files !== undefined">
    <input v-if="files.length < maxLength" type="file" id="file-form" class="form-control" v-on:change="fileUpload" accept=".gif, .jpg, .png"/>
    <p class="file-limit-message" v-if="files.length >= maxLength">{{action}}</p>
  </div>
  <div
    class="file-list"
    v-for="file in files"
    :key="file.id"
  >
    <div id="file-div-">
      <span @click="downloadFile(file.id, `${file.originalFileName}`)">{{file.originalFileName}}</span>&nbsp;
      <font-awesome-icon
        :icon="['fas', 'copy']"
        id="file-icon"
        @click="copyFilePath(`${file.fullPath}`)"
      /> &nbsp;
      <font-awesome-icon
        :icon="['fas', 'trash']"
        id="file-icon"
        @click="deleteFile(file.id)"
      />
    </div>
  </div>
</template>

<script>

import { watch, ref } from "vue";

import { download, uploadFiles, removeFile } from "@/assets/api/attachment";
import { isValidFileSize } from "@/utils/file-util";
export default {
  name: "FileUpload",
  props: { // 단방향 바인딩 필요 객체 ( 변환 될 내용없음)
    list: {  // 파일 객체 ( post, post-comment에서 가져올 것)
      type: Object,
      required: false,
    },
    maxLength: {  // 파일 첨부 최대 배열 크기 ( post, post-comment에서 가져올 것)
      type: Number,
      required: true,
      default: 0
    },
    action: { // 파일첨부 멘트 ( post, post-comment에서 가져올 것)
      type: String,
      required: true,
      default: ""
    },
  },
  setup(props) {

    // 파일첨부 멘트
    let files = ref(props.list);
    watch(() => props.list, (value) => files.value = value);

    const copyFilePath = (fullPath) => {
      const copyFilePath = process.env.VUE_APP_API_URL + fullPath;
      const $textArea = document.createElement("textarea");

      document.body.appendChild($textArea);

      $textArea.value = copyFilePath;
      $textArea.select();

      document.execCommand('copy');
      document.body.removeChild($textArea);

      alert("클립보드에 복사 되었습니다.");
    };

    const deleteFile = (id) => {
      removeFile(id).then(res => {
        if(res.data) {
          const filter = files.value.filter(item => item.id !== id);
          watch(() => files, files.value = filter);
        } else {
          alert("파일을 찾을 수 없습니다.");
        }
      }).catch(e => {
        console.log(e.response.data.message);
      });
    };

    const downloadFile = (id, fileName) => {
      download(id).then(res => {
        const blob = new Blob([res.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);

        let $a = document.createElement('a');
        $a.href = fileObjectUrl;
        $a.style.display = 'none';
        $a.download = fileName;

        document.body.appendChild($a);
        $a.click();
        $a.remove();
      });
    };

    const fileUpload = (e) => {
      const file = e.target.files[0];

      if(files.value.length < props.maxLength) {

        if(isValidFileSize(file.size, 1)) {
          const formData = new FormData();
          formData.append("files", file);

          uploadFiles(formData).then(res => {
            files.value.push(res.data[0]);
            document.getElementById("file-form").value = "";
          }).catch(e => {
            console.log(e.response.data.message);
          });
        }
      }

    };

    return {
      files,
      copyFilePath,
      deleteFile,
      downloadFile,
      fileUpload,
    };
  }
}
</script>