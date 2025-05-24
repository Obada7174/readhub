export default function TransformDate(date:string) {
    const selectedDate = new window.Date(date);
    const getFullYear = selectedDate.getFullYear();
    const getMonth = selectedDate.getMonth();
    const getDay = selectedDate.getDate();
    return { getFullYear, getMonth, getDay };
  }
  