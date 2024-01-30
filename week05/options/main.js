import productComponent from "./components/productComponent.js";

const { createApp } = Vue;
const { createPinia } = Pinia;

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'dorayu';

const app = createApp({
  data() {
    return {
      products: [],
    }
  },
  components: {
    productComponent,
  },
  methods: {
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products/all`;
      axios.get(url).then((response)=>{
        const { products } = response.data;
        this.products = products;
        console.log(this.products)
      })
      .catch((error) => {
        alert(error.data.message);
      })
    }
  },
  mounted(){
    this.getProducts();
  },
});

const pinia = createPinia();
app.use(pinia);
app.mount("#app");
