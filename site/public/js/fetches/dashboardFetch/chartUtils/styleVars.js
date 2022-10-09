const styleVars = (color) => {
  const GENERAL = {
    redAlt: "#ed145b",
    redDark: "#8e000c",
    white: "#fefefe",
    grayLight: "#efefef",
    backColor: "#ed145b20",
  };
  const styles = {
    LIGHT: {
      ...GENERAL,
      fontPrimary: "#222",
      fontSecondary: "#333",
      grid: "#2a060e50",
      tooltip: "#8e000cD0",
    },
    DARK: {
      ...GENERAL,
      fontPrimary: "#fff",
      fontSecondary: "#ddd",
      grid: "#8e000c40",
      tooltip: "#8e000c90",
    },
  };
  return styles[localStorage.THEME.toUpperCase()][color];
};
