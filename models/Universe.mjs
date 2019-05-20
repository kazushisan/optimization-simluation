import Customer from '../agents/Customer'
// import CustomerOrder from '../agents/CustomerOrder'
// import CustomerRandom from '../agents/CustomerRandom'

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

    this.wait = new Array(6).fill(0)
    this.waitList = new Array(6).fill([])

    this.init()
  }

  init() {
    const self = this
    this.customers = new Array(10).fill(null).map(() => new Customer(self))
    // this.costomersOrder = new Array(10).map(() => new CustomerOrder())
    // this.costomersOrder = new Array(10).map(() => new CustomerRandom())
    console.log(this.waitList)
    console.log(this.wait)
  }

  display() {
    console.log('----wait list----')
    console.log(this.waitList)
    console.log('----wait time----')
    console.log(this.wait)    
  }

  tick() {
    const self = this
    this.customers.forEach(customer => {
      customer.tick(self)
    })
    console.log(this.display())

    // this.customersOrder.forEach(costomerOrder => {
    //   costomerOrder.tick()
    // })

    // this.costomersRandom.forEach(costomerRandom => {
    //   costomerRandom.tick()
    // })
  }
}

export default Universe
