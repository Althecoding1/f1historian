let navBottom,
    driverNavTop,
    speed = 0.5;
    let parallax = document.querySelectorAll('.parallax');
window.onscroll = (e) => {
  navScrolling();
  if(document.getElementsByClassName('driverNavTopBar')[0]) {
    driverSearchScrolling();
  }
};

const navScrolling = () => {
  let nav = document.getElementsByClassName("top-bar")[0],
      banner = document.getElementsByClassName("big-banner")[0],
      scrollArrow = document.getElementsByClassName("arrow")[0],
      range = 70,
      scrollTop = document.body.scrollTop;
  if (scrollTop > range) {
    nav.classList.add("scrollNav");
    if(scrollArrow) {
      scrollArrow.style.display = 'none';
    }
  }
  else {
    nav.classList.remove("scrollNav");
      if(scrollArrow) {
        scrollArrow.style.display = "block";
      }
  }
};

 const driverSearchScrolling = () => {
   let nav = document.getElementsByClassName("top-bar")[0],
   driverNav = document.getElementsByClassName('driverNavTopBar')[0],
   navRange = nav.getBoundingClientRect(),
   scrollTop = document.body.scrollTop,
   driverNavRange = driverNav.getBoundingClientRect();
   if(!navBottom && !driverNavTop) {
     navBottom = navRange.bottom;
     driverNavTop = driverNavRange.top;
   }

  if(navBottom + scrollTop >= driverNavTop) {
   if(!driverNav.classList.contains('driverScroll')) {
     driverNav.classList.add('driverScroll');
     if(window.outerWidth < 781 && !driverNav.classList.contains('responsive')) {
       driverNav.classList.add('responsive');
     }
   }
  } else {
   if(driverNav.classList.contains('driverScroll')) {
     driverNav.classList.remove('driverScroll');
     if(driverNav.classList.contains('responsive')) {
       driverNav.classList.remove('responsive');
     }
   }
  }
 };
