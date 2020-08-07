$(document).ready(function () {

  var owlSlider = $(".slider-owl");

  var paginationObj = $(".pagination");

  var item;
  var items;

  var currentPosition;


  function changePagination(indexEl) {
    paginationObj.find('span').removeClass('active').eq(indexEl - 1).addClass('active');
    $(".move-element").css({
      left: ((36) * (indexEl - 1)) + "px"
    }).find("i").text("0" + (indexEl));
  }

  owlSlider.owlCarousel({
    items: 1,
    nav: false,
    dots: false,
    loop: true,
    smartSpeed: 1000,
    mouseDrag: false,
    onChanged: fixOwlCurrentIdx
  });





  for (let index = 0; index < items; index++) {
    if (index == 0) {
      paginationObj.append("<span class='active' />");
    } else {
      paginationObj.append("<span />");
    }
  }





  function fixOwlCurrentIdx(event) {
    var element = event.target;

    items = event.item.count; // Number of items

    let current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
    let itemsCount = event.item.count;

    if (current > itemsCount || current == 0) {
      current = itemsCount - (current % itemsCount);
    }
    var element = event.target;
    changePagination(current);

    currentPosition = current - 1;

    $(element).find('.owl-item').removeClass("next-el").not('.cloned').eq(current).addClass("next-el");

    console.log(event);
    console.log(event.target);


  }



  paginationObj.on('click', 'span', function () {

    owlSlider.trigger('to.owl.carousel', $(this).index() - 1);
  });

  var timeId;

  paginationObj.on('mouseover', 'span', function () {
    clearTimeout(timeId);

    changePagination($(this).index());
  });

  paginationObj.on('mouseout', function () {
    timeId = setTimeout(function () {

      changePagination(currentPosition + 1);

    }, 100);
  });


  $(".arr-prev").on("click", function () {
    owlSlider.trigger('prev.owl.carousel');
  });
  $(".arr-next").on("click", function () {
    owlSlider.trigger('next.owl.carousel');
  });





  var menuObj = $('.hamburger-container');
  var menuEl = menuObj.find('a');
  var menuIndex;
  var menuImg = menuObj.find('.menu-img');


  $('.hamburger').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).find('span').text('Меню');

      // временно
      menuImg.removeClass('active')
    } else {
      $(this).addClass('active');
      $(this).find('span').text('Закрыть');
    }
  });


  function showMenuImg(index) {
    menuImg.removeClass('active').eq(index).addClass('active');
  }

  menuEl.on('mouseover', function () {
    menuIndex = $(this).index();
    showMenuImg(menuIndex);
  });

});