import axios from "axios"

export class BaseServices {
    post = (url, data) => axios.post(url, data)
    patch = (url, data) => axios.patch(url, data)
    get = (url) => axios.get(url)
    delete = (url) => axios.delete(url)
}