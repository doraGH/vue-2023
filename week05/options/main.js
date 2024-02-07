import cartStore from "./stores/cartStore.js";
import productComponent from "./components/productComponent.js";
import modalComponent from "./components/modalComponent.js";
import cartListComponent from "./components/cartListComponent.js";

const { createApp } = Vue;
const { createPinia, mapState, mapActions } = Pinia;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "dorayu";

// VeeValidate 全部規則加入(CDN 版本)
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源 - 多國語系
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// 套用語系檔案
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = createApp({
  data() {
    return {
      isLoading: false,

      form: {
        data: {
          user: {
            name: "",
            email: "",
            tel: "",
            address: "",
          },
          message: "",
        },
      },
    };
  },
  components: {
    productComponent,
    modalComponent,
    cartListComponent,
  },
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCarts"]),

    // 驗證手機
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    // 送出訂單
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const form = this.form;
      if (this.cartList.length === 0) {
        return;
      }
      axios
        .post(url, form)
        .then((response) => {
          Swal.fire(response.data.message);
          this.$refs.form.resetForm();
          this.getCarts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
  },
  // mounted() {
  //   this.getProducts();
  //   this.getCarts();
  // },
});

app.component("loading", VueLoading.Component);
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");
