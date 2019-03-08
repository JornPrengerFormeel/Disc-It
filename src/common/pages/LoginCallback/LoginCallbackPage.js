import React from 'react';

import { DiscItApi } from '../../../api/discit-api/DiscItApi';

class LoginCallbackPage extends React.Component {


  componentDidMount() {
      console.log("hello");

      const params = new URLSearchParams(window.location.search),
            code = params.get('code');

      console.log(params);
      console.log(code);

      this.getTokens(code);
  }

  async getTokens(code) {
      const data = await DiscItApi.getTokens(code);
      /* handle error here */

      if (data.access_token) {
          this.setLocalSession(data);
      }

      else if ( localStorage.getItem("access_token") && localStorage.getItem("refresh_token") ) {
        window.location = '/discover';
      }

      else {
        // TODO: Display error somewhere
        window.location = '/';
      }
  }

  setLocalSession(data) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      /* later consider adding epoch time of expiry so we can refresh before making a request */
      const expiry = new Date().getTime() + data.expires_in * 1000;
      localStorage.setItem('expiry_epoch', expiry);
      window.location = '/discover';
  }

  render() {
      return 'Loading...';
  }
}

export default LoginCallbackPage;
