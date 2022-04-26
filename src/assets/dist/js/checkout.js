var foreeCheckoutURL ='https://checkout-sandbox.riteidentity.com/'; 
var addCheckoutConfigJSFile = function(url, fileID){
    var cjs = document.createElement("script");
    cjs.type = "text/javascript";
    cjs.id = fileID;
    cjs.src = (foreeCheckoutURL+url)+'?version='+new Date().getTime();
	document.head.appendChild(cjs);
}
addCheckoutConfigJSFile('foreeCheckout.js', 'foree-v2-checkout-js-36733')
