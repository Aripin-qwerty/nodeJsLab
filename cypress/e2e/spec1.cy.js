describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.request("/api/weather?lat=-6.304585555678171&lon=106.85260775389409")
      .its("body")
      .should("deep.eq", {
        success: true,
        message: "Data weather fetched successfully",
        data: {
          coord: {
            lon: 106.8526,
            lat: -6.3046,
          },
          weather: [
            {
              id: 211,
              main: "Thunderstorm",
              description: "thunderstorm",
              icon: "11d",
            },
          ],
          base: "stations",
          main: {
            temp: 303.55,
            feels_like: 309.18,
            temp_min: 302.97,
            temp_max: 304.16,
            pressure: 1009,
            humidity: 70,
            sea_level: 1009,
            grnd_level: 1004,
          },
          visibility: 4000,
          wind: {
            speed: 1.54,
            deg: 30,
          },
          clouds: {
            all: 75,
          },
          dt: 1776247655,
          sys: {
            type: 2,
            id: 2099240,
            country: "ID",
            sunrise: 1776207205,
            sunset: 1776250296,
          },
          timezone: 25200,
          id: 1642941,
          name: "Jagakarsa",
          cod: 200,
        },
      });
  })
})