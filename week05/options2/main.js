const { createApp } = Vue;

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'dorayu';

const app = createApp({  
  data() {
    return {
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    // 取得所有產品
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products/all`;
      axios.get(url).then((response)=>{
        const { products } = response.data;
        this.products = products;
        // console.log(this.products)
      })
      .catch((error) => {
        alert(error.data.message);
      })
    },

    // 取得單一產品
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      axios.get(url).then((response) => {
        // console.log(response);
        const { product } = response.data;
        this.tempProduct = product;
        this.$refs.modal.openModal();        
      })
      .catch((error) => {
        alert(error.data.message);
      })
    },
  },
  mounted(){
    this.getProducts();
  },
});

app.component('userProductModal', {
  template: '#userProductModal',
  props: ['tempProduct'],
  data(){
    return {
      bsModal: null,
    }
  },
  mounted() {
    this.bsModal = new bootstrap.Modal(this.$refs.modal, {
      backdrop: 'static',
      keyboard: false
    });
  },
  methods: {
    openModal(){//打開modal
      this.bsModal.show();
    },
    hideModal(){//關掉modal
      this.bsModal.hide();
    }
  },
  
});
app.mount("#app");