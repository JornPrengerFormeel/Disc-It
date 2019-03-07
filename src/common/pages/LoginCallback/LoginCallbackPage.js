import React from 'react';

import {DiscItApi} from '../../../api/discit-api/DiscItApi'

class LoginCallbackPage extends React.Component {

  state = {
    tokens : null
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    
    this.getTokens(code);
  }

  async getTokens(code) {
    const data = await DiscItApi.getTokens(code);
    console.log(data);
    this.setState({tokens:data})
  }

  render() {
    if (this.state.tokens === null) return "Loading..."
    
    const tokens = this.state.tokens;
    return (
      <div>
        {tokens.error && `Error - ${tokens.error_description}`}

        {tokens.access_token && `Access Code - ${tokens.access_token}`}
        <p></p>
        {tokens.refresh_token && `Refresh Code - ${tokens.refresh_token}`}
      </div>
    )
  }
}

export default LoginCallbackPage;

