
export class BaseRequest {
  static async sendGetRequest(urlString) {
    return new Promise((resolve, reject) => {
      fetch(urlString,
        {
          method: 'get',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }
      )
        .then((response) => {
          resolve(response.text());
        })
        .catch(reject);
    });
  }
}