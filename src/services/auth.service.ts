import axios, {AxiosResponse} from 'axios';
import {IUser} from "@/interfaces/IUser";
import {ITokes} from "@/interfaces/ITokes";

const $api = axios.create({
  baseURL: 'http://localhost:3000'
})

class AuthService {
    async login(userData: IUser): Promise<AxiosResponse<ITokes>> {
        return $api.post<ITokes>('/auth/login', userData);
    }

    async register(userData: IUser): Promise<AxiosResponse<ITokes>> {
        return $api.post<ITokes>('/auth/register', userData);
    }
}

export default new AuthService();