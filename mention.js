javascript: (function(){
  
    for (var i = 1; i <= 8; i++){
      $('head').append(
          $('<audio/>', {
              id: 'som' + i, src: 'http://www.mrpbrasil.com/Caipira/sons/som' + i + '.mp3'})
      );
    }

    API.on(API.CHAT, function(_){ _.type === 'mention' && 
                      document.getElementById('som' + (Math.floor(Math.random()*8)+1)).play(); }) })();
