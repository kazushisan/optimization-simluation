class Customer {
  constructor(universe) {
    //一意に定まるID
    this.id = Math.floor(Math.random() * 10 ** 20)

    this.isTransfer = false
    this.isDone = false
    this.visited = new Array(universe.N).fill(false)
    
    // それぞれの場合の残り時間
    this.transTimeLeft = 0
    this.serviceTimeLeft = 0

    // 移動して目指している，待っているまたはサービスを受けている施設
    this.facility = this.firstFacility(universe)

    if (universe.waitList[this.facility].length == 0) {
      this.serviceTimeLeft = universe.time[this.facility]
    }
    // 普通にpushしただけだとなぜかうまく動作しなかった
    universe.waitList[this.facility] = [...universe.waitList[this.facility], this]
  }

  firstFacility(universe) {
    // 最初の施設はランダム
    return Math.floor(Math.random() * universe.time.length)
  }

  calcWaitTime(universe, facility) {
      const list = universe.waitList[facility]
      
      return list.reduce((acc, cur) => acc + cur.serviceTimeLeft, 0)
    }

  // 次の施設のインデックスを返す．もし次のインデックスがない場合は-1を返す
  nextFacility(universe) {
    if (this.visited.every(facility => facility)) {
      return -1
    }
    const facilitiesNotYetVisited = new Array(universe.N).fill(null).map((_, i) => i).filter(i => !this.visited[i])

    let newDestination = facilitiesNotYetVisited[0]

    facilitiesNotYetVisited.forEach(facility => {
      if (this.calcWaitTime(universe, facility) < this.calcWaitTime(universe, newDestination)) {
        newDestination = facility
      }
    })
    return newDestination
  }

  tickTransfer(universe) {
    if (!this.isTransfer) return

    if (this.transTimeLeft > 0) {
      // during transfer
      this.transTimeLeft -= 1
    } else {
      // on transfer end
      // 普通にpushしただけだとなぜかうまく動作しなかった
      universe.waitList[this.facility] = [...universe.waitList[this.facility], this]
      this.isTransfer = false
    }
  }

  tickService(universe) {
    if (this.serviceTimeLeft == 0) {
      universe.waitList[this.facility].shift()
      this.visited[this.facility] = true

      const newDestination = this.nextFacility(universe)

      if (newDestination === -1) {
        this.isDone = true
      } else {
        this.transTimeLeft = universe.transport[this.facility][newDestination]
        this.serviceTimeLeft = universe.time[newDestination]
        this.facility = newDestination
        this.isTransfer = true
      }          
    } else {
      this.serviceTimeLeft -= 1
    }
  }

}

export default Customer