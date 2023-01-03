import { brandLevels } from '@/const/shop'

export default function getStats(brand, category) {
  const stats = {
    acc: 5,
    cap: '10 + 1 rounds',
    capVal: 3.5,
    erg: 5,
    fit: 5,
    rng: '10-50 Yards',
    rngVal: 3.5,
    rec: 5,
    rel: 5,
    showStats: false,
  }

  if (category.name?.includes('Handgun')) {
    stats.showStats = true
  }

  if (category.name?.includes('Rifle')) {
    stats.cap = '30 + 1 rounds'
    stats.capVal = 5
    stats.rng = '1,000 Yards'
    stats.rngVal = 5
    stats.showStats = true
  }

  if (category.name?.includes('Shotgun')) {
    stats.cap = '6 + 1 rounds'
    stats.capVal = 6.5
    stats.rng = '50-100 Yards'
    stats.rngVal = 6.5
    stats.showStats = true
  }

  const levels = Object.keys(brandLevels).reduce((accumulator, key) => {
    accumulator[key.toLowerCase()] = brandLevels[key]
    return accumulator
  }, {})

  if (levels[brand.name?.toLowerCase()] === 'Premium') {
    stats.acc += 2
    stats.erg += 0.5
    stats.fit += 2
    stats.rec += 1
    stats.rel += 3
  } else if (levels[brand.name?.toLowerCase()] === 'Mid-Range') {
    stats.acc += 1
    stats.erg += 0
    stats.fit += 1.5
    stats.rec += 0
    stats.rel += 2.5
  } else if (levels[brand.name?.toLowerCase()] === 'Budget') {
    stats.acc += 0
    stats.erg += -0.5
    stats.fit += -1
    stats.rec += 1
    stats.rel += -2
  }

  return stats
}
