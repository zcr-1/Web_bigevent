$(function() {
  // 点击去注册账号的链接
  $('#link_reg').on('click',function() {
    $('.login_box').hide()
    $('.reg_box').show()
  })

  //点击登录的链接
  $('#link_login').on('click',function() {
    $('.login_box').show()
    $('.reg_box').hide()
  })

  // 从layui钟获取form对象
  var form = layui.form
  var layer = layui.layer
  //通过form.verify()函数自定义校验规则
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    repwd:function(value) {
      //通过形参拿到的是确认密码密码框的内容
      //还需要拿到密码框钟的密码
      //再进行一次等于验证
      //如果验证失败，则return一个消息提示框即可
      var pwd = $('.reg_box [name=password]').val()
      if (pwd !== value) {
        return '两次密码输入不一致！'
      }
    }
   
  })

   //监听注册表单的提交事件
   $('#form_reg').on('click', function(e) {
     //1.阻止默认行为
     e.preventDefault();
     //发起ajax的post请求
     $.post('http://www.liulongbin.top:3007/api/reguser',{
       username:$('#form_reg [name=username]').val(),
       password:$('#form_reg [name=password]').val()
      },
      function(res) {
        if(res.status !==0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        //模拟人的点击行文
        $('#link_login').click()
      })
   })

   //监听登录表单提交事件
   $('#form_login').submit(function(e) {
     //阻止默认行为
     e.preventDefault()
     $.ajax({
       url:"http://www.liulongbin.top:3007/api/login",
       method:'POST',
       data:$(this).serialize(),
       success:function(res) {
         if(res.status !== 0) {
           return layer.msg('登录失败!')
         }
         layer.msg('登录成功!')
         //将登陆成功得到的token字符串,保存到localStorage
         localStorage.setItem('token',res.token)
         //跳转到后台主页
         location.href = './index.html'
       }
     })
   })
})