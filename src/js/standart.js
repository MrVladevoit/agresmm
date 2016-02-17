$(document).ready(function() {
  var owl = $("#owl-blog");
  owl.owlCarousel({
      itemsCustom : [
        [0, 1],
        [600, 2],
        [991, 3],
        [1200, 4],
        [1920, 5]
      ],
      navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
      pagination : false,
      navigation : true
  });
});
// sroll
$(document).ready(function(){
   $('a.btn-next[href*=#]').bind("click", function(e){
    var anchor = $(this);
    $('html, body').stop().animate({
     scrollTop: $(anchor.attr('href')).offset().top
    }, 1000);
    e.preventDefault();
   });
   return false;
});
// up
  $(document).ready(function() {
    $().UItoTop({ easingType: 'easeOutQuart' });
  });