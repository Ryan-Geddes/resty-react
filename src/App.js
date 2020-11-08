import React from "react";
import "./styles.css";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import Form from "./Form/form";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      count: 0
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <>
        <Header />
        <main>
          main
          <form onSubmit={this.handleSubmit}>
            <input id="x" name="firstname" onChange={this.handleInputChange} />
            <button type="submit">Go!</button>
            <button>GET</button>
            <button>POST</button>
            <button>PUT</button>
            <button>DELETE</button>
          </form>
          <section>results</section>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
