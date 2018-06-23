import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    term: "",
    data: ""
  };

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>Search Cities around the world</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-3">
            <form action="" className="search-form">
              <div className="form-group has-feedback">
                <label className="sr-only">Search</label>
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  id="search"
                  placeholder="search"
                  onChange={e => this.handleSearch(e)}
                />
                <span className="glyphicon glyphicon-search form-control-feedback" />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          {this.state.data !== "" ? (
            <div>
              {this.state.data.map((loc, i) => {
                return (
                  <div className="col-md-3" key={i}>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        {loc._source.name}, {loc._source.country}
                      </div>
                      <div className="panel-body">
                        <p>
                          lat:{loc._source.lat}, long: {loc._source.lng}.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  handleSearch = event => {
    this.setState({ term: event.target.value }, () => {
      if (this.state.term.length > 1) {
          this.getSearch();
      }
    });
  }
  getSearch = () => {
    axios({
      method: "get",
      url: `http://localhost:3001/search?q=${this.state.term}`
    })
      .then(response => {
        console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default App;
