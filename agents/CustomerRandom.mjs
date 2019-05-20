import Customer from './Customer'

class CustomerRandom extends Customer {
  // 次の施設のインデックスを返す．もし次のインデックスがない場合は-1を返す
  nextFacility(universe) {
    if (this.visited.every(facility => facility)) {
      return -1
    }
    const facilitiesNotYetVisited = new Array(universe.N).fill(null).map((_, i) => i).filter(i => !this.visited[i])
    const newDestination = facilitiesNotYetVisited[Math.floor(Math.random() * facilitiesNotYetVisited.length)]
    return newDestination
  }
}

export default CustomerRandom