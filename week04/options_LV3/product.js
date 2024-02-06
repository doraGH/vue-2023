import { apiUrl, apiPath } from "./config.js";

const { createApp } = Vue;
import pagination from "./components/pagination.js";
import productModal from "./components/product-modal.js";
import delProductModal from "./components/del-product-modal.js";

const app = createApp({
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        data: {},
      },
      isNew: true,
    };
  },
  components: {
    pagination,
    productModal,
    delProductModal,
  },
  mounted() {
    // 取得cookie token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
  methods: {
    // 確認登入狀態
    checkLogin() {
      axios
        .post(`${apiUrl}/api/user/check`)
        .then((response) => {
          this.getProducts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
          window.location = "login.html";
        });
    },
    // 取得產品
    getProducts(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          this.products = products;
          this.pagination = pagination;
          // console.log(this.products);
        })
        .catch((error) => {
          Swal.fire(error.data.message);
          window.location = "login.html";
        });
    },
    // open bs modal 代值判斷傳入是哪一個
    openProductModal(status, item) {
      if (status === "createNew") {
        this.isNew = true;
        this.tempProduct.data = {};
        // bsProductModal.show();
        this.openProductModalShow();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempProduct.data = { ...item };
        // bsProductModal.show();
        this.openProductModalShow();
      } else if (status === "delete") {
        this.tempProduct.data = { ...item };
        this.openDelProductModalShow();
      }
    },

    // 接收tempProduct事件
    handleUpdateTempProduct(updatedData) {
      this.tempProduct = {
        ...this.tempProduct,
        data: { ...this.tempProduct.data, ...updatedData },
      };
    },

    // bsModal show
    openProductModalShow() {
      this.$refs.productModal.openModal();
    },
    openDelProductModalShow() {
      this.$refs.delProductModal.openModal();
    },

    // 登出
    logout() {
      axios
        .post(`${apiUrl}/logout`)
        .then((response) => {
          window.location = "login.html";
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
  },
});

app.mount("#app");
