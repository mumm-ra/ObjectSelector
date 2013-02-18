$(document).ready(function(){
	
	$('body').on('mouseover mouseout click','*', function(event) {
		switch (event.type){
			case 'mouseover':
				$(this).data('bgcolor', $(this).css('background-color'));
	        	$(this).css('background-color','rgba(255,0,0,.5)');
				break;
			case 'mouseout':
				//$(this).css('background-color', $(this).data('bgcolor'));
				break;
			case 'click':
					console.log($(this));
					xpath = Selector.xpath(event);
					chrome.extension.sendMessage({"xpath": xpath}, function(response) {});
				break;
		}
	    return false;
	});


});

Selector = {
	xpath: function(event){
	    var hierarchy = [],
	        current = event.toElement||event.target;

	    while (current.parentNode){
	        hierarchy.unshift(current);
	        current = current.parentNode;
	    }
	    var xPath = hierarchy.map(function(el,i){
	            return el.nodeName.toLowerCase() + ((el.id !== '') ? '#'+el.id : '') + ((el.className !== '') ? '.'+el.className.split(' ').join('.') : '');
	        }).join('/');
	
	    return xPath;
	}
}