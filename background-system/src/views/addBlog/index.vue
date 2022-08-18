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
    <el-select v-model="form.select" placeholder="请选择文章分类">
      <el-option v-for="item in blogType" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>

    <!--    发布按钮-->
    <div>
      <el-button type="primary" style="margin-top: 15px" @click="addArticleHandle">发布文章</el-button>
    </div>

  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import UpLoad from '@/components/UpLoad'
import { getBlogType } from '@/api/blogType'
import { addBlog } from '@/api/blog'
import '@toast-ui/editor/dist/i18n/zh-cn'

export default {
  data() {
    return {
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
  },
  components: {
    Editor,
    UpLoad
  },
  methods: {
    addArticleHandle() {
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
        addBlog(obj).then(res => {
          // console.log(res)
          this.$router.push('/blog/blogList')
        })
      } else {
        this.$message.error('请填写所有内容')
      }
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