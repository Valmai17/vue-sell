<template>
    <span class="icon" :class="[starType,itemClasses]"></span>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {//父子传数据
            size:{
                type:Number
            },
            subscript:{
                type:Number
            }
        },
        created(){
            this.classMap = ['decrease','discount','special','invoice','guarantee']
        },
        computed:{ //计算属性
            starType(){
                return 'icon-' + this.size;
            },
            itemClasses(){
                return this.classMap[this.subscript];
            }
        }
    };
</script>

<style  scoped lang="less" rel="stylesheet/less">
    @import "../../common/less/mixin.less";
    .icon-1{
        display: inline-block;
        vertical-align: top;
        width: .14rem;
        height: .14rem;
        margin-right: .04rem;
        background-size: .14rem .14rem;
        background-repeat: no-repeat;
        &.decrease{
            .bg-image('decrease_1');
        }
        &.discount{
            .bg-image('discount_1');
        }
        &.guarantee{
            .bg-image('guarantee_1');
        }
        &.invoice{
            .bg-image('invoice_1');
        }
        &.special{
            .bg-image('special_1');
        }
    }
    .icon-2{
        display:inline-block;
        vertical-align:top;
        width:.16rem;
        height:.16rem;
        margin-right:.06rem;
        background-size:.16rem .16rem;
        background-repeat:no-repeat;
        &.decrease{
            .bg-image('decrease_2');
        }
        &.discount{
            .bg-image('discount_2');
        }
        &.guarantee{
            .bg-image('guarantee_2');
        }
        &.invoice{
            .bg-image('invoice_2');
        }
        &.special{
            .bg-image('special_2');
        }
    }
    .icon-3{
        display:inline-block;
        width:.14rem;
        height:.14rem;
        vertical-align:top;
        margin-right:.04rem;
        background-size:.14rem .14rem;
        background-repeat:no-repeat;
        &.decrease{
            .bg-image('decrease_3');
        }
        &.discount{
            .bg-image('discount_3');
        }
        &.guarantee{
            .bg-image('guarantee_3');
        }
        &.invoice{
            .bg-image('invoice_3');
        }
        &.special{
            .bg-image('special_3');
        }
    }
</style>
