//注意：每次调用的时候会先调用ajaxPrefilter这个函数，在这个函数
//中我们可以拿到配置对象
$.ajaxPrefilter(function(options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
})