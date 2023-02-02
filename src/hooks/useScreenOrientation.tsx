import { useState, useEffect } from "react";

export const ORIENTATIONS = {
  "landscape-primary": "landscape-primary",
  "landscape-secondary": "landscape-secondary",
  "portrait-primary": "portrait-primary",
  "portrait-secondary": "portrait-secondary",
};

const readDeviceOrientation = () => {
  if (window.innerWidth > window.innerHeight) {
    return "landscape-primary";
  } else {
    return "portrait-primary";
  }
};

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<
    keyof typeof ORIENTATIONS | undefined
  >();

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.screen.orientation) {
        setOrientation(window.screen.orientation.type);
      } else {
        const orientation = readDeviceOrientation();
        setOrientation(orientation);
      }
    };
    handleOrientationChange();
    window.addEventListener("resize", handleOrientationChange);

    return () => window.removeEventListener("resize", handleOrientationChange);
  }, []);

  return orientation;
};

export default useScreenOrientation;
