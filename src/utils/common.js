// 랜덤 아이디 
export function randomId() {
    let N = 1000000;
    let M = 1;
    let tt = Math.random()*N;
    return Math.floor(tt)+M;
}
  // 날짜 시간 셋팅
export function getTodayDate(format) {
  let weekdays = ['일', '월', '화', '수', '목', '금', '토']
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let day = today.getDate()
  let hours = today.getHours()
  let minutes = today.getMinutes()
  let dayOfWeek = weekdays[today.getDay()]
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  let timeOfDay = hours < 12 ? '오전' : '오후'
  hours = hours % 12 || 12
  minutes = minutes < 10 ? '0' + minutes : minutes

  let TodayDateFull = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes} 분 ${timeOfDay} (${dayOfWeek})`
  let TodayDateFullDash = `${year}-${month}-${day} ${hours}:${minutes} ${timeOfDay}`
  let TodayDateMitres = `${year}-${month}-${day} ${hours}:${minutes}`
  let TodayData = `${month}월 ${day}일 ${dayOfWeek}요일`
  let currentTime = `${timeOfDay} ${hours}:${minutes}`

    switch(format) {
        case 'yy-mm-dd':
        return TodayDateFullDash.slice(2);
        case 'mm-dd':
        return TodayDateFullDash.slice(5, 10);
        case 'hh:mm':
        return currentTime.slice(3);
        case 'yy-mm-dd hh:mm:ss':
        return TodayDateMitres;
        default:
        return TodayDateFullDash;
    }
}
  
export function RandomCode(length = 10, isNumbersOnly = false) {
  const characters = `${isNumbersOnly ? '' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'}0123456789`;
  return Array.from({length}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
