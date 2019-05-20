import Customer from '../agents/Customer'
import CustomerOrder from '../agents/CustomerOrder'
import CustomerRandom from '../agents/CustomerRandom'

class Universe {
  constructor() {
    this.time = [10, 23, 20, 13, 10, 8]
    this.transport = [
      [0, 5, 3, 8, 13, 16],
      [5, 0, 8, 3, 18, 11],
      [3, 8, 0, 5, 10, 13],
      [8, 3, 5, 0, 11, 8],
      [13, 18, 10, 11, 0, 3],
      [16, 11, 13, 8, 3, 0]
    ]

    // N : number of faclities
    this.N = 6

    this.wait = new Array(this.N).fill(0)
    this.waitList = new Array(this.N).fill([])

    // CustomerOrderモデルのエージェントが使用する施設を回る順番
    this.order = [0, 1, 2, 3, 4, 5]

    this.initAgents()

    this.steps = 0
  }

  initAgents() {
    const self = this
    this.customers = new Array(10).fill(null).map(() => new Customer(self))
    this.customersOrder = new Array(0).fill(null).map(() => new CustomerOrder(self))
    this.customersRandom = new Array(0).fill(null).map(() => new CustomerRandom(self))
    console.log(this.waitList)
    console.log(this.wait)
  }

  display() {
    console.log('wait list')
    console.table(this.wait)  
  }

  tick() {
    const self = this
    this.customers.forEach(customer => {
      customer.tick(self)
    })

    this.customersOrder.forEach(customerOrder => {
      customerOrder.tick(self)
    })

    this.customersRandom.forEach(customerRandom => {
      customerRandom.tick(self)
    })

    this.display()
    this.steps += 1
  }

  done() {
    const customersDone = this.customers.every(customer => customer.condition === 'done')
    const customersOrderDone = this.customersOrder.every(customer => customer.condition === 'done')
    const customersRandomDone = this.customersRandom.every(customer => customer.condition === 'done')

    if (customersDone && customersOrderDone && customersRandomDone){
      console.log('steps: ' + this.steps)
      return true
    }
  }
}

export default Universe
