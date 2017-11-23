<template>
    <div class="cartcontrol">
        <transition name="move">
            <div v-show="food.count>0" class="cart-decrease" @click.stop.prevent="decreaseCart">
                <span class="inner  icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';//为了使用Vue.set 而引入
    export default{
        props: {//父子传数据
            food:{
                type:Object
            }
        },
        computed:{ //计算属性
        },
        methods:{
            addCart(event){
                if(!event._constructed){//防止PC端触发两次点击事件
                    return ;
                }
                if(!this.food.count){
                    //this.food.count = 1;
                    Vue.set(this.food,'count',1);//通过Vue.set添加属性，变化就能被观测到，就能通知到DOM发生变化
                }else{
                    this.food.count ++;
                }
                this.$root.eventHub.$emit('add',event.target);
            },
            decreaseCart(event){
                if(!event._constructed){//防止PC端触发两次点击事件
                    return ;
                };
                if(this.food.count){
                    this.food.count --;
                }
            }
        }
    };
</script>

<style  scoped lang="less" rel="stylesheet/less">
.cartcontrol{
    font-size: 0;
    .cart-decrease{
      display:inline-block;
      padding:.06rem;
      transition: all 0.4s linear;
      transform: translate3d(0, 0, 0);
      opacity: 1;
      .inner{
        display:inline-block;
        line-height: .24rem;
        font-size:.24rem;
        color:rgb(0,160,220);
        transition: all 0.4s linear;
        transform: rotate(0deg);
      }
      /* 小球刚刚enter的状态和小球leave-active状态 */
      &.move-enter,&.move-leave-active{
        transition: all 0.4s linear;
        transform: translate3d(.24rem, 0, 0);
        opacity: 0;
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
        display: inline-block;
        vertical-align: top;
        width: .12rem;
        padding-top: .06rem;
        line-height:.24rem;
        text-align: center;
        font-size: .14rem;
        color:rgb(147,153,159);
    }
    .cart-add{
        display: inline-block;
        padding:.06rem;
        line-height: .24rem;
        font-size: .24rem;
        color:rgb(0,160,220);
    }
}
</style>
