import React, { Component } from "react";
import FantasyNerds from "./components/FantasyNerds.js";
import "./App.css";
import NFLInfo from "./components/NFLInfo.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenTeam: "IND",
      teamSelect: [],
      tURL: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (e.target.name === "team") {
      this.setState({ choosenTeam: e.target.value });
    }
  }

  componentDidMount() {
    fetch(
      `https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=8aac3cf3d0b54999bf10c6911d76d278`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          teamSelect: json
        });
      });
  }

  render() {
    const { teamSelect } = this.state;
    return (
      <div className="container">
        <div className="jumbotron">
          <h2>NFL Team Roster & Arrests per Year</h2>
        </div>

        <div className="input-group">
          <select
            name="team"
            className="custom-select"
            onChange={this.handleChange}
          >
            <option>Choose...</option>
            {teamSelect.map(chosen => (
              <option key={chosen.TeamID}>{chosen.Key}</option>
            ))}
          </select>
          
          <div className="input-group-append">
            {/* <button className="btn btn-outline-secondary" type="button">
              Button
            </button> */}
          </div>
        </div>
        <div className="card-deck">
          <FantasyNerds choosenTeam={this.state.choosenTeam} />
          <NFLInfo choosenTeam={this.state.choosenTeam} />
        </div>
      </div>
    );
  }
}

export default App;
