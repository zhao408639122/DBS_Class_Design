<template>
<div class="am-g myapp-login" >
  <div class="myapp-login-logo-block  tpl-login-max">
    <div class="myapp-login-logo-text">
      <div class="myapp-login-logo-text">
       学生选课管理系统<span> 登录</span> <i class="am-icon-skyatlas"></i>
      </div>
    </div>
    <div class="login-font">
      <i>Log In </i> or <span> Sign Up</span>
    </div>
    <div class="am-u-sm-10 login-am-center">
      <el-form ref="loginformref" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="user_id">
          <el-input v-model="form.user_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button class="am-btn am-btn-default" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        user_id: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 10 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginformref.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post('login/login', this.form)
        console.log(res)
        if (res.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
