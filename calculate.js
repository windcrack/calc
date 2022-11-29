const rome = {
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
}

function romanToArabic(string){
    return string.split('').reduce((prev, curr, i, arr)=>{
        const [a, b, c] = [
            rome[arr[i]],
            rome[arr[i] + 1],
            rome[arr[i] + 2],
        ]
        return b > a ? prev - a : prev + a;
    }, 0)
}


function valid(string){
    let pattern = /[^IVX0-9+*\/-\s]/g;
    if([...string.matchAll(pattern)].length >= 1){
        throw new Error("Введены не верные символы")
    }
    return true;
}

function isRoman(string){
    const pattern = /^[IVX]+$/;
    let arrNumps = string.split(/[+\-*\/]/g).map(num => num.trim());
    const val = arrNumps.reduce((acc, val) => acc + pattern.test(val), 0);
    if(val === 1){
        throw new Error("Оба числа должы быть римскими либо арабаскими либо арабскими")
    }else if(val === 2){
        return true;
    }
}

function numbs(string){
    return string.split(/[+\-*\/]/g).map(el => el.trim());
}

function calculator(string) {
    let summ = 0;
    let isVal = valid(string);
    let arr = numbs(string);
    const roman = isRoman(string);
    if(roman){
        arr = arr.map(el => romanToArabic(el));
    }
    if(string.includes('+')){
        summ = (+arr[0]) + (+arr[1]);
    }else if(string.includes('-')){
        summ = (+arr[0]) - (+arr[1]);
    }else if(string.includes('*')){
        summ = (+arr[0]) * (+arr[1]);
    }else if(string.includes('/')){
        summ = Math.trunc((+arr[0]) / (+arr[1]));
    }
    // return arr;
    return String(summ);
}

console.log(calculator('I + I'));