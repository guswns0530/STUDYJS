const log = console.log;

window.addEventListener("load", () => {
    //지연 평가
    var b = 5;
    true || (b = 6);
    log(b);

    true && (b = 6);
    log(b);

    var mynumber = mynumber || 10; //정의 되어있지 않으면 10으로 정의
    log(mynumber);

    //동등 및 유형 비교
    log(1 === '1'); //false
    log(1 === 1) //true

    log(1 !== '1') //true
    log(1 !== 1) //false

    //undefine와 null
    var i = 1 + undefined;
    log(i); //NaN

    i = 1 + null;
    log(i); //1

    log(1 * undefined); //NaN
    log( 1 * null ); // 1

    log(!!undefined); // false
    log(!!null) //false

    log("value: " + null);
    log("value: " + undefined);

    var atom = Symbol();
    // var atom  = new Symbol() 심볼은 생성자가 아님
    log(atom);
    
    atom = Symbol('atomic symbol');
    log(atom);

    log(Symbol() === Symbol()) //false
    log(Symbol('atom') === Symbol('atom')) //false
})