import axios from "axios";


axios.defaults.headers.common["x-api-key"] = "live_G0SqVQ6QZpL6QWvVDAASmnOlFyUOBciulMwdByWWwREm4apabAMPrg2GqeSBJavg";
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

 function fetchBreeds() {
return axios.get('/breeds/').then(resp => {
    if (resp.status!==200) {
        throw new Error(resp.statusText)
    }
    return resp.data;
}) 
}

  function fetchCatByBreed(breedId) { 
    return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    if (resp.status!==200) {
        throw new Error(resp.statusText)
        }
        return resp.data;
})
}
export { fetchBreeds, fetchCatByBreed };