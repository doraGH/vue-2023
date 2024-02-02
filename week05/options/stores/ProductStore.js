const { defineStore } = Pinia;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "dorayu";

export default defineStore("ProductStore", {
  state: () => ({
    products: [],
    tempProduct: {},
    cartList: {},
  }),

  actions: {
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

    // 匯出資料給外部使用
    getters: {
      getProductList({ products }) {
        return products;
      },
    },
  },
});
