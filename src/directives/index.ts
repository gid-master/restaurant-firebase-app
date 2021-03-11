export default {
  imageFallback: {
    mounted(element: HTMLImageElement) {
      element.onerror = () => {
        element.src = require("@/assets/fallback.png");
      };
    }
  }
};
