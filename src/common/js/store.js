/**
 * 本地存储
 * localStorage只能存储字符串,所以多用到JSON.parse和JSON.stringify
 * @param  {[type]} id    商家的id
 * @param  {[type]} key   要存储的元素，例收藏"favorite"
 * @param  {[type]} value 存储元素的值，例true
 * @return localStorage.__seller__= "{"id":{"key":value}}"="{"12345":{"favorite":true}}"
 */
export function saveToLocal(id,key,value){ // 存储商家
	let seller = window.localStorage.__seller__;
	if(!seller){
		seller = {};
		seller[id] = {};
	}else{
		seller = JSON.parse(seller);//JSON.parse  解析对象
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	window.localStorage.__seller__ = JSON.stringify(seller)// localStorage时只能存储字符串的
}
export function loadFromLocal(id,key,def){
	let seller = window.localStorage.__seller__;
	if(!seller){
		return def;
	}
	seller = JSON.parse(seller)[id];//JSON.parse  解析对象
	if(!seller){
		return def;
	}
	let ret = seller[key];
	return ret || def;
}