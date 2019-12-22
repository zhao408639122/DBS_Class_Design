<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">学生</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editForm.sid"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="editForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="editForm.dname"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="editForm.major"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="editForm.class"></el-input>
        </el-form-item>
      </el-form>
      <span class="place">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-card>
    <el-card>
      <el-table :data="courselist" border stripe>
        <el-table-column label="课程号" prop="cid"></el-table-column>
        <el-table-column label="课程名" prop="cname"></el-table-column>
        <el-table-column label="开设学院" prop="dname"></el-table-column>
        <el-table-column label="开设专业" prop="major"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改课程信息" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除课程" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
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
      var sid = window.sessionStorage.getItem('id')
      const { data: res } = await this.$http.get('users/' + sid)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 修改用户信息并提交
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            name: this.editForm.sid,
            age: this.editForm.age,
            sex: this.editForm.age,
            dname: this.editForm.dname,
            major: this.editForm.major,
            class: this.editForm.class
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
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
