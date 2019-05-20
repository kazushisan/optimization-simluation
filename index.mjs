import Universe from './models/Universe'

const universe = new Universe()

// while(true) {
//   universe.tick()
// }

while (true) {
  universe.tick()
  if (universe.done()) break
}