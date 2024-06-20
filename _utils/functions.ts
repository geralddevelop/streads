export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

type WeightedItem<T> = {
  value: T
  weight: number
}

export function getRandomWeighted<T>(items: WeightedItem<T>[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  const random = Math.random() * totalWeight
  let cumulativeWeight = 0

  for (const item of items) {
    cumulativeWeight += item.weight
    if (random < cumulativeWeight) {
      return item.value
    }
  }

  // Fallback in case of rounding errors
  return items[items.length - 1].value
}
