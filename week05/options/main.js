import productComponent from "./components/productComponent.js";
import modalComponent from "./components/modalComponent.js";
import cartListComponent from "./components/cartListComponent.js";

const { createApp } = Vue;
const { createPinia } = Pinia;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "dorayu";

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      cartList: {},
    };
  },
  components: {
    productComponent,
    modalComponent,
    cartListComponent,
  },
  methods: {
    // 取得所有產品
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products`;
      axios
        .get(url)
        .then((response) => {
          const { products } = response.data;
          this.products = products;
          // console.log(this.products)
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    // 取得單一產品，並且要開起modal
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      axios
        .get(url)
        .then((response) => {
          // console.log(response);
          const { product } = response.data;
          this.tempProduct = product;
          this.$refs.modal.openModal();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    // 加入購物車
    addCart(id, qty = 1) {
      console.log(id, qty);
      const url = `${apiUrl}/api/${apiPath}/cart`;
      const myCart = {
        data: {
          product_id: id,
          qty,
        },
      };
      axios
        .post(url, myCart)
        .then((response) => {
          //console.log(response.data.data)
          this.$refs.modal.hideModal();
          this.getCarts();
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    // 取得購物車
    getCarts() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios
        .get(url)
        .then((response) => {
          const { data } = response.data;
          this.cartList = data;
          console.log(this.cartList.carts);
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    // 刪除單一購物車
    removeCartItem(cartId) {
      //console.log(cartId);
      const url = `${apiUrl}/api/${apiPath}/cart/${cartId}`;
      axios
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          console.log(error.data.message);
        });
    },
    // 刪除全部購物車
    deleteAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios
        .delete(url)
        .then((response) => {
          this.getCarts();
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    // 更新購物車
    updateCart(data) {
      const url = `${apiUrl}/api/${apiPath}/cart/${data.id}`;
      const cart = {
        data: {
          product_id: data.product_id,
          qty: data.qty,
        },
      };
      axios
        .put(url, cart)
        .then((response) => {
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
});

const pinia = createPinia();
app.use(pinia);
app.mount("#app");
