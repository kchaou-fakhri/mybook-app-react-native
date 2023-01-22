module.exports = {
    project: {
        ios: {},
        android: {}
    },
    assets: ['./assets/fonts'],
    presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};