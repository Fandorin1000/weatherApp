import axios from "axios";




const weatherAPI = {
  getWeatherForID(id) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=fc6f5b080a29bd1146f5ab7fc1894991`);
  },
  getWeatherForCoordinations(lat, lon) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fc6f5b080a29bd1146f5ab7fc1894991`)
  },
  getIcon(data) {
    return axios.get(`http://openweathermap.org/img/wn/${data}@2x.png`);
  }
}
export default weatherAPI;