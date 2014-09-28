javascript: (function(){
    var total = 10;
    for (var i = 1; i <= total; i++){
      $('head').append(
          $('<audio/>', {
              id: 'som' + i, src: 'http://www.mrpbrasil.com/Caipira/sons/som' + i + '.mp3'})
      );
    }

    API.on(API.CHAT, function(_){ _.type === 'mention' && 
                      document.getElementById('som' + (Math.floor(Math.random()*total)+1)).play(); });
                      
    function adicionar(val){
        if ( isNaN(val))
            return;
        
        if ( val <= total ){
            API.chatLog('Nenhum som para adicionar!', true);
            return;
        }
        
        for (var i = total+1; i <= val; i++){
             $('head').append(
                  $('<audio/>', {
                      id: 'som' + i, src: 'http://www.mrpbrasil.com/Caipira/sons/som' + i + '.mp3'})
              );
        }
        total = val;
        API.chatLog('Som(s) adicionado(s).', false);
    };
    
    function tocar(val){
        if ( val && val >= 1 && val <= total)
            document.getElementById('som' + val).play();
        else
            API.chatLog('Valor inválido', true);
    };
    
    function comando(obj){
        var arr = obj.split(" ");
        
        if ( !arr )
            return;
        
        if ( !arr[1]){
            API.chatLog('Parâmetro ausente (add/play)', true);
            return;
        }
        
        arr[0] = arr[0].toLowerCase();
        
        if ( arr[0] == '/add')
            adicionar(parseInt(arr[1]));
        
        if ( arr[0] == '/play')
            tocar(parseInt(arr[1]));
    };
    
    API.on(API.CHAT_COMMAND, comando);
})();
