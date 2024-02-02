export default {
  template: `
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="deleteAllCarts">清空購物車</button>
  </div>
  <div v-if="cartList.carts && cartList.carts.length > 0" class="bg-light my-4 p-4">
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>圖片</th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartList.carts" :key="item.id">
          <td>
            {{item}}
            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
              <!-- <i class="fas fa-spinner fa-pulse"></i> -->
              x
            </button>
          </td>
          <td><img class="img-cart" :src="item.product.imageUrl" alt=""></td>
          <td>
            {{ item.product.title }}
            <div class="text-success">
              已套用優惠券
            </div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input min="1" type="number" class="form-control" v-model.number="item.qty"
                  @blur="updateCart(item)">
                <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{ item.final_total }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end">總計</td>
          <td class="text-end">{{ cartList.total }}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cartList.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div v-else class="bg-light my-4 p-4">購物車沒有任何品項</div>
  `,
  props: ["cartList"],
  methods: {
    deleteAllCarts() {
      this.$emit("deleteAllCarts");
    },
    removeCartItem(cartId) {
      this.$emit("removeCartItem", cartId);
    },
    updateCart(item) {
      this.$emit("updateCart", item);
    },
  },
};
