<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <!-- 食物图片 -->
                <div class="image-header">
                    <img :src="food.image"/>
                    <!-- 返回按钮 -->
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <!-- 商品属性 -->
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}</span><span class="rating">好评率{{food.rating}}</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <!-- 商品信息 -->
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <!-- 评价 -->
                <split></split>
                <div class="ratings">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                    <!-- <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length"></ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
                    </div> -->
                </div>
            </div>

        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import split from '../split/split.vue';
  // const POSITIVE = 0;  //正面评价
  // const NEGATIVE = 1;  //负面评价
  const ALL = 2;       //所有评价
    export default{
        props:{
            food:{
                type:Object
            }
        },
        data(){
            return {
                showFlag: false,
                selectType: 2,
                onlyContent:true,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        methods: {
            show() {
                this.showFlag = true;
                this.selectType = ALL;//默认显示全部评价
                this.onlyContent = true;
                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.food,{
                            click:true
                        })
                    }else{
                        this.scroll.refresh();
                    }
                });
            },
            hide(){
                this.showFlag = false;
            },
            addFirst(event){//点击加入购物车，添加第一个商品
                if(!event._constructed){
                    return;
                }
                this.$root.eventHub.$emit('add',event.target);
                Vue.set(this.food,'count',1);//添加商品数量属性
            }
        },
        components:{
            'cartcontrol':cartcontrol,
            'split':split,
            'ratingselect': ratingselect
        }
    }
</script>
<style  scoped lang="less">
    .food{
        position: fixed;
        top:0;
        left: 0;
        bottom:.48rem;
        z-index: 30;
        width: 100%;
        background: #fff;
        opacity:1;
        transition:all 0.2s linear;
        transform:translate3d(0,0,0);
        &.move-enter,&.move-leave-active{
            transform:translate3d(100%,0,0);
            opacity: 0;
        }
        .image-header{
            position:relative;
            width:100%;
            height:0;
            padding-top:100%;
            img{
                position:absolute;
                left:0;
                top: 0;
                width:100%;
                height:100%;
            }
            .back{
                position:absolute;
                top:.1rem;
                left: 0;
                .icon-arrow_lift{
                    display: block;
                    padding:.1rem;
                    font-size:.2rem;
                    color:#fff;
                }
            }
        }
        .content{
            position:relative;
            padding:.18rem;
            .title{
                line-height: .18rem;
                margin-bottom:.08rem;
                font-size:.18rem;
                font-weight:700;
                color:rgb(7,17,27);
            }
            .detail{
                margin-bottom:.18rem;
                height:.1rem;
                line-height:.1rem;
                font-size:0;
                .sell-count,.rating{
                    font-size:.14rem;
                    color:rgb(147,153,159);
                }
                .sell-count{
                    margin-right:.12rem;
                }
            }
            .price{
                font-weight:700;
                line-height:.24rem;
                .now{
                    margin-right:.18rem;
                    font-size:.18rem;
                    color:rgb(240,20,20);
                }
                .old{
                    text-decoration: line-through;
                    font-size:.14rem;
                    color:rgb(147,153,159);
                }
            }
            .cartcontrol-wrapper{
                position:absolute;
                bottom:.12rem;
                right: .12rem;
            }
            .buy{
                position:absolute;
                bottom:.18rem;
                right: .18rem;
                z-index:10;
                height:.26rem;
                line-height:.26rem;
                padding:0 .14rem;
                box-sizing: border-box;
                border-radius: .12rem;
                font-size:.14rem;
                color:#fff;
                background:rgb(0,160,220);
                opacity:1;
                transition:all 0.4s;
                &.fade-enter,&.fade-leave-active{
                    opacity: 0;
                }
            }
        }
        .info{
            padding:.18rem;
            .title{
                line-height:.18rem;
                margin-bottom:.06rem;
                font-size:.18rem;
                color:rbg(7,17,27);
            }
            .text{
                line-height:.24rem;
                padding:0 .08rem;
                font-size:.14rem;
                color:rgb(77,85,93);
            }
        }
        .ratings{
            padding-top:.18rem;
            .title{
                line-height:.18rem;
                margin-left:.18rem;
                font-size:.18rem;
                color:rbg(7,17,27);
            }
        }

    }
</style>