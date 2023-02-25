import { brandLevels } from '@/const/setting/shop'

export default function getStats(brand, category, count) {
  const stats = {
    acc: 6,
    erg: 6,
    ftr: 6,
    fit: 6,
    rel: 6,
    val: 6,
  }
  if (count > 99) {
    stats.acc = 8
    stats.erg = 8
    stats.ftr = 8
    stats.fit = 8
    stats.rel = 8
    stats.val = 8
  } else if (count > 49) {
    stats.acc = 7
    stats.erg = 7
    stats.ftr = 7
    stats.fit = 7
    stats.rel = 7
    stats.val = 7
  }

  if (category.includes('Handgun')) {
    stats.showStats = true
  }

  if (category.includes('Rifle')) {
    stats.showStats = true
  }

  if (category.includes('Shotgun')) {
    stats.showStats = true
  }

  const levels = Object.keys(brandLevels).reduce((accumulator, key) => {
    accumulator[key.toLowerCase()] = brandLevels[key]
    return accumulator
  }, {})

  if (levels[brand.toLowerCase()] === 'Premium') {
    stats.acc += 2
    stats.erg += 1
    stats.ftr += 1
    stats.fit += 2
    stats.rel += 2
    stats.val += 0
  } else if (levels[brand.toLowerCase()] === 'Mid-Range') {
    stats.acc += 1
    stats.erg += 0
    stats.ftr += 0
    stats.fit += 1
    stats.rel += 1
    stats.val += 0
  } else if (levels[brand.toLowerCase()] === 'Budget') {
    stats.acc += 0
    stats.erg += -1
    stats.ftr += -1
    stats.fit += -1
    stats.rel += -1
    stats.val += 1
  }

  return stats
}
