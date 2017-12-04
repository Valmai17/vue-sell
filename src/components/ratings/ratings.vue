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
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <!-- 评价分类 -->
            <ratingselect @select="selectRating" @toggleContent="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import star from '../star/star.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';//评价分类
    import split from '../split/split.vue';//分割高度

    const POSITIVE = 0;  //正面评价
    const NEGATIVE = 1;  //负面评价
    const ALL = 2;       //所有评价
    export default{
        props:{
            seller:{
                type:Object
            }
        },
        data(){
            return {
                ratings:[],
                showFlag: false,
                selectType: 2,
                onlyContent:true,
            }
        },
        created(){//实例化之前
            axios.get('/api/ratings')
            .then(function (res) {
                this.ratings = res.data.data;
                // this.$nextTick(() => {
                //     this._initScroll();
                //     this._calculateHeight();
                // });
                console.log(this.ratings);
            }.bind(this))
            .catch(function (error) {
                alert(error);
            });
        },
        methods:{
            selectRating(type) {//通过组件标签上的@select="selectRating" 绑定子组件事件
              this.selectType = type
              this.$nextTick(() => {
                this.scroll.refresh();
              })
            },
            toggleContent(onlyContent) {//通过组件标签上的@toggleContent="toggleContent"  绑定子组件事件
              this.onlyContent = !this.onlyContent
              this.$nextTick(() => {
                this.scroll.refresh();
              })
            }
        },
        components:{
            'star':star,
            'ratingselect':ratingselect,
            'split':split
        }
    }
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
            @media only screen and (max-width:320px){
                flex:0 0 1.2rem;
                width:1.2rem;
            }
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
            padding:.06rem 0 .06rem .24rem;
            .score-wrapper{
                margin-bottom: .08rem;
                font-size:0;
                .title{
                    display:inline-block;
                    line-height:.18rem;
                    font-size:.14rem;
                    vertical-align: top;
                    color:rgb(7,17,27);
                }
                .star{
                    display:inline-block;
                    margin:0 .12rem;
                }
                .score{
                    display:inline-block;
                    line-height:.18rem;
                    font-size:.14rem;
                    vertical-align: top;
                    color:rgb(255,153,0);
                }
            }
            .delivery-wrapper{
                font-size:0;
                .title{
                    line-height:.18rem;
                    font-size:.14rem;
                    color:rgb(7,17,27);
                }
                .delivery{
                    margin-left:.12rem;
                    line-height:.14rem;
                    font-size:.14rem;
                    color:rgb(147,153,159);
                }
            }
        }

    }
}
</style>
