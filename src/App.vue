<template>
    <div id="app">
      <v-header :seller="seller"></v-header>
      <div class="tab">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
        <div class="tab-item"><router-link to="/seller">商家</router-link></div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
  import axios from 'axios';
  import header from './components/header/header.vue';
  //axios.defaults.baseURL = 'http://localhost:8080/#/';
  export default{
    data(){
      return{
        seller:{}
      }
    },
    created(){//(钩子函数)实例已经创建完成，属性已经绑定
      axios.get('/api/seller')
      .then(function (res) {
        this.seller = res.data.data;
        console.log(this.seller);
      }.bind(this))
      .catch(function (error) {
        alert(error);
      });
    },
    components:{
      'v-header':header
    }
  };
</script>

<style lang="less">

@import "./common/less/mixin.less";

#app .tab{
  display:flex;
  width:100%;
  height:.4rem;
  line-height:.4rem;
  background:#fff;
  //border-bottom:1px solid rgba(7,17,27,0.1);
  .border-1px(rgba(7,17,27,0.1));
  .tab-item{
    flex:1;
    text-align:center;
    & > a{
      display:block;
      font-size:.16rem;
      color:rgb(77,85,93);
      &.active{
        color:rgb(240,20,20);
      }
    }
  }
}
</style>
