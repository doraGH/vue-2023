export default {
  template: `
  <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled': pages.current_page === 1}">
            <a class="page-link" href="#" aria-label="Previous"
              @click.prevent="changePage(pages.current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" :class="{'active': item === pages.current_page}" v-for="(item, index) in pages.total_pages" :key="index">
            <a class="page-link" href="#" @click.prevent="changePage(item)">
              {{ item }}</a>
          </li>
          <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
            <a class="page-link" href="#" aria-label="Next"
              @click.prevent="changePage(pages.current_page + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
  `,
  props: ["pages"],
  methods: {
    changePage(num) {
      // console.log(num);  // 測試點擊是否有作用
      this.$emit("change-page", num);
    },
  },
};
