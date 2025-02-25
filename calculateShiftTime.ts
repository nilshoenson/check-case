/**
 * Currently, there's three repair options:
 * Swappers (S): 1 minute - Replace the batteries of mopeds
 * Fixers (F): 5 minutes - Small fixes on mopeds
 * Mechanics (M): 8 minutes - The bigger repairs on mopeds
 */
enum RepairOptions {
  S = 1,
  F = 5,
  M = 8,
}

type RepairKey = keyof typeof RepairOptions

// Calculate time for all repair tasks
function calculateRepairTime(repairs: string): number {
  if (!repairs.match(/^[SFM]*$/)) {
    throw new Error('Invalid repair type. Only S, F, M are allowed.')
  }

  return repairs
    .split('')
    .map((repair) => RepairOptions[repair as RepairKey])
    .reduce((total, duration) => total + duration, 0)
}

// Calculate time spent traveling between stops
function calculateTravelTime(
  distances: number[],
  destinationIndex: number
): number {
  const travelDistances = distances.slice(0, destinationIndex)
  return travelDistances.reduce((total, distance) => total + distance, 0)
}

/**
 * Calculate total time needed for a full shift
 * @param repairStops Array of repair strings, each containing repair types (S, F, M)
 * @param distances Array of distances between consecutive stops
 * @throws {Error} When distances array length doesn't match repairStops.length - 1
 * @returns Total time needed for the shift in minutes
 */
function calculateShiftTime(
  repairStops: string[],
  distances: number[]
): number {
  if (distances.length !== repairStops.length - 1) {
    throw new Error(
      'Number of distances must be equal to number of stops minus 1'
    )
  }

  let totalTime = 0

  let lastRepairStops: Record<RepairKey, number> = {
    S: 0,
    F: 0,
    M: 0,
  }

  // Calculate repair times for all stops
  for (let i = 0; i < repairStops.length; i++) {
    const repairs = repairStops[i]
    const repairTime = calculateRepairTime(repairs)

    // Track the last location of each repair type
    for (const repair of repairs) {
      if (repair in lastRepairStops) {
        lastRepairStops[repair as RepairKey] = i
      }
    }

    totalTime += repairTime
  }

  // Calculate travel times based on last occurrence
  for (const locationIndex of Object.values(lastRepairStops)) {
    if (locationIndex > 0) {
      const travelTime = calculateTravelTime(distances, locationIndex)
      totalTime += travelTime
    }
  }

  return totalTime
}
