import axios from "axios";

// Buat instance Axios
const ApiAxios = axios.create({
  baseURL: "https://hub.dummyapis.com",
  headers: {
    "Content-Type": "application/json",
    "Client-ID": process.env.REACT_APP_CLIENT_ID,
    "Credential-Key": process.env.REACT_APP_CREDENTIAL_KEY,
  },
});

export default ApiAxios;
