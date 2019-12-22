<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">学生</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card  style="float:left">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
         <el-row>
           <el-col :span="12">
            <el-form-item label="姓名" >
              <el-input v-model="editForm.sname" disabled></el-input>
            </el-form-item>
           </el-col>
           <el-col :span="12">
            <el-form-item label="学号">
              <el-input v-model="editForm.sid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄">
                <el-input v-model="editForm.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-input v-model="editForm.sex"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学院">
                <el-input v-model="editForm.dname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业">
                <el-input v-model="editForm.major"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="12">
          <el-form-item label="班级">
            <el-input v-model="editForm.class"></el-input>
          </el-form-item>
          </el-col>
      </el-form>
      <span class="place">
        <el-button>保 存</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-card>
    <el-card style="margin-left:570px">
      <el-table :data="courselist" border stripe>
        <el-table-column label="课程号" prop="cid"></el-table-column>
        <el-table-column label="课程名" prop="cname"></el-table-column>
        <el-table-column label="开设学院" prop="dname"></el-table-column>
        <el-table-column label="开设专业" prop="major"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
      layout="total, prev, pager, next" :total="total">
      </el-pagination>
      <span class="place">
        <el-button type="primary" @click="chooseClassById">修改</el-button>
      </span>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 获取课程列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 15
      },
      classlist: [],
      total: 0,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.showStudentMessage()
  },
  methods: {
    async showStudentMessage () {
      // console.log(id)
      let sid = window.sessionStorage.getItem('sid')
      const res = await this.$http.get('users/' + sid)
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.data
    },
    // 修改用户信息并提交
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.sid,
          {
            sname: this.editForm.sname,
            age: this.editForm.age,
            sex: this.editForm.sex,
            dname: this.editForm.dname,
            major: this.editForm.major,
            class: this.editForm.class
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    async getCourseList () {
      var sid = window.sessionStorage.getItem('id')
      const res = await this.$http.get('/course' + sid, {
        params: this.queryInfo
      })
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.courselist = res.data.class
      this.total = res.data.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
    // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getCourseList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getCourseList()
    },
    async chooseClassById () {
      this.$router.push('chooseclass')
    }
  }
}
</script>
<style scoped>
.text {
    font-size: 14px;
  }
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 480px;
}
.place {
  float: right;
  margin-bottom: 15px;
}
.el-card{
  width: 500px;
}
</style>
