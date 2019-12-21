<template>
<div>
  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
  style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="课程序号" width="120">
      <template slot-scope="scope">{{ scope.row.cid }}</template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址" show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div class="samerow">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <div style="margin-top: 15px">
      <el-button @click="toggleSelection()">确定</el-button>
      <el-button @click="clearSelection()">取消</el-button>
    </div>
  </div>

</div>
</template>
<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 15
      },
      classlist: {
        cid: '',
        cname: '',
        credit: '',
        dname: '',
        tname: ''
      },
      multipleSelection: []
    }
  },
  methods: {
    clearSelection () {
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async getClassList () {
      const { data: res } = await this.$http.get('class', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.classlist = res.data.classlist
      this.total = res.data.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
    // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getClassList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getClassList()
    },
    toggleSelection () {
      this.$refs.multipleTable.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('class', this.multipleSelection)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
      })
    }
  }
}
</script>
<style scoped>
.samerow {
  display: flex;
  justify-content: space-between;
}
</style>
