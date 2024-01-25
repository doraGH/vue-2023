const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'dorayu',
      products: [],
      tempProduct: {},

    }
  },
  mounted() {
    // 取得cookie token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
    axios.defaults.headers.common['Authorization'] = token;

    this.checkLogin();

  },
  methods: {
    // 確認登入狀態
    checkLogin() {
      axios.post(`${this.apiUrl}/api/user/check`)
        .then(response => {
          // console.log(response.data.success);
          this.getPorducts();
        })
        .catch(error => {
          alert(error.data.message);
          window.location = 'login.html';
        })
    },
    getPorducts() {
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
        .then(response => {
          console.log(response.data.products);
          this.products = response.data.products;
        })
        .catch(error => {
          alert(error.data.message)
        })
    },
  },
});
app.mount("#app");