<template>
    <div class="goods">
        <div class="menuWrapper">
            <div class="menu-wrapper"  ref:menuWrapper> <!-- ref:menu-wrapper -->
                <ul>
                    <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                        <span class="text  border-1px">
                            <v-icon v-if="item.type>0" :size="3" :subscript="item.type"></v-icon>{{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="foodsWrapper">
            <div class="foods-wrapper"  ref="foodsWrapper"> <!--  ref:foods-wrapper -->
                <ul>
                    <li v-for="item in goods" class="food-list food-list-hook">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li v-for="food in item.foods" class="food-item">
                                <div class="icon"><img style="width:.7rem;height:.7rem;" :src="food.icon"/></div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import icon from '../icon/icon.vue';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  export default{
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            goods:[],
            listHeight:[],
            scrollY:0
        }
    },
    created(){
        axios.get('/api/goods')
        .then(function (res) {
            this.goods = res.data.data;
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            });
            console.log(this.goods);
        }.bind(this))
        .catch(function (error) {
            alert(error);
        });
    },
    methods:{
        selectMenu(index,event){
            if(!event._constructed){
                return ;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el,300);
            //参数：
                //{DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
                //{Number} time 滚动动画执行的时长（单位 ms）
                //{Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
                //{Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
                //{Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
                //返回值：无
                //作用：滚动到指定的目标元素。
        },
        _initScroll(){
            this.menuScroll = new BScroll(document.querySelector('.menuWrapper'),{
                click:true
            });

            this.foodsScroll = new BScroll(document.querySelector('.foodsWrapper'),{
                probeType:3,
                click:true,
                //当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。

                //scrollbar:true //开启滚动条
            });

            this.foodsScroll.on('scroll',(pro) => {
                this.scrollY = Math.abs(Math.round(pro.y));
            });
        },
        _calculateHeight(){
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
              let item = foodList[i];
              height += item.clientHeight;
              this.listHeight.push(height);
            }
        },
        _drop(target){
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
            //调用 shopcar 组件中的 drop 方法，向 shopcar组件 传入当前点击的 dom 对象
                this.$refs.shopcart.drop(target);
            });
        }
    },
    mounted(){//派发的事件
        this.$root.eventHub.$on('add',function(target){
            this._drop(target);
        }.bind(this));
    },
    // events:{//派发的事件
    //     'cart.add'(target){//添加商品，派发购物小球的事件
    //         this._drop(target);
    //     }
    // },
    computed:{
        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                    return i;
                }
            }
            return 0;
        },
        selectFoods(){
            let foods = [];
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food);
                    }
                })
            });
            return foods;
        }
    },
    components:{
        'v-icon':icon,
        'shopcart':shopcart,
        'cartcontrol':cartcontrol
    }
  };
</script>

<style scoped  lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.goods{
    display:flex;
    position:absolute;
    top:1.8rem;
    bottom:.46rem;
    width: 100%;
    overflow:hidden;
    .menuWrapper{
        .menu-wrapper{
            flex:0 0 .8rem;
            width:.8rem;
            background:#f3f5f7;
            .menu-item{
                display:table;
                height:.54rem;
                width:.56rem;
                padding:0 .12rem;
                line-height:.18rem;
                &.current{
                    position:relative;
                    z-index: 10;
                    margin-top:-1px;
                    background:#fff;
                    font-weight:700;
                    .text{
                        .border-none();
                    }
                }
                .icon{
                    margin-top:.02rem;
                }
                .text{
                    display:table-cell;
                    width:.56rem;
                    vertical-align:middle;
                    .border-1px(rgba(7,17,27,0.3));
                    font-size:.14rem;
                }
            }
        }
    }
    .foodsWrapper{
        .foods-wrapper{
            flex:1;
            .title{
                padding-left:.14rem;
                height:.26rem;
                line-height:.26rem;
                border-left:.02rem solid #d9dde1;
                font-size:.14rem;
                color:rgb(147,153,159);
                background:#f3f5f7;
            }
            .food-item{
                display:flex;
                margin:.18rem;
                padding-bottom:.18rem;
                .border-1px(rgba(7,17,27,0.3));
                &:last-child{
                    .border-none;
                    margin-bottom: 0;
                }
                .icon{
                    flex:0 0 .7rem;
                    margin-right:.1rem;
                }
                .content{
                    flex:1;
                    .name{
                        margin:.0 0 .04rem 0;
                        height:.16rem;
                        line-height:.16rem;
                        font-size:.16rem;
                        color:rgb(7,17,27);
                    }
                    .desc,.extra{
                        line-height:.12rem;
                        font-size:.12rem;
                        color:rgb(147,153,159);
                    }
                    .desc{
                        margin-bottom:.06rem;
                    }
                    .extra{
                        .count{
                            margin-right:.12rem;
                        }
                    }
                    .price{
                        font-weight:700;
                        line-height:.24rem;
                        .now{
                            margin-right:.18rem;
                            font-size:.16rem;
                            color:rgb(240,20,20);
                        }
                        .old{
                            text-decoration: line-through;
                            font-size:.12rem;
                            color:rgb(147,153,159);
                        }
                    }
                    .cartcontrol-wrapper{
                        position:absolute;
                        bottom:0;
                        right:0;
                    }
                }
            }
        }
    }

}

</style>
