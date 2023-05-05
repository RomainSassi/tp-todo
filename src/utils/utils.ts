export default class Utils {
  formatDate(date: Date, separator = "/", local = "fr") {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();

    let formattedDate = `${day}${separator}${month}${separator}${year}`;
    if (local === "en") {
      formattedDate = `${year}${separator}${month}${separator}${day}`;
    } 
    
    return formattedDate;
  }

  convertIntoDate(date: string, separator: string) {
    const [day, month, year] = date.split(separator)
    const dateFormat = new Date(`${year}-${month}-${day}`)
    return dateFormat
  }

  isWeekly(date: Date): boolean {
    const today = new Date();
    const todayDate = today.getDate();
    const todayDay = today.getDay();

    const firstDayOfTheWeek = new Date(today.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfTheWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    return date >= firstDayOfTheWeek && date <= lastDayOfWeek;
  }

  isTomorrow(date: Date): boolean {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = this.formatDate(date)
    const tomorrowString = this.formatDate(tomorrow)
    return dateString === tomorrowString
  }

  isToday(date: Date): boolean {
    const today = new Date();
    const dateString = this.formatDate(date)
    const todayString = this.formatDate(today)

    return dateString === todayString
  }
}
