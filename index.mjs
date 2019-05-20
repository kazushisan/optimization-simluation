import Universe from './models/Universe'

const main = async () => {
  const universe = new Universe({
    order: [0, 1, 2, 3, 4, 5],
    customerNum: 0,
    customerOrderNum: 10,
    customerRandomNum: 0,
    display: false
  })

  while (true) {
    await universe.tick()
    if (universe.done()) break
  }
}

main()