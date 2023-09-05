import axios from 'axios';

export const getRequest = async (url) => {
    return await axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.log(e)
            return e
        })
}