<template>
    <h2>word解析</h2>
    <div class="form-item">
        <label for="taskName">文件名</label>
        <input type="text" id="fileName" v-model="name" />
    </div>
    <div class="form-item">
        <label for="taskTime">选取文件</label>
        <input type="file" id="file" accept=".docx" ref="file" />
    </div>
    <div class="form-item">
        <span class="submit-task enable-click" @click="addFunc">确定</span>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="pr" v-html="strHtml"></div>
</template>
<script>
import { word2html } from './../utils/wordToHtml'
import { getCurrentInstance, reactive, toRefs } from 'vue'

export default {
    setup() {
        const task = reactive({
            name: '',
            file: null,
            strHtml: '',
            inputCopy: null
        })

        async function addFunc() {
            if (task.name.length === 0) return

            task.strHtml = await word2html(task.file.files)

            console.log(task.strHtml)
        }

        return {
            ...toRefs(task),
            addFunc
        }
    }
}
</script>
<style lang="scss" scoped>
.form-item {
    margin-top: 40px;
}
.form-item input {
    margin-left: 20px;
}
.submit-task {
    background-color: #31c27c;
    color: #fff;
    padding: 6px 15px;
    border-radius: 3px;
    cursor: pointer;
}
</style>
