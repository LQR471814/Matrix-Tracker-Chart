import React from 'react'
import Grid from './components/Grid'

class App extends React.Component {
  render() {
    return (
      <div style={{
        backgroundColor: "#000000",
        padding: "8px",
        height: "100vh"}}>
        <Grid
          measures={100}
          size={"100px"}
        />
      </div>
    )
  }
}

export default App;
