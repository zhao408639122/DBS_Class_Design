<template>
  <el-container class='home-container'>
    <!-- 头部区域-->
    <el-header>
      <div>
        <img src="../img/school.png" alt="">
        <span> 学生选课管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域 -->
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#fff" router>
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>学生</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/student">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学生列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/studentmessage">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学生课表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/jiangcheng">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>奖惩情况</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/class">
            <i class="el-icon-menu"></i>
            <span slot="title">课程</span>
          </el-menu-item>
          <el-menu-item index="/department">
            <i class="el-icon-menu"></i>
            <span slot="title">学院</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <!--右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.home-container{
  height: 100%
}
.el-main{
  background: #fff;
}
.el-header{
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside{
  background: #fff;
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
