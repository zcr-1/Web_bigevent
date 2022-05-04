$(function() {
  var form = layui.form
  var layer = layui.layer

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    newpwd:function(value) {
     //获取新密码值
    if (value === $('[name=oldPwd]').val()) {
      return '新旧密码不能相同'
    }
    },
    repwd:function(value) {
      if (value !== $('[name=newPwd]').val()) {
        return '请和新密码保持一致'
      }
    }
  })

  $('.layui-form').on('submit',function(e) {
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'http://www.liulongbin.top:3007/my/updatepwd',
      headers:{
        Authorization:localStorage.getItem('token') || ''
      },
      data:$(this).serialize(),
      success:function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败')
        }
        layui.layer.msg('更新密码成功')

        //重置表单
        $('.layui-form')[0].reset()
      }
    })
  })

  

  

})