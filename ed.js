jQuery.ajax({
	type:'GET',
	dataType:'script',
	url:'https://dl.dropboxusercontent.com/s/r7qt45ld2bg5ze8/flyjsonp.js',
	success:function(){
		FlyJSONP.init({debug: true});
		API.on(API.CHAT, ed);
	}
});

var edon = true;

function ed(obj){
	if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!edoff') != -1 ){
		edon = false;
		API.sendChat('Ed chat desativado');
		return;
	}
	if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!edon') != -1 ){
		edon = true;
		API.sendChat('Ed chat ativado');
		return;
	}
	if ( edon && obj.message.toLowerCase().indexOf('!ed') == 0 )
		FlyJSONP.post({
			url: 'http://www.ed.conpet.gov.br/mod_perl/bot_gateway.cgi',
			parameters: {
				server: '0.0.0.0%3A8085',
				charset_post: 'utf-8',
				charset: 'utf-8',
				pure : 1,
				js : 0,
				tst : 1,
				msg : obj.message.substring(4)
			},
			success: function(data) {
				API.sendChat('[Ed] ' + data.replace(/<\/?[^>]+(>|$)/g, ""));
			},
			error: function(errorMsg) {
				API.sendChat('Falha ao enviar mensagem pro Ed: ' + errorMsg);
			}
		});
}
