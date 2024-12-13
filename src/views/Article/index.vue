<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            @click="openDrawer('add')"
            icon="el-icon-plus"
            size="small"
            type="primary"
            round>
            添加面经
          </el-button>
        </div>
      </template>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="stem" label="标题" width="300"></el-table-column>
        <el-table-column prop="creator" label="作者"></el-table-column>
        <el-table-column prop="likeCount" label="点赞"></el-table-column>
        <el-table-column prop="views" label="浏览数"></el-table-column>
        <el-table-column prop="createdAt" label="更新时间"></el-table-column>
        <el-table-column label="编辑">
          <template #default="obj">
            <div class="actions">
              <i @click="openDrawer('preview', obj.row.id)" class="el-icon-view"></i>
              <i @click="openDrawer('edit', obj.row.id)" class="el-icon-edit-outline"></i>
              <i @click="del(obj.row.id)" class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next">
      </el-pagination>
    </el-card>
    <el-drawer
      :title="drawerTitle"
      :visible.sync="isShowDraw"
      direction="rtl"
      :before-close="handleClose"
      size="50%"
    >
      <div v-if="drawerType === 'preview'" class="article-preview">
        <h5>{{ form.stem }}</h5>
        <div v-html="form.content"></div>
      </div>
      <el-form v-else ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem" placeholder="请输入面经内容"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quillEditor @blur="$refs.form.validateField('content')" v-model="form.content"></quillEditor>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { createArticle, getArticleDetail, getArticleList, removeArticle, updateArticle } from '@/api/article'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'article-page',
  data () {
    return {
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      isShowDraw: false,
      drawerType: 'add',
      form: {
        stem: '',
        content: ''
      },
      rules: {
        stem: [
          { required: true, message: '请输入标题内容', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initData()
  },
  computed: {
    drawerTitle () {
      let title = '标题'
      if (this.drawerType === 'add') title = '添加面经'
      if (this.drawerType === 'preview') title = '面经预览'
      if (this.drawerType === 'edit') title = '修改面经'
      return title
    }
  },
  components: {
    quillEditor
  },
  methods: {
    async initData () {
      const { data } = await getArticleList({
        current: this.current,
        pageSize: this.pageSize
      })
      this.total = data.total
      this.tableData = data.rows
    },
    handleCurrentChange (val) {
      this.current = val
      this.initData()
    },
    async openDrawer (type, id) {
      this.drawerType = type
      this.isShowDraw = true
      if (type !== 'add') {
        const res = await getArticleDetail(id)
        this.form = {
          ...res.data
        }
      }
    },
    handleClose (done) {
      this.$confirm('你确认要关闭吗？').then(() => {
        this.closeDrawer()
      }).catch(() => {
        console.log('取消')
      })
    },
    async submit () {
      await this.$refs.form.validate()
      if (this.drawerType === 'add') {
        await createArticle(this.form)
        this.$message.success('恭喜添加成功')
      }
      if (this.drawerType === 'edit') {
        const { id, stem, content } = this.form
        await updateArticle({ id, stem, content })
        this.$message.success('恭喜修改成功')
      }
      this.closeDrawer()
      this.current = 1
      this.initData()
    },
    closeDrawer () {
      this.form = {
        stem: '',
        content: ''
      }
      if (this.drawerType !== 'preview') {
        this.$refs.form.resetFields()
      }
      this.isShowDraw = false
    },
    async del (id) {
      await removeArticle(id)
      this.$message.success('删除成功')
      if (this.tableData.length === 1 && this.current > 1) {
        this.current--
      }
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
