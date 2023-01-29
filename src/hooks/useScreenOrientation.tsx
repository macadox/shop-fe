import { useState, useEffect } from "react";

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.screen.orientation.type
  );

  useEffect(() => {
    const handleOrientationChange = () =>
      setOrientation(window.screen.orientation.type);
    window.addEventListener("resize", handleOrientationChange);

    return () => window.removeEventListener("resize", handleOrientationChange);
  }, []);

  return orientation;
};

export const ORIENTATIONS = {
  "landscape-primary": "landscape-primary",
  "landscape-secondary": "landscape-secondary",
  "portrait-primary": "portrait-primary",
  "portrait-secondary": "portrait-secondary",
};

export default useScreenOrientation;
