export default {
  template: `
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入圖片網址</label>
                      <input type="file" class="form-control" placeholder="請輸入圖片連結"
                      ref="fileInput"
                      @change="uploadImage">
                    </div>
                    <img class="img-fluid" :src="tempProduct.data.imageUrl" alt="">
                  </div>

                  <h3 class="mb-3">多圖新增</h3>
                  <div v-if="Array.isArray(tempProduct.data.imagesUrl)">
                    <div class="mb-2" v-for="(image, key) in tempProduct.data.imagesUrl" :key="key">
                      <div class="mb-3">
                        <label for="imageUrl" class="form-label">輸入圖片網址</label>
                        <input type="text" class="form-control" placeholder="請輸入圖片連結"
                        v-model="tempProduct.data.imagesUrl[key]">
                      </div>
                      <img class="img-fluid" :src="image">
                    </div>

                    <div v-if="!tempProduct.data.imagesUrl.length || tempProduct.data.imagesUrl[tempProduct.data.imagesUrl.length -1]">
                      <button class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="tempProduct.data.imagesUrl.push('')">
                        新增圖片
                      </button>
                    </div>
                    <div v-else>
                      <button class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="tempProduct.data.imagesUrl.pop()">
                        刪除圖片
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="createImages">
                      新增圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" 
                    v-model="tempProduct.data.title">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input id="category" type="text" class="form-control" 
                      v-model="tempProduct.data.category" placeholder="請輸入分類">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                      v-model="tempProduct.data.unit">
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                      v-model.number="tempProduct.data.origin_price">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input id="price" type="number" min="0" class="form-control"
                      v-model.number="tempProduct.data.price" placeholder="請輸入售價">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                    v-model="tempProduct.data.description" placeholder="請輸入產品描述">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                    v-model="tempProduct.data.content" placeholder="請輸入說明內容">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                      v-model="tempProduct.data.is_enabled" :true-value="1" :false-value="0">
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
  `,
  props: ["isNew", "tempProduct"],
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "dorayu",
    };
  },
  mounted() {
    // 向外訪問實體
    this.$emit("product-modal", this.$refs.productModal);

    // bs modal 實體化
    // document.getElementById('productModal')

    // bsProductModal = new bootstrap.Modal(this.$refs.productModal, {
    //   backdrop: "static",
    //   keyboard: false,
    // });
  },
  methods: {
    // 多圖區-新增產品
    createImages() {
      this.tempProduct.data.imagesUrl = [];
      this.tempProduct.data.imagesUrl.push("");
    },
    // 更新產品資料
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = "post";

      // 不是isNew則為新增
      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.data.id}`;
        http = "put";
      }

      axios[http](url, this.tempProduct)
        .then((response) => {
          Swal.fire(response.data.message);
          // bsProductModal.hide();
          //this.getPorducts();
          this.$emit("hide-product-modal");
          this.$emit("updateProduct");
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 上傳圖片
    uploadImage() {
      // console.dir(this.$refs.fileInput);
      const file = this.$refs.fileInput.files[0];
      // console.log(file);
      const formData = new FormData(); // 產生一個form表單
      formData.append("file-to-upload", file); // 對應api 文件裡面表單的name, 並將檔案夾帶上去

      axios
        .post(`${this.apiUrl}/api/${this.apiPath}/admin/upload`, formData)
        .then((response) => {
          // console.log(response.data.imageUrl);

          // 使用 $emit 發送修改後的值到外部
          this.$emit("update-temp-product", {
            imageUrl: response.data.imageUrl,
          });
        })
        .catch((error) => {
          Swal.fire(error.data.message.message);
        });
    },
  },
};
