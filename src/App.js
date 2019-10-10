import React from 'react';
import './App.css';
import ReactMapGL from "react-map-gl"

class App extends React.Component {
  state={
    viewport:{
      latitude: 40.707562759945795,
      longitude: -73.95710169404246,
      zoom: 10,
      width:'100vw',
      height: "100vh"
    }
  }
  onViewportChange = viewport => {
    this.setState({viewport});
};
  
  render(){
    return (
    <div>
      <ReactMapGL 
      {...this.state.viewport} 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/dwang0816/ck1k0qvij2rrl1cobig03w3rf"
      onViewportChange={this.onViewportChange}
      />
    </div>
    )
  }
}

export default App;
