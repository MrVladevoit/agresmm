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