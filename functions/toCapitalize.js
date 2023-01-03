export default function toCapitalize(string) {
  return string
    ? string
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    : ''
}
