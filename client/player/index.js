import React, { Component } from 'react';

class Player extends React.Component {
	constructor(props) {
		super(props);
  		
  		this.state = { email: "", name: "" };

  		this.handleChangeName = this.handleChangeName.bind(this);
  		this.handleChangeEmail = this.handleChangeEmail.bind(this);
	}

  handleChangeName(e){
    this.setState({ name: e.target.value });
  }

  handleChangeEmail(e){
    this.setState({ email: e.target.value });
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input type="text" value={name} onChange={this.handleChangeName} />
        <input type="text" value={email} onChange={this.handleChangeEmail} />
        <Gravatar email={email || name} />
      </div>
    );
  }
}