import React, { Component } from "react";
import axios from "axios";

export default class FantasyNerds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      isLoaded: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { choosenTeam } = this.props;
    if (prevProps.choosenTeam !== this.props.choosenTeam) {
      axios
        .get(
          `https://api.sportsdata.io/v3/nfl/scores/json/Players/${choosenTeam}?key=8aac3cf3d0b54999bf10c6911d76d278`
        )
        .then(response => {
          this.setState({
            players: response.data,
            isLoaded: true,
          });
        });
    }
    // .then(res => res.json())
    // .then(json => {
    //   this.setState({
    //     isLoaded: true,
    //     players: json
    //   });
    // });
  }
  render() {
    const { isLoaded, players } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        <div className="card-body col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th />
                <th scope="col">Name</th>
                <th scope="col">College</th>
                <th scope="col">Position</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.PlayerID}>
                  <td>
                    <img alt="NFL players" src={player.PhotoUrl} />
                  </td>
                  <td>{player.Name}</td>
                  <td>{player.College}</td>
                  <td>{player.Position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
