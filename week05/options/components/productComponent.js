// import ProductStore from "../stores/ProductStore.js";
// const { mapState } = Pinia;

export default {
  template: `
  <div class="row row-cols-6 my-4 g-4">
    <div class="col" v-for="item in products" :key="item.id">
      <div class="card">
        <img :src="item.imageUrl" class="card-img-top" alt="圖片">
        <div class="card-body">
          <h6 class="card-title">{{ item.title }}</h6>
          <p class="card-text">
            <del>原價 {{ item.origin_price }} 元</del> /
            <span>特價 {{ item.price }} 元</span>
          </p>
          <div class="btn-group btn-group-sm d-flex">
            <button type="button" class="btn btn-outline-secondary" @click.prevent="getProduct(item.id)">
              <!-- <i class="fas fa-spinner fa-pulse"></i> -->
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger" @click.prevent="addCart(item.id)">
              <!-- <i class="fas fa-spinner fa-pulse"></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ["products"],
  methods: {
    // 點擊呼叫單一產品 api
    getProduct(productId) {
      this.$emit("getProduct", productId);
    },
    // 呼叫外部加入購物車 api
    addCart(productId) {
      this.$emit("addCart", productId);
    },
  },
  // computed: {
  //   ...mapState(ProductStore, ["getProductList"]),
  // },
};
