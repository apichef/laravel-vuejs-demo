import axios from 'axios';
import { Model } from 'sarala';

export default class BaseModel extends Model
{
    baseUrl () {
        return '/api';
    }

    request (config) {
        return axios.request(config);
    }
}