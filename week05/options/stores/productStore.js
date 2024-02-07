const { defineStore } = Pinia;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "dorayu";

export default defineStore("productStore", {
  state: () => ({
    products: [],
    productItem: {},
    isLoading: false,
    status: {
      loadItem: "",
    },
  }),

  actions: {
    // 取得所有產品
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products`;
      this.isLoading = true;
      axios
        .get(url)
        .then((response) => {
          const { products } = response.data;
          this.isLoading = false;
          this.products = products;
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 取得單一產品，並且要開起modal
    getProductItem(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      this.status.loadItem = id;
      axios
        .get(url)
        .then((response) => {
          const { product } = response.data;
          this.status.loadItem = "";
          this.productItem = product;
          // this.$refs.modal.openModal();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
          // console.log(error);
        });
    },
  },
});
