const { HOST } = require("@/utils/constants");
const { default: axios } = require("axios");

const apiClient = axios.create({
    baseURL:HOST
})