<template>
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
    <input type="password" class="form-control" v-model="passwordConfirm"  />
  </td>
</template>

<script>
/*
  이벤트 리스너가 지속적으로 읽혀와 원인을 알 수 없어서 우선 사용하지 않음
  코드 정리 시 사용 예정
*/
import { ref, watch } from "vue";
export default {
  name: "RegisterTextField",
  props: {
    name: {
      type: String,
      required: true,
      default: ""
    },
    pwd: {
      type: String,
      required: true,
      default: ""
    },
    pwdCheck: {
      type: String,
      required: true,
      default: ""
    }
  },
  setup(props) {
    let nickName = ref(props.name);
    let password = ref(props.pwd);
    let passwordConfirm = ref(props.pwdCheck);

    watch(() => props.name, (value) => nickName.value = value);
    watch(() => props.pwd, (value) => password.value = value);
    watch(() => props.pwdCheck, (value) => passwordConfirm.value = value);

    return {
      nickName,
      password,
      passwordConfirm,
    };
  }
}
</script>