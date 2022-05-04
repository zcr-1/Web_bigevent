$(function() {
  //调用函数
  getUserInfo()
  var layer = layui.layer
  $('#btnLogout').on('click',function() {
    //提示用户是否确认退出
    layer.confirm('确定退出吗？', {icon: 3, title:'提示'}, function(index){
      //do something
      //1.清空本地存储的token
      localStorage.removeItem('token')
      //2.重新跳转到登录页面
      location.href = './login.html'
      //关闭confirm询问框
      layer.close(index);
    });
  })

})

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method:'GET',
    url:'http://www.liulongbin.top:3007/my/userinfo',
    // headers 就是请求头配置对象
    headers:{
      Authorization:localStorage.getItem('token') || ''
    },
    success:function(res) {
      renserAvatar(res.data) 
    }
    //无论成功还是失败，都会调用complete回调函数
    // complete:function(res) {
    //   //在complette回调函数中，可以使用res.response.JASON拿到
    //   //服务器响应回来的数据
    //   // console.log(res)
    //   if(res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
    //     //1.强制清空token
    //     localStorage.removeItem('token')
    //     //2.强制跳转到登录页面
    //     location.href = './login.html'
    //   }
    // }
  })
}

//渲染用户头像
function renserAvatar(user) {
  //1.获取用户名
  // var nickname = user.nickname;
  var name = user.nickname || user.username
  //2.设置欢迎文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  //3.按需渲染用户头像
  if(user.user_pic !== null) {
    //3.1渲染图片头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    //3.2渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}