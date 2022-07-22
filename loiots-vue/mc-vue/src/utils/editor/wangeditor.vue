<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="onChange"
        />
    </div>
</template>

<script>

import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
 
export default Vue.extend({
    name: 'MyEditor',
    components: { Editor, Toolbar },
    props: ['content'],
    data() {
        return {
            editor: null,
            html: "",
            toolbarConfig: { },
            editorConfig: { MENU_CONF:{
              uploadImage: {
                server: "api/apis/media/upload",
                fieldName: 'file',
                maxNumberOfFiles: 20,
                timeout: 5 * 1000, // 5 秒
                allowedFileTypes: ['image/*'],
                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 10 * 1024 * 1024, // 1M
                customInsert(res, insertFn) {  // TS 语法
                    console.log(res)
                    insertFn(res.obj, res.obj, res.obj)
                },
              },
              insertVideo: {
                server: "api/apis/media/upload",
                fieldName: 'file',
                maxNumberOfFiles: 2,
                timeout: 10 * 1000, // 5 秒
                allowedFileTypes: ['video/*'],
                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 100 * 1024 * 1024, // 1M
                customInsert(res, insertFn) {  // TS 语法
                    console.log(res)
                    insertFn(res.obj, res.obj)
                },
              }
            },placeholder: '请输入内容...' },
            mode: 'default', // default or 'simple'
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        onChange(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            this.$emit('editor-value', this.editor.getHtml())
        },
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        // setTimeout(() => {
        //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        // }, 1500)
        this.html = this.content
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    watch:{
      content(news,olds){
        this.html = news
        console.log('content: '+ news + '---'+ olds)
      }
  }
})
</script>

<style scoped>
@import "./css/style.css";


</style>