export function convertTo12HourFormat(time) {
  // Split the input time string into hours, minutes, and seconds
  let [hours, minutes, seconds] = time.split(":").map(Number);

  // Determine AM/PM suffix
  let period = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12 || 12;

  // Construct the new time string
  let newTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return newTime;
}
