module.exports = {
  overrides: [
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  }
}

