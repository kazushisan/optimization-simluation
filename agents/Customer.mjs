class Customer {
  constructor(universe) {
    // 一意に定まるID
    this.id = Math.floor(Math.random() * 10 ** 20)

    // transfer or wait or service
    this.condition = 'wait'
    this.visited = new Array(6).fill(false)
    
    // それぞれの場合の残り時間
    this.transTimeLeft = 0
    this.serviceTimeLeft = 0
    this.waitTimeLeft = 0

    // 移動して目指している，待っているまたはサービスを受けている施設 最初はランダムに設定
    this.facility = Math.floor(Math.random() * universe.time.length)

    // 行列に自分を追加
    if (universe.wait[this.facility].length > 0) {
      this.condition = 'wait'
    } else {
      this.condition = 'service'
      this.serviceTimeLeft = universe.time[this.facility]
    }
    universe.wait[this.facility] += universe.time[this.facility]

    // 普通にpushしただけだとなぜかうまく動作しなかった
    universe.waitList[this.facility] = [...universe.waitList[this.facility], this.id]
  }

  tick(universe) {
    switch (this.condition) {
      case 'transfer':
          if (this.transTimeLeft > 0) {
            // during transfer
            this.transTimeLeft = this.transTimeLeft - 1
          } else {
            // on transfer end
            if (universe.wait[this.facility].length > 0) {
              this.condition = 'wait'
              universe.waitList[this.facility].push(this.id)
            } else {
              this.condition = 'service'
              universe.wait[this.facility] += universe.time[this.facility]
              this.serviceTimeLeft = universe.time[this.facility]
            }
          }
        break;
      
      case 'service':
          if (this.serviceTimeLeft > 0) {
            this.serviceTimeLeft -= 1
            universe.wait[this.facility] -= 1
          } else {
            univese.wait[this.facility].shift()
            const newDestination = universe.wait.reduce((acc, cur) => acc = cur < acc ? cur : acc)
      
            this.transTimeLeft = universe.transport[this.facility][newDestination]
            this.facility = newDestination
            this.condition = 'transfer'
          }
        break;

      case 'wait':
          if (this.waitTimeLeft > 0) {
            universe.wait[this.facility] -= 1
            this.waitTimeLeft -= 1
          } else {
            this.condition = 'service'
            this.serviceTimeLeft = universe.facility[this.facility]
          }
        break;
    }

  }

}

export default Customer