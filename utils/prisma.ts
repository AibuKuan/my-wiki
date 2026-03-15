export const cleanJson = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};