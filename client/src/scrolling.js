window.onscroll = function(e) {
  console.log('testing');
  var nav = document.getElementsByClassName("top-bar")[0],
      banner = document.getElementsByClassName("big-banner")[0],
      range = 70,
      scrollTop = document.body.scrollTop;
      console.log(scrollTop);

  if (scrollTop > range) {
      nav.classList.add("scrollNav");
      banner.classList.add("blurred");
    }
    else {
      nav.classList.remove("scrollNav");
      banner.classList.remove("blurred");
  }
};
