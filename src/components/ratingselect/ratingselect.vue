<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
        </div>
        <div @click="toggleContent()" class="switch" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
const POSITIVE = 0;  //正面评价
const NEGATIVE = 1;  //负面评价
const ALL = 2;       //所有评价
    export default {
        props:{
            ratings: {
                type:Array,
                default(){
                    return [];
                }
            },
            selectType:{
                type:Number,
                default:ALL
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            desc:{
                type:Object,
                default(){
                    return {
                        all:'全部',
                        positive:'满意',
                        negative:'不满意'
                    }
                }
            }
        },
        methods:{
            select(type,event){
                if(!event._constructed){
                    return;
                }
                this.selectType = type;
                //this.$root.$emit('ratingtype.select',type);
            },
            toggleContent(event){
                if(!event._constructed){
                    return;
                }
                this.onlyContent = !this.onlyContent;
                //this.$root.$emit('content.toggle',this.onlyContent);
            }
        },
        computed:{
            positives(){
                return this.ratings.filter((rating)=> {
                    return rating.rateType === POSITIVE;
                });
            },
            negative() {
                return this.ratings.filter((rating)=> {
                    return rating.rateType === NEGATIVE;
                });
            }
        }
    }
</script>
<style  scoped lang="less">
@import "../../common/less/mixin.less";
    .ratingselect{
        .rating-type{
            padding: .18rem 0;
            margin: 0 .18rem;
            font-size: 0;
            .border-1px(rgba(7,17,27,0.3));
            .block{
                display: inline-block;
                padding: .08rem .12rem;
                margin-right: .08rem;
                border-radius:.01rem;
                line-height: .16rem;
                font-size:.14rem;
                color:rgb(77,85,93);
                &.active{
                    color:#fff;
                }
                .count{
                    margin-left:.04rem;
                    font-size:.12rem;
                }
                &.positive{
                    background: rgba(0,160,220,0.2);
                    &.active{
                        background:rgb(0,160,220);
                    }
                }
                &.negative{
                    background:rgba(77,85,93,0.2);
                    &.active{
                        background:rgb(77,85,93);
                    }

                }
            }
        }
        .switch{
            padding:.12rem .18rem;
            line-height:.24rem;
            .border-1px(rgba(7,17,27,0.3));
            color:rgb(147,153,159);
            font-size:0;
            &.on{
                .icon-check_circle{
                    color:#00c850;
                }
            }
            .icon-check_circle{
                display:inline-block;
                vertical-align: top;
                margin-right:4px;
                font-size:.24rem;
            }
            .text{
                display:inline-block;
                vertical-align: top;
                font-size:.14rem;
            }
        }
    }
</style>