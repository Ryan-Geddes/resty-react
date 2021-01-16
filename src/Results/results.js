// Code heavily inspired by:
// https://stackoverflow.com/questions/46514351/react-dynamic-creation-of-list-item-inside-component

// const superagent = require("superagent");
import React from "react";
import JSONPretty from 'react-json-pretty';
import "./results.scss";

const Count = ({ value }) => <div>{value}</div>;
const Headers = ({ value }) => <div>{JSON.stringify(value)}</div>;
const Result = ({ array }) => <div >{JSON.stringify(array)}</div>;

class Results extends React.Component {
  render() {
    return (
      <>
        <section>
          <Count value={this.props.count} />
          <Headers value={this.props.headers} />
          {/* <Result array={this.props.results} /> */}
          <JSONPretty id="json-pretty" data={this.props.results}></JSONPretty>
        </section>
      </>
    );
  }
}

export default Results;
