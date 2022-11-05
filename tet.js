function changeDate(date) {
  return Intl.DateTimeFormat("ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// console.log();

console.log(changeDate(new Date("2022-11-03T15:45:56.000Z")));
