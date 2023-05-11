<template>
  <div class="container">
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
            <input type="text" class="form-control" v-model="nickName" />
          </td>
          <th class="col-2">비밀번호</th>
          <td class="col-2">
            <input type="password" class="form-control" v-model="password" />
          </td>
          <th class="col-2">비밀번호 확인</th>
          <td class="col-2">
            <input type="password" class="form-control" v-model="passwordConfirm" />
          </td>
        </tr>
        <tr class="row">
          <th class="col-2">게시판명</th>
          <td class="col-10">
            <input type="text" class="form-control" v-model="boardTitle" @keyup.enter="onSubmit" />
          </td>
        </tr>

      </tbody>
    </table>
    <AlertMessage v-if="isActive" :isSuccess="isSuccess" :movePath="movePath" />
  </div>
</template>

<script>
import AlertMessage from "@/components/AlertMessage.vue";
import BackButton from "@/components/BackButton.vue";

import { ref } from "vue";
import { useRoute } from "vue-router";

import { getBoardView, addBoard, setBoard } from "@/assets/api/board";
import { isEmpty, isValidPassword } from "@/utils/validation";

export default {
  name: "BoardEdit",
  components : { BackButton, AlertMessage },
  setup() {
    const isActive = ref(false);
    const isSuccess = ref(false);
    const movePath = ref("");

    const route = useRoute();
    const id = route.params.id;

    const boardTitle = ref("");
    const nickName = ref("");
    const password = ref("");
    const passwordConfirm = ref("");

    const act = ref("");
    if(id !== undefined) {
      act.value = "게시판 정보 수정";
      getBoardView(id).then(res => {
        boardTitle.value = res.data.title;
      });
    } else {
      act.value = "게시판 정보 등록";
    }

    const onSubmit = () => {

      if(isEmpty(boardTitle.value)) {
        alert("게시판 명을 입력하세요.");
        return;
      }

      let params = {};

      if(id !== undefined) {

        params = {
          id : id,
          title: boardTitle.value
        };

        setBoard(params).then(res => {
          isActive.value = true;
          movePath.value = "";
          isSuccess.value = res.data.id !== undefined;
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
          id : id,
          title: boardTitle.value,
          nickName: nickName.value,
          password: password.value,
        };

        addBoard(params).then(res => {
          isActive.value = true;
          isSuccess.value = res.data.id !== undefined;
          movePath.value = res.data.id !== undefined ? "/board" : "";
        }).catch(e => {
          console.log(e.response.data.message);
        });

      }
    };

    return {
      isActive,
      isSuccess,
      movePath,
      id,
      act,
      boardTitle,
      nickName,
      password,
      passwordConfirm,
      onSubmit,
    };
  }
}
</script>