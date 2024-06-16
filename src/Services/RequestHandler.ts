import axios from 'axios';
import { getFromStorage } from './StorageHandler';
import STORAGE from '../Components/Utils/StorageKey';
import { RequestType,HeadersType} from '../@types/GlobalTypes';

export default class RequestHandler {
    static async post({url, data, useAuth = true}:RequestType) {
        const config:HeadersType = {
            method: "post",
            url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
              
            }
             ,
            data:data,
            timeout: 15000
        }
        if (useAuth) {
            const token = await getFromStorage({key: STORAGE.TOKEN})
            config.headers['Authorization'] = `Bearer ${token}`
        }
        try {
            console.log('trying: ',data)
            const res = await axios(config)
            return res.data
        } catch (error) {
            this.handleError(error, url)
        }
    }
    static async patch({url, data, useAuth = true}:RequestType) {
        const config:HeadersType = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
            },
            timeout: 15000
        }
        if (useAuth) {
            const token = await getFromStorage({key:STORAGE.TOKEN})
            config.headers['Authorization'] = `Bearer ${token}`
        }
        try {
            const res = await axios.patch(url, data, config)
            return res.data
        } catch (error) {
            this.handleError(error, url)
        }
    }
    static async delete({url, data, useAuth = true}:RequestType) {
        const config:HeadersType = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },
            
            // data :data
        }
        
        if (useAuth) {
            const token = await getFromStorage({key:STORAGE.TOKEN})
            config.headers['Authorization'] = `Bearer ${token}`
        }
        console.log('configgggg',config)
        try {
            
            const res = await axios.delete(url, config)
            return res.data
        } catch (error) {
            this.handleError(error, url)
        }
    }

    static async get({url, useAuth = true}:RequestType) {
        const config :HeadersType= {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
            },
            timeout: 15000
        }
        if (useAuth) {
            const token = await getFromStorage({key:STORAGE.TOKEN})
            config.headers['Authorization'] = `Bearer ${token}`
        }
        try {
            const res = await axios.get(url, config)
            return res.data
        } catch (error) {
            this.handleError(error, url)
        }
    }

    static handleError(e:any, url:string) {
        console.log({ 'ERROR': e.response || e.data?.message || e, 'URL': url });
        throw e
    }
}