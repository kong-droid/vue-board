const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all', // all는 다양한 도메인으로 배포할 수 있게하나, 특정 방법으로 하는 방안은 ['example.com', 'api.test.co.kr'] 과 같은 방법으로 도메인을 지정할 수 있다.
  }
});
