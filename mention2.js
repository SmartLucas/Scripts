    var total = 12,
        escolhido = 0,
        sons = [];
        
    for (var i = 1; i <= total; i++){
        var temp = document.createElement('audio');
        temp.setAttribute('src','http://www.mrpbrasil.com/Caipira/sons/som' + i + '.mp3');
        temp.volume = 1;
        
        sons.push(temp);
    }

    function mencao(obj){
        if (obj.type == 'mention')
            sons[( escolhido == 0 ? (Math.floor(Math.random()*sons.length)) : escolhido-1)].play();
    };
    
    function adicionar(val){
        if ( isNaN(val))
            return;
        
        if ( val <= 0 ){
            API.chatLog('Nenhum som para adicionar!', true);
            return;
        }
        
        if ( val <= sons.length ){
            var temp = document.createElement('audio');
            temp.setAttribute('src','http://www.mrpbrasil.com/Caipira/sons/som' + val + '.mp3');
            temp.volume = 1;

            sons[val-1] = temp;
        }
        else{
            for (var i = total+1; i <= val; i++){
                var temp = document.createElement('audio');
                temp.setAttribute('src','http://www.mrpbrasil.com/Caipira/sons/som' + i + '.mp3');
                temp.volume = 1;
                
                sons.push(temp);
            }
        }
        API.chatLog('Som(s) adicionado(s).', false);
    };
    
    function link(val){
        if (!val)
            return;
        
        var temp = document.createElement('audio');
        temp.setAttribute('src',val);
        temp.volume = 1;
                
        sons.push(temp);

        API.chatLog('Som(s) adicionado(s).', false);
    };
    
    function setSom(val){
        if ( isNaN(val) || val < 0 || val > sons.length){
            API.chatLog('Som inválido!', true);
            return;
        }
        
        escolhido = val;
        API.chatLog('Som definido: ' + (val == 0 ? ' aleatório' : val), false);
    }
    
    function tocar(val){
        if ( !isNaN(val) && val >= 0 && val <= sons.length)
            sons[( val == 0 ? (Math.floor(Math.random()*sons.length)) : val-1)].play();
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
    
    API.on(API.CHAT, mencao);
    API.on(API.CHAT_COMMAND, comando);
    
    API.chatLog('Delícia de menção ativada, cara!', true);
    API.chatLog('Comandos: /play [0-12] = toca o som correspondente ao número, 0 para aleatório;', true);
    API.chatLog('/set [0-12] = define um som fixo para tocar quando for mencionado, 0 para aleatório', true);
