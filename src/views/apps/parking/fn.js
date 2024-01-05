// 랜덤숫자

export function randomNumber(n, m){
    let N = n;
    let M = m;
    let tt = Math.random()*N;
    return Math.floor(tt)+M;
}
// 랜덤 index
export function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

//차량번호 체크
export function checkCarNum(value) {
    const regex = /\d{2,3}[가-힣]{1}\d{4}/gm;
    regex.test(value)
}