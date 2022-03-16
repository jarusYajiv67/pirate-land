const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const addPrefix = (no: number) => no < 10 ? `0${no}` : `${no}`;

export default function prettyDate (dateString: string) {
    const date = new Date(dateString);
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const time = addPrefix(date.getHours()) + ':' + addPrefix(date.getMinutes());
    
    return `${day} ${month}, ${year} - ${time}`;
}