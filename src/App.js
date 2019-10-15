import React from 'react';
import './App.css';
import MapBox from './MapBox'
// import CategorySelector from './CategorySelector';

class App extends React.Component {
  
  
  render(){

    return (
    <div>
      {/* <CategorySelector handleRadio={this.handleRadio} sortTerm={this.state.sortTerm}/> */}
      <MapBox/>
    </div>
    )
  }
}

export default App;
