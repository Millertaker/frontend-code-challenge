import React from 'react';

const  PokemonItem = (props) => 
<li>
  <img src={props.img} alt="" />
  <div className="info">
    <h1>{props.Name}</h1>
    { props.Types && props.Types.map(e => <span className={'type ' + e.toLowerCase()} >{e}</span> ) }
  </div>
</li>

export default PokemonItem;