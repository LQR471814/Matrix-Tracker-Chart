import React from 'react'
import Grid from './components/Grid'

import background from './css/temp.png'

class App extends React.Component {
  render() {
    return (
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        padding: "8px",
        height: "100vh",
        overflow: "hidden"
      }}>
        <Grid
          measures={50}
          measureWidth="100px"
          measureHeight="100px"
          pad="5px"
          gap="2.5px"
          title="Chanson Triste"
        />
      </div>
    )
  }
}

export default App
