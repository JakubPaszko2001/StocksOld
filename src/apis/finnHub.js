import axios from "axios";

const TOKEN =  "cc94jn2ad3i9n05k11bg"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})