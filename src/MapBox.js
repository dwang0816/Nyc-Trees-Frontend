import React from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup} from "react-map-gl"
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
      zoom: 13,
      width:'100vw',
      height: "100vh"
    },
    treesCollection:[],
    filterTerm: "all",
    selectedTree: {},
    setSelectedTree: false
  }

  onViewportChange = viewport => {
    // console.log(viewport)
    this.setState({viewport});
    
  };
     // FOR RENDERING FROM THE BACKEND //
  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.viewport.latitude !== this.state.viewport.latitude) {
  //   fetch(`http://localhost:3000/trees?latitude=${this.state.viewport["latitude"]}&longitude=${this.state.viewport['longitude']}`)
  //   .then(res => res.json())
  //   .then(trees => {
  //     // localStorage.setItem("treesCollection", trees)
  //     // console.log(localStorage.treesCollection)
  //     // console.log(JSON.stringify(localStorage.treesCollection))
  //     this.setState({treesCollection: trees})
  //   })
  //   }
  // }

  componentDidMount(){
    fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$limit=30000`)
    .then(res => res.json())
    .then(trees => this.setState({treesCollection: trees}))
  }

  setSelectedTree = (obj) => {
    // debugger
    // console.log("a tree was clicked")
    this.setState({
      selectedTree: obj,
      setSelectedTree: true
    })
  }

  renderTreeMarker = (filteredTrees) => {
    // debugger
    return filteredTrees.map((tree) => {
      if (tree.health === "Poor") {
        // debugger
      return (
        <Marker
          key={tree.tree_id}
          latitude={parseFloat(tree.latitude)}
          longitude={parseFloat(tree.longitude)}
          tree={tree}
        > 
            <div>
                <img 
                src={poorTree} 
                alt="poor tree"
                onClick={()=> this.setSelectedTree(tree)}
                />
            </div>
        </Marker>)

      } else if (tree.health === "Fair") {
        return (
          <Marker
            key={tree.tree_id}
            latitude={parseFloat(tree.latitude)}
            longitude={parseFloat(tree.longitude)}
            tree={tree}
          > 
              <div>
                  <img 
                  src={fairTree} 
                  alt="fair tree"
                  onClick={()=> this.setSelectedTree(tree)}
                  />
              </div>
        </Marker>)
        } else if (tree.health === "Good") {
          return (
            <Marker
              key={tree.tree_id}
              latitude={parseFloat(tree.latitude)}
              longitude={parseFloat(tree.longitude)}
              tree={tree}
            > 
                <div>
                    <img 
                    src={goodTree} 
                    alt="good tree"
                    onClick={()=> this.setSelectedTree(tree)}
                    />
                </div>
          </Marker>)
          } else {
            return (
              <Marker
                key={tree.tree_id}
                latitude={parseFloat(tree.latitude)}
                longitude={parseFloat(tree.longitude)}
                tree={tree}
              > 
                  <div>
                      <img 
                      src={unknown} 
                      alt="unknown"
                      onClick={()=> this.setSelectedTree(tree)}
                      />
                  </div>
            </Marker>)
          }
    })

  }

  handleRadio = (event) => {
    // console.log(event.target)
    const filterTerm = event.target.name.toLowerCase()
    this.setState({ filterTerm })
  }

  render(){


    //RENDERING FROM FRONT END//
    const maxDifference = 0.025
    const allTrees = [...this.state.treesCollection]
    let filteredTrees = allTrees.filter(tree => (parseFloat(tree.longitude) < this.state.viewport["longitude"]+maxDifference && parseFloat(tree.longitude) > this.state.viewport["longitude"]-maxDifference) && (parseFloat(tree.latitude )< this.state.viewport["latitude"]+maxDifference && parseFloat(tree.latitude) > this.state.viewport["latitude"]-maxDifference))


    //RENDERING FROM BACK END//
    // let filteredTrees = [...this.state.treesCollection]

    //RENDERING FROM LOCAL STORAGE//
    // console.log(JSON.parse(localStorage.treesCollection))
    // let filteredTrees = localStorage.getItem('treesCollection')


    //FILTER ON SPECIES METHOD//
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

        {this.state.setSelectedTree ? (
            <Popup
              latitude={parseFloat(this.state.selectedTree.latitude)}
              longitude={parseFloat(this.state.selectedTree.longitude)}
              closeButton={true}
              closeOnClick={false}
              onClose={() => this.setState({setSelectedTree: false})}
              anchor="bottom" 
            >
              <div>
                <h3>Species: {this.state.selectedTree.spc_common}</h3>
                <p>Health: {this.state.selectedTree.health}</p>
              </div>
            </Popup>
        ) : null}
      </ReactMapGL>
      <div style={{position:"fixed", bottom: "0", left:"0", width:"100%", height: "30px", zIndex:"100", background:"rgba(255, 255, 255, 0.6)"}}>
      </div>
    </div>
    )
  }
}

export default MapBox;
