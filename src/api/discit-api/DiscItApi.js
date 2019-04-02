import { BaseRequest } from '../BaseRequest';


export class DiscItApi {
    static async sendLoginRequest() {
        return BaseRequest.sendGetRequest(`https://samalot.dev/discit/login/`);
    }


    static async getTokens(code) {
        const body = {
            code,
        };
        return BaseRequest.sendPostRequest(`https://samalot.dev/discit/access/`, body);
    }
}
