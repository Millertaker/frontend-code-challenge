import React, { Component, Fragment } from 'react';
import PokemonItem from './components/PokemonItem';
import NoResults from './components/NoResults';
import { searchByName, searchByType} from './Utils'
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

class App extends Component {
  state = {
    pokemons: [],
    searchResult: [],
    loader: true
  }

  componentDidMount(){
    this.getData();
  }

  async getData() {
    var response = await fetch(URL_PATH);
    var data = await response.json();

    if(response.status === 200){
      this.setState({
        pokemons: data,
        loader: false
      });
    } else 
      console.log("Error: ",response.status)
  }

  onInputKey = e => {
    e.preventDefault();

    var inputValue = e.target.value;
    var nameResults = searchByName(this.state.pokemons, inputValue);

    if(inputValue.length === 0) {
      this.setState({ searchResult: [] });
      return;
    }
    
    if(nameResults.length < 4){
      let typeResults = searchByType(this.state.pokemons, inputValue, nameResults.length)
      this.setState({ searchResult: nameResults.concat(typeResults) });
    } else  this.setState({ searchResult: nameResults });
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
          {this.state.searchResult && this.state.searchResult.map(e => <PokemonItem {...e} />)}
          {(!this.state.searchResult || this.state.searchResult.length === 0) && <NoResults />}
          
        </ul>
      </Fragment>
    );
  }
}

export default App;
