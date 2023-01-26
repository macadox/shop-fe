export const addSuffix = (value: string | number) => {
  return `${typeof value === "number" ? "px" : ""}`;
};

export const handleRotate = (degree = 0) => `rotate(${degree})`;
