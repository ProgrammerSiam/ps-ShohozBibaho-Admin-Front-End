export const customStyles = {
  control: (base, state) => ({
    ...base,
    height: "40px",
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "#e2e8f0" : "#e2e8f0",
    backgroundColor: "#ffffff",
    fontSize: "0.875rem",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      borderColor: "#e2e8f0",
    },
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontSize: "0.875rem",
  }),
};
