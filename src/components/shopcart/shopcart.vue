<template>
    <div class="shopcart">
    <div class="content">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo">
                    <span class="icon-shopping_cart"></span>
                </div>
            </div>
            <div class="price">0元</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
            <div class="pay">￥{{minPrice}}元起送</div>
        </div>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {//父子传数据
            selectFoods:{
                type:Array,
                default(){
                    return [];
                }
            },
            deliveryPrice:{
                type:Number,
                default:0
            },
            minPrice:{
                type:Number,
                default:0
            },
        },
        created(){

        },
        computed:{ //计算属性

        }
    };
</script>

<style  scoped lang="less" rel="stylesheet/less">
.shopcart{
    position:fixed;
    left:0;
    bottom:0;
    z-index:50;
    height:.48rem;
    width:100%;
    background:#000;
    .content{
        display:flex;
        background:#141d27;
        color:rgba(255,255,255,0.6);
        .content-left{
            flex:1;
            font-size:0;
            .logo-wrapper{
                display:inline-block;
                position:relative;
                top:-0.1rem;
                margin:0 .12rem;
                padding:.06rem;
                width:.56rem;
                height:.56rem;
                box-sizing: border-box;
                vertical-align: top;
                border-radius:50%;
                background:#141d27;
                .logo{
                    width:100%;
                    height:100%;
                    border-radius:50%;
                    background:#2b343c;
                    text-align: center;
                    .icon-shopping_cart{
                        line-height:.44rem;
                        font-size:.24rem;
                        color:#80858a;
                    }
                }
            }
            .price{
                display:inline-block;
                vertical-align:top;
                margin-top:.12rem;
                line-height:.24rem;
                padding-right:.12rem;
                box-sizing:border-box;
                border-right:1px solid rgba(255,255,255,0.3);
                font-size:.16rem;
                font-weight:700;
            }
            .desc{
                display:inline-block;
                vertical-align:top;
                margin: .12rem 0 0 .12rem;
                line-height:.24rem;
                font-size:.12rem;
            }
        }
        .content-right{
            flex:0 0 1.05rem;
            width:1.05rem;
            .pay{
                height:.48rem;
                line-height:.48rem;
                text-align:center;
                font-size:.14rem;
                font-weight:700;
                background:#2b333b;
            }
        }
    }
}
</style>
