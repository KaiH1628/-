<template>
  <div class="app-container">
    <el-table
      :data="data"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="date"
        label="序号"
        width="60"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        prop="midImg"
        label="中图预览"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg2"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="bigImg"
        label="大图预览"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.bigImg2"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleClick(scope)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <UpLoad v-model="form.midImg"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <UpLoad v-model="form.bigImg"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from '@/api/banner'
import { server_URL } from '@/urlConfig.js'
import UpLoad from '@/components/UpLoad'

export default {
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        description: '',
        midImg: '',
        bigImg: ''
      }
    }
  },
  components: {
    UpLoad
  },
  created() {
    this.fetchData()
    // window.form = this.form
  },
  methods: {
    fetchData() {
      getBanner().then(res => {
        // console.log(res)
        this.data = res.data
        for (var item of this.data) {
          item.midImg2 = server_URL + item.midImg
          item.bigImg2 = server_URL + item.bigImg
        }
      })
    },
    handleClick(scope) {
      // console.log(scope)
      this.form = { ...scope.row }
      this.dialogFormVisible = true
    },
    editBannerConfirm() {
      // 从表单里面拿到用户修改的数据，发送给服务器
      // 因为 api 文档要求三个首页标语都要发送过去，哪怕只改了其中一个
      let arr = []
      arr = [...this.data]
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form
        }
      }
      setBanner(arr).then(res => {
        this.dialogFormVisible = false // 关闭掉对话框
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>