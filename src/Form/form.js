// Code heavily inspired by:
// https://stackoverflow.com/questions/46514351/react-dynamic-creation-of-list-item-inside-component

import React from "react";
import "./form.scss";
const axios = require("axios");

const ListItem = ({ value }) => <li>{value}</li>;

//remember how map returns something? that's why it's
//used often in react, along with filter

const List = ({ items }) => (
  <ul>
    {items.map((item, i) => (
      <ListItem key={item.dbkey} value={item} />
    ))}
  </ul>
);

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      data: "",
      inputs: [],
      method: 'GET',
      fetching: false
    };
  }

  handleInputChange = (event) => {
    //const fieldName = event.target.name;
    const route = event.target.value;
    this.setState({ inputValue: route });
    //console.log(route);
    //this.setState({ people, fetching: false });
  };

  handleDataChange = (event) => {
    const textField = event.target.value;
    this.setState({ data: textField });
  };

  // handleGet = async() => {
  //   let raw = await axios.get(this.state.inputValue);
  //   console.log(raw);
  //   let apiCount = raw.data.count;
  //   let apiHeaders = raw.headers;
  //   let rawResults = raw.data;

  //   // let parsedResults = raw.data.results.reduce((list, item) => {
  //   //   list[item.name] = item.url;
  //   //   return list;
  //   // }, {});
  //   this.props.handler(apiCount, apiHeaders, rawResults);
  //   //console.log(apiHeaders);

  //   const inputValue = this.state.method + " " + this.state.inputValue;
  //   const inputs = this.state.inputs;

  //   if (inputValue) {
  //     const nextState = [...inputs, inputValue];
  //     this.setState({ inputs: nextState, inputValue: "", fetching: false })
  //   }
  // }

  handleRest = async() => {
    let raw = await axios(
      {
        method: this.state.method,
        url: this.state.inputValue,
        data: this.state.data
      });
    //you'll want to refactor this to make your children
    //as dumb as possible, move as much logic to the app
    //ask john why
    let apiCount = raw.data.count;
    let apiHeaders = raw.headers;
    let rawResults = raw.data;
    this.props.handler(apiCount, apiHeaders, rawResults);
    
    const inputValue = this.state.method + " " + this.state.inputValue;
    const inputs = this.state.inputs;

    if (inputValue) {
      const nextState = [...inputs, inputValue];
      this.setState({ inputs: nextState, inputValue: "", fetching: false })
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ fetching: true });
    console.log(this.state)
    this.handleRest();
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
              onClick={() => this.setState({ method: 'GET' })}
            ></input>

            <input
              type="button"
              id="put"
              name="put"
              value="PUT"
              onClick={() => this.setState({ method: 'PUT' })}
            ></input>

            <input
              type="button"
              id="post"
              name="post"
              value="POST"
              onClick={() => this.setState({ method: 'POST' })}
            ></input>

            <input
              type="button"
              id="delete"
              name="delete"
              value="DELETE"
              onClick={() => this.setState({ method: 'DELETE' })}
            ></input>
          </div>
          <textarea name="data"></textarea>
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
