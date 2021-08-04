window.addEventListener("load", () => {
    var firstname = "James";
    var lastname = "Bond";

    let result = transform`Name is ${lastname}, ${firstname}, ${lastname}`;
    let result2 = transform(["Name is ", ", ", ", " ], firstname, lastname);
    // console.log("result : " + result);
    // console.log("result2 : " + result2);

    let result1 = rawTag`This is a raw text and \n are no treated differently`;
    // console.log(result1);

    var t1Closure = template`${0}${1}${0}!`;
    console.log(t1Closure('Y', 'A'));  // "YAY!"

    var t2Closure = template`${0} ${'foo'}!`;
    console.log(t2Closure('Hello', { foo: 'World' }));  // "Hello World!"
})

function transform(strings, ...substitutes) {
    let result = ""; //초기화 안할시 undefined

    result = strings[0] + substitutes[0];

    return result;
}

function rawTag(strings, ...substitutes) {
    //strings[0]  백 슬래시가 특별한 의미를 가지는 처리된 폼
    //strings.raw[0] 백 슬래시가 특별한 의미를 가지지 않는 원시폼으로 처리

    return strings.raw[0];
}

//매개 : `${0}${1}{0}!`;
//결과 
function template(strings, ...keys) {
    console.log(strings, keys);
    return (function (...values) {
        var dict = values[values.length - 1] || {}; //모름
        var result = [strings[0]]; //모름
        console.log([strings[0]]);
        keys.forEach( (key, i) => {
            var value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });

        return result.join('');
    }); //함수 리턴
}
