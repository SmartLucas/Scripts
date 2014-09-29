var avatares = null,
  anterior = API.getUser().avatarID,
  velAvatar = 5000,
	thread = null,
	cont = 0;

$.ajax({
	type: 'GET',
	url: 'https://plug.dj/_/store/inventory/avatars',
	contentType: 'application/json'}
	).done(function( msg ) {
		avatares = msg.data;
		alterarAvatar();
		thread = setInterval(alterarAvatar, velAvatar);
});

function alterarAvatar(avatar){
	$.ajax({
		type: 'PUT',
		url: 'https://plug.dj/_/users/avatar',
		contentType: 'application/json',
		data: '{"id":"' + (avatar || avatares[cont++%avatares.length].id) + '"}'
	});
}

function velocidade(val){
  window.clearTimeout(thread);
  thread = setInterval(alterarAvatar, velAvatar);
}

function pararAvatar(){
  window.clearTimeout(thread);
  alterarAvatar(anterior);
}
