import React from 'react';
import './App.css';
import ReactMapGL, {Marker} from "react-map-gl"
import poorTree from "../src/svg/poorTree.svg"
import fairTree from "../src/svg/fairTree.svg"
import goodTree from "../src/svg/goodTree.svg"
import unknown from "../src/svg/unknown.svg"
import CategorySelector from './CategorySelector';
// import TreeSpecs from './TreeSpecs'

class MapBox extends React.Component {
  state={
    viewport:{
      latitude: 40.707562759945795,
      longitude: -73.95710169404246,
      zoom: 10,
      width:'100vw',
      height: "100vh"
    },
    treesCollection:[],
    filterTerm: "all",
    pickedTree: {},
    showSpecs: false
  }

  viewTree = (obj) => {
    this.setState({
      pickedTree: obj,
      showSpecs: !this.state.showSpecs
    })
  }

  hideSpecs = () => {
    this.setState({
      showSpecs: false
    })
  }

  onViewportChange = viewport => {
    // console.log(viewport)
    this.setState({viewport});
    
  };

  componentDidMount(){
    fetch("http://localhost:3000/trees")
    .then(res => res.json())
    .then(trees => this.setState({treesCollection: trees}))
  }

  renderTreeMarker = (filteredTrees) => {
    return filteredTrees.map(tree => {
      if (tree.health === "Poor") {
      return <Marker
        key={tree.tree_id}
        latitude={parseFloat(tree.latitude)}
        longitude={parseFloat(tree.longitude)}
        >
          <div>
            <img src={poorTree} alt="poor tree" />
            {/* <span role="img" aria-label="sick"></span> */}
          </div>
        </Marker>
      } else if (tree.health === "Fair") {
        return <Marker
          key={tree.tree_id}
          latitude={parseFloat(tree.latitude)}
          longitude={parseFloat(tree.longitude)}
        >
          <div>
          <img src={fairTree} alt="fair tree"/>
            {/* <span role="img" aria-label="tiny tree">🌱</span> */}
            </div>
        </Marker>
        } else if (tree.health === "Good") {
          return <Marker
            key={tree.tree_id}
            latitude={parseFloat(tree.latitude)}
            longitude={parseFloat(tree.longitude)}
          >
            <div>
            <img src={goodTree} alt="good tree"/>
              {/* <span role="img" aria-label="tree">🌳</span> */}
              </div>
          </Marker>
          } else {
            return <Marker
            key={tree.tree_id}
            latitude={parseFloat(tree.latitude)}
            longitude={parseFloat(tree.longitude)}
          >
            <div>
            <img src={unknown} alt="unknown"/>
              {/* <span role="img" aria-label="tree">🌳</span> */}
              </div>
          </Marker>
          }
    }) 
  }

  handleRadio = (event) => {
    // console.log(event.target)
    const filterTerm = event.target.name.toLowerCase()
    this.setState({ filterTerm })
  }

  render(){
    const maxDifference = 0.025
    const allTrees = [...this.state.treesCollection]
    let filteredTrees = allTrees.filter(tree => (parseFloat(tree.longitude) < this.state.viewport["longitude"]+maxDifference && parseFloat(tree.longitude) > this.state.viewport["longitude"]-maxDifference) && (parseFloat(tree.latitude )< this.state.viewport["latitude"]+maxDifference && parseFloat(tree.latitude) > this.state.viewport["latitude"]-maxDifference))

    // console.log(filteredTrees)

    if (this.state.filterTerm !== "all") {
        
        filteredTrees = filteredTrees.filter(tree => tree.spc_common && tree.spc_common.toLowerCase() === this.state.filterTerm.toLowerCase())
    } 
    
    return (
    <div>
      <div style={{position:"fixed", top: "0", left:"0", width:"100%", zIndex:"100", background:"rgba(255, 255, 255, 0.6)"}}>
        <CategorySelector handleRadio={this.handleRadio} filterTerm={this.state.filterTerm}/>
      </div>
      <ReactMapGL 
        {...this.state.viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/dwang0816/ck1k0qvij2rrl1cobig03w3rf"
        onViewportChange={this.onViewportChange}
      >
        {this.renderTreeMarker(filteredTrees)}
      </ReactMapGL>
      <div style={{position:"fixed", bottom: "0", left:"0", width:"100%", height: "30px", zIndex:"100", background:"rgba(200, 200, 200, 0.6)"}}>
        {/* <TreeSpecs/> */}
      </div>
    </div>
    )
  }
}

export default MapBox;
