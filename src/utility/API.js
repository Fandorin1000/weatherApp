import axios from "axios";




const weatherAPI = {
  getWeatherForID() {
    return axios.get('https://api.openweathermap.org/data/2.5/weather?id=703448&appid=246b5b0ebc973cc285ee797e33a98add');
  },
  getWeatherForCoordinations(lat, lon) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=246b5b0ebc973cc285ee797e33a98add`)
  },
  getIcon(data) {
    return axios.get(`http://openweathermap.org/img/wn/${data}@2x.png`);
  }
}
export default weatherAPI;