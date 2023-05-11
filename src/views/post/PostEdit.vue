<template>
  <div class="container">
    <AlertMessage v-if="isActive" :isSuccess="isSuccess" :movePath="movePath" />
    <BackButton />
    <div class="row">
      <div class="col-11">
        <h4>{{act}}</h4>
      </div>
      <div class="col-1">
        <button class="btn btn-secondary" @click="onSubmit">저장</button>
      </div>
    </div>
    <table class="table">
      <tbody>
        <tr class="row" v-if="id === undefined">
          <th class="col-2">닉네임</th>
          <td class="col-2">
            <input type="text" class="form-control" v-model="nickName" @keyup.enter="onSubmit"/>
          </td>
          <th class="col-2">비밀번호</th>
          <td class="col-2">
            <input type="password" class="form-control" v-model="password" @keyup.enter="onSubmit"/>
          </td>
          <th class="col-2">비밀번호 확인</th>
          <td class="col-2">
            <input type="password" class="form-control" v-model="passwordConfirm" @keyup.enter="onSubmit"/>
          </td>
        </tr>
        <tr class="row">
          <th class="col-2">제목</th>
          <td class="col-10">
            <input type="text" class="form-control" v-model="postTitle" @keyup.enter="onSubmit">
          </td>
        </tr>
        <tr class="row">
          <th class="col-2">내용</th>
          <td class="col-10">
            <MarkDown :content="postContent" :is-view="isView"/>
          </td>
        </tr>
        <tr class="row">
          <th class="col-2">파일첨부</th>
          <td class="col-10">
            <FileUpload
              :list="files"
              :action="'게시글 파일첨부는 10개 까지 가능합니다.'"
              :max-length="10"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MarkDown from "@/components/MarkDown.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import FileUpload from "@/components/FileUpload.vue";
import BackButton from "@/components/BackButton.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { isEmpty, isValidPassword } from "@/utils/validation";
import { addPost, getPostView, setPost } from "@/assets/api/post";
import { updateFile } from "@/utils/file-util";
export default {
  name: "PostEdit",
  emits: ["updateFile"],
  components : {BackButton, AlertMessage, MarkDown, FileUpload },
  setup() {

    const isActive = ref(false);
    const isSuccess = ref(false);
    const isView = ref(true);
    const movePath = ref("");

    const route = useRoute();
    let id = route.params.id;
    const boardId = route.params.boardId;

    const postTitle = ref("");
    const postContent = ref("");
    const nickName = ref("");
    const password = ref("");
    const passwordConfirm = ref("");

    const act = ref("");
    let files = ref([]);

    if(id !== undefined) {
      act.value = "게시글 정보 수정";
      getPostView(id).then(res => {
        postTitle.value = res.data.title;
        postContent.value = res.data.content;
        onMounted( files.value = res.data.attachment);
      });
    } else {
      act.value = "게시글 정보 등록";
    }

    const onSubmit = () => {
      postContent.value = document.getElementById("markdown-text").value;

      if(isEmpty(postTitle.value)) {
        alert("제목을 입력하세요.")
        return;
      }

      if(isEmpty(postContent.value)) {
        alert("내용을 입력하세요.")
        return;
      }

      let params = {};

      if(id !== undefined) {

        params = {
          id: id,
          boardId: boardId,
          title: postTitle.value,
          content: postContent.value
        };

        setPost(params).then(res => {
          isActive.value = true;
          movePath.value = "";
          isSuccess.value = res.data.id !== undefined;

          updateFile(files, process.env.VUE_APP_POST_CODE, id);
        });

      } else {
        if(isEmpty(nickName.value)) {
          alert("닉네임을 입력하세요.");
          return;
        }

        if(isEmpty(password.value)) {
          alert("비밀번호를 입력하세요.");
          return;
        }

        if(isEmpty(passwordConfirm.value)) {
          alert("비밀번호 확인을 입력하세요.");
          return;
        }

        if(isValidPassword(password.value)) {
          alert("비밀번호는 숫자 네 자리만 입력할 수 있습니다.");
          return;
        }

        if(isValidPassword(passwordConfirm.value)) {
          alert("비밀번호 확인은 숫자 네 자리만 입력할 수 있습니다.");
          return;
        }

        if(password.value !== passwordConfirm.value) {
          alert("비밀번호와 비밀번호 확인 필드의 값이 일치하지 않습니다. \n다시 입력하세요.");
          return;
        }

        params = {
          id: id,
          boardId: boardId,
          title: postTitle.value,
          content: postContent.value,
          nickName: nickName.value,
          password: password.value,
        };

        addPost(params).then(res => {
          isActive.value = true;
          isSuccess.value = res.data.id !== undefined;
          movePath.value = res.data.id !== undefined ? `/post/${boardId}` : "";
          id = res.data.id;

          updateFile(files, process.env.VUE_APP_POST_CODE, id);

        }).catch(e => {
          console.log(e.response.data.message);
        });
      }
    };

    return {
      isActive,
      isSuccess,
      movePath,
      isView,
      id,
      act,
      postTitle,
      postContent,
      nickName,
      password,
      passwordConfirm,
      files,
      onSubmit,
      updateFile
    };
  }
}
</script>