import Customer from './Customer'

class CustomerRandom extends Customer {
  constructor() {
    // transfer or wait of service
    this.condition = 'wait'
    this.visited = new Array(6).fill(false)
  }

  pickRandom() {
    while (true) {
      const i = Math.floor(Math.random() * 6)
      
      if (!this.visted[i]) {
        this.visited[i] = true
        return i
      }
    }
  }
}

export default Customer