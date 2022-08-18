<template>
  <div class="app-container">
    <!--    数据表格-->
    <el-table
      v-loading="listLoading"
      :data="data"
      style="width: 100%"
      element-loading-text="加载数据中"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        prop="id"
        label="序号"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="头像"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.avatar2"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column
        prop="blogtitle"
        label="评论文章"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        width="400"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="评论日期"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteComment(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页组件-->
    <el-pagination
      background
      layout="prev, pager, next,total,->,sizes,jumper"
      :total="count"
      style="margin-top: 30px"
      :page-count="totalPage"
      :current-page.sync="pagerCurrentPage"
      :page-size="eachPage"
      :page-sizes="[5,10,20]"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getComment, delComment } from '@/api/comment'
import { server_URL } from '@/urlConfig.js'
import { formatDate } from '@/utils/tools'

export default {
  data() {
    return {
      listLoading: false,
      currentPage: 1, // 当前页码
      eachPage: 5, // 每页显示条数
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
      data: [], // 数据详情
      pagerCurrentPage: 1 // 分页栏当前页码
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getComment(this.currentPage, this.eachPage).then(res => {
        // console.log(res)
        this.listLoading = false
        this.data = res.data.rows
        for (var item of this.data) {
          item.avatar2 = server_URL + item.avatar
          item.createDate = formatDate(item.createDate)
        }
        this.count = res.data.total
        this.totalPage = Math.ceil(this.count / this.eachPage) // 总页数
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage
          this.fetchData()
        }
      })
    },
    deleteComment(commentInfo) {
      // console.log(scope)
      this.$confirm('是否删除此条评论信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delComment(commentInfo.id).then(() => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    sizeChangeHandle(pagerNum) {
      this.eachPage = pagerNum
      this.currentPage = 1
      this.pagerCurrentPage = 1
      this.fetchData()
    },
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum)
      this.fetchData()
    },
    prevClickHandle() {
      this.currentPage -= 1
    },
    nextClickHandle() {
      this.currentPage += 1
    }
  }
}
</script>

<style lang="less" scoped>
</style>