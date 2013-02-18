$('body *').live('mouseover mouseout', function(event) {
    if (event.type == 'mouseover') {
        $(this).data('bgcolor', $(this).css('background-color'));
        $(this).css('background-color','rgba(255,0,0,.5)');
    } else {
        $(this).css('background-color', $(this).data('bgcolor'));
    }
    return false;
});