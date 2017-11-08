<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text  border-1px">
                        <v-icon v-if="item.type>0" :size="3" :subscript="item.type"></v-icon>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="icon"><img :src="food.icon"/></div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span>￥{{food.price}}</span>
                                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import icon from '../icon/icon.vue';
  export default{
    // props:{
    //     seller:{
    //         type:Object
    //     }
    // },
    data(){
        return{
            goods:[]
        }
    },
    created(){
        axios.get('/api/goods')
        .then(function (res) {
            this.goods = res.data.data;
            console.log(this.goods);
        }.bind(this))
        .catch(function (error) {
            alert(error);
        });
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
    }
}

</style>
