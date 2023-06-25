const capitalize = (s: string) =>
  s
    .replace(/([A-Z])/g, " $1")
    .charAt(0)
    .toUpperCase() + s.replace(/([A-Z])/g, " $1").slice(1);

export default capitalize;
