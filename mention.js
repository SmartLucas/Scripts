javascript: (function(){ $('head').append($('<audio />', {id: 'ping', src: 'http://www.mrpbrasil.com/Caipira/ContactAuthRequest.wav'})); API.on(API.CHAT, function(_){ _.type === 'mention' && document.getElementById('ping').play(); }) })();
