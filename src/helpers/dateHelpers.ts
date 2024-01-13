export const formatISODateToDDMMYYYYHHMM = (date: string) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();
  const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutes = dateObject.getMinutes();
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${day}/${month}/${year} ${hoursString}:${minutesString}`;
};

export const formatISODateTODDMMYYYY = (date: string) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();
  const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatISODateTOYYYYMMDD = (date: string) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();
  const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${year}-${month}-${day}`;
};
