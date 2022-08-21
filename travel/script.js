/*      ----!      Hamburger menu     !---- */

const hamburgerBtn = document.querySelector(".hamburger-btn");
const navMobileWrapper = document.querySelector(".nav-mobile-wrapper");

function toggleHamburgerMenu() {
  hamburgerBtn.classList.toggle("open");
  navMobileWrapper.classList.toggle("open");
}
hamburgerBtn.addEventListener("click", toggleHamburgerMenu);

const navMobileLinks = document.querySelectorAll(".nav-link");
const navMobile = document.querySelector(".nav-mobile");

function closeAdaptiveMenu(event) {
  if (event.target.classList.contains("nav-link")) {
    hamburgerBtn.classList.remove("open");
    navMobileWrapper.classList.remove("open");
  }
}

navMobile.addEventListener("click", closeAdaptiveMenu);

hamburgerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", function (event) {
  const target = event.target;
  const its_menu =
    target == navMobileWrapper || navMobileWrapper.contains(target);
  const its_btnMenu = target == hamburgerBtn;
  const menu_is_active = navMobileWrapper.classList.contains("open");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    hamburgerBtn.classList.remove("open");
    navMobileWrapper.classList.remove("open");
  }
});

/*    ---------!    Slider     !--------- */

const sliderItemRight = document.getElementById("slider-item-right");
const sliderItemLeft = document.getElementById("slider-item-left");
const SLIDER = document.querySelector(".slider");

const mediaQuery = window.matchMedia("(min-width: 391px)");

const circleItemRight = document.getElementById("circle-item-right");
const circleItemLeft = document.getElementById("circle-item-left");
const circleItemMiddle = document.getElementById("circle-item-middle");

const logger = () => {
  console.log("клик прошёл");
  if (mediaQuery.matches) {
    console.log("медиа запрос условие есть!");
  }
};

const transitionRight = () => {
  if (mediaQuery.matches) {
    SLIDER.classList.toggle("transition-left");
    logger();
    changeColorCircle(circleItemRight);
  }
};

const transitionLeft = () => {
  if (mediaQuery.matches) {
    SLIDER.classList.toggle("transition-right");
    logger();
    changeColorCircle(circleItemLeft);
  }
};

const changeColorCircle = (circleItem) => {
  circleItem.classList.toggle("active");
  circleItemMiddle.classList.toggle("active");
};

sliderItemRight.addEventListener("click", transitionRight);
sliderItemLeft.addEventListener("click", transitionLeft);

const BTN_RIGHT_SLIDER = document.querySelector(".slider-right-arrow");
const BTN_LEFT_SLIDER = document.querySelector(".slider-left-arrow");

let positionCounter = 0;

const transitionRightMobile = () => {
  if (positionCounter === 0) {
    SLIDER.classList.add("transition-left");
    positionCounter++;

    changeColorCircleMobileRight(positionCounter);
    changeOpacityArrowRightRow(positionCounter);

    console.log(positionCounter);
  } else if (positionCounter === 1) {
    SLIDER.classList.add("transition-left-end");
    SLIDER.classList.remove("transition-left");

    positionCounter++;

    changeColorCircleMobileRight(positionCounter);
    changeOpacityArrowRightRow(positionCounter);

    console.log(positionCounter);
  }
};

const transitionLeftMobile = () => {
  if (positionCounter === 1) {
    SLIDER.classList.remove("transition-left");
    SLIDER.classList.remove("transition-right-end");
    SLIDER.classList.add("transition-right");

    changeColorCircleMobileLeft(positionCounter);
    changeOpacityArrowRightRow(positionCounter);

    positionCounter--;

    console.log(positionCounter);
  } else if (positionCounter === 2) {
    SLIDER.classList.remove("transition-left-end");
    SLIDER.classList.add("transition-right-end");

    changeColorCircleMobileLeft(positionCounter);
    changeOpacityArrowRightRow(positionCounter);
    positionCounter--;

    console.log(positionCounter);
  }
};

const changeColorCircleMobileRight = (positionCounter) => {
  const circleItemsArray = [circleItemLeft, circleItemMiddle, circleItemRight];
  circleItemsArray[positionCounter - 1].classList.remove("active-mobile");
  circleItemsArray[positionCounter].classList.add("active-mobile");
};

const changeColorCircleMobileLeft = (positionCounter) => {
  const circleItemsArray = [circleItemLeft, circleItemMiddle, circleItemRight];
  circleItemsArray[positionCounter].classList.remove("active-mobile");
  circleItemsArray[positionCounter - 1].classList.add("active-mobile");
};

const changeOpacityArrowRightRow = (positionCounter) => {
  const sliderLeftArrow = document.querySelector(".slider-left-arrow");
  const sliderRightArrow = document.querySelector(".slider-right-arrow");

  if (positionCounter === 1) {
    sliderLeftArrow.classList.toggle("disable");
  } else if (positionCounter === 2) {
    sliderRightArrow.classList.toggle("disable");
  }
};

BTN_RIGHT_SLIDER.addEventListener("click", transitionRightMobile);
BTN_LEFT_SLIDER.addEventListener("click", transitionLeftMobile);

/*    -----------!    POP-UP     !----------------- */

const HEADER_BTN = document.querySelector(".header-btn");
const ACCOUNT_MOBILE = document.getElementById("account-mobile");
const POPUP = document.querySelector(".pop-up");

const togglePopup = () => {
  POPUP.classList.toggle("active");
};

HEADER_BTN.addEventListener("click", togglePopup);
ACCOUNT_MOBILE.addEventListener("click", togglePopup);

HEADER_BTN.addEventListener("click", (e) => {
  e.stopPropagation();
});

ACCOUNT_MOBILE.addEventListener("click", (e) => {
  e.stopPropagation();
  navMobileWrapper.classList.remove("open");
  hamburgerBtn.classList.remove("open");
});

document.addEventListener("click", function (event) {
  // if (mediaQuery.matches) {
  // console.log("Клик ПопАпа");
  const target = event.target;
  const its_menu = target == POPUP || POPUP.contains(target);
  const its_btnMenu = target == HEADER_BTN;
  const menu_is_active = POPUP.classList.contains("active");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    HEADER_BTN.classList.remove("active");
    POPUP.classList.remove("active");
  }
});

const BTN_SIGN_IN = document.getElementById("Sign-in");

const showLoginAndPass = () => {
  const email = document.getElementsByTagName("input")[0].value;
  const password = document.getElementsByTagName("input")[1].value;
  alert("Ваши данные: \nEmail: " + email + "\nPassword: " + password + "\nНадеюсь, никто из рядом сидящих не увидел ваш пароль");
  };

BTN_SIGN_IN.addEventListener("click", showLoginAndPass);
