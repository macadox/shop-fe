export const addSuffix = (value: string | number) => {
  return `${typeof value === "number" ? "px" : ""}`;
};
