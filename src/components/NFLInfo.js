import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";

export default class NFLInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      arrests: 0,
      i:uuid(),
      arrestData: [],
    };
  }


  componentDidUpdate(prevProps) {

    const { choosenTeam } = this.props;
    if (prevProps.choosenTeam !== this.props.choosenTeam) {
      axios
        .get(`http://NflArrest.com/api/v1/team/timeline/${choosenTeam}`)
        .then(nflArrest => {
          this.setState({
            arrestData: nflArrest.data,
            isLoaded: true,
          });
        });
    }
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Select a team</div>;
    }
    return (
      <React.Fragment>
        <div className="card-body col-md-6">
            <h2>Team arrest count per year</h2>
          <ul className="list-group">
            {this.state.arrestData.map(list => (
              <li className="list-group-item" key={this.i}>
                {list.Month}/{list.Year}: {list.arrest_count}
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
    }
