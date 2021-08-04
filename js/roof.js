const log =console.log;

window.addEventListener("load", () => {
    {
        var a = 1;
        {
            var b = 2;
            {
                var c = 3;
            }
            log(c);
        }
        log(b);
    }
    log(a);
    //변수 스코프가 없는듯함

    let result = '';
    var somevar; //somevar가 선언되었지만 초기화가 되어있지않음

    if(typeof somevar !== "undefined") { //typeof 는 항상 문자열을 리턴함
        result = 'yes';
    }
    log(result);

    somevar = undefined;

    if(typeof somevar !== "undefined") {
        result = "yes";
    }

    log(result);

    var a = 123;
    a = (a > 100 ? 100 : a < 50) ? 50 : a; // 첫번째값 true ? 50 : a

    a = 123;

    a = a > 100 ? 100 : (a < 50 ? 50 : a);

    log(a);

    var a = '1';
    result = '';

    switch(a) {
        case '1':
            result = 'String 1';
            break;
        case 1:
            result = 'Number 1';
            break;
        default:         
            result = `I dont't know`;
            break;
    }

    log(result);

    let res = '\n';
    for (var i = 0; i < 10; i++) {
        for ( var j = 0; j < 10; j++) {
            res += '* ';
        }
        res += '\n';
    }

    log(res);


    res = '\n';
    var i, j;

    for (i = 1; i <= 23; i++) {
        for(j = 1; j <= 15; j++) {
            res += (i * j) % 8 ? ' ' : '*';
        }
        res += '\n';
    }

    log(res);

    var a = ['a', 'b', 'c', 'x', 'y', 'z'];

    result = '\n';

    for(var i in a) {
        result += 'index: ' + i + ', value: ' + a[i] + '\n';
    }

    log(result);
})