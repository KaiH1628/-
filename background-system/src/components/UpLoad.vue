<template>
  <div>
    <div class="block">{{ upLoadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from '@/urlConfig.js'

export default {
  props: ['upLoadTitle', 'value'],
  computed: {
    imageUrl() {
      if (this.value) {
        return server_URL + this.value
      }
    },
    headers() {
      return {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      // console.log(res)
      if (!res.code && res.data) {
        this.$emit('input', res.data)
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>