import { Provider } from "react-redux";
import { store } from "../lib/api/store";
import TabContainer from "../components/TabContainer";

// Global style for the app
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f7f7f7;
  }
  
  * {
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <header
        style={{
          textAlign: "center",
          padding: "2rem 0",
          background: "linear-gradient(to right, #3498db, #2980b9)",
          color: "white",
          marginBottom: "2rem"
        }}
      >
        <h1>RTK Query Infinite Scroll Demo</h1>
        <p>Demonstrating two different approaches to implement infinite scrolling</p>
      </header>
      <TabContainer />
    </Provider>
  );
};

export default Home;
