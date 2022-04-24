export default {
  props: {
    to: {
      type: String,
      require: true
    }
  },
  render(h) {
    // 判断路由模式  如果是hash路由则带上#
    const mode = this.$router.mode
    let prefix = ''
    if (mode === 'hash') {
      prefix = '#'
    }
    return h('a', {
      attrs: {
        href: prefix + this.to
      }
    }, this.$slots.default)
  }
}