const formatDate = (date) => {
  const d = new Date(date);
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  let day = "" + d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();

  if (day.length < 2) day = "0" + day;

  return `${day}-${month}-${year}`;
};
export default formatDate;


export const formatDateJS = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${year}-${month}-${day}`;
}