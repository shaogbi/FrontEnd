$(document).ready(function() {
  var rawTops = [],
    rawLefts = [],
    rawStyles = [],
    $locations = [],
    flags = [];
  $(".auto-header").each(function() {
    var $this = $(this),
      offset = $this.offset();
    rawTops.push(offset.top);
    rawLefts.push(offset.left);
    rawStyles.push($this.attr("style"));
    $locations.push($this.siblings().eq($this.index()));
    flags.push(false);
  });
  $(window).on("scroll", function() {
    var scrollLeft = $(window).scrollLeft();
    $(".auto-header").each(function(i, e) {
      if($(window).scrollTop() > rawTops[i]) {
        if(!flags[i]) {
          var left = rawLefts[i] - scrollLeft,
            $te = $(this).clone(true);
          $(this).remove();
          $locations[i].before($te);
          $te.css({
            "position": "fixed",
            "top": 0,
            "left": left,
            "z-index": 100
          });
          flags[i] = true;
        }
      } else {
        $(this).removeAttr("style").attr("style", rawStyles[i]);
        flags[i] = false;
      }
    });
  });
});
