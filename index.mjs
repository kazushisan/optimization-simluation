import Universe from './models/Universe'
import './prototypes/permutation'


const main = async () => {
  const sets = [0, 1, 2, 3, 4, 5].permutation()
  const results = []

  for(let i = 0; i < sets.length; i++) {
    const universe = new Universe({
      order: sets[i],
      customerNum: 10,
      customerOrderNum: 10,
      customerRandomNum: 10,
      display: false
    })
  
    while (true) {
      await universe.tick()
      const done = universe.done()
      if (done) {
        results.push(done)
        break
      }
    }
  }

  const index = results.indexOf(Math.min(...results))
  console.log(sets[index])
  console.log(results[index])
}

main()