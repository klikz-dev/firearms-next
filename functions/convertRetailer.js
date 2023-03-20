export default function convertRetailer(originRetailer) {
  let retailer = ''

  switch (originRetailer.toLowerCase().replace(' ', '')) {
    case 'guns':
      retailer = 'Guns.com'
      break

    case 'eurooptic':
      retailer = 'EuroOptic'
      break

    case 'sportsmansguide':
      retailer = "Sportsman's Guide"
      break

    case 'brownells':
      retailer = 'Brownells'
      break

    case 'danieldefense':
      retailer = 'Daniel Defense'
      break

    case 'gear1800':
      retailer = 'Gritr Outdoors'
      break

    case 'aeroprecision':
      retailer = 'Aero Precision'
      break

    case 'palmetto':
      retailer = 'Palmetto State Armory'
      break

    case 'primaryarms':
      retailer = 'Primary Arms'
      break

    default:
      retailer = originRetailer
      break
  }

  return retailer
}
