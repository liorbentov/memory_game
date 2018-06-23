import React, { Component } from 'react';

import Player from '../player';

class NewTeam extends Component {
  state = { rows: [{ isEmpty: true }], teamName: '', isCreating: false };

  handleChangeAttribute = (rowIndex, attribute, newValue) => {
    const { rows } = this.state;
    const current = rows[rowIndex];

    if (current.isEmpty) {
      const row = { ...current, [attribute]: newValue, isEmpty: false };
      return this.setState({
        rows: [...rows.slice(0, rowIndex), row, { isEmpty: true }],
      });
    }

    const row = { ...rows[rowIndex], [attribute]: newValue };

    this.setState({
      rows: [...rows.slice(0, rowIndex), row, ...rows.slice(rowIndex + 1)],
    });
  };

  handleRemovePlayer = rowIndex => {
    const { rows } = this.state;

    if (rows.length === 1) {
      return this.setState({ rows: [{ isEmpty: true }] });
    }

    this.setState({
      rows: [...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)],
    });
  };

  handleChangeTeamName = e => {
    this.setState({ teamName: e.target.value });
  };

  postTeam(name, members) {
    this.setState({ isCreating: true })
        return fetch(`http://localhost:3000/api/teams`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        members,
      }),
    })
      .then(data => data.json())
      .then(data => {
        this.setState({ isCreating: false })
        this.props.navigate(`/teams/${data._id}`)
      })
      .catch(() => {
        this.setState({ isCreating: false })
        console.log("error!")
      })
  }

  createTeam = () => {
    const { rows, teamName } = this.state;

    if (!teamName) {
      return window.alert("You must enter a team name!");
    }

    const filteredRows = rows.filter(row => !row.isEmpty);

    if (!filteredRows.length) {
      return window.alert("You must enter somw team members!");
    }

    const mappedRows = filteredRows.map(({ name, mail }) => ({ name, mail }));

    this.postTeam(teamName, mappedRows);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Team name"
          value={this.state.teamName}
          onChange={this.handleChangeTeamName}
        />
        {this.state.rows.map((player, index) => {
          return (
            <Player
              key={index}
              rowIndex={index}
              isEditable={true}
              handleEdit={this.handleChangeAttribute}
              handleRemove={this.handleRemovePlayer}
              {...player}
            />
          );
        })}
        <button onClick={this.createTeam}>Create</button>
        { this.state.isCreating && "Creating" }
      </div>
    );
  }
}

export default NewTeam;