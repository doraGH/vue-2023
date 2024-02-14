import productStore from "../stores/productStore.js";
import cartStore from "../stores/cartStore.js";
const { mapState, mapActions } = Pinia;

export default {
  template: `
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ productItem.title }}</span>
            </h5>
            <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <img class="img-fluid" :src="productItem.imageUrl" alt="">
              </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill">{{ productItem.category }}</span>
                <p>商品描述：{{ productItem.description }}</p>
                <p>商品內容：{{ productItem.content }}</p>
                <div class="h5">{{ productItem.price }} 元</div>
                <del class="h6">原價 {{ productItem.origin_price }} 元</del>
                <div class="h5">現在只要 {{ productItem.price }} 元</div>
                <div>
                  <div class="input-group">
                    <select class="form-select" aria-label="Default select example" v-model.number="qty">
                      <option v-for="(item,key) in 20" :key="key" :value="item" >{{ item }}</option>
                    </select>

                    <button type="button" class="btn btn-primary" 
                    data-bs-dismiss="modal"
                    @click="fetchAddCart(productItem.id, qty)">加入購物車</button>
                  </div>
                </div>
              </div>
              <!-- col-sm-6 end -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  // props: ["productItem"],
  computed: {
    ...mapState(productStore, ["productItem"]),
  },
  data() {
    return {
      bsModal: null,
      qty: 1,
    };
  },
  mounted() {
    this.bsModal = new bootstrap.Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
  },
  methods: {
    ...mapActions(cartStore, ["addCart"]),

    openModal() {
      //打開modal
      this.qty = 1; // 重新設定 qty 為 1
      this.bsModal.show();
    },
    hideModal() {
      //關掉modal
      this.bsModal.hide();
    },
    // 呼叫外部加入購物車 api
    fetchAddCart(productId, num) {
      this.addCart(productId, num);
    },
  },
  
};
