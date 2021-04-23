import React, { Component, Fragment } from 'react';
import PokemonItem from './components/PokemonItem';
import NoResults from './components/NoResults';
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

class App extends Component {
  state = {
    pokemons: null,
    searchResult: null,
    loader: true
  }

  componentDidMount(){
    this.getData();
  }

  async getData() {
    var request = await fetch(URL_PATH);
    var data = await request.json();

    if(request.status === 200){
      this.setState({
        pokemons: data,
        loader: false
      });
    } else 
      console.log("Error: ",request.status)
  }

  sortJSON(input) {
    return input.sort((a,b) => {
      if (a.name > b.name) 
        return 1;
      if (a.name < b.name)
        return -1;
      
      return 0;
    })
  }

  searchByName(json, inputValue) {
    var searchByName = json.filter(e => e.Name.toLowerCase().includes(inputValue.toLowerCase()));
    searchByName = this.sortJSON(searchByName);
    searchByName = searchByName.slice(0,4);

    return searchByName;
  }

  searchByType(json, inputValue, lastResult) {
    var searchByType = json.filter(e => {
      var found = e.Types.filter(z => z.toLowerCase().includes(inputValue.toLowerCase()));
      return found.length > 0;
    }); 
    searchByType = this.sortJSON(searchByType);
    searchByType = searchByType.slice(0, (4 - lastResult))

    return searchByType;
  }

  onInputKey = e => {
    e.preventDefault();

    var inputValue = e.target.value;
    var searchByName = this.searchByName(this.state.pokemons || [], inputValue);
    
    if(searchByName.length < 4){
      var searchByType = this.searchByType(this.state.pokemons || [], inputValue, searchByName.length)
      this.setState({
        searchResult: searchByName.concat(searchByType)
      });
    } else {
      this.setState({
        searchResult: searchByName
      });
    }

    if(inputValue.length === 0){
      this.setState({
        searchResult: null
      });
    }
  }

  render() {
    return (
      <Fragment>
         <label htmlFor="maxCP" className="max-cp">
          <input type="checkbox" id="maxCP" />
          <small>
              Maximum Combat Points
          </small>
        </label>
        <input onChange={this.onInputKey} type="text" className="input" placeholder="Pokemon or type" />
        { this.state.loader && <div className="loader"></div> }
        <ul className="suggestions">
          {this.state.searchResult && this.state.searchResult.map(e => <PokemonItem name={e.Name} pic={e.img} types={e.Types} />)}
          {(!this.state.searchResult || this.state.searchResult.length === 0) && <NoResults />}
          
        </ul>
      </Fragment>
    );
  }
}

export default App;
