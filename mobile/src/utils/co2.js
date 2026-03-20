export function estimateCo2Reduction(distanceKm, passengers = 1) {
  return Number((distanceKm * Math.max(passengers, 1) * 0.12).toFixed(2));
}
