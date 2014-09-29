javascript: (function(){
    var total = 24,
        escolhido = 0;
        
    for (var i = 1; i <= total; i++){
      $('head').append(
          $('<audio/>', {
              id: 'som' + i, src: 'http://www.mrpbrasil.com/Caipira/sons/som' + i + '.mp3'})
      );
    }

    API.on(API.CHAT, mencao);
    
    function mencao(obj){
        if (obj.type == 'mention')
            document.getElementById('som' + ( escolhido == 0 ? (Math.floor(Math.random()*total)+1) : escolhido)).play();
    };
    
    function adicionar(val){
        if ( isNaN(val))
            return;
        
        if ( val <= 0 ){
            API.chatLog('Nenhum som para adicionar!', true);
            return;
        }
        
        if ( val <= total ){
             if ( document.getElementById('som' + val))
                document.getElementById('som' + val).remove();
            
             $('head').append(
                  $('<audio/>', {
                      id: 'som' + val, src: 'http://www.mrpbrasil.com/Caipira/sons/som' + val + '.mp3'})
              );
        }
        else{
            for (var i = total+1; i <= val; i++){
                 $('head').append(
                      $('<audio/>', {
                          id: 'som' + i, src: 'http://www.mrpbrasil.com/Caipira/sons/som' + i + '.mp3'})
                  );
            }
        }
        total = (val > total ? val : total);
        API.chatLog('Som(s) adicionado(s).', false);
    };
    
    function link(val){
        if (!val)
            return;

        $('head').append(
            $('<audio/>', {
                id: 'som' + ++total, src: val})
        );
        
        API.chatLog('Som(s) adicionado(s).', false);
    };
    
    function setSom(val){
        if ( isNaN(val) || val < 0 || val > total){
            API.chatLog('Som inválido!', true);
            return;
        }
        
        escolhido = val;
        API.chatLog('Som definido: ' + (val == 0 ? ' aleatório' : val), false);
    }
    
    function tocar(val){
        if ( !isNaN(val) && val >= 0 && val <= total)
            document.getElementById('som' + ( val == 0 ? (Math.floor(Math.random()*total)+1) : val)).play();
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
        
        if ( arr[0] == '/set')
            setSom(parseInt(arr[1]));
        
        if ( arr[0] == '/link')
            link(arr[1]);
            
    };
    
    API.on(API.CHAT_COMMAND, comando);
    API.chatLog('Delícia de menção ativada, cara!', true);
    API.chatLog('Comandos: /play [0-' + total + '] = toca o som correspondente ao número, 0 para aleatório; ' +
                '/set [0-' + total + '] = define um som fixo para tocar quando for mencionado, 0 para aleatório (padrão)', true);
})();
