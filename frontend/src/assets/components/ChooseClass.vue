<template>
  <div>
    <el-card class="weizhi">
      <span class="center">课表信息</span>
      <el-table :data="courselist2" border stripe>
        <el-table-column label="课程号" prop="cid"></el-table-column>
        <el-table-column label="课程名" prop="cname"></el-table-column>
        <el-table-column label="开设学院" prop="dname"></el-table-column>
        <el-table-column label="开设专业" prop="major"></el-table-column>
        <el-table-column label="学分" prop="credit"></el-table-column>
        <el-table-column label="教师" prop="teacher"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getCourseList">
            <el-button slot="append" icon="el-icon-search" @click="getCourseList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="courselist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="课程号" prop="cid"></el-table-column>
        <el-table-column label="课程名" prop="cname"></el-table-column>
        <el-table-column label="学院" prop="dname"></el-table-column>
        <el-table-column label="专业" prop="major"></el-table-column>
        <el-table-column label="学分" prop="credit"></el-table-column>
        <el-table-column label="教师" prop="teacher"></el-table-column>
      </el-table>
      <div class="samerow">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <div style="margin-top: 15px">
          <el-button @click="toggleSelection()">选课</el-button>
          <el-button @click="clearSelection()">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 15
      },
      courselist: [],
      courselist2: [],
      total: 0,
      multipleSelection: []
    }
  },
  created () {
    this.getCourseList()
    this.getCourseList2()
  },
  methods: {
    clearSelection () {
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async getCourseList2 () {
      let sid = window.sessionStorage.getItem("sid")
      const res = await this.$http.get("course/student/" + sid)
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error("获取用户列表失败！")
      }
      this.courselist2 = res.data
      this.total = res.data.total
    },
    async getCourseList () {
      const res = await this.$http.get("course", {
        params: this.queryInfo
      })
      if (res.status !== 200) {
        return this.$message.error("获取用户列表失败！")
      }
      this.courselist = res.data.courses
      this.total = res.data.total
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
    async toggleSelection () {
      const sid = window.sessionStorage.getItem("id")
      // 可以发起添加用户的网络请求
      const res = await this.$http.post("course/student/" + sid, this.multipleSelection)
      if (res.status !== 201) {
        this.$message.error("选课失败！")
      }
      this.$message.success("选课成功！")
      this.getCourseList2()
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>
<style scoped>
.samerow {
  display: flex;
  justify-content: space-between;
}
.center {
  display: block;
  text-align: center;
}
.weizhi {
  margin-left: 300px;
  width: 500px;
  margin-bottom: 50px;
}
</style>
