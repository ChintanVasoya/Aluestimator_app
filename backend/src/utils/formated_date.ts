export const formatted_date = async () => {
  return new Date(Date.now()).toISOString().replace("T", " ").replace("Z", "");
};
