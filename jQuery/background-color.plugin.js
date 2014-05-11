// get an element's background-color, return background color as string
// usage: var bgColor = $("#my-id").getBackgroundColor();
// please only pass unique element, otherwise it returns the first element's background color
;(function($) {
  $.fn.getBackgroundColor = function() {
    var $this = $(this),
      bgColor = "";
    while($this[0].tagName.toLowerCase() != "html") {
      bgColor = $this.css("background-color");
      if(bgColor != "rgba(0, 0, 0, 0)" && bgColor != "transparent") {
        break;
      }
      $this = $this.parent();
    }
    return bgColor;
  }
})(jQuery);
