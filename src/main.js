import { createApp } from 'vue'
import App from './App.vue'

// router
import router from "@/router";

// component
import AlertMessage from "@/components/AlertMessage.vue";
import PageLayout from "@/components/PageLayout.vue";
import SearchKeyword from "@/components/SearchKeyword.vue";
import BackButton from "@/components/BackButton.vue";
import MarkDown from "@/components/MarkDown.vue";
import FileUpload from "@/components/FileUpload.vue";
import PostComment from "@/components/PostComment.vue";
import EmptyData from "@/components/EmptyData.vue";
import RegisterTextField from "@/components/RegisterTextField.vue";

// font-awesome-icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';



library.add(fas);

const app = createApp(App);
app
  .component("AlertMessage", AlertMessage)
  .component("EmptyData", EmptyData)
  .component("PageLayout", PageLayout)
  .component("SearchKeyword", SearchKeyword)
  .component("BackButton", BackButton)
  .component("MarkDown", MarkDown)
  .component("FileUpload", FileUpload)
  .component("PostComment", PostComment)
  .component("RegisterTextField", RegisterTextField)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
