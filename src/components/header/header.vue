<template>
    <div class="header">
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
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
    		</div>
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
    	</div>
    	<div class="bulletin-wrapper">
         <span class="bulletin-title"></span>
         <span class="bulletin-text">{{seller.bulletin}}</span>
         <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
</template>

<script>//type="text/ecmascript-6"
  export default{
    props: ['myMessage'],
    data:function(){
    	return {
            seller:'1'
    	}
    },
    created(){
        this.classMap = ['decrease','discount','special','invoice','guarantee']
    },
    mounted(){ //模板编译之后，代替之前ready
        this.seller=this.myMessage;
        console.log('头部接收的数据');
        console.log(this.seller);
        //console.log(this.seller);
    }

};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.header{
    color:#fff;
    background: #999;
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
                    font-size: .18rem;
                    line-height: .18rem;
                    font-weight: bold;
                }
            }
            .description{
                margin-bottom: .1rem;
                line-height: .12rem;
                font-size: .14rem;
            }
            .support{
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    width: .12rem;
                    height: .12rem;
                    margin-right: .04rem;
                    background-size: .12rem .12rem;
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
                .text{
                    line-height: .12rem;
                    font-size: .12rem;
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
                font-size: .12rem;
            }
            .icon-keyboard_arrow_right{
                margin-left: .02rem;
                line-height: .24rem;
                font-size: .12rem;

            }
        }
    }
    .bulletin-wrapper{
        height: .28rem;
        line-height: .28rem;
        padding: 0 .22rem 0 .12rem;
        white-space: normal;
        overflow:hidden;
        text-overflow:ellipsis;
    }
}
</style>
