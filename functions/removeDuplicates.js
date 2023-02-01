const removeDuplicates = (arr) => {
  const newArr = {}
  arr.map((item) => {
    newArr[item.source] = item
  })

  return Object.values(newArr)
}

exports.removeDuplicates = removeDuplicates
