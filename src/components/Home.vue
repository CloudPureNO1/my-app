<template>
  <el-container class="home-container">
    <!--  头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header
    >
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 左侧菜单区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div v-show="!isCollapse" @click="toggleCollapse" class="toggle-button">
          <i class="iconfont icon-shouqi"></i>
        </div>
        <div v-show="isCollapse" @click="toggleCollapse" class="toggle-button">
          <i class="iconfont icon-zhankai"></i>
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          @select="handleSelect"
          :default-active="this.$route.path"
        >
          <!--一级菜单-->
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
            <!--  一级菜单模板区 -->
            <template slot="title">
              <!-- 菜单图标 -->
              <i :class="item.icon"></i>
              <!-- 菜单文本 -->
              <span>{{ item.title }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.path"
            >
              <!--  二级菜单模板区 -->
              <template slot="title">
                <!-- 菜单图标 -->
                <i :class="subItem.icon"></i>
                <!-- 菜单文本 -->
                <span>{{ subItem.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 菜单是否收起
      isCollapse: false,
      // 左侧菜单数据
      menuList: []
    }
  },
  mounted () {
    this.menuList = this.getMenuList()
  },
  methods: {
    handleSelect (index, indexPath) {
      console.log(index, indexPath)
      // this.$router.push(index);
      this.handleUrl(index)
    },
    handleUrl (url) {
      // window.location.href=url;
      const rm = this.$router.resolve(url)
      const matched = rm.resolved.matched // 如果在路由中有配置，那么这个数组大于0，否则为0
      if (matched.length > 0) {
        this.$router.push(url)
      } else {
        window.open(url, '_blank')
      }
    },
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 获取菜单数据
    /* async getMenuList(){
        let {data:rs}=await this.$http.post('getMenu');
    } */
    getMenuList () {
      const data = [
        {
          id: '1001',
          title: '系统管理',
          url: '',
          icon: 'iconfont icon-user',
          children: [
            {
              id: '100101',
              title: '用户管理',
              path: '/users',
              icon: 'el-icon-s-data'
            },
            {
              id: '100102',
              title: '角色管理',
              path: 'https://www.baidu.com',
              icon: 'el-icon-s-custom'
            },
            {
              id: '100103',
              title: '授权管理',
              path: 'www.baidu.com',
              icon: 'el-icon-s-data'
            }
          ]
        },
        {
          id: '1002',
          title: '配送管理',
          path: '',
          icon: 'iconfont icon-cangku',
          children: [
            {
              id: '100201',
              title: '配送管理',
              path: 'http://www.baidu.com',
              icon: 'el-icon-menu'
            }
          ]
        },
        {
          id: '1003',
          title: '外部连接',
          path: '',
          icon: 'iconfont icon-sound-filling-fill',
          children: [
            {
              id: '100301',
              title: '发布消息',
              path: 'http://www.baidu.com',
              icon: 'el-icon-thumb'
            }
          ]
        }
      ]
      return data
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; //两边对齐
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center; //纵向剧中
    > span {
      padding-left: 15px;
    }
    > img {
      width: 50px;
      height: 50px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
