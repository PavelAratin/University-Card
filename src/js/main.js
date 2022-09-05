document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('grafic').getContext('2d');
  const slider = document.querySelector('.js-swiper');
  const contentBlock = document.querySelector('.js-content');
  const bodyBlock = document.querySelector('.js-body');
  const contentLeftBlock = document.querySelector('.js-content-left');
  const allcityBlock = document.querySelector('.js-allcity-block');
  const locationsDropdownBlock = document.querySelector('.js-locations-dropdown');
  const locationTown = document.querySelector('.js-location-town');
  const fetchUrl = 'https://api.hh.ru/areas/113';
  let mySwiper;
  ctx.canvas.parentNode.style.height = "307px";

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
      datasets: [
        {
          label: 'Проходной бал на бюджет',
          backgroundColor: 'rgba(6, 86, 180, 0.6)',
          // borderColor: 'rgba(6, 86, 180, 0.6)',
          data: [30, 110, 130, 210, 50, 160, 140, 10, 11, 155],
          fill: true,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: 'rgba(6, 86, 180, 0.6)',
          pointHoverBackgroundColor: 'rgba(6, 86, 180, 0.6)',
          pointHoverBorderWidth: 4
        },
        {
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
        }
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          yAlign: 'bottom',
          displayColors: false,
          padding: 26,
          backgroundColor: 'white',
          bodyColor: '#000000',
          callbacks: {
            title: function (context) {
              return ''
            },
          }
        }
      }
    }
  })

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
        },
      });
      slider.dataset.mobile == 'true'
      slider.querySelector('.speciality-swiper__wrapper').classList.remove('active')
    }
    if (window.innerWidth > 768) {
      slider.dataset.mobile == 'false';
      if (slider.classList.contains('swiper-initialized')) {
        slider.querySelector('.speciality-swiper__wrapper').classList.add('active')
        mySwiper.destroy(false, true)
      }
    }
  }
  mobileSlider()

  function fixMenuBlock() {
    let scrollDistance = window.scrollY;
    let scrollMenuBlock = document.querySelector('.js-scroll-menu')
    let scrollMenuHtml = `
    <div class="scroll-menu js-scroll-menu">
    <div class="container scroll-menu__container">
      <div class="scroll-menu__wrapper">
        <p class="scroll-menu__title">Московский государственный технический университет имени Н.Э.Бáумана</p>
        <ul class="adress-list adress-list__scroll-menu">
          <li class="adress-list__item">
            <p class="adress-list__text">Москва, ул. Новочеремушкинская, д. 69</p>
          </li>
          <li class="adress-list__item">
            <p class="adress-list__text">Приемная комиссия: <a href="tel:+74991812133">7 (499) 181 21 33</a></p>
          </li>
        </ul>
      </div>
      <button class="button-in-favorites scroll-menu__button-in-favorites">
      <svg class="heart-svg header__heart-svg" width="15" height="15" viewBox="0 0 15 15" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 14.0125L6.4125 13.0225C2.55 9.52 0 7.21 0 4.375C0 2.065 1.815 0.25 4.125 0.25C5.43 0.25 6.6825 0.8575 7.5 1.8175C8.3175 0.8575 9.57 0.25 10.875 0.25C13.185 0.25 15 2.065 15 4.375C15 7.21 12.45 9.52 8.5875 13.03L7.5 14.0125Z"
        fill="#A7A7A7" />
    </svg>
        <span>В Избранное</span>
      </button>
    </div>
  </div>
    `;
    if (scrollDistance >= contentBlock.offsetTop - 97) {
      bodyBlock.insertAdjacentHTML('afterbegin', scrollMenuHtml);
      contentLeftBlock.classList.add('fix')
    } else {
      contentLeftBlock.classList.remove('fix')

    }
    if (scrollMenuBlock) {
      scrollMenuBlock.remove()
    }
  }

  window.addEventListener('resize', () => {
    mobileSlider();
  });

  window.addEventListener('scroll', () => {
    fixMenuBlock()
  });

  function htmlCityItem(data) {
    console.log(data.areas.length)   
      return `
      <div class="locations-dropdown__citys">
        <span class="locations-dropdown__city-name">${data.areas.length ? data.areas[0].name : ''}</span>
        <span class="locations-dropdown__city-state">${data.areas.length ? data.name : ''}</span>
      </div>
      `;
  }

  locationTown.addEventListener('click', function () {
    locationsDropdownBlock.classList.toggle('active')
    fetch(fetchUrl)
      .then((response) => {
        return response.json()
      })
      .then((body) => {
        let areas = body.areas
        setTimeout(function () {
          document.querySelector('.spinner').remove()
          areas.forEach(function (item) {
            allcityBlock.innerHTML += htmlCityItem(item)
            let cityNames = document.querySelectorAll('.locations-dropdown__city-name')
            document.querySelector('.locations-dropdown__input').focus()
            searctCity(cityNames)
          })
        }, 2000)
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.header__locations')) {
      locationsDropdownBlock.classList.remove('active')
    }
  })


  function blockSpinner() {
    const html = `
     <div class="spinner">
        <img src="img/spinner.svg"></img>
     </div>
    `
    allcityBlock.insertAdjacentHTML('beforebegin', html)
  }
  blockSpinner()

  function searctCity(citys) {
    let input = document.querySelector('.locations-dropdown__input')
    let dropdownCitys = document.querySelectorAll('.locations-dropdown__citys')
    input.oninput = function () {
      let valueInput = this.value.trim();
      if (valueInput != '') {
        citys.forEach(function (city) {
          if (city.innerText.search(valueInput) == -1) {
            city.closest('.locations-dropdown__citys').classList.add('hide')
          }
        });
      } else {
        citys.forEach(function (city) {
          city.closest('.locations-dropdown__citys').classList.remove('hide')
        })
      }
      input.addEventListener('keyup', function (e) {
        if (e.keyCode === 8) {
          citys.forEach(function (city) {
            if (city.innerText.search(valueInput) == -1) {
              city.closest('.locations-dropdown__citys').classList.remove('hide')
            }
          });
        }
      })
    }
    const selectedSity = document.querySelector('.locations-dropdown__selected-city')

    dropdownCitys.forEach(function (item) {
      item.addEventListener('click', function () {
        let button = document.createElement('button')
        button.classList.add('locations-dropdown__button')
        button.classList.add('locations-dropdown__button--shields')
        button.innerHTML = item.querySelector('.locations-dropdown__city-name').textContent
        button.onclick = function () {
          this.style.display = 'none';
        }
        selectedSity.appendChild(button)
      })
    })
  }
  const navListWrapper = document.querySelector('.js-nav-list');
  const navItems = document.querySelectorAll('.nav__item');
  const navButtons = document.querySelectorAll('.nav__button');
  let count = 10;

  navButtons.forEach(function (btn, index) {
    if (index === 1) {
      btn.classList.remove('disactive')
    }
    btn.addEventListener('click', function () {
      let sumWidth = 0
      navItems.forEach(function (item, index) {
        if (index + 1 >= count) {
          sumWidth += Math.floor(item.getBoundingClientRect().width)
        }
      });
      navListWrapper.style.cssText = `transform:translateX(${-sumWidth - (-50)}px);`;
      navButtons.forEach(function (button) {
        button.classList.remove('disactive')
      });
      this.classList.add('disactive');
      if (btn.classList.contains('nav__button--left')) {
        navListWrapper.style.cssText = `transform:translateX(${0}px);`;
      }
    });
  })
})