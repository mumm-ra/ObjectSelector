Selector = {
	_:{
		already_opened: false
	},
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
				//$(this).data('bgcolor', $(this).css('background-color'));
	        	$(this).addClass('important_color');

				var $parent_clickable = $(this).closest('[onclick]');
				console.log($parent_clickable);
				if ($parent_clickable != []){
					$parent_clickable.data('onclick', $parent_clickable.attr('onclick'));
					$parent_clickable.removeAttr('onclick');
				}
				
				break;
			case 'mouseout':
				//$(this).css('background-color', $(this).data('bgcolor'));
				$(this).removeClass('important_color');
				break;
			case 'click':
					event.stopPropagation();
					event.preventDefault();


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
					$('body').off('mouseover mouseout click','*');

				break;
		}
	    return false;
	}

}

$(document).ready(function(){
	if(!Selector._.already_opened) {
		Selector._.already_opened = true;
    $('body').prepend('<div id="topbar" style="display:none"></div>');
    $('#topbar').load(chrome.extension.getURL('new_object_map/form.html'), function(){
      $(this).slideDown(function(){
        $('#new_object_map').submit(function(e){
          e.preventDefault();
          console.log('clicked!');
        })
      });
    });
	$('body > :not(#topbar)').on('mouseover mouseout click','*', Selector.highlighter);
  }



});
