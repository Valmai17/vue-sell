<template>
    <div class="ratings" ref="ratingsContent">
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
            <ratingselect @select="selectRating" @toggleContent="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li  v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
                        <div class="avatar">
                            <img style="width:100%;height:100%" :src="rating.avatar"/>
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend">
                                <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                                <span class="item" v-for="recommend in rating.recommend">{{recommend}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import BScroll from 'better-scroll';
    import star from '../star/star.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';//评价分类
    import split from '../split/split.vue';//分割高度
    import {formatDate} from '../../common/js/date.js';//分割高度

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
                onlyContent:false,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        created(){//实例化之前
            axios.get('/api/ratings')
            .then(function (res) {
                this.ratings = res.data.data;
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.ratingsContent,{
                        click:true
                    });
                });
                console.log(this.ratings);
            }.bind(this))
            .catch(function (error) {
                alert(error);
            });
        },
        methods:{
            needShow(type,text){
                if(this.onlyContent && !text){
                    return false;
                }
                if(this.selectType === ALL){
                    return true;
                }else{
                    return type === this.selectType;
                }

            },
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
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
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
@import "../../common/less/mixin.less";
.ratings{
    position: absolute;
    top:1.8rem;
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
    .rating-wrapper{
        padding:0 .18rem;
        .rating-item{
            display:flex;
            padding:.18rem 0;
            .border-1px(rgba(7,17,27,0.3));
            .avatar{
                flex:0 0 .3rem;
                width:.3rem;
                height: .3rem;
                margin-right:.12rem;
                img{
                    border-radius: 50%;
                }
            }
            .content{
                position:relative;
                flex:1;
                .name{
                    margin-bottom:.04rem;
                    line-height:.14rem;
                    font-size:.12rem;
                    color:rgb(7,17,27);
                }
            }
            .star-wrapper{
                margin-bottom:.06rem;
                font-size:0;
                .star{
                    display:inline-block;
                    margin-right:.06rem;
                    vertical-align:top;
                }
                .delivery{
                    display:inline-block;
                    vertical-align:top;
                    font-size:.12rem;
                    color:rgb(147,153,159);
                }

            }
            .text{
                margin-bottom:.08rem;
                line-height:.18rem;
                color:rgb(7,17,27);
                font-size:.14rem;
            }
            .recommend{
                line-height:.16rem;
                font-size:0;
                .icon-thumb_up,.icon-thumb_down,.item{
                    display:inline-block;
                    margin:0 .08rem .04rem 0;
                    font-size:.14rem;
                }
                .icon-thumb_up,.icon-thumb_down{
                    color:rgb(0,160,220);
                }
                .icon-thumb_down{
                    color:rgb(147,153,159);
                }
                .item{
                    padding:0 .06rem;
                    border:1px solid rgba(7,17,27,0.2);
                    border-radius:.02rem;
                    color:rgb(147,153,159);
                    background: #fff;
                }
            }
            .time{
                position:absolute;
                top:0;
                right:0;
                font-size:.12rem;
                color:rgb(147,153,159);
            }
        }
    }
}
</style>
