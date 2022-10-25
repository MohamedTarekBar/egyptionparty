import "./lib/jquery-3.6.1.min.js";
import "./lib/bootstrap.bundle.min.js";

// slider
let openNavSlider = $("#openNavSlider");
let closeNavSlider = $("#closeNavSlider");
let navSlider = $(".nav-slider");
let sectionsContainer = $(".sections");
// collapse
let collapse = $(".collapse-container");
// duration
let days = $(".days");
let hours = $(".hours");
let minutes = $(".minutes");
let seconds = $(".seconds");
// Contact
let messagetextArea = $("#messagetextArea");
let messagetextAreaCounter = $("#messagetextAreaCounter");

$(window).on("load", function () {
  toggleSlideNav();
  toggleCollapse();
  useDateVariance();
  limitMyText(100);
  animateScroll();
});

function toggleSlideNav() {
  openNavSlider.on("click", function () {
    if (navSlider.css("display") == "none") {
      navSlider.css("left", -navSlider.width());
      let percent = 1;
      let add_width = percent * sectionsContainer.parent().width();
      sectionsContainer.animate(
        { width: add_width - navSlider.width() + "px" },
        500,
        () => {
          sectionsContainer.css("width", `calc(100% - ${navSlider.width()}px)`);
        }
      );
      navSlider.css("display", "flex").animate({ left: 0 }, 450, () => {});
    }
  });
  closeNavSlider.on("click", function () {
    if (navSlider.css("display") == "flex") {
      let percent = 1;
      let add_width = percent * sectionsContainer.parent().width();
      sectionsContainer.animate({ width: add_width }, 450, () => {
        sectionsContainer.css("width", `100%`);
      });
      navSlider.animate({ left: -navSlider.width() }, 500, null, () => {
        navSlider.css("display", "none");
      });
    }
  });
}

function toggleCollapse() {
  collapse.children().on("click", (e) => {
    let head = $(e.target);
    if (head.attr("collapse") != "open") {
      $(".collapse-container .content").slideUp();
      $(".collapse-container .head").removeAttr("collapse");
      head.attr("collapse", "open");
      head.siblings().slideDown();
    }
  });
  $(window).on("click", (e) => {
    if (!$(e.target).hasClass("head")) {
      $(".collapse-container .content").slideUp();
    }
  });
}

class countMyDate {
  constructor(date) {
    this.fixedDate = new Date(date).getTime();
    this.current = new Date().getTime();
    this.timeleft = this.fixedDate - this.current;
  }
  getDays() {
    return Math.floor(this.timeleft / (1000 * 60 * 60 * 24));
  }
  getHours() {
    return Math.floor(
      (this.timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
  }
  getMinutes() {
    return Math.floor((this.timeleft % (1000 * 60 * 60)) / (1000 * 60));
  }
  getSeconds() {
    return Math.floor((this.timeleft % (1000 * 60)) / 1000);
  }
}

function useDateVariance() {
  setInterval(() => {
    let variance = new countMyDate("Oct 25, 2022 23:37:52");
    let d = variance.getDays();
    let h = variance.getHours();
    let m = variance.getMinutes();
    let s = variance.getSeconds();
    days.html(`${d} D`);
    hours.html(`${h} H`);
    minutes.html(`${m} M`);
    seconds.html(`${s} S`);
  }, 1000);
}

function limitMyText(limit) {
  messagetextAreaCounter.html(limit);
  messagetextArea.on("input", function (e) {
    messagetextArea.val(messagetextArea.val().substring(0, limit));
    var limitchar = limit - $(this).val().length;
    messagetextAreaCounter.html(limitchar);
  });
}

function animateScroll() {
  var body = $("html, body");
  $('.list ul li a').on('click',(e)=>{
    let sectionTop = $($(e.target).attr('href')).offset().top
    body.stop().animate({scrollTop:sectionTop}, 500, 'swing');
  })
}
