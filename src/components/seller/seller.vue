<template>
    <div class="seller" ref="seller">
    	<div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="supports-item" v-for="(item, index) in seller.supports">
                        <!-- <span class="icon" :class="classMap[seller.supports[index].type]"></span> -->
                        <v-icon  :size="3" :subscript="seller.supports[index].type"></v-icon>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" style="width:1.2rem;height:.9rem"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import split from '../split/split.vue';//分割高度
    import icon from '../icon/icon.vue';
    import star from '../star/star.vue';
    export default{
        props:{
            seller:{
                type:Object
            }
        },
        mounted(){
            this.$nextTick(() => {
                this._initScroll();
                this._initPic();
            });
        },
        watch:{//监听数据
            'seller'(){
                this.$nextTick(() => {
                    this._initScroll();
                    this._initPic();
                });
            }
        },
        methods:{
            _initScroll(){
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.seller,{
                        click:true
                    })
                }else{
                    this.scroll.refresh();
                }
            },
            _initPic() {
                if(this.seller.pics){
                    let picWidth = 1.2;
                    let margin = 0.06;
                    let width = (picWidth+margin)*this.seller.pics.length-margin;
                    this.$refs.picList.style.width = width+'rem';
                    //better-scroll左右滚动
                    if(!this.picScroll){
                        this.picScroll = new BScroll(this.$refs.picWrapper,{
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        });
                    }else{
                        this.picScroll.refresh();
                    }
                }
            }
        },
        components:{
            'star':star,
            'split':split,
            'v-icon':icon
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.seller{
    position: absolute;
    top:1.8rem;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
        padding: .18rem;
        .title{
            margin-bottom: .08rem;
            line-height: .16rem;
            font-size: .16rem;
            color:rgb(7,17,27);
        }
        .desc{
            padding-bottom: .18rem;
            font-size:0;
            .border-1px(rgba(7,17,27,0.2));
            .star{
                display: inline-block;
                margin-right:.08rem;
                vertical-align: top;
            }
            .text{
                display:inline-block;
                line-height: .18rem;
                margin-right:.12rem;
                vertical-align: top;
                font-size:.12rem;
                color:rgb(77,85,93);
            }
        }
        .remark{
            display:flex;
            padding-top: .18rem;
            .block{
                flex:1;
                text-align: center;
                border-right: 1px solid rgba(7,17,27,0.2);
                &:last-child{
                    border:none;
                }
                h2{
                    margin-bottom: .04rem;
                    line-height:.12rem;
                    font-size:.12rem;
                    color:rgb(147,153,159);
                }
                .content{
                    line-height:.24rem;
                    font-size:.12rem;
                    color:rgb(7,17,27);
                    .stress{
                        font-size:.24rem;
                    }
                }
            }
        }
    }
    .bulletin{
        padding:.18rem .18rem 0 .18rem;
        .title{
            margin-bottom: .08rem;
            line-height: .16rem;
            font-size: .16rem;
            color:rgb(7,17,27);
        }
        .content-wrapper{
            padding:0 .12rem .16rem .12rem;
            .border-1px(rgba(7,17,27,0.2));
            .content{
                line-height:.24rem;
                font-size:.14rem;
                color:rgb(240,20,20);
            }
        }
        .supports{
            .supports-item{
                padding:.16rem .12rem;
                font-size:0;
                .border-1px(rgba(7,17,27,0.2));
                &:last-child{
                    .border-none();
                }
                .text{
                    line-height:.16rem;
                    font-size:.14rem;
                }
            }
        }
    }
    .pics{
        padding:.18rem;
        .title{
            margin-bottom: .12rem;
            line-height: .16rem;
            font-size: .16rem;
            color:rgb(7,17,27);
        }
        .pic-wrapper{
            width:100%;
            overflow:hidden;
            white-space:nowrap;
            .pic-list{
                font-size:0;
                .pic-item{
                    display:inline-block;
                    margin-right:.06rem;
                    width:1.2rem;
                    height:.9rem;
                    &:last-child{
                        margin-right:0;
                    }
                }
            }
        }
    }
}
</style>
