// Initiate Global Latitude and Longitude Variable
let lat, lon;
// Mapping for Weather Image Path
const imageWatherMap = {
  Default: "default-background.svg",
  Clouds: "clouds-background.svg",
  Rain: "rain-background.svg",
  Sun: "sun-background.svg",
  Haze: "haze-background.svg"
};

// Get Latitude and Longitude by Geolocation API
navigator.geolocation.getCurrentPosition(async (position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  // Fetch OpenWeather API with Latitude and Longitude Existing
  const res = await fetch(
    `http://127.0.0.1:3000/api/weather?lat=${lat}&lon=${lon}`
  );

  const resData = await res.json();
  const { weather, name, sys, wind, main } = resData.data;

  // //Bento 1
  const wrapperMainSpinner = document.getElementById("wrapper-main-spinner");
  // wrapperMainSpinner.classList.add(
  //   // Render image with corresponding data weather
  wrapperMainSpinner.style.backgroundImage = `url(/images/${(imageWatherMap[weather[0].main]) ? imageWatherMap[weather[0].main] : "default-background.svg"})`;

  wrapperMainSpinner.innerHTML = `
  <div class="stats">
            <div class="stat">
              <div class="stat-title flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p class="ml-2">${name}</p>
              </div>
              <div class="stat-value">${weather[0].main}</div>
              <div class="stat-desc">${weather[0].description}</div>
            </div>
          </div>
  `;

  // // Bento 2
  // Fetch Forecast Map by WindyAPI
  const options = {
    key: "KLEvpzZswZbARAxugg0XenhWbjPMx9ca",
    lat: -6.665,
    lon: 106.865,
    zoom: 5,
  };

  // Initiate WindyApi
  windyInit(options, (windyAPI) => {
    const { map, store, picker } = windyAPI;
    const icon = L.icon({
      iconUrl: "images/pin-location.svg",
      iconSize: [38, 95],
    });

    L.marker([-6.665, 106.865], { icon: icon })
      .addTo(map)
      .bindPopup(name)
      .openPopup();

    setTimeout(() => {
      store.set("overlay", "rain");
    }, 5000);
  });

  // //Bento 3
  const sunrise = new Date(sys.sunrise * 1000);
  const sunset = new Date(sys.sunset * 1000);
  const temperature = main.temp - 273.15;

  const highlightWrapper = document.getElementById("highlight-wrapper");
  highlightWrapper.innerHTML = `
  <div class=" grid grid-flow-col grid-rows-2">
            <div class="row-span-2 pl-3"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20px" class="mt-1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8H5M7 5.85714V5.5C7 4.11929 8.11929 3 9.5 3C10.8807 3 12 4.11929 12 5.5C12 6.88071 10.8807 8 9.5 8H8" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M4 14H5M15 17V17.5C15 19.433 16.567 21 18.5 21C20.433 21 22 19.433 22 17.5C22 15.567 20.433 14 18.5 14H9" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M2 11H8M15 8V7.5C15 5.567 16.567 4 18.5 4C20.433 4 22 5.567 22 7.5C22 9.433 20.433 11 18.5 11H12.25" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></div>
            <p class="-ml-4 font-normal">Wind</p>
            <p class="-ml-4 -mt-1 text-2xl font-medium">${wind.speed} m/sec</p>
          </div>
          <div class=" grid grid-flow-col grid-rows-2">
            <div class="row-span-2 pl-3"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 22H16" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 19H19" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 16H22" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z" stroke="#1a1a1a" stroke-width="1.5"></path> <path d="M12 10L12.5303 9.46967C12.2374 9.17678 11.7626 9.17678 11.4697 9.46967L12 10ZM13.4697 12.5303C13.7626 12.8232 14.2374 12.8232 14.5303 12.5303C14.8232 12.2374 14.8232 11.7626 14.5303 11.4697L13.4697 12.5303ZM9.46967 11.4697C9.17678 11.7626 9.17678 12.2374 9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303L9.46967 11.4697ZM12.75 16V10H11.25V16H12.75ZM11.4697 10.5303L13.4697 12.5303L14.5303 11.4697L12.5303 9.46967L11.4697 10.5303ZM11.4697 9.46967L9.46967 11.4697L10.5303 12.5303L12.5303 10.5303L11.4697 9.46967Z" fill="#1a1a1a"></path> <path d="M12 2V3" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12L21 12" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M3 12L2 12" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19.0708 4.92969L18.678 5.32252" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></div>
            <p class="-ml-8 font-normal">Sunrise</p>
            <p class="-ml-8 -mt-1 text-2xl font-medium">${sunrise.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
          <div class=" grid grid-flow-col grid-rows-2">
            <div class="row-span-2 pl-3"><svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.1 508.1" xml:space="preserve" class="mt-1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M268.146,307.3V171.5c0-7.8-6.3-14.1-14.1-14.1c-7.8,0-14.1,6.3-14.1,14.1v135.8c-33,6.6-58,35.8-58,70.7 c0,39.8,32.4,72.1,72.1,72.1c39.8,0,72.1-32.4,72.1-72.1C326.146,343,301.246,313.8,268.146,307.3z M254.046,421.9 c-24.2,0-43.9-19.7-43.9-43.9c0-24.2,19.7-43.9,43.9-43.9s43.9,19.7,43.9,43.9S278.246,421.9,254.046,421.9z"></path> </g> </g> <g> <g> <path d="M326.046,269.8V72c0-39.7-32.3-72-72-72s-72,32.3-72,72v197.9c-38.3,25.5-60.3,68.9-57.8,115.2 c3.5,65.8,50.8,123,129.8,123c96.7,0,130-87.7,130-130C384.046,334.6,362.046,293.8,326.046,269.8z M254.046,479.8 c-57.2,0-97.8-42.4-101.6-96.2c-2.8-38.4,17.4-74.3,50.8-93.6c4.4-2.5,7-7.2,7-12.2V72c0-24.1,19.6-43.8,43.8-43.8 c24.1,0,43.8,19.6,43.8,43.8v205.7c0,5,2.7,9.7,7,12.2c31.4,18.2,51,51.9,51,88.1C355.846,421.3,318.646,479.8,254.046,479.8z"></path> </g> </g> </g></svg></div>
            <p class="-ml-8 font-normal">Temperature</p>
            <p class="-ml-8 -mt-1 text-2xl font-medium">${temperature.toString().slice(0, 5)}°C</p>
          </div>
          <div class=" grid grid-flow-col grid-rows-2">
            <div class="row-span-2 pl-3"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 22H16" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 19H19" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 16H22" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z" stroke="#1a1a1a" stroke-width="1.5"></path> <path d="M12 6V12M12 12L14 10M12 12L10 10" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 2V3" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12L21 12" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M3 12L2 12" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19.0708 4.92969L18.678 5.32252" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></div>
            <p class="-ml-4 font-normal">Sunset</p>
            <p class="-ml-4 -mt-1 text-2xl font-medium">${sunset.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
  `;

  // Bento 4
  const newsRes = await fetch("http://127.0.0.1:3000/api/news");

  let newsWrapper = document.getElementById("news-wrapper-bento4");
  newsWrapper.innerHTML = ``;
  const newsResult = await newsRes.json();
  newsResult.data.forEach(news => {
    newsWrapper.innerHTML += `
    <a href="${news.link}" target="_blank" rel="noopener noreferrer">
              <div class="h-25 w-full btn btn-ghost mt-3">
                <div class="grid grid-flow-col grid-rows-2 mt-10">
                  <div class="row-span-2 h-20 w-20 mr-5">
                    <div
                      style="background-image: url('${news.image_url}')"
                      class="bg-cover bg-center h-full w-full rounded-md"
                    >
                    </div>
                  </div>
                  <div class=" text-left w-55 text-sm font-medium -mt-1 h-15 line-clamp-3">
                    ${news.title}
                  </div>
                  <div class="font-normal mt-0.5 h-14.5 text-xs text-left leading-3.5 overflow-hidden truncate">${news.pubDate}</div>
                </div>
              </div>
            </a>
    `;
  });

});
