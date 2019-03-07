
class BaseRequest {
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



  static async sendPostRequest(urlString, body) {
    try {
      const data = await fetch(urlString, {
        method : 'post',
        headers : {
          'Content-Type':'application/json',
        },
        body : JSON.stringify(body)
      });

      const json = await data.json();
      return json;
    } catch (err) {
      return {err:err};
    }
  }
}

export {BaseRequest};