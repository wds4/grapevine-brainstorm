export const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const arrayToObject = (array, keyField) =>
  Object.fromEntries(array.map((item) => [item[keyField], item]))

/*
const people:Foo = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const peopleById = arrayToObject(people, "id");

console.log(peopleById);

// Output: { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" }, 3: { id: 3, name: "Charlie" } }
*/

export const secsToTime = (secs) => {
  let displayTime = '--'
  const currentTime = Math.floor(Date.now() / 1000)
  const ageSecs = currentTime - secs
  const ageMins = Math.floor(ageSecs / 60)
  const ageHours = Math.floor(ageSecs / (60 * 60))
  const ageDays = Math.floor(ageSecs / (60 * 60 * 24))
  const ageYears = Math.floor(ageSecs / (60 * 60 * 24 * 365))
  let discoveredUnit = false
  if (!discoveredUnit && ageSecs < 60) {
    // if less than one minute,
    // display in seconds
    displayTime = `${ageSecs} s`
    discoveredUnit = true
  }
  if (!discoveredUnit && ageSecs < 60 * 60) {
    // if less than one hour,
    // display in minutes
    const residualSeconds = ageSecs - 60 * ageMins
    displayTime = `${ageMins} m, ${residualSeconds} s`
    discoveredUnit = true
  }
  if (!discoveredUnit && ageSecs < 24 * 60 * 60) {
    // if less than one day,
    // display in hours
    const residualMinutes = ageMins - 60 * ageHours
    displayTime = `${ageHours} h, ${residualMinutes} m`
    discoveredUnit = true
  }
  if (!discoveredUnit && ageSecs < 365 * 24 * 60 * 60) {
    // if less than one year,
    // display in days
    const residualHours = ageHours - 24 * ageDays
    displayTime = `${ageDays} d, ${residualHours} h`
    discoveredUnit = true
  }
  if (!discoveredUnit) {
    // else display in years
    const residualDays = ageDays - 365 * ageYears
    displayTime = `${ageYears} y, ${residualDays} d`
    discoveredUnit = true
  }

  return displayTime
}

export const secsToTimeAgo = (secs) => {
  let displayTime = '--'
  const currentTime = Math.floor(Date.now() / 1000)
  const ageSecs = currentTime - secs
  const ageMins = Math.floor(ageSecs / 60)
  const ageHours = Math.floor(ageSecs / (60 * 60))
  const ageDays = Math.floor(ageSecs / (60 * 60 * 24))
  const ageYears = Math.floor(ageSecs / (60 * 60 * 24 * 365))
  let discoveredUnit = false
  if (!discoveredUnit && ageSecs < 60) {
    // if less than one minute,
    // display in seconds
    displayTime = `${ageSecs} seconds`
    if (ageSecs == 1) {
      displayTime = `${ageSecs} second`
    }
    discoveredUnit = true
  }
  if (!discoveredUnit && ageSecs < 60 * 60) {
    // if less than one hour,
    // display in minutes
    displayTime = `${ageMins} minutes`
    if (ageMins == 1) {
      displayTime = `${ageMins} minute`
    }
    discoveredUnit = true
  }
  if (!discoveredUnit && ageSecs < 24 * 60 * 60) {
    // if less than one day,
    // display in hours
    displayTime = `${ageHours} hours`
    if (ageHours == 1) {
      displayTime = `${ageHours} hour`
    }
    const residualMinutes = ageMins - 60 * ageHours
    if (residualMinutes == 1) {
      displayTime += `, ${residualMinutes} minute`
    } else {
      displayTime += `, ${residualMinutes} minutes`
    }
    discoveredUnit = true
  }
  if (!discoveredUnit && ageSecs < 365 * 24 * 60 * 60) {
    // if less than one year,
    // display in days
    displayTime = `${ageDays} days`
    if (ageDays == 1) {
      displayTime = `${ageDays} day`
    }
    discoveredUnit = true
  }
  if (!discoveredUnit) {
    // else display in years
    displayTime = `${ageYears} years`
    if (ageYears == 1) {
      displayTime = `${ageYears} year`
    }
    discoveredUnit = true
  }
  displayTime += ' ago'

  return displayTime
}
