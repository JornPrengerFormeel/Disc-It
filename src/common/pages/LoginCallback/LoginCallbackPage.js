import React from 'react';

class LoginCallbackPage extends React.Component {
  componentDidMount() {
    console.log(window.location);
    let code = window.location.toString().split('?code=')[1];
    console.log(code);
  }
  render() {
    return (
      "Loading..."
    )
  }
}

export default LoginCallbackPage;