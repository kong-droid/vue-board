<template>
  <h5><strong>댓글 등록</strong></h5>
  <table class="table">
    <thead>
      <tr class="row" >
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
        <td class="col-10">
          <input type="text" class="form-control" v-model="postComment" @keyup.enter="onSubmit"/>
          <FileUpload
            :list="regFile"
            :action="'게시글 파일첨부는 1개 까지 가능합니다.'"
            :max-length="1"
          />
        </td>
        <td class="col-2">
          <button class="btn btn-secondary" id="comment-submit-btn" @click="onSubmit">등록</button>
        </td>
      </tr>
    </thead>
    <tbody v-if="comment.length > 0" class="post-comment" v-for="item in comment" :key="item.id">
      <tr>
        <td class="col-12">
          <p><strong>{{item.nickName}}</strong> / {{ item.createdDate }} </p>
          <span>{{item.comment}}</span>
          <div v-for="file in item.attachment" :key="file.id">
            <img class="comment-img" :src="apiUrl + `${file.fullPath}`" :alt="file.originalFileName"/>
          </div>
          <div class="btn-div">
            <button class="btn btn-dark" @click="onHandleComment(`${item.id}`)">삭제</button>
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <EmptyData />
    </tbody>
  </table>
</template>

<script>
import FileUpload from "@/components/FileUpload.vue";
import EmptyData from "@/components/EmptyData.vue";

import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { addComment, getCheckPasswordByComment, removeComment } from "@/assets/api/post";
import { getNow, isEmpty, isValidPassword } from "@/utils/validation";
import { updateFile } from "@/utils/file-util";


export default {
  name: "PostComment",
  components: { EmptyData, FileUpload },
  props: {
    list: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const route = useRoute();
    let id = route.params.id;

    const apiUrl = process.env.VUE_APP_API_URL;
    // 댓글 저장
    const nickName = ref("");
    const password = ref("");
    const passwordConfirm = ref("");
    const postComment = ref("");
    const regFile = ref([]);


    // 댓글 목록
    const comment = ref(props.list);
    watch(() => props.list, (value) => comment.value = value);

    const checkPassword = (commentId, password, callback) => {
      let params = {
        id : commentId,
        password : password
      };

      getCheckPasswordByComment(params).then(res => {
        callback(res.data);
      }).catch(e => {
        if(e.response.data.status === 500) {
          console.log(e.response.data.message);
          alert("비밀번호가 틀립니다. \n다시 입력하세요.");
        }
      })
    };

    const onHandleComment = ( commentId ) => {
      let password = prompt( "삭제 하시겠습니까? \n댓글 비밀번호 네 자리를 입력하세요.");

      if(isEmpty(password)) {
        return;
      } else {
        if(isValidPassword(password)) {
          alert("비밀번호는 숫자 네 자리만 입력할 수 있습니다.");
          return;
        }

        let params = {
          id : commentId,
          password : password
        };

        checkPassword(commentId, password, (data) => {
          if(data.id === Number(commentId)) {
            removeComment(params).then(res => {
              if(res.data) {
                const filter = comment.value.filter(item => item.id !== Number(commentId));
                watch(() => comment, comment.value = filter);
              } else {
                alert("비밀번호가 일치하지 않습니다.");
              }
            }).catch(e => {
              console.log(e.response.data.message);
            });
          } else {
            alert("비밀번호가 일치하지 않습니다.");
          }
        });
      }
    };

    const onSubmit = () => {

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

      if(isEmpty(postComment.value)) {
        alert("댓글 내용을 입력하세요.")
        return;
      }

      let params = {
        postId: id,
        nickName: nickName.value,
        password: password.value,
        comment: postComment.value,
      };

      addComment(params).then(res => {
        updateFile(regFile, process.env.VUE_APP_POST_COMMENT_CODE, res.data.id);
        comment.value.unshift({
          id : res.data.id,
          nickName: nickName.value,
          password: password.value,
          comment: postComment.value,
          createdDate : getNow(),
          attachment: regFile.value
        });
        // 댓글 초기화
        nickName.value = "";
        password.value = "";
        passwordConfirm.value = "";
        postComment.value = "";
        regFile.value = [];

      }).catch(e => {
        console.log(e.response.data.message);
      });

    }

    return {
      nickName,
      password,
      passwordConfirm,
      postComment,
      comment,
      regFile,
      onHandleComment,
      onSubmit,
      apiUrl
    };

  }
}
</script>