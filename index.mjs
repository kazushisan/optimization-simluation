import Universe from './models/Universe'

const universe = new Universe()

// while(true) {
//   universe.tick()
// }

const main = async () => {
  while (true) {
    await universe.tick()
    if (universe.done()) break
  }
}

main()