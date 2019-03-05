import { BaseRequest } from "../BaseResuest";

export class DiscItApi {
  static async sendLoginRequest() {
    return BaseRequest.sendGetRequest('http://localhost:3001/user/login/', {});
  }
}