const { createApp } = Vue;
let bsProductModal = null;
let bsDelProductModal = null;

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'dorayu',
      products: [],
      pagination: {},
      tempProduct: {
        data: {}
      },
      isNew: true,     
    }
  },
  mounted() {
    // 取得cookie token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
  },
  methods: {
    // 確認登入狀態
    checkLogin() {
      axios.post(`${this.apiUrl}/api/user/check`)
        .then(response => {
          this.getPorducts();
        })
        .catch(error => {
          Swal.fire(error.data.message);
          window.location = 'login.html';
        })
    },
    // 取得產品
    getPorducts(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios.get(url)
        .then(response => {
          const { products, pagination } = response.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch(error => {
          Swal.fire(error.data.message)
          window.location = 'login.html';
        })
    },
    // open bs modal 代值判斷傳入是哪一個
    openProductModal(status, item) {
      if(status === "createNew") {
        this.isNew = true;
        this.tempProduct.data = {};
        bsProductModal.show();
      } else if(status === "edit") {
        this.isNew = false;
        this.tempProduct.data = {...item};
        bsProductModal.show();
      } else if(status === "delete") {
        this.tempProduct.data = {...item};
        bsDelProductModal.show();
      }      
    },
    
    
    // 登出
    logout() {
      axios.post(`${this.apiUrl}/logout`)
        .then(response => {
          window.location = 'login.html';
        })
        .catch(error => {
          Swal.fire(error.data.message);
        })
    },
  },
});

// 分頁元件
app.component('pagination', {
  template: '#pagination',
  props: ['pages'],
  methods: {
    changePage(num){
      console.log(num);  // 測試點擊是否有作用
      this.$emit('change-page', num);
    }
  }
});

// Modal 新增/編輯元件
app.component('productModal', {
  template: '#productModal',
  props: ['isNew', 'tempProduct'],
  data(){
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'dorayu',
    }
  },
  mounted(){
    // bs modal 實體化   
    // document.getElementById('productModal')
    bsProductModal = new bootstrap.Modal(this.$refs.productModal, {
      backdrop: 'static',
      keyboard: false
    });
  },
  methods: {
    // 多圖區-新增產品
    createImages() {
      this.tempProduct.data.imagesUrl = [];
      this.tempProduct.data.imagesUrl.push('')
    },
    // 更新產品資料
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = "post";

      // 不是isNew則為新增
      if(!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.data.id}`;
        http = "put";
      }

      axios[http](url, this.tempProduct)
        .then(response => {
          Swal.fire(response.data.message);
          bsProductModal.hide();
          //this.getPorducts();
          this.$emit('updateProduct');
        })
        .catch(error => {
          Swal.fire(error.data.message);
        })
    },  
  },
});

// Modal 刪除產品元件
app.component('delProductModal', {
  template: '#delProductModal',
  props: ['tempProduct'],
  data(){
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'dorayu',
    }
  },
  mounted(){
    // bs modal 實體化
    bsDelProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
      backdrop: 'static',
      keyboard: false
    });
  },
  methods:{
    // 刪除單一產品
    deleteProduct(){
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.data.id}`)
        .then(response => {
          Swal.fire(response.data.message);
          bsDelProductModal.hide();
          this.$emit('updateProduct');
        })
        .catch(error => {
          Swal.fire(error.data.message);
        })
    },
  }
});

app.mount("#app");