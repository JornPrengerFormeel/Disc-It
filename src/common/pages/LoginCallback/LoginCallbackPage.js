import React from 'react';

import { DiscItApi } from '../../../api/discit-api/DiscItApi';

class LoginCallbackPage extends React.Component {
 

  componentDidMount() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');


      this.getTokens(code);
  }

  async getTokens(code) {
      const data = await DiscItApi.getTokens(code);
      /* handle error here */
      
      if (data.access_token) {
          this.setLocalSession(data);
      }
  }

  setLocalSession(data) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      /* later consider adding epoch time of expiry so we can refresh before making a request */
      window.location = '/discover';
  }

  render() {
      return 'Loading...';
  }
}

export default LoginCallbackPage;
