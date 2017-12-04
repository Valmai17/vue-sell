<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-time">
                        <span class="title">送达时间</span>
                        <span class="">{{seller.deliveryTime}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from "../star/star.vue";
    export default{
        props:{
            seller:{
                type:Object
            }
        },
        components:{
            'star':star
        }
    };
</script>
<style scoped lang="less" rel="stylesheet/less">
.ratings{
    position: absolute;
    top:1.74rem;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
        display: flex;
        padding:.18rem 0;
        .overview-left{
            flex:00 1.37rem ;
            padding:.06rem 0;
            width:1.37rem;
            border-right: 1px solid rgba(7,17,27,0.2);
            text-align: center;
            .score{
                margin-bottom:.06rem;
                line-height: 0.28rem;
                font-size: .24rem;
                color:rgb(255,153,0);
            }
            .title{
                margin-bottom:.08rem;
                line-height:.12rem;
                font-size:.12rem;
                color:rgb(7,17,27);
            }
            .rank{
                line-height:.12rem;
                font-size:.12rem;
                color:rgb(147,153,159);
            }
        }
        .overview-right{
            flex:1;
            padding-left: .24rem;
        }

    }
}
</style>
