<template>
  <div class="row" id="message-div" v-if="isSuccess">
    <div class="col-8" role="alert"></div>
    <div class="alert alert-success d-flex align-items-center col-4" role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
      <div>저장에 성공했습니다.</div>
    </div>
  </div>
  <div class="row" id="message-div" v-if="!isSuccess">
    <div class="col-8" role="alert"></div>
    <div class="alert alert-danger d-flex align-items-center col-4" role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <div>저장에 실패했습니다.</div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  props: {
    isSuccess: {
      type: Boolean,
      required: true
    },
    movePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    setTimeout(() => {
      document.getElementById("message-div").style.display = 'none';
      if(props.movePath !== "") {
        if(props.movePath === "/board") {
          location.href = props.movePath;
        } else {
          router.push(props.movePath);
        }
      }
    }, 1000);
  }
}
</script>
