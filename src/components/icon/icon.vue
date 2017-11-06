<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    export default{
        props: {//父子传数据
            size:{
                type:Number
            },
            score:{
                type:Number
            }
        },
        computed:{ //计算属性
            starType(){
                return 'star-' + this.size;
            },
            itemClasses(){
                let result = [];
                let score = Math.floor(this.score*2)/2;
                let hasDecimal = score % 1 !==0;
                let integer = Math.floor(score);
                for(let i=0;i<integer;i++){
                    result.push(CLS_ON);
                }
                if(hasDecimal){
                    result.push(CLS_HALF);
                }
                while(result.length < LENGTH){
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    };
</script>

<style  scoped lang="less" rel="stylesheet/less">
    @import "../../common/less/mixin.less";
    .star{
        font-size: 0;
        .star-item{
            display: inline-block;
            background-repeat: no-repeat;
        }
        &.star-48{
            .star-item{
                width: .2rem;
                height: .2rem;
                margin-right: .22rem;
                background-size: .2rem .2rem;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    .bg-image('star48_on');
                }
                &.half{
                    .bg-image('star48_half');
                }
                &.off{
                    .bg-image('star48_off');
                }
            }
        }
        &.star-36{
            .star-item{
                width: .15rem;
                height: .15rem;
                margin-right: .06rem;
                background-size: .15rem .15rem;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    .bg-image('star36_on');
                }
                &.half{
                    .bg-image('star36_half');
                }
                &.off{
                    .bg-image('star36_off');
                }
            }
        }
        &.star-24{
            .star-item{
                width: .1rem;
                height: .1rem;
                margin-right: .03rem;
                background-size: .1rem .1rem;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    .bg-image('star24_on');
                }
                &.half{
                    .bg-image('star24_half');
                }
                &.off{
                    .bg-image('star24_off');
                }
            }
        }
    }
</style>
