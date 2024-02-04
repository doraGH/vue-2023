import productComponent from "./components/productComponent.js";
import modalComponent from "./components/modalComponent.js";
import cartListComponent from "./components/cartListComponent.js";

const { createApp } = Vue;
const { createPinia } = Pinia;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "dorayu";

// VeeValidate 全部規則加入(CDN 版本)
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源 - 多國語系
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// 套用語系檔案
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = createApp({
  data() {
    return {
      // products: [],
      // productItem: {},
      // cartList: {},

      isLoading: false,
      // status: {
      //   loadItem: false,
      //   loadCart: false,
      //   isChange: false,
      // },

      form: {
        data: {
          user: {
            name: "",
            email: "",
            tel: "",
            address: "",
          },
          message: "",
        },
      },
    };
  },
  components: {
    productComponent,
    modalComponent,
    cartListComponent,
  },
  methods: {
    // 取得所有產品
    // getProducts() {
    //   const url = `${apiUrl}/api/${apiPath}/products`;
    //   this.isLoading = true;
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       const { products } = response.data;
    //       this.isLoading = false;
    //       this.products = products;
    //     })
    //     .catch((error) => {
    //       Swal.fire(error.data.message);
    //     });
    // },
    // 取得單一產品，並且要開起modal
    // getProductItem(id) {
    //   const url = `${apiUrl}/api/${apiPath}/product/${id}`;
    //   this.status.loadItem = true;
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       const { product } = response.data;
    //       this.status.loadItem = false;
    //       this.productItem = product;
    //       this.$refs.modal.openModal();
    //     })
    //     .catch((error) => {
    //       Swal.fire(error.data.message);
    //     });
    // },
    // 加入購物車
    // addCart(id, qty = 1) {
    //   const url = `${apiUrl}/api/${apiPath}/cart`;
    //   this.status.loadCart = true;
    //   const myCart = {
    //     data: {
    //       product_id: id,
    //       qty,
    //     },
    //   };
    //   axios
    //     .post(url, myCart)
    //     .then((response) => {
    //       this.$refs.modal.hideModal();
    //       this.status.loadCart = false;
    //       this.getCarts();
    //       Swal.fire(response.data.message);
    //     })
    //     .catch((error) => {
    //       Swal.fire(error.data.message);
    //     });
    // },
    // 取得購物車
    // getCarts() {
    //   const url = `${apiUrl}/api/${apiPath}/cart`;
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       const { data } = response.data;
    //       this.cartList = data;
    //     })
    //     .catch((error) => {
    //       Swal.fire(error.data.message);
    //     });
    // },
    // 刪除單一購物車
    // removeCartItem(cartId) {
    //   const url = `${apiUrl}/api/${apiPath}/cart/${cartId}`;
    //   this.status.isChange = true;
    //   axios
    //     .delete(url)
    //     .then((response) => {
    //       alert(response.data.message);
    //       this.status.isChange = false;
    //       this.getCarts();
    //     })
    //     .catch((error) => {
    //       Swal.fire(error.data.message);
    //     });
    // },
    // 刪除全部購物車
    // deleteAllCarts() {
    //   const url = `${apiUrl}/api/${apiPath}/carts`;
    //   axios
    //     .delete(url)
    //     .then((response) => {
    //       this.getCarts();
    //       Swal.fire(response.data.message);
    //     })
    //     .catch((error) => {
    //       Swal.fire(error.data.message);
    //     });
    // },
    // 更新購物車
    // updateCart(data) {
    //   const url = `${apiUrl}/api/${apiPath}/cart/${data.id}`;
    //   const cart = {
    //     data: {
    //       product_id: data.product_id,
    //       qty: data.qty,
    //     },
    //   };
    //   this.status.isChange = true;
    //   axios
    //     .put(url, cart)
    //     .then((response) => {
    //       Swal.fire(response.data.message);
    //       this.status.isChange = false;
    //       this.getCarts();
    //     })
    //     .catch((error) => {
    //       Swal.fire(error.data.message);
    //     });
    // },
    // 驗證手機
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    // 送出訂單
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const form = this.form;
      if (this.cartList.length === 0) {
        return;
      }
      axios
        .post(url, form)
        .then((response) => {
          Swal.fire(response.data.message);
          this.$refs.form.resetForm();
          this.getCarts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
  },
  // mounted() {
  //   this.getProducts();
  //   this.getCarts();
  // },
});

app.component("loading", VueLoading.Component);
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");
