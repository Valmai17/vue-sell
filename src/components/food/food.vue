<template>
    <div v-show="showFlag" class="food">

    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        props:{
            food:{
                type:Object
            }
        },
        data(){
            return {
                showFlag: false
            }
        },
        methods: {
            show() {
                this.showFlag = true;
            }
        }
    }
</script>
<style lang="less">
    .food{
        position: fixed;
        top:0;
        left: 0;
        bottom:.48rem;
        z-index: 30;
        width: 100%;
        background: #fff;
    }
</style>