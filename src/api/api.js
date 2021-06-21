import axios from 'axios';

const BASE_URL = 'https://finnhub.io/api/v1'

/**
 * API Class on Front-End
 * 
 * Static class tying together methods used to get/send to the API.
 * Everything interacting with the API should be stored here.
 * Nowhere else in App should know about API.
 * 
 */

class FinnhubAPI {

    static token = 'c335ok2ad3ifq944562g';

    static async request(endpoint, data = {}, method = "get") {
        console.log('API Call: ', endpoint, data, method);


        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === 'get')
            ? data
            : {};

        try {
            console.log("inside axios call")
            console.log("url is", url)
            console.log("method is", method)
            console.log("data is: ", data)
            console.log("params are", params)
            return (await axios({ url, method, data, params}));
        } catch (err) {
            console.log("API Error", err);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // API Routes To Request

    /** GET Basic Financials*/

    static async getBasicFinancialsForACompany(companySymbol) {
        console.log("INSIDE API")
        let res = await this.request(`stock/metric?symbol=${companySymbol}&token=${FinnhubAPI.token}&metric=all`)
        console.log("RESULT FROM API FUNCTION GET BASIC FINANCIALS", res)
        return res
    }

}

export default FinnhubAPI;