<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>奖惩列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 表格顶部区域-->
       <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getDepList">
            <el-button slot="append" icon="el-icon-search" @click="getDepList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加信息</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域-->
      <el-table :data="repuList" border stripe>
        <el-table-column label="奖惩序号" prop="rid"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改学生奖惩信息" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.rid)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除学生奖惩信息" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.rid)"></el-button>
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
    <el-dialog title="添加奖惩" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="奖惩序号" prop="rid">
          <el-input v-model="addForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改奖惩" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="奖惩序号">
          <el-input v-model="editForm.rid" disabled></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="email">
          <el-input v-model="editForm.type"></el-input>
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
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 15
      },
      repuList: [],
      total: 0,
      // 控制对话框显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        rid: '',
        type: ''
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
    this.getRepuList()
  },
  methods: {
    async getRepuList () {
      const res = await this.$http.get('repus', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.repuList = res.data.repus
      this.total = res.data.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
    // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getRepuList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getRepuList()
    },
    // 点击按钮，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const res = await this.$http.post('repus', this.addForm)

        if (res.status !== 201) {
          this.$message.error('添加奖惩失败！')
        }
        this.$message.success('添加奖惩成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getRepuList()
      })
    },
    // 监听修改用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    async showEditDialog (id) {
      // console.log(id)
      const res = await this.$http.get('repus/' + id)

      if (res.status !== 200) {
        return this.$message.error('查询奖惩信息失败！')
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
          'repus/' + this.editForm.id,
          {
            type: this.editForm.type
          }
        )
        if (res.status !== 200) {
          return this.$message.error('更新奖惩信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getRepuList()
        // 提示修改成功
        this.$message.success('更新奖惩信息成功！')
      })
    },
    // 根据Id删除对应的用户信息
    async removeUserById (id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该奖惩, 是否继续?',
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

      const res = await this.$http.delete('repus/' + id)

      if (res.status !== 200) {
        return this.$message.error('删除奖惩失败！')
      }
      this.$message.success('删除奖惩成功！')
      this.getRepuList()
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
