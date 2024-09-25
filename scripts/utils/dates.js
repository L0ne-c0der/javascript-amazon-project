import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
 
export default function getDates(dateTimeString, dateFormat){
    let dateString = dateTimeString.substring(0,10);
    return dayjs(dateString).format(dateFormat);
};