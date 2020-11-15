import React from "react";
import "./styles.scss";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import Form from "./Form/form";
import Results from "./Results/results.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      headers: "",
      results: []
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
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

  handleResults = (count, headers, results) => {
    this.setState({ count: count, headers: headers, results: results });
    console.log(this.state);
  };

  //import Results and pass it info to render

  render() {
    return (
      <>
        <Header />
        <main>
          main
          <Form handler={this.handleResults} />
          <Results
            count={this.state.count}
            headers={this.state.headers}
            results={this.state.results}
          />
        </main>
        <Footer />
      </>
    );
  }
}

export default App;

// app.js - Container
// Holds state: Count and Results Array
// A class method that can update state
// Renders 2 Child Components
