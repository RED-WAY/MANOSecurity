const customProps = (component, prop) => {
  const CONSTANTS = {
    CPU: {
      label: "Processador",
    },
    RAM: {
      label: "Memória",
    },
  };
  return CONSTANTS[component][prop];
};
