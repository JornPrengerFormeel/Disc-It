
class BaseRequest {
    static async sendGetRequest(urlString, headers=null) {
        if (headers === null) {
            headers = {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        }
        try {
            const data = await fetch(urlString, {
                method: 'get',
                headers: headers
            });
            const responseType = data.headers.get('content-type');
            console.log(responseType);
            if (responseType.includes('application/json')) {
                const json = await data.json();
                return json;
            }

            return data.text();
            
        } catch (err) {
            return { err };
        }
       
    }


    static async sendPostRequest(urlString, body) {
        try {
            const data = await fetch(urlString, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const json = await data.json();
            return json;
        } catch (err) {
            return { err };
        }
    }
}

export { BaseRequest };
