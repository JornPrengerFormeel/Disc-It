import { BaseRequest } from "../BaseRequest";
const BACKEND_PORT = 8888;

export class DiscItApi {
  static async sendLoginRequest() {
    return BaseRequest.sendGetRequest(`http://localhost:${BACKEND_PORT}/user/login/`, {});
  }


  static async getTokens(code) {
    const body = {
      code : code,
    }
    return BaseRequest.sendPostRequest(`http://localhost:${BACKEND_PORT}/user/access/`, body);
  }
}
