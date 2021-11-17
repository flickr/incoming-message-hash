module.exports = {

  extends: 'flickr',

  env: {
    es6: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 8
  },

  rules: {
    // i don't really mind this one
    'no-use-before-define': 'off'
  }

};
