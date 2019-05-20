class Customer {
  constructor() {
    // transfer or wait of service
    this.condition = 'wait'
    this.visited = new Array(6).fill(false)
    this.transTimeLeft = 0
    this.serviceTimeLeft = 0
    // 移動して目指しているまたはサービスを受けている施設
    this.facility = -1
    // 一意なID
    this.id = Math.floor(Math.random() * 10 ** 20)
  }

  tick(universe) {
    if (this.transTimeLeft > 0) {
      // during transfer
      this.transTimeLeft = this.transTimeLeft - 1
    } else if (this.condition == 'transfer') {
      // on transfer end

      if (universe.wait[this.facility]) {
        this.condition = 'wait'
        universe.waitList[this.facility].push(this.id)
      } else {
        this.condition = 'service'
        universe.wait += universe.time[this.facility]
      }
    }
  }

}

export default Customer