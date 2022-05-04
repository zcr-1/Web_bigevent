$(function() {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname:function(value) {
      if (value.length > 6) {
        return '昵称长度必须在1-6个字符之间'
      }
    }
  })

  initUserInfo()
  //初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method :'GET',
      url:'http://www.liulongbin.top:3007/my/userinfo',
      headers:{
        Authorization:localStorage.getItem('token') || ''
      },
      success:function(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        console.log(res)
        //调用form.val()快速为表单赋值
        form.val('formUserInfo',res.data)

      }
    })
  }

  //重置按钮
  $('#btnReset').on('click',function(e) {
    e.preventDefault();
    initUserInfo()
  })

  //监听表单提交事件
  $('.layui-form').on('submit',function(e) {
    //阻止表单的默认行为
    e.preventDefault()
    //发起ajax数据请求
    $.ajax({
      method:'POST',
      url:'http://www.liulongbin.top:3007/my/userinfo',
      data:$(this).serialize(),
      headers:{
        Authorization:localStorage.getItem('token') || ''
      },
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        layer.msg('更新用户信息成功')
        //调用父页面中的方法,重新渲染用户头像
        window.parent.getUserInfo()
      }
    })
  })
})