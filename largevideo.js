(function(){
	function getIdealWidth(){
		var ck = document.getElementById("app").style.width;
        return (parseInt(ck.substring(0, ck.length-2)) - $('.app-right').width()) + 'px';
	}
	
	function getIdealHeight(){
		var cs =  document.getElementById('app').style.height;
		return (parseInt(cs.substring(0, cs.length-2)) - 108) + 'px';
	}
	
    function fullVideo() {
        //select the first element inside '#playback'
        //and the first element in '#playback-container'
        $('#playback:first, #playback-container:first')

		
        //modify the css in all selected elements at the same time
        .css("left", "0px")
        .css("height", getIdealHeight())
        .css("width", getIdealWidth());
        
        $('#audience:first, #dj-booth:first').css("display", "none");
        
        $('#dj-button:first, #vote:first')
        .css('top', 'inherit')
        .css('bottom', '60px');
    }

    fullVideo();

    window.onresize = fullVideo;

    setInterval(function() {
        if ($('#playback-container')[0].style.width != getIdealWidth()) {
            fullVideo();
        }
    }, 500);
})();
