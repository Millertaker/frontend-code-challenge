import React from 'react';

const  PokemonItem = (props) => 
<li>
  <img src={props.pic} alt="" />
  <div className="info">
    <h1>{props.name}</h1>
    { props.types && props.types.map(e => <span className={'type ' + e.toLowerCase()} >{e}</span> ) }
  </div>
</li>

export default PokemonItem;