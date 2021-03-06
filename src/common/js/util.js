/**
 * 解析URL参数
 * @example ?id=12345&a=b
 * return Object{id:12345,a:b}
 */
export function urlParse(){
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	if(arr){
		arr.forEach((item)=>{
			let tempArr = item.substring(1).split('=');
			// decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码
			let key = decodeURIComponent(tempArr[0]) ;
			let val = decodeURIComponent(tempArr[1]) ;
			obj[key] = val;
		});
	}
	return obj;
}