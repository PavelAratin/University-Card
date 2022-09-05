/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById('grafic').getContext('2d');
  var slider = document.querySelector('.js-swiper');
  var contentBlock = document.querySelector('.js-content');
  var bodyBlock = document.querySelector('.js-body');
  var contentLeftBlock = document.querySelector('.js-content-left');
  var allcityBlock = document.querySelector('.js-allcity-block');
  var locationsDropdownBlock = document.querySelector('.js-locations-dropdown');
  var locationTown = document.querySelector('.js-location-town');
  var fetchUrl = 'https://api.hh.ru/areas/113';
  var mySwiper;
  ctx.canvas.parentNode.style.height = "307px";
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
      datasets: [{
        label: 'Проходной бал на бюджет',
        backgroundColor: 'rgba(6, 86, 180, 0.6)',
        // borderColor: 'rgba(6, 86, 180, 0.6)',
        data: [30, 110, 130, 210, 50, 160, 140, 10, 11, 155],
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: 'rgba(6, 86, 180, 0.6)',
        pointHoverBackgroundColor: 'rgba(6, 86, 180, 0.6)',
        pointHoverBorderWidth: 4
      }, {
        label: 'Проходной бал на бюджет',
        backgroundColor: 'rgba(171, 200, 234, 0.6)',
        borderColor: 'rgb(36,162,254)',
        borderWidth: 1,
        data: [110, 200, 102, 215, 160, 140, 205, 160, 0, 200],
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: 'rgba(6, 86, 180, 0.6)',
        pointHoverBackgroundColor: 'rgba(6, 86, 180, 0.6)',
        pointHoverBorderWidth: 4
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          yAlign: 'bottom',
          displayColors: false,
          padding: 26,
          backgroundColor: 'white',
          bodyColor: '#000000',
          callbacks: {
            title: function title(context) {
              return '';
            }
          }
        }
      }
    }
  });

  function mobileSlider() {
    if (window.innerWidth <= 768 && slider.dataset.mobile == 'false') {
      mySwiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        wrapperClass: 'speciality-swiper__wrapper',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
      slider.dataset.mobile == 'true';
      slider.querySelector('.speciality-swiper__wrapper').classList.remove('active');
    }

    if (window.innerWidth > 768) {
      slider.dataset.mobile == 'false';

      if (slider.classList.contains('swiper-initialized')) {
        slider.querySelector('.speciality-swiper__wrapper').classList.add('active');
        mySwiper.destroy(false, true);
      }
    }
  }

  mobileSlider();

  function fixMenuBlock() {
    var scrollDistance = window.scrollY;
    var scrollMenuBlock = document.querySelector('.js-scroll-menu');
    var scrollMenuHtml = "\n    <div class=\"scroll-menu js-scroll-menu\">\n    <div class=\"container scroll-menu__container\">\n      <div class=\"scroll-menu__wrapper\">\n        <p class=\"scroll-menu__title\">\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u0438\u0439 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442 \u0438\u043C\u0435\u043D\u0438 \u041D.\u042D.\u0411\xE1\u0443\u043C\u0430\u043D\u0430</p>\n        <ul class=\"adress-list adress-list__scroll-menu\">\n          <li class=\"adress-list__item\">\n            <p class=\"adress-list__text\">\u041C\u043E\u0441\u043A\u0432\u0430, \u0443\u043B. \u041D\u043E\u0432\u043E\u0447\u0435\u0440\u0435\u043C\u0443\u0448\u043A\u0438\u043D\u0441\u043A\u0430\u044F, \u0434. 69</p>\n          </li>\n          <li class=\"adress-list__item\">\n            <p class=\"adress-list__text\">\u041F\u0440\u0438\u0435\u043C\u043D\u0430\u044F \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044F: <a href=\"tel:+74991812133\">7 (499) 181 21 33</a></p>\n          </li>\n        </ul>\n      </div>\n      <button class=\"button-in-favorites scroll-menu__button-in-favorites\">\n      <svg class=\"heart-svg header__heart-svg\" width=\"15\" height=\"15\" viewBox=\"0 0 15 15\" fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\">\n      <path\n        d=\"M7.5 14.0125L6.4125 13.0225C2.55 9.52 0 7.21 0 4.375C0 2.065 1.815 0.25 4.125 0.25C5.43 0.25 6.6825 0.8575 7.5 1.8175C8.3175 0.8575 9.57 0.25 10.875 0.25C13.185 0.25 15 2.065 15 4.375C15 7.21 12.45 9.52 8.5875 13.03L7.5 14.0125Z\"\n        fill=\"#A7A7A7\" />\n    </svg>\n        <span>\u0412 \u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</span>\n      </button>\n    </div>\n  </div>\n    ";

    if (scrollDistance >= contentBlock.offsetTop - 97) {
      bodyBlock.insertAdjacentHTML('afterbegin', scrollMenuHtml);
      contentLeftBlock.classList.add('fix');
    } else {
      contentLeftBlock.classList.remove('fix');
    }

    if (scrollMenuBlock) {
      scrollMenuBlock.remove();
    }
  }

  window.addEventListener('resize', function () {
    mobileSlider();
  });
  window.addEventListener('scroll', function () {
    fixMenuBlock();
  });

  function htmlCityItem(data) {
    console.log(data.areas.length);
    return "\n      <div class=\"locations-dropdown__citys\">\n        <span class=\"locations-dropdown__city-name\">".concat(data.areas.length ? data.areas[0].name : '', "</span>\n        <span class=\"locations-dropdown__city-state\">").concat(data.areas.length ? data.name : '', "</span>\n      </div>\n      ");
  }

  locationTown.addEventListener('click', function () {
    locationsDropdownBlock.classList.toggle('active');
    fetch(fetchUrl).then(function (response) {
      return response.json();
    }).then(function (body) {
      var areas = body.areas;
      setTimeout(function () {
        document.querySelector('.spinner').remove();
        areas.forEach(function (item) {
          allcityBlock.innerHTML += htmlCityItem(item);
          var cityNames = document.querySelectorAll('.locations-dropdown__city-name');
          document.querySelector('.locations-dropdown__input').focus();
          searctCity(cityNames);
        });
      }, 2000);
    })["catch"](function (err) {
      console.log(err.message);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.header__locations')) {
      locationsDropdownBlock.classList.remove('active');
    }
  });

  function blockSpinner() {
    var html = "\n     <div class=\"spinner\">\n        <img src=\"img/spinner.svg\"></img>\n     </div>\n    ";
    allcityBlock.insertAdjacentHTML('beforebegin', html);
  }

  blockSpinner();

  function searctCity(citys) {
    var input = document.querySelector('.locations-dropdown__input');
    var dropdownCitys = document.querySelectorAll('.locations-dropdown__citys');

    input.oninput = function () {
      var valueInput = this.value.trim();

      if (valueInput != '') {
        citys.forEach(function (city) {
          if (city.innerText.search(valueInput) == -1) {
            city.closest('.locations-dropdown__citys').classList.add('hide');
          }
        });
      } else {
        citys.forEach(function (city) {
          city.closest('.locations-dropdown__citys').classList.remove('hide');
        });
      }

      input.addEventListener('keyup', function (e) {
        if (e.keyCode === 8) {
          citys.forEach(function (city) {
            if (city.innerText.search(valueInput) == -1) {
              city.closest('.locations-dropdown__citys').classList.remove('hide');
            }
          });
        }
      });
    };

    var selectedSity = document.querySelector('.locations-dropdown__selected-city');
    dropdownCitys.forEach(function (item) {
      item.addEventListener('click', function () {
        var button = document.createElement('button');
        button.classList.add('locations-dropdown__button');
        button.classList.add('locations-dropdown__button--shields');
        button.innerHTML = item.querySelector('.locations-dropdown__city-name').textContent;

        button.onclick = function () {
          this.style.display = 'none';
        };

        selectedSity.appendChild(button);
      });
    });
  }

  var navListWrapper = document.querySelector('.js-nav-list');
  var navItems = document.querySelectorAll('.nav__item');
  var navButtons = document.querySelectorAll('.nav__button');
  var count = 10;
  navButtons.forEach(function (btn, index) {
    if (index === 1) {
      btn.classList.remove('disactive');
    }

    btn.addEventListener('click', function () {
      var sumWidth = 0;
      navItems.forEach(function (item, index) {
        if (index + 1 >= count) {
          sumWidth += Math.floor(item.getBoundingClientRect().width);
        }
      });
      navListWrapper.style.cssText = "transform:translateX(".concat(-sumWidth - -50, "px);");
      navButtons.forEach(function (button) {
        button.classList.remove('disactive');
      });
      this.classList.add('disactive');

      if (btn.classList.contains('nav__button--left')) {
        navListWrapper.style.cssText = "transform:translateX(".concat(0, "px);");
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=main.js.map
//# sourceMappingURL=main.js.map
