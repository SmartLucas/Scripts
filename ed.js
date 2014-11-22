function ed(obj){
	if ( obj.message.toLowerCase().indexOf('!ed') == 0 )
		$.ajax({
		type: 'POST',
		url: 'https://g4group.me/ed/ed.php',
		data: {"msg": obj.message.substring(4)}}
		).done(function( msg ) {
			API.sendChat('[Ed] ' + msg.replace(/<\/?[^>]+(>|$)/g, ""));
	});
}

API.on(API.CHAT, ed);
