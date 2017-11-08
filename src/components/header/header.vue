<template>
    <div class="header">
        <!-- 内容 -->
    	<div class="content-wrapper">
    		<div class="avatar"><img :src="seller.avatar"></div>
    		<div class="content">
    			<div class="title">
    				<span class="brand"></span>
    				<span class="name">{{seller.name}}</span>
    			</div>
    			<div class="description">
    				{{seller.description}}/{{seller.deliveryTime}}分钟送达
    			</div>
                <div v-if="seller.supports" class="support">
                    <!-- <span class="icon" :class="classMap[seller.supports[0].type]"></span> -->
                    <v-icon  :size="1" :subscript="seller.supports[0].type"></v-icon>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
    		</div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
    	</div>

        <!-- 公告栏 -->
    	<div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>

        <!-- 内容背景图 -->
        <div class="background">
            <img :src="seller.avatar"/>
        </div>

        <!-- 弹窗 -->
        <transition name="fade">
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="supports-item" v-for="(item, index) in seller.supports">
                            <!-- <span class="icon" :class="classMap[seller.supports[index].type]"></span> -->
                            <v-icon  :size="2" :subscript="seller.supports[index].type"></v-icon>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star.vue';
import icon from '../icon/icon.vue';
export default{
    //props: ['myMessage'],//字符串传送
    props: {
        seller: {
            type: Object
        }
    },
    data:function(){
    	return {
            detailShow:false
    	}
    },
    // created(){
    //     this.classMap = ['decrease','discount','special','invoice','guarantee']
    // },
    // mounted(){ //模板编译之后，代替之前ready
    //     this.seller=this.myMessage;
    // },
    methods:{
        showDetail(){
            this.detailShow = true;
        },
        hideDetail(){
            this.detailShow = false;
        }
    },
    components:{
        'star':star,
        'v-icon':icon
    }


};
</script>

<style  scoped lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.header{
    position: relative;
    color:#fff;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper{
        padding: .24rem .12rem .18rem .24rem;
        font-size: 0px;
        position: relative;
        .avatar{
            display: inline-block;
            vertical-align: top;
            &>img{
                width: .64rem;
                height: .64rem;
                border-radius: .02rem;
            }
        }
        .content{
            display: inline-block;
            margin-left: .16rem;
            .title{
                margin:.02rem 0 .08rem 0;
                .brand{
                    display: inline-block;
                    vertical-align:top;
                    width: .3rem;
                    height: .18rem;
                    .bg-image('brand');
                    background-size: .3rem .18rem;
                    background-repeat: no-repeat;
                }
                .name{
                    margin-left: .06rem;
                    font-size: .2rem;
                    line-height: .2rem;
                    font-weight: bold;
                }
            }
            .description{
                margin-bottom: .1rem;
                line-height: .16rem;
                font-size: .16rem;
            }
            .support{
                // .icon{
                //     display: inline-block;
                //     vertical-align: top;
                //     width: .12rem;
                //     height: .12rem;
                //     margin-right: .04rem;
                //     background-size: .12rem .12rem;
                //     background-repeat: no-repeat;
                //     &.decrease{
                //         .bg-image('decrease_1');
                //     }
                //     &.discount{
                //         .bg-image('discount_1');
                //     }
                //     &.guarantee{
                //         .bg-image('guarantee_1');
                //     }
                //     &.invoice{
                //         .bg-image('invoice_1');
                //     }
                //     &.special{
                //         .bg-image('special_1');
                //     }
                // }
                .text{
                    line-height: .14rem;
                    font-size: .14rem;
                }
            }
        }
        .support-count{
            position: absolute;
            right: .12rem;
            bottom: .18rem;
            padding: 0 .08rem;
            height: .24rem;
            line-height: .24rem;
            border-radius: .14rem;
            background:rgba(0,0,0,0.2);
            text-align: center;
            .count{
                vertical-align: top;
                font-size: .14rem;
            }
            .icon-keyboard_arrow_right{
                margin-left: .02rem;
                line-height: .24rem;
                font-size: .14rem;

            }
        }
    }
    .bulletin-wrapper{
        position: relative;
        height: .28rem;
        line-height: .28rem;
        padding: 0 .22rem 0 .12rem;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        background: rgba(7, 17, 27, 0.2);
        .bulletin-title{
            margin-top: .08rem;
            display: inline-block;
            width: .22rem;
            height: .12rem;
            .bg-image('bulletin');
            background-size: .22rem .12rem;
            background-repeat: no-repeat;
        }
        .bulletin-text{
            vertical-align: top;
            margin:0 .04rem;
            font-size: .14rem;
        }
        .icon-keyboard_arrow_right{
            position: absolute;
            font-size: .14rem;
            right: .12rem;
            top:.08rem;
        }
    }
    .background{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter:blur(.1rem);//滤镜
        & > img{
            width: 100%;
            height: 100%;
        }
    }

    // 弹层动画样式
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .detail{
        position: fixed;
        top:0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7,17,27,0.8);
        backdrop-filter:blur(10);
        .detail-wrapper{
            min-height: 100%;
            width: 100%;
            .detail-main{
                margin-top: .64rem;
                padding-bottom: .64rem;
                .name{
                    line-height: .18rem;
                    text-align: center;
                    font-size: .18rem;
                    font-weight: 700;
                }
                .star-wrapper{
                    margin-top:.18rem;
                    padding:.02rem 0;
                    text-align:center;
                }
                .title{
                    display:flex;
                    width:80%;
                    margin:.28rem auto .24rem;
                    .line{
                        flex:1;
                        position:relative;
                        top:-0.06rem;
                        border-bottom:1px solid rgba(255,255,255,0.2);
                    }
                    .text{
                        padding:0 .12rem;
                        font-weight:700;
                        font-size:.16rem;
                    }
                }
                .supports{
                    width:80%;
                    margin:0 auto;
                    .supports-item{
                        padding:0 .12rem;
                        margin-bottom:.12rem;
                        font-size:0;
                        &:last-child{
                            margin-bottom:0;
                        }
                        // .icon{
                        //     display:inline-block;
                        //     width:.16rem;
                        //     height:.16rem;
                        //     vertical-align:top;
                        //     margin-right:.06rem;
                        //     background-size:.16rem .16rem;
                        //     background-repeat:no-repeat;
                        //     &.decrease{
                        //         .bg-image('decrease_2');
                        //     }
                        //     &.discount{
                        //         .bg-image('discount_2');
                        //     }
                        //     &.guarantee{
                        //         .bg-image('guarantee_2');
                        //     }
                        //     &.invoice{
                        //         .bg-image('invoice_2');
                        //     }
                        //     &.special{
                        //         .bg-image('special_2');
                        //     }
                        // }
                        .text{
                            line-height:.16rem;
                            font-size:.14rem;
                        }
                    }
                }
                .bulletin{
                    width:80%;
                    margin:0 auto;
                    .content{
                        padding:0 .12rem;
                        line-height:.24rem;
                        font-size:.14rem;
                    }
                }
            }
        }
        .detail-close{
            position: relative;
            width: .32rem;
            height: .32rem;
            margin: -0.64rem auto 0 auto;
            clear:both;
            font-size: .36rem;
        }
    }
}
</style>
