export const formatCurrency = (value: number): string => {
  const val = (value / 1).toFixed(2).replace(".", ",");
  return "US$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatDynamicImage = (image: string): string => {
  return require(`@/assets/dishes/${image.split("/").pop()}`);
};
