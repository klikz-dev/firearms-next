import { brandLevels } from '@/const/setting/shop'

export default function getStats(brand, category, count) {
  const stats = {
    acc: 4 + (count % 4),
    erg: 4 + (count % 2),
    ftr: 4 + (count % 3),
    fit: 4 + (count % 2),
    rel: 4 + (count % 1),
    val: 4 + (count % 1),
  }
  if (count > 99) {
    stats.acc = 8 + (count % 1)
    stats.erg = 8 + (count % 2)
    stats.ftr = 8 + (count % 2)
    stats.fit = 8 + (count % 3)
    stats.rel = 8 + (count % 1)
    stats.val = 8 + (count % 3)
  } else if (count > 49) {
    stats.acc = 6 + (count % 1)
    stats.erg = 6 + (count % 2)
    stats.ftr = 6 + (count % 2)
    stats.fit = 6 + (count % 3)
    stats.rel = 6 + (count % 1)
    stats.val = 6 + (count % 3)
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

  Object.keys(stats)?.map((key) => {
    stats[key] = stats[key] > 10 ? 10 : stats[key]
  })

  return stats
}
