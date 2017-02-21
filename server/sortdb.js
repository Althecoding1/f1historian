module.exports = {

  sortDriverList: (list) => {
    let resultNums = [];
    let resultNoNums = []
    for (let i = 0; i < list.length; i++) {
      if(list[i].number !== null) {
        resultNums.push(list[i]);
      } else {
        resultNoNums.push(list[i]);
      }
    }
    return resultNums.concat(resultNoNums);
  }

}
