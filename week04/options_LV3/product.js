const { createApp } = Vue;
import pagination from "./components/pagination.js";
import productModal from "./components/product-modal.js";
import delProductModal from "./components/del-product-modal.js";
let bsProductModal = null;
let bsDelProductModal = null;

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "dorayu",
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
        .post(`${this.apiUrl}/api/user/check`)
        .then((response) => {
          this.getPorducts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
          window.location = "login.html";
        });
    },
    // 取得產品
    getPorducts(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          this.products = products;
          this.pagination = pagination;
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
        bsProductModal.show();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempProduct.data = { ...item };
        bsProductModal.show();
      } else if (status === "delete") {
        this.tempProduct.data = { ...item };
        bsDelProductModal.show();
      }
    },

    // 接收tempProduct事件
    handleUpdateTempProduct(updatedData) {
      this.tempProduct = {
        ...this.tempProduct,
        data: { ...this.tempProduct.data, ...updatedData },
      };
    },

    // 接收productModal事件
    handleProductModal(modalInstance) {
      // 建立bs實體化
      bsProductModal = new bootstrap.Modal(modalInstance, {
        keyboard: false,
        backdrop: "static",
      });
    },
    // 隱藏product modal
    hideProductModal() {
      bsProductModal.hide();
    },

    // 接收deleteModal事件
    handleDeleteModal(modalInstance) {
      // 建立bs實體化
      bsDelProductModal = new bootstrap.Modal(modalInstance, {
        keyboard: false,
        backdrop: "static",
      });
    },
    // 隱藏del modal
    hideDeleteModal() {
      bsDelProductModal.hide();
    },

    // 登出
    logout() {
      axios
        .post(`${this.apiUrl}/logout`)
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
