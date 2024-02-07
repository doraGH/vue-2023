const { defineStore } = Pinia;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "dorayu";

export default defineStore("cartStore", {
  state: () => ({
    cartList: {},
    status: {
      loadCart: "",
      isChange: "",
    },
  }),
  actions: {
    // 加入購物車
    addCart(id, qty = 1) {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      this.status.loadCart = id;
      const myCart = {
        data: {
          product_id: id,
          qty,
        },
      };
      axios
        .post(url, myCart)
        .then((response) => {
          // this.$refs.modal.hideModal();
          this.status.loadCart = "";
          this.getCarts();
          Swal.fire(response.data.message);
        })
        .catch((error) => {
          Swal.fire(error.data.message);
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
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 刪除單一購物車
    removeCartItem(cartId) {
      const url = `${apiUrl}/api/${apiPath}/cart/${cartId}`;
      this.status.isChange = cartId;
      axios
        .delete(url)
        .then((response) => {
          Swal.fire(response.data.message);
          this.status.isChange = "";
          this.getCarts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 刪除全部購物車
    deleteAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios
        .delete(url)
        .then((response) => {
          this.getCarts();
          Swal.fire(response.data.message);
        })
        .catch((error) => {
          Swal.fire(error.data.message);
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
      this.status.isChange = data.id;
      axios
        .put(url, cart)
        .then((response) => {
          Swal.fire(response.data.message);
          this.status.isChange = "";
          this.getCarts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
  },

  getters: {},
});
