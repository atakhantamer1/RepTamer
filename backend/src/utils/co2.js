const CO2_SAVING_PER_PERSON_KM = 0.12;

export function calculateCo2Savings(distanceKm, passengers = 1) {
  const safeDistance = Number(distanceKm) || 0;
  const safePassengers = Math.max(Number(passengers) || 1, 1);

  return Number((safeDistance * safePassengers * CO2_SAVING_PER_PERSON_KM).toFixed(2));
}
