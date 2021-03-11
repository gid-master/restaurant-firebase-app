export const isIOS = (): boolean => {
  if (!navigator) {
    return false;
  }

  const devices: string[] = [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ];
  const mac: boolean =
    navigator.userAgent.includes("Mac") && "ontouchend" in document;
  return devices.includes(navigator.platform) || mac;
};

export const isApplicationInstalled = (): boolean => {
  return window.matchMedia("(display-mode: standalone)").matches;
};

export const isDevelopmentMode = (): boolean => {
  return Boolean(process.env.NODE_ENV === "development");
};
