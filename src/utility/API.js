import axios from "axios";

export default axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/weather?id=703448&appid=fc6f5b080a29bd1146f5ab7fc1894991`
});