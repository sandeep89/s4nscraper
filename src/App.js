import React, { Component } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';

var decodeHTML = function (html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const API_SERVER_HOST = "http://s4nscraper-api.herokuapp.com/api"
// const API_SERVER_HOST = "http://localhost:3001/api";
class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getData = (url) => {
    axios.get(API_SERVER_HOST + "/getData?url="+ url).
    then(
      (res) => {
        console.log(res);
        this.setState({ htmlContent: res.data });
        console.log(decodeHTML(res.data));
        console.log(this.state);
        ReactDOM.render(decodeHTML(res.data), 
         document.getElementById('content'))
      }).
    catch( (err) => {
        ReactDOM.render(err, 
         document.getElementById('html-content'))
    })
  };

  userLogin = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post(API_SERVER_HOST + "/login", { 
      id: idToBeAdded,
      message: message
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          Fect url content
        </ul>
        <div style={{ padding: "10px" }}>
        URL:
          <input
            type="text"
            onChange={e => this.setState({ url: e.target.value })}
            style={{ width: "300px" }}
          />
          <button onClick={() => this.getData(this.state.url)}>
            submit
          </button>
        </div>
        <div id="content" 
              style={{ border :"1px solid black"}}
          > 
        </div>
      </div>
    );
  }
}

export default App;
