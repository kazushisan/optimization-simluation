import Customer from '../agents/Customer'
import CustomerOrder from '../agents/CustomerOrder'
import CustomerRandom from '../agents/CustomerRandom'

const sleep = (t) => new Promise(resolve => setTimeout(() => resolve(), t))

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

    this.waitList = new Array(this.N).fill([])

    // CustomerOrderモデルのエージェントが使用する施設を回る順番
    this.order = [0, 1, 2, 3, 4, 5]

    this.initAgents()

    this.steps = 0
  }

  initAgents() {
    const self = this
    this.customers = new Array(10).fill(null).map(() => new Customer(self))
    this.customersOrder = new Array(10).fill(null).map(() => new CustomerOrder(self))
    this.customersRandom = new Array(10).fill(null).map(() => new CustomerRandom(self))
    console.table(this.waitList)
  }

  async display() {
    process.stdout.write('\x1Bc')
    console.table(this.waitList)
    console.log(`steps: ${this.steps}`)
    await sleep(10)
  }

  async tick() {
    const self = this
    // console.log(this.waitList)
    this.waitList.forEach(list => {
      if (list.length > 0) {
        list[0].tickService(self)
      }
    })

    this.customers.forEach(customer => {
      customer.tickTransfer(self)
    })
    this.customersOrder.forEach(customerOrder => {
      customerOrder.tickTransfer(self)
    })
    this.customersRandom.forEach(customerRandom => {
      customerRandom.tickTransfer(self)
    })

    await this.display()
    this.steps += 1
  }

  done() {
    const customersDone = this.customers.every(customer => customer.isDone)
    const customersOrderDone = this.customersOrder.every(customer => customer.isDone)
    const customersRandomDone = this.customersRandom.every(customer => customer.isDone)

    if (customersDone && customersOrderDone && customersRandomDone){
      console.log('FINISHED')
      return true
    }
  }
}

export default Universe
