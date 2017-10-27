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
    				{{seller.description}}/{{seller.deliveryTimme}}分钟送达
    			</div>
    		</div>
    	</div>
    	<div class="bulletin-wrapper"></div>
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
    mounted(){ //模板编译之后，代替之前ready
        this.seller=this.myMessage;
        console.log('头部接收的数据');
        console.log(this.seller);
    },
    methods:{
        change(){
            //this.b='被改了';
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
.avatar{
	&>img{
		width: .64rem;
		height: .64rem;
	}
}
</style>
