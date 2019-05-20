import Universe from './models/Universe'
import './prototypes/permutation'


const main = async () => {
    const universe = new Universe({
      order: [0, 1, 2, 3, 4, 5],
      customerNum: 10,
      customerOrderNum: 10,
      customerRandomNum: 10,
      display: true
    })
  
    while (true) {
      await universe.tick()
      const done = universe.done()
      if (done) {
        break
      }
    }
}

main()