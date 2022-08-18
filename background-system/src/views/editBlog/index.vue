<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <Editor
      ref="toastUiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    />

    <!--    文章描述-->
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>

    <!--    文章头图-->
    <div class="block">文章头图</div>
    <UpLoad v-model="form.thumb"/>

    <!--    选择分类-->
    <div class="block">选择分类</div>
    <el-select v-model="form.select" placeholder="请选择文章分类" @change="handleClick">
      <el-option v-for="item in blogType" :key="item.id" :label="item.name" :value="item.id"
      ></el-option>
    </el-select>

    <!--    发布按钮-->
    <div>
      <el-button type="primary" style="margin-top: 15px" @click="editArticleHandle">确认修改</el-button>
    </div>

  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import UpLoad from '@/components/UpLoad'
import { getBlogType } from '@/api/blogType'
import { findOneBlog, editBlog } from '@/api/blog'
import '@toast-ui/editor/dist/i18n/zh-cn'

export default {
  data() {
    return {
      id: null,
      form: {
        title: '', //  文章标题
        editorText: '', //  用户编辑的内容
        description: '', //  文章描述
        thumb: '', //  文章头图
        select: '' //  选择分类
      },
      blogType: [],
      editorOptions: {
        language: 'zh-CN'
      }
    }
  },
  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data
    })

    this.id = this.$route.params.id
    findOneBlog(this.id).then(({ data }) => {
      this.form = data
      this.form.select = data.category === null ? '' : data.category.id
      this.$refs.toastUiEditor.invoke('setHTML', data.htmlContent)
    })
  },
  components: {
    Editor,
    UpLoad
  },
  methods: {
    editArticleHandle() {
      let html = this.$refs.toastUiEditor.invoke('getHTML')
      let markdown = this.$refs.toastUiEditor.invoke(('getMarkdown'))
      let obj = {
        'title': this.form.title,
        'description': this.form.description,
        'createDate': new Date().getTime(),
        'categoryId': this.form.select,
        'toc': [],
        'htmlContent': html,
        'thumb': this.form.thumb,
        'markdownContent': markdown
      }

      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        editBlog({ id: this.id, data: obj }).then(res => {
          // console.log(res)
          this.$router.push('/blog/blogList')
          this.$message.success('文章修改成功')
        })
      } else {
        this.$message.error('请填写所有内容')
      }
    },
    handleClick() {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>