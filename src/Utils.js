const searchByName = (json, inputValue) => {
  var resultsByName = json.filter(e => e.Name.toLowerCase().includes(inputValue.toLowerCase()));
  resultsByName = sortJSON(resultsByName);
  resultsByName = resultsByName.slice(0,4);

  return resultsByName;
}

const searchByType = (json, inputValue, lastResult) => {
  var resultsByType = json.filter(e => {
    let found = e.Types.filter(z => z.toLowerCase().includes(inputValue.toLowerCase()));
    return found.length > 0;
  }); 
  resultsByType = sortJSON(resultsByType);
  resultsByType = resultsByType.slice(0, (4 - lastResult))

  return resultsByType;
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

