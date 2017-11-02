<template>
    <div class="star" :class="starType">
    	<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>//type="text/ecmascript-6"
    export default{
        props: {
            size:{
                type:Number
            },
            score:{
                type:Number
            }
        },
        computed:{
            starType{
                return 'star-' + this.size;
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
            
        }
        &.star-24{
            
        }
    }
</style>
