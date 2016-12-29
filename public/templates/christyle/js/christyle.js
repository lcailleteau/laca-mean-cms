$(document).ready(function () {


  /* ------------------------------------------------------------------ */
  /* Styling for menu, flavour vertical accordion navstack */
  /* ------------------------------------------------------------------ */
  $('.accordion > a').click(function (e) {

    console.log("INSIDE ............  JS laca accordéon !!!!!!");


    e.preventDefault();
    var $ul = $(this).siblings('ul');
    var $li = $(this).parent();
    if ($ul.is(':visible')) $li.removeClass('active');
    else                    $li.addClass('active');
    $ul.slideToggle();
  });

  $('.accordion li.active:first').parents('ul').slideDown();

});
