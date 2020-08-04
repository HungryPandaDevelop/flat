$(document).ready(function () {

  var stopFlag = 1;

  var slider = {
    objWrap: $(".slider-class"),
    objEl: $(".slider-class .item"),
    count: 0,
    maxSize: function () {
      return slider.objEl.length - 1;
    },
    timeAnimation: 750,
    movementFlag: 1,
    increaseCount: function () {
      if (this.maxSize() > this.count) {
        this.count++;
      } else {
        this.count = 0;
      }
    },
    decreaseCount: function () {
      if (this.count > 0) {
        this.count--;
      } else {
        this.count = this.maxSize();
      }
    },
    movementNext: function () {

      if (stopFlag == 1) {

        this.movementFlag = 1;
        this.changeSlider();
        this.increaseCount();
        this.objWrap.removeClass("move-right");

        setTimeout(function () {
          stopFlag = 1;
        }, 750);
      }
    },
    movementPrev: function () {

      if (stopFlag == 1) {

        this.movementFlag = 0;
        this.changeSlider();
        this.decreaseCount();
        this.objWrap.addClass("move-right");

        setTimeout(function () {
          stopFlag = 1;
        }, 750);
      }

    },
    changeSlider: function () {

      stopFlag = 0;
      $(".slider-class .item.active").addClass("active-prev");

      this.objEl.removeClass("active").eq(this.count).addClass("active");


      clearTimeout(removeActive);
      var tempEl = this.objEl;
      var removeActive = setTimeout(function () {
        tempEl.removeClass("active-prev");
      }, this.timeAnimation);
    }
  }

  slider.movementNext();

  var windowWidth = $(window).width();
  slider.objEl.find("img").width(windowWidth);

  $(".arr-next").on("click", function () {
    slider.movementNext();
  });
  $(".arr-prev").on("click", function () {
    slider.movementPrev();
  });
});