const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'dorayu',
      products: [],
      tempProduct: {
        data: {
          "title": "[賣]動物園造型衣服3",
          "category": "衣服2",
          "origin_price": 100,
          "price": 300,
          "unit": "個",
          "description": "Sit down please 名設計師設計",
          "content": "這是內容",
          "is_enabled": 1,
          "imageUrl": "主圖網址",
          "imagesUrl": [
            "圖片網址一",
            "圖片網址二",
            "圖片網址三",
            "圖片網址四",
            "圖片網址五"
          ]
        }
      },
      isNew: true,
      bsProductModal: null,
      bsDelProductModal: null,
    }
  },
  mounted() {
    // 取得cookie token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
    axios.defaults.headers.common['Authorization'] = token;

    this.checkLogin();

    // bs modal 實體化
    this.bsProductModal = new bootstrap.Modal(this.$refs.productModal, {
      backdrop: 'static',
      keyboard: false
    });
    this.bsDelProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
      backdrop: 'static',
      keyboard: false
    });

  },
  methods: {
    // 確認登入狀態
    checkLogin() {
      axios.post(`${this.apiUrl}/api/user/check`)
        .then(response => {
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
    // open bs modal 代值判斷傳入是哪一個
    openProductModal(status, item) {
      if(status === "createNew") {
        this.isNew = true;
        this.tempProduct.data = {};
        this.bsProductModal.show();
      } else if(status === "edit") {
        this.isNew = false;
        this.tempProduct.data = {...item};
        this.bsProductModal.show();
      } else if(status === "delete") {
        this.tempProduct.data = {...item};
        this.bsDelProductModal.show();
      }
      
    }
  },
});
app.mount("#app");