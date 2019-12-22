<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">课程</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 表格顶部区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getCourseList">
            <el-button slot="append" icon="el-icon-search" @click="getCourseList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加课程</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域-->
      <el-table :data="courselist" border stripe>
        <el-table-column label="课程名" prop="cname"></el-table-column>
        <el-table-column label="课程号" prop="cid"></el-table-column>
        <el-table-column label="学院" prop="dname"></el-table-column>
        <el-table-column label="专业" prop="major"></el-table-column>
        <el-table-column label="学分" prop="credit"></el-table-column>
        <el-table-column label="教师" prop="teacher"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改课程信息" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.cid)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除课程" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.cid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加课程" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="课程名">
          <el-input v-model="addForm.cname"></el-input>
        </el-form-item>
        <el-form-item label="课程号">
          <el-input v-model="addForm.cid"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="addForm.dname"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="addForm.major"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="addForm.credit"></el-input>
        </el-form-item>
        <el-form-item label="教师">
          <el-input v-model="addForm.teacher"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="课程号">
          <el-input v-model="editForm.cid" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input v-model="editForm.cname"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="editForm.dname"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="editForm.major"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="editForm.credit"></el-input>
        </el-form-item>
        <el-form-item label="教师">
          <el-input v-model="editForm.teacher"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    // 验证邮箱的规则
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 15
      },
      courselist: [],
      total: 0,
      // 控制对话框显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        cid: '',
        cname: '',
        dname: '',
        major: '',
        credit: '',
        teacher: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
      }
    }
  },
  created () {
    this.getCourseList()
  },
  methods: {
    async getCourseList () {
      const res = await this.$http.get('course', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.courselist = res.data.courses
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
    // 点击按钮，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const res = await this.$http.post('course', this.addForm)
        console.log(res)
        if (res.status !== 201) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getCourseList()
      })
    },
    // 监听修改用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    async showEditDialog (cid) {
      // console.log(id)
      const res = await this.$http.get('course/' + cid)

      if (res.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }

      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const res = await this.$http.put(
          'course/' + this.editForm.cid,
          {
            cname: this.editForm.cname,
            dname: this.editForm.dname,
            major: this.editForm.major,
            credit: this.editForm.credit,
            teacher: this.editForm.teacher
          }
        )
        if (res.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getCourseList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据Id删除对应的用户信息
    async removeUserById (cid) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await this.$http.delete('course/' + cid)
      if (res.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
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
</style>
