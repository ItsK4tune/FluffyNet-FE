export const env = {
  be: {
    url: import.meta.env.VITE_BACK_END_URL || "http://localhost",
  },

  animate: {
    fade: import.meta.env.VITE_ANIMATE_FADE || 1,
    float: import.meta.env.VITE_ANIMATE_FLOAT || 1,
  }
};