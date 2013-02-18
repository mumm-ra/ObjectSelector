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
	},
	highlighter: function(event){
		switch (event.type){
			case 'mouseover':
				$(this).data('bgcolor', $(this).css('background-color'));
	        	$(this).css('background-color','rgba(255,0,0,.5)');
				break;
			case 'mouseout':
				$(this).css('background-color', $(this).data('bgcolor'));
				break;
			case 'click':

					element_xpath = Selector.xpath(event);
					element_id = this.id;
					element_class = this.classList.toString();
					element_tag = this.tagName;
					element_name = this.name;
					element_type = this.type;
					element_content = $(this).html();

					console.log("this", this);
					console.log("xpath", element_xpath);
					console.log("id", element_id);
					console.log("class", element_class);
					console.log("tag", element_tag);
					console.log("name", element_name);
					console.log("type", element_type);
					console.log("content", element_content);
					chrome.extension.sendMessage({"xpath": element_xpath}, function(response) {});

				break;
		}
	    return false;
	}

}

$(document).ready(function(){
	
	$('body').on('mouseover mouseout click','*', Selector.highlighter);


});

