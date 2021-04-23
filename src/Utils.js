const searchByName = (json, inputValue) => {
  var searchByName = json.filter(e => e.Name.toLowerCase().includes(inputValue.toLowerCase()));
  searchByName = sortJSON(searchByName);
  searchByName = searchByName.slice(0,4);

  return searchByName;
}

const searchByType = (json, inputValue, lastResult) => {
  var searchByType = json.filter(e => {
    let found = e.Types.filter(z => z.toLowerCase().includes(inputValue.toLowerCase()));
    return found.length > 0;
  }); 
  searchByType = sortJSON(searchByType);
  searchByType = searchByType.slice(0, (4 - lastResult))

  return searchByType;
}

const sortJSON = (input) => {
  return input.sort((a,b) => {
    if (a.name > b.name)  return 1;
    if (a.name < b.name) return -1;
    return 0;
  })
}

export {
  searchByName,
  searchByType, 
  sortJSON
}