import axios from "axios";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: import.meta.env.VITE_API_KEY,
    }
});

//     headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` }