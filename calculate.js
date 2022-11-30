const rome = {
    Z: 2000,
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
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
            rome[arr[i+ 1]],
            rome[arr[i+ 2]],
        ]
        return b > a ? prev - a : prev + a;
    }, 0)
}


function valid(string){
    let pattern = /[^IVX0-9+*\/-\s]/g;
    if([...string.matchAll(pattern)].length >= 1){
        throw new Error("Введены не верные символы");
    }
    pattern = /[+-\/*]/g;
    if([...string.matchAll(pattern)].length > 1){
        throw new Error("Введено более 1 символа вычисления");
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

function isArabian(num){
    let result = '';
    if (num < 1) return '';
    for(let key in rome){
        while (num >= rome[key]){
            result += key;
            num -= rome[key];
        }
    }
    return result;
}

function numbs(string){
    if(string.trim() === ''){
        throw new Error("Строка не должна быть пустой");
    }
    if (string.length <= 1){
        throw new Error("Для вычисления дожно быть указано 2 значения");
    }
    return string.split(/[+\-*\/]/g).map(el => el.trim());
}

function calculator(string) {
    let summ = 0;
    let isVal = valid(string);
    let arr = numbs(string);
    const roman = isRoman(string);

    if(roman){
        arr = arr.map(el => {
            return romanToArabic(el)
        });
    }
    if(arr.some(el => el < 1 || el > 10)){
        throw new Error("Должно быть введено значение от 1 до 10");
    }
    if(string.includes('+') && isVal){
        summ = (+arr[0]) + (+arr[1]);
    }else if(string.includes('-') && isVal){
        summ = (+arr[0]) - (+arr[1]);
    }else if(string.includes('*') && isVal){
        summ = (+arr[0]) * (+arr[1]);
    }else if(string.includes('/') && isVal){
        summ = Math.trunc((+arr[0]) / (+arr[1]));
    }
    // return arr;
    return roman ? isArabian(summ) : String(summ);
}

console.log(calculator('XI+I'));