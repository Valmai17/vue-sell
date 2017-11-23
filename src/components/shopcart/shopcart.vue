<template>
    <div class="shopcart">
    <div class="content">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{'highlight':totalCount}">
                    <i class="icon-shopping_cart" :class="{'highlight':totalCount}"></i>
                </div>
                <div v-show="totalCount>0" class="num">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'highlight':totalCount}">￥{{totalPrice}}</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
            <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
        <div class="ball-container">
            <div v-for="ball in balls">
                <!-- 过度钩子函数 -->
                <transition name="drop" v-on:before-enter="beforEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
                    <!--  外层纵向运动，内层横向运动-->
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
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
        data(){
            return {
                balls:[
                    {show:false},
                    {show:false},
                    {show:false},
                    {show:false},
                    {show:false}
                ],
                dropBall:[]
            }
        },
        created(){

        },
        computed:{ //计算属性
            totalPrice(){//商品总价格
                let total = 0;
                this.selectFoods.forEach((food)=>{
                    total += food.price*food.count;
                });
                return total;
            },
            totalCount(){//商品个数
                let count = 0;
                this.selectFoods.forEach((food)=>{
                    count += food.count;
                });
                return count;
            },
            payDesc(){//右侧显示实际费用
                if(this.totalPrice === 0){
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPrice < this.minPrice){
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                }else{
                    return '去结算';
                }
            },
            payClass(){//右侧样式
                if(this.totalPrice < this.minPrice){
                    let diff = this.minPrice - this.totalPrice;
                    return 'not-enough';
                }else{
                    return 'enough';
                }
            }
        },
        methods:{
            drop(el){//购物小球遍历
                for(let i=0;i<this.balls.length;i++){
                    let ball = this.balls[i];
                    if(!ball.show){
                        ball.show = true;
                        ball.el = el;
                        this.dropBall.push(ball);
                        return;
                    }
                }
            },
            beforEnter(el){//动画enter之前
                let count = this.balls.length;
                while(count--){
                    let ball = this.balls[count];
                    if(ball.show){
                        console.log(ball.el);
                        let rect = ball.el.getBoundingClientRect();// 点击的+号图标相对于视窗的位置集合。集合中有top, right, bottom, left等属性
                        let x = (rect.left/200 - 0.32);
                        let y = -(window.innerHeight/200 - rect.top/200-0.22);

                        console.log(window.innerHeight);
                        console.log(rect.left/200);
                        console.log(rect.top/200);
                        console.log(x);
                        console.log(y);

                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}rem,0)`;
                        el.style.transform = `translate3d(0,${y}rem,0)`;

                        // el.style.webkitTransform = 'translate3d(0,-1rem,0)';
                        // el.style.transform = 'translate3d(0,-1rem,0)';

                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}rem,0,0)`;
                        inner.style.transform = `translate3d(${x}rem,0,0)`;
                    }
                }
            },
            enter(el){//动画enter进入
                /* eslint-disable no-unuseed-vars */  //防止eslint报错
                let rf = el.offsetHeight;
                this.$nextTick(()=>{
                    el.style.webkitTransform = 'translate3d(0,0rem,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                })
            },
            afterEnter(el){//动画进入之后
                let ball = this.dropBall.shift();//把数组的第一个元素从其中删除,并返回第一个元素的值
                if(ball){
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
        },

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
                    &.highlight{
                        background:rgb(0,160,220);
                    }
                    .icon-shopping_cart{
                        line-height:.44rem;
                        font-size:.24rem;
                        color:#80858a;
                        &.highlight{
                            color:#fff;
                        }
                    }
                }
                .num{
                    position:absolute;
                    top:0;
                    right:0;
                    width:.24rem;
                    height:.16rem;
                    line-height:.16rem;
                    text-align:center;
                    border-radius:.16rem;
                    font-size:.1rem;
                    font-weight:700;
                    color:#fff;
                    background:rgb(240,20,20);
                    box-shadow: 0 .04rem .08rem 0 rgba(0,0,0,0.4);
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
                font-size:.18rem;
                font-weight:700;
                &.highlight{
                    color:#fff;
                }
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
                font-size:.12rem;
                font-weight:700;
                background:#2b333b;
                &.not-enough{
                    background:#2b333b;
                }
                &.enough{
                    background:#00b43c;
                    color:#fff;
                }
            }
        }
    }
    .ball-container{
        .ball{
            position:fixed;
            left:.32rem;
            bottom:.22rem;
            z-index:200;
            //y 轴 贝塞尔曲线
            transition:all 0.5s cubic-bezier(0.49,-0.29,0.75,0.41);
            //内从做横向运动
            .inner{
                width:.16rem;
                height:.16rem;
                border-radius:50%;
                background:rgb(0,160,220);
                transition:all 0.5s linear;//x 轴只需要线性缓动
            }
        }
    }
}
</style>
