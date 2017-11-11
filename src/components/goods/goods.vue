<template>
    <div class="goods">
        <div class="menuWrapper">
            <div class="menu-wrapper"  ref:menuWrapper> <!-- ref:menu-wrapper -->
                <ul>
                    <li v-for="item in goods" class="menu-item">
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
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import icon from '../icon/icon.vue';
  import BScroll from 'better-scroll';
  export default{
    // props:{
    //     seller:{
    //         type:Object
    //     }
    // },
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
        _initScroll(){
            this.menuWrapper = new BScroll(document.querySelector('.menuWrapper'),{});

            this.foodsWrapper = new BScroll(document.querySelector('.foodsWrapper'),{
                probeType:3
            });

            this.foodsScroll.on('scroll',(pos) => {
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
        }
    },
    components:{
        'v-icon':icon
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
            }
        }
    }
}

</style>
