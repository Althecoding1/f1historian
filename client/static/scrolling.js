let navBottom,
    driverNavTop,
    speed = 0.5;
let circuitNavRange = false;

window.onscroll = (e) => {
  navScrolling();
  if(document.getElementsByClassName('driverNavTopBar')[0]) {
    driverSearchScrolling();
  }
  setDriverYearInfoCard();
};

const navScrolling = () => {
  let nav = document.getElementsByClassName("top-bar")[0],
      banner = document.getElementsByClassName("big-banner")[0],
      scrollArrow = document.getElementsByClassName("arrow")[0],
      overlay = document.getElementsByClassName('banner-container')[0],
      range = 70,
      scrollTop = document.body.scrollTop;
  if (scrollTop > range) {
    nav.classList.add("scrollNav");
    if(overlay) {
      overlay.classList.add('blurred');
    }
    if(scrollArrow) {
      scrollArrow.style.display = 'none';
    }
  }
  else {
    nav.classList.remove("scrollNav");
    if(overlay) {
      overlay.classList.remove("blurred");
    }
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

 const setDriverYearInfoCard = () => {
   let driverNav = document.getElementsByClassName('driverNavTopBar')[0].getBoundingClientRect().bottom;
   let infoBox = document.getElementsByClassName('pageInfoCard')[0];
   let infoBoxTop = infoBox.getBoundingClientRect().top;
   let infoBoxBottom = infoBox.getBoundingClientRect().bottom;
   let circuitNav = document.getElementsByClassName('circuitNavTopBar')[0].getBoundingClientRect().top;
   if(infoBoxTop - driverNav <= 7 && !infoBox.classList.contains('bottomPage')) {
     document.getElementsByClassName('pageInfoCard')[0].classList.add('fixBox');
   }
   if(document.getElementsByClassName('pageInfoCard')[0].classList.contains('fixBox')) {
     if(document.body.scrollTop < 140) {
       document.getElementsByClassName('pageInfoCard')[0].classList.remove('fixBox');
     }
   }
   if(Math.round(circuitNav) - Math.round(infoBoxBottom) <= 40 && !infoBox.classList.contains('bottomPage')) {
     infoBox.classList.add('bottomPage');
     infoBox.classList.remove('fixBox');
   }
 };

 const circuitSearchScrolling = () => {
   let nav = document.getElementsByClassName("top-bar")[0],
   circuitNav = document.getElementsByClassName('circuitNavTopBar')[0],
   navRange = nav.getBoundingClientRect(),
   scrollTop = document.body.scrollTop;
   if((window.pageYOffset) > circuitNavRange) {
     if(!circuitNav.classList.contains('circuitScroll')) {
       circuitNav.classList.add('circuitScroll');
       circuitNav.style.top = circuitNavRange + 100;
   }
 } else {
   if(circuitNav.classList.contains('circuitScroll')) {
     circuitNav.classList.remove('circuitScroll');

   }
 }
 };
