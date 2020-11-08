// Code heavily inspired by:
// https://stackoverflow.com/questions/46514351/react-dynamic-creation-of-list-item-inside-component

const superagent = require("superagent");
import React from "react";

import "./form.scss";

const ListItem = ({ value }) => <li>{value}</li>;

//remember how map returns something? that's why it's
//used often in react, along with filter

const List = ({ items }) => (
  <ul>
    {items.map((item, i) => (
      <ListItem key={i} value={item} />
      //FOR SW API:
      //<ListItem key={i} value={item.name} />
    ))}
  </ul>
);

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      inputs: [],
      method: "GET",
      route: ""
    };
  }

  //this lets you preload data on DOM load

  // async componentDidMount() {
  //   // let inputs = ['test1', 'test2'];
  //   // this.setState({inputs})

  //   const response = async superagent.get('https://swapi.dev/api/people/');
  //   const inputs = response.body.results  || {};
  //   console.log(people);
  //   this.setState({inputs});

  // };

  handleInputChange = (event) => {
    this.setState({ fetching: true });
    //const fieldName = event.target.name;
    const route = event.target.value;
    this.setState({ inputValue: route });
    //console.log(route);
    this.setState({ people, fetching: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = this.state.method + " " + this.state.inputValue;
    const inputs = this.state.inputs;
    if (inputValue) {
      const nextState = [...inputs, inputValue];
      this.setState({ inputs: nextState, inputValue: "" });
    }
  };

  updateCount = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  render() {
    function Result(props) {
      return (
        <div>
          {props.method} {props.route}
        </div>
      );
    }

    const { inputs, inputValue } = this.state;
    return (
      <>
        {this.state.fetching ? <div> gettingpeople... </div> : ""}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="route"
            value={inputValue}
            onChange={this.handleInputChange}
          />
          <button type="submit">Go!</button>

          <div id="buttons">
            <input
              type="button"
              id="get"
              name="get"
              value="GET"
              onClick={() => this.setState({ method: "GET" })}
            ></input>

            <input
              type="button"
              id="put"
              name="put"
              value="PUT"
              onClick={() => this.setState({ method: "PUT" })}
            ></input>

            <input
              type="button"
              id="post"
              name="post"
              value="POST"
              onClick={() => this.setState({ method: "POST" })}
            ></input>

            <input
              type="button"
              id="delete"
              name="delete"
              value="DELETE"
              onClick={() => this.setState({ method: "DELETE" })}
            ></input>
          </div>
        </form>

        <section>
          <Result method={this.state.method} route={this.state.inputValue} />
          <List items={inputs} />
        </section>
      </>
    );
  }
}

export default Form;
