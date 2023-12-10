export const safeJSONParse = (data: string | null) => {
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
