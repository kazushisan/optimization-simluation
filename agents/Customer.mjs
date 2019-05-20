class Customer {
  constructor(universe) {
    //一意に定まるID
    this.id = Math.floor(Math.random() * 10 ** 20)

    // transfer or wait or service or done
    this.condition = 'wait'
    this.visited = new Array(universe.N).fill(false)
    
    // それぞれの場合の残り時間
    this.transTimeLeft = 0
    this.serviceTimeLeft = 0
    this.waitTimeLeft = 0

    // 移動して目指している，待っているまたはサービスを受けている施設
    this.facility = this.firstFacility(universe)

    // 行列に自分を追加
    if (universe.wait[this.facility] > 0) {
      this.condition = 'wait'
      this.waitTimeLeft = universe.wait[this.facility]
    } else {
      this.condition = 'service'
      this.serviceTimeLeft = universe.time[this.facility]
    }
    universe.wait[this.facility] += universe.time[this.facility]

    // 普通にpushしただけだとなぜかうまく動作しなかった
    universe.waitList[this.facility] = [...universe.waitList[this.facility], this]
  }

  firstFacility(universe) {
    // 最初の施設はランダム
    return Math.floor(Math.random() * universe.time.length)
  }

  // 次の施設のインデックスを返す．もし次のインデックスがない場合は-1を返す
  nextFacility(universe) {
    if (this.visited.every(facility => facility)) {
      return -1
    }
    const facilitiesNotYetVisited = new Array(universe.N).fill(null).map((_, i) => i).filter(i => !this.visited[i])

    let newDestination = facilitiesNotYetVisited[0]
    
    facilitiesNotYetVisited.forEach(facility => {
      if (universe.wait[facility] < universe.wait[newDestination]) {
        newDestination = facility
      }
    })
    return newDestination
  }

  tick(universe) {
    console.log({ condition: this.condition, transTimeLeft: this.transTimeLeft, serviceTimeLeft: this.serviceTimeLeft, waitTimeLeft: this.waitTimeLeft, facility: this.facility })
    switch (this.condition) {
      case 'transfer':
          if (this.transTimeLeft > 0) {
            // during transfer
            this.transTimeLeft -= 1
          } else {
            // on transfer end
            if (universe.wait[this.facility] > 0) {
              this.condition = 'wait'
              this.waitTimeLeft = universe.wait[this.facility]
            } else {
              this.condition = 'service'
              this.serviceTimeLeft = universe.time[this.facility]
            }

            universe.wait[this.facility] += universe.time[this.facility]

            universe.waitList[this.facility] = [...universe.waitList[this.facility], this.id]
          }
        break;
      
      case 'service':
          if (this.serviceTimeLeft > 0) {
            this.serviceTimeLeft -= 1
            universe.wait[this.facility] -= 1
          } else {
            universe.waitList[this.facility].shift()
            this.visited[this.facility] = true

            const newDestination = this.nextFacility(universe)

            if (newDestination === -1) {
              this.condition = 'done'
            } else {
              this.transTimeLeft = universe.transport[this.facility][newDestination]
              console.log(this.transTimeLeft)
              console.log(this.facility)
              console.log(newDestination)
              this.facility = newDestination
              this.condition = 'transfer'
            }
          }
        break;

      case 'wait':
          if (this.waitTimeLeft > 0) {
            universe.wait[this.facility] -= 1
            this.waitTimeLeft -= 1
          } else {
            this.condition = 'service'
            this.serviceTimeLeft = universe.time[this.facility]
          }
        break;
    }

  }

}

export default Customer