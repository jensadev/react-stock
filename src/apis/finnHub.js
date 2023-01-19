import axios from "axios";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    headers: {
        "X-Finnhub-Token" : import.meta.env.VITE_API_KEY
    },
});