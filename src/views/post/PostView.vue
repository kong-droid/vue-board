<template>
  <div class="container">
    <div>
      <div>
        <BackButton />
      </div>
      <div class="btn-div">
        <button class="btn btn-secondary" @click="onHandlePost('modify')">수정</button>
        <button class="btn btn-dark" @click="onHandlePost('remove')">삭제</button>
      </div>
    </div>
    <div>
      <h4>상세보기</h4>
    </div>
    <div>
      <table class="table">
        <tbody>
          <tr class="row">
            <th class="col-2">닉네임</th>
            <td class="col-4">{{view.nickName}}</td>
            <th class="col-2">등록일</th>
            <td class="col-4">{{view.createdDate}}</td>
          </tr>
          <tr class="row">
            <th class="col-2">제목</th>
            <td class="col-10">{{view.title}}</td>
          </tr>
          <tr class="row">
            <th class="col-2">내용</th>
            <td class="col-10">
              <MarkDown
                :content="`${view.content}`"
                :isView="isView"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <PostComment :list="comment"/>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import MarkDown from "@/components/MarkDown.vue";
import PostComment from "@/components/PostComment.vue";

import { useRoute } from "vue-router";
import { onMounted, ref} from "vue";
import router from "@/router";

import { getCheckPasswordByPost, getPostView, removePost } from "@/assets/api/post";
import { isEmpty, isValidPassword } from "@/utils/validation";

export default {
  name: "PostView",
  components: {BackButton, MarkDown, PostComment},

  setup(){
    const isView = false;
    const route = useRoute();
    const id = route.params.id;
    const view = ref({});
    const params = ref({});
    const comment = ref([]);

    getPostView(id).then(res => {
      view.value = res.data;
      onMounted( comment.value = res.data.comment);
    }).catch(e => {
      console.log(e.response.data.message);
    });

    // watch(() => comment.value, (value) => comment.value = value);

    const checkPassword = (password, callback) => {
      params.value = {
        id : id,
        password : password
      };
      getCheckPasswordByPost(params.value).then(res => {
        callback(res.data);
      }).catch(e => {
        if(e.response.data.status === 500) {
          console.log(e.response.data.message);
          alert("비밀번호가 틀립니다. \n다시 입력하세요.");
        }
      })
    };
    const onHandlePost = ( whatAct ) => {
      let act = whatAct === "modify" ? "수정" : "삭제";
      let password = prompt( act + "하시겠습니까? \n게시글의 비밀번호 네 자리를 입력하세요.");

      if(isEmpty(password)) {
        return;
      } else {
        if(isValidPassword(password)) {
          alert("비밀번호는 숫자 네 자리만 입력할 수 있습니다.");
          return;
        }

        checkPassword(password, (data) => {
          if(data.id === Number(id)) {
            switch (whatAct) {
              case "modify":
                router.push(`/post/${data.boardId}/edit/${id}`);
                break;
              case "remove":
                removePost(params.value).then(res => {
                  if(res.data) {
                    router.push(`/post/${data.boardId}`);
                  } else {
                    alert("비밀번호가 일치하지 않습니다.");
                  }
                }).catch(e => {
                  console.log(e.response.data.message);
                })
                break;
            }
          } else {
            alert("비밀번호가 일치하지 않습니다.");
          }
        });
      }
    };

    return {
      isView,
      view,
      comment,
      onHandlePost
    };
  }
}
</script>