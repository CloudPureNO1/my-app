<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avator-box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user2"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-lock4  "
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 登陆表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登陆表单验证贵族
      loginFormRules: {
        // 用户名验证规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 6,
            max: 8,
            message: '用户名必须在6到8位之间',
            trigger: ['blur', 'change']
          }
        ],
        // 密码验证贵族
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 8,
            message: '密码必须在6到8位之间',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    // 点击,重置登陆表单
    resetLoginFrom () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // let rs=this.$http.post('login',this.loginForm);// 此处返回的是一个Promuse
        // 如果某个方法的返回值是Promise ,则可以通过 await 和async 简化这次操作
        // awiat 只能用在被async修饰的方法中，在最近的一个方法中添加sync
        // let rs=await this.$http.post('login',this.loginForm);  //此处返回的是一个对象，共6个对象，其中data 之外的都是自动生成的，我们志趣data
        // 利用结构获取需要的数据,并重命名为res
        /* const { data: res } = await this.$http.post('login', this.loginForm)
        this.$message({
          type: '1234',
          message: res.message
        }) */
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
        sessionStorage.setItem('access_token', 'wwww-wanggsd-sadfasd-wae ')
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avator-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
    .login-form {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
