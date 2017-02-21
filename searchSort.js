module.exports = {

  const searchSort = (search, obj) => {
    let name = (obj.forname + obj.surname).toLowerCase();
    for(let i = 0; i < search.length; i++) {
      if(name.indexOf(search[i] === -1)) {
        return;
      }
    }
    return obj;
  }

}
