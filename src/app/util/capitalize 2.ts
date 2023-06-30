const capitalize = (s: string) =>
  s
    ? s
        .replace(/([A-Z])/g, " $1")
        .charAt(0)
        .toUpperCase() + s.replace(/([A-Z])/g, " $1").slice(1)
    : "NO STRING";
export default capitalize;
