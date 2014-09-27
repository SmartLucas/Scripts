Exemplo 1 - ativa o ciclo, pula o dj, desativa o ciclo, move para primeiro

// início exemplo 1

var resul = null;
		
$.ajax({	// Pegar ID's necessários para pular
	type: 'GET',
	url: 'https://plug.dj/_/rooms/state',
	contentType: 'application/json'}
	).done(function( msg ) {
		resul = msg.data[0];
		
		$.ajax({	// Ativar o ciclo de DJ's
			type: 'PUT',
			url: 'https://plug.dj/_/booth/cycle',
			contentType: 'application/json',
			data: '{"shouldCycle":true}'}
			).done(function( msg ) {
				$.ajax({	// Pular o DJ
					type: 'POST',
					url: 'https://plug.dj/_/booth/skip',
					contentType: 'application/json',
					data: '{"userID":' + resul.booth.currentDJ + ',"historyID":"' + resul.playback.historyID + '"}'}
					).done(function( msg ) {
						$.ajax({	// Desativar o ciclo de DJ's
							type: 'PUT',
							url: 'https://plug.dj/_/booth/cycle',
							contentType: 'application/json',
							data: '{"shouldCycle":false}'}
							).done(function( msg ) {
								$.ajax({	// Mover o usuário (opcional)
									type: 'POST',
									url: 'https://plug.dj/_/booth/move',
									contentType: 'application/json',
									data: '{"userID":"' + resul.booth.currentDJ + '","position":0}'} // position 0 = move pra 1º na fila
									).done(function( msg ) {
										console.log(msg);
								});
						});
				});
		});
});


// fim exemplo 1

Exemplo 2 = ativa o ciclo, pula o dj, desativa o ciclo

// início exemplo 2

var resul = null;
		
$.ajax({	// Pegar ID's necessários para pular
	type: 'GET',
	url: 'https://plug.dj/_/rooms/state',
	contentType: 'application/json'}
	).done(function( msg ) {
		resul = msg.data[0];
		
		$.ajax({	// Ativar o ciclo de DJ's
			type: 'PUT',
			url: 'https://plug.dj/_/booth/cycle',
			contentType: 'application/json',
			data: '{"shouldCycle":true}'}
			).done(function( msg ) {
				$.ajax({	// Pular o DJ
					type: 'POST',
					url: 'https://plug.dj/_/booth/skip',
					contentType: 'application/json',
					data: '{"userID":' + resul.booth.currentDJ + ',"historyID":"' + resul.playback.historyID + '"}'}
					).done(function( msg ) {
						$.ajax({	// Desativar o ciclo de DJ's
							type: 'PUT',
							url: 'https://plug.dj/_/booth/cycle',
							contentType: 'application/json',
							data: '{"shouldCycle":false}'								
						});
				});
		});
});

// fim exemplo 2
