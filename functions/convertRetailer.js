export default function convertRetailer(originRetailer) {
  let retailer = ''

  switch (originRetailer) {
    case 'Guns':
      retailer = 'Guns.com'
      break

    case 'EuroOptic':
      retailer = 'EuroOptic'
      break

    case 'SportsmansGuide':
      retailer = "Sportsman's Guide"
      break

    case 'Brownells':
      retailer = 'Brownells'
      break

    case 'DanielDefense':
      retailer = 'Daniel Defense'
      break

    case 'Gear1800':
      retailer = 'Gritr Outdoors'
      break

    case 'AeroPrecision':
      retailer = 'Aero Precision'
      break

    case 'Palmetto':
      retailer = 'Palmetto State Armory'
      break

    case 'PrimaryArms':
      retailer = 'Primary Arms'
      break

    default:
      retailer = originRetailer
      break
  }

  return retailer
}
