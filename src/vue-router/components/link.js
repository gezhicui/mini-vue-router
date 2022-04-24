export default {
  props: {
    to: {
      type: String,
      require: true
    }
  },
  methods: {
    clickHandler(e) {
      if (this.$router.mode === 'hash') {
        window.location.hash = this.to
      } else {
        // 改变浏览器地址栏地址
        window.history.pushState({}, '', this.to)
      }
      e.preventDefault();
    }
  },
  render(h) {
    return h('a', {
      attrs: {
        href: this.to
      },
      on: {
        click: this.clickHandler
      }
    }, this.$slots.default)
  }
}