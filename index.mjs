import Universe from './models/Universe'

const main = async () => {
  const universe = new Universe()

  while (true) {
    await universe.tick()
    if (universe.done()) break
  }
}

main()