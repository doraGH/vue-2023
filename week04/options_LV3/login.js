import { apiUrl } from "./config.js";
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${apiUrl}/admin/signin`, this.user)
        .then((response) => {
          // console.log(response.data.message);
          const { expired, token } = response.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          window.location = "product.html";
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
  },
});
app.mount("#app");
