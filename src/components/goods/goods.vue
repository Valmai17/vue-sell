<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text  border-1px">
                        <v-icon :size="3" :subscript="item.type"></v-icon>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper"></div>
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
        //this.classMap = ['decrease','discount','special','invoice','guarantee'];

        axios.get('/api/goods')
        .then(function (res) {
            this.goods = res.data.data;
            console.log(res.errno);
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
            // .icon{
            //     display:inline-block;
            //     width:.12rem;
            //     height:.12rem;
            //     vertical-align:top;
            //     margin-right:.02rem;
            //     background-size:.12rem .12rem;
            //     background-repeat:no-repeat;
            //     &.decrease{
            //         .bg-image('decrease_3');
            //     }
            //     &.discount{
            //         .bg-image('discount_3');
            //     }
            //     &.guarantee{
            //         .bg-image('guarantee_3');
            //     }
            //     &.invoice{
            //         .bg-image('invoice_3');
            //     }
            //     &.special{
            //         .bg-image('special_3');
            //     }
            // }
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
