import React, { Component } from 'react';

// Utility function -- looks at all the cookies for this page and gives you the one requested
const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(
    !!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : ''
  );
};

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

class App extends Component {
  state = {
    clickCount: getCookie('count') || 0,
    username: getCookie('username') || '',
    usernameIsEditable: false,
  };

  handleClick = () => {
    const newCount = Number(this.state.clickCount) + 1;

    // This is making a cookie called count with the newCount amount
    // It will replace anything called count
    document.cookie = `count=${newCount}`;

    this.setState({
      clickCount: newCount,
    });
  };

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  };

  saveUsername = () => {
    this.setState({
      usernameIsEditable: false,
    });
    document.cookie = `username=${this.state.username}`;
  };

  handleInputChange = (input) => (event) => {
    this.setState({
      [input]: event.target.value,
    });
    console.log(this.state);
  };

  handleLogoutClick = () => {
    this.setState({
      ...this.state,
      clickCount: 0,
      username: '',
    });
    deleteCookie('username');
    deleteCookie('count');
  };

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <button onClick={this.handleLogoutClick}>Log Out</button>
          <p>
            Username:{'  '}
            {this.state.username}
          </p>
          {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
          {/* 
              This conditional rendering is using a `ternary` operator. It works like an if/else block.
              The part at the front is being evaluated. The `?` starts the conditions. 
              The first condition is what will be done if true.
              The `:` breaks into the else block.
              
              Rewritten as if/else:
              ```
              let buttonToShow;
              if(this.state.usernameIsEditable) {
                buttonToShow = <button onClick={this.saveUsername}>Save Username</button>
              } else {
                buttonToShow = <button onClick={this.editUsername}>Edit Username</button>
              }
              ```

            */}
          {this.state.usernameIsEditable ? (
            <div>
              <input
                onChange={this.handleInputChange('username')}
                placeholder="Enter Username"
              ></input>
              <button onClick={this.saveUsername}>Save Username</button>{' '}
            </div>
          ) : (
            <div>
              <button onClick={this.editUsername}>Edit Username</button>
            </div>
          )}
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{ fontSize: '100px', cursor: 'pointer' }}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
