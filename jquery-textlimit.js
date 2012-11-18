/**
 * Textlimit plugin
 * show only first X characters, expandable by clicking a link
 */
$.fn.textlimit = function (options) {
  return this.each(function () {
    var $context = $(this)
      , o = $.extend({}, { 
          limit: 200, 
          moreText: '<a>more&nbsp;&raquo;</a>'
        }, options)
      , $elems = $context.children()
      , n = $elems.length
      
    if (n > 0) {
      var total = 0
        , len = 0
        , text = '', preview = '', rest = ''
        , $el = null
      for (var i = 0; i < n; i++) {
         $el = $elems.eq(i)
         text = $el.text()
         len = text.length
         if ((total + len) > o.limit) {
           preview = text.slice(0, (o.limit - total))
           rest = text.slice(o.limit - total)
           total += len
           break
         }
         total += len
      }
      
      if (total > o.limit) {
        var $preview = $('<span class="preview"></span>').text(preview)
          , $rest = $('<span class="rest show-active"></span>').text(rest)
          , $control = $('<span class="link-more hide-active">...<span class="hide-active">'+ o.moreText +'</span></span>')

        // reassemble the text
        $el
          .empty()
          .append($preview)
          .append($rest)
          .append($control)
        
        // wrap the rest of elements
        if ((n - i) > 1) {
          $elems.slice(i + 1).wrapAll('<div class="show-active"></div>')
        }
        $control.bind('click', function () {
          if ($context.hasClass('s-active')) {
            $context.removeClass('s-active');
          } else {
            $context.addClass('s-active');
          }
        })
      }
    }
  })
}
