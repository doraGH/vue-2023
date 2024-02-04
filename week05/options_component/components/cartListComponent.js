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
            <button type="button" class="btn btn-outline-danger btn-sm" 
            :disabled="item.id === status.loadQty"
            @click="removeCartItem(item.id)">
              <i class="fas fa-spinner fa-pulse" v-if="item.id === status.loadQty"></i>
              x
            </button>
          </td>
          <td><img class="img-cart" :src="item.product.imageUrl" alt=""></td>
          <td>
            {{ item.product.title }}
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <button type="button" class="btn btn-outline-primary btn-sm" 
                  :disabled="item.qty === 1"
                  v-if="item.qty > 1"
                  @click="item.qty--;updateCart(item, item.qty)">
                  -
                </button>

                <button type="button" class="btn btn-outline-danger btn-sm" 
                  v-else
                  @click="removeCartItem(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </button>

                <input min="1" type="number" class="form-control" v-model.number="item.qty"
                  :disabled="item.id === status.loadQty" readonly>

                <!-- 原本input寫法 <input min="1" type="number" class="form-control" v-model.number="item.qty"
                  @blur="updateCart(item)">
                <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span> -->

                <button type="button" class="btn btn-outline-primary btn-sm" 
                :disabled="item.qty === 20"
                @click="item.qty++;updateCart(item, item.qty)">
                  +
                </button>

              </div>
            </div>
          </td>
          <td class="text-end">
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
  props: [
    "cartList",
    "status",
    "deleteAllCarts",
    "removeCartItem",
    "updateCart",
  ],
  // emits: ["deleteAllCarts", "removeCartItem", "updateCart"],
  // methods: {
  //   deleteAllCarts() {
  //     this.$emit("deleteAllCarts");
  //   },
  //   removeCartItem(cartId) {
  //     this.$emit("removeCartItem", cartId);
  //   },
  //   updateCart(item) {
  //     this.$emit("updateCart", item);
  //   },
  // },
};
