// what does "Auto Header" mean, goto https://www.yahoo.com/
// scroll down and you will see the purple part auto fixed to top,
// while when scroll up, it restores and does not be fixed.
// 1. multiple auto header elements handled
// 2. dynamically create/remove elements issue handled
// 3. no unnecessary dom operation, high performance
// usage: just add 'class="auto-header"' to any element you want to auto header
// suggest set each auto-header element specific width and height
// do not guarantee it works when resize or scroll left/right
$(document).ready(function() {
  var rawTops = [],
    rawLefts = [],
    rawStyles = [],
    $locations = [], // record next sibling so that element easily find where to restore
    fixed = []; // mark whether this element is fixed

  $(".auto-header").each(function() {
    var $this = $(this),
      offset = $this.offset();
    rawTops.push(offset.top);
    rawLefts.push(offset.left);
    rawStyles.push($this.attr("style"));
    $locations.push($this.siblings().eq($this.index()));
    fixed.push(false);
  });

  $(window).on("scroll", function() {
    $(".auto-header").each(function(i, e) {
      if(!fixed[i] && $(window).scrollTop() > rawTops[i]) {
        var $te = $(this).clone(true);
        $(this).remove();
        $locations[i].before($te);
        $te.css({
          "position": "fixed",
          "top": 0,
          "left": rawLefts[i],
          "z-index": 100
        });
        fixed[i] = true;
      } else if(fixed[i] && $(window).scrollTop() < rawTops[i]) {
        $(this).removeAttr("style").attr("style", rawStyles[i]);
        fixed[i] = false;
      }
    });
  });
});
