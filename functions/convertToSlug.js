const convertToSlug = (title) => {
  const titleStr = title && typeof title === 'string' ? title : title[1]
  return titleStr
    ? titleStr
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
    : ''
}

export default convertToSlug
