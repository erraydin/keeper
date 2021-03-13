import axios from "axios";

const instance = axios.create({
  baseURL: "https://keeper-2de7a-default-rtdb.firebaseio.com/",
});

export default instance;
