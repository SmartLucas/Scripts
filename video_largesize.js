
function prop(width, height, left, zIndex){
  this.width=width;
  this.height=height;
	this.left=left;
	this.zIndex=zIndex;
}

var playback_container 		= new prop($('#playback-container').css('width'),
									$('#playback-container').css('height'),
									$('#playback-container').css('left'),
									$('#playback-container').css('zIndex'));
									
var	playback_style 			= new prop($('#playback').css('width'),
									$('#playback').css('height'),
									$('#playback').css('left'),
									$('#playback').css('zIndex'));
									
var	playback_controls_style = new prop($('#playback-controls').css('width'),
									$('#playback-controls').css('height'),
									$('#playback-controls').css('left'),
									$('#playback-controls').css('zIndex'));

function telaCheia(){
	$('#playback-container').css({"width":$('#room').width(),"height":$('#room').height(),"left":"0%","z-index":"7"});
	$('#playback').css({"width":$('#room').width(),"height":$('#room').height(), "left":"0%", "z-index":"8"});
	$('#playback-controls').css("z-index","9");
}

function restauraElementos(){
	$('#playback-container').css({"width":playback_container.width,
								"height":playback_container.height,
								"left":playback_container.left,
								"zIndex":playback_container.zIndex});
	
	$('#playback').css({"width":playback_style.width,
						"height":playback_style.height,
						"left":playback_style.left,
						"zIndex":playback_style.zIndex});
	
	$('#playback-controls').css({"width":playback_controls_style.width,
								"height":playback_controls_style.height,
								"left":playback_controls_style.left,
								"zIndex":playback_controls_style.zIndex});
}

function chatCom(value) {
	if ( value.trim() == "/fullon" ) {
		API.chatLog('Painel de vídeo em ' + $('#room').width() + 'x' + $('#room').height(), false);
		telaCheia();
		
	}
	if ( value.trim() == "/fulloff" ) {
		restauraElementos();
		API.chatLog('Painel de vídeo restaurado para ' + playback_style.width.substring(0,playback_style.width.length-2) + 'x' + playback_container.height.substring(0,playback_container.height.length-2), false);
	}
}

API.on(API.CHAT_COMMAND, chatCom);

API.chatLog('Para ver o vídeo em tamanho maior, digie no chat: /fullon', false);
API.chatLog('Para restaurar o tamanho original do vídeo, digite: /fulloff', false);
