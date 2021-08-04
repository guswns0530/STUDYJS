const log = console.log;

window.addEventListener("load", () => {
    let result = sum(1, 2, 3, 4);

    log(result);

    log(args(1, 2, 3, 'hello'));

    log(sumOnSteroids(1, 2, 3, 4, 5, 6, 7));

    render(10);
    render(undefined, 10); //안됨 Fog Level: 0 and spark_level: 10

    t(10);
    s(10);

    let scope = "outer_scope";
    function scoper(val=scope) {
        var scope = "innder_scope";
        console.log(val);
    }
    scoper();

    sayThings("Morgan Freeman", "Something serious", "Imploding Universe", "Amen");

    var numbers = [6, 7, 8];

    // 배열을 함수의 인수로 전달하는 ES5 방법
    log(sumAll.apply(null, numbers)); //21
    //ES6 스프레드 연산자
    log(sumAll(...numbers))

    let midweek = ['Wed', 'Thu'];
    var weekend = ['Sat', 'Sun'];
    var week = ['Mon', 'Tue', ...midweek, 'Fri', ...weekend];

    log(...weekend);

    log(week);

    log(parseInt('123'));
    log(parseInt('abc123')); //NaN
    log(parseInt('1abc23')); //1
    log(parseInt('123abc'));

    log(parseInt('0xf')); //16진수
    log(parseInt('F', 16));

    log(parseInt('07')); 
    log(parseInt('377', 8));

    log(isNaN(NaN)); //true
    log(isNaN('1')); //false

    var url = `hello world`;
    
    log(url);

    let uri = encodeURI(url);
    log(uri);
    log(decodeURI(url))

    log(eval('1' * 1));

    // alert("hello world");
    log('hello');

    {
        let a = 5;
    }
    // log(a); 스코프가 존재함 var과는 다름

    log(typeof define);
    log(typeof express);

    let ar = [3, 5, 7];

    log(multiplyByTwo(...ar, addOne));
    log(multiplyByTwo(...ar, function (a) {
        return a + 1;
    })); //익명 함수 사용

    (function () {
        log('boo');
    })(); //즉시실행 함수 (또는 자기실행 함수라고도 불림)
    
    (function () {
        log('hello?');
    })();
    (function () {
        log('hello?');
    }())

    let result1 = (function () {
        log('실행');
    })(); //실행만함

    log(outer(2));

    let func = a();
    func();

    aa();
    aa();

    let b = (function () {
        function someSetup() {
            var setup = 'done';
        }

        function actualWork() {
            alert('Worky-worky');
        }

        someSetup();
        return actualWork;
    })();

    // b();

    (function () {
        let a = 1;

        function f() {
            var b = 1;
            return a;
        }

        log(f()); //f() 안에서는 a와 b가 모두 보인다. f() 밖에서 a는 보이지만 b는 보이지 않는다.
    })();

    (function () {
        let globar = 1;
        function outer() {
            var outer_local = 2;
            function inner() {
                var inner_local = 3;
                return inner_local + outer_local + globar; //체인은 필요한만큼 길어질수 있다.
            }

            return inner;
        }

        log(outer()());
    })();

    (function () {
        var a = "global variable";
        var f = function () {
            var b = "local variable";
            var N = function () {
                var c = "inner local";
                return a + ", " + b;
            }
            return N;
        };

        log(f()());
    })();

    (function () {
        var inner;
        var F = function () {
            var b = "local variable";
            var N = function () {
                return b;
            }
            inner = N;
        }

        F();

        log(inner());
    }) ();

    (function () {
        function F(param) {
            var N = function() {
                return param;
            }
            param++;

            return N;
        }

        var inner = F(123);
        log(inner());
    }) ();

    (function () {
        function F() {
            var arr = [], i;
    
            for(i = 0; i < 3; i++) {
                arr[i] = (function (x) {
                    return function () {
                        return x;
                    };
                })(i);
            }
    
            return arr;
        }

        var arr = F();

        log(arr[0]());
        log(arr[1]());
        log(arr[2]());
    })();

    (function () {
        function F() {
            function binder(x) {
                return function () {
                    return x;
                }
            }

            var arr = [], i;
            for (i = 0; i < 3; i++) {
                arr[i] = binder(i);
            }

            return arr;
        }

        var arr = F();
        log(arr[0]());
    })();   

    //getter and setter 게터와 세터 
    var getValue, setValue;

    (function () {
        var secret = 0;

        getValue = function () {
            return secret;
        }

        setValue = function (x) {
            if(typeof x === "number" && !isNaN(x))
            secret = x;
        }
    })();

    log(getValue());
    setValue(NaN);
    log(getValue());
    setValue(123);
    log(getValue());

    //iterator
    (function () {
        function setup(x) {
            var i = 0;
            return function() {
                if(x.length <= i) {
                    return false;
                }
                return x[i++];
            }
        }

        var next = setup(['a', 'b', 'c']);

        while(i = next()) {
            log(i);
        }
    }) ();

    (function () {
        const num = [1, 2, 3];
        const squares = num.map(function(n) {
            return n * n;
        })
        const lamda = num.map(n => n * n);

        log(squares);
    })();

    //연습문제

    (function () {
        function getRGB(rgb) {
            let arr = [];
            let code = "";

            for(let i = 1; i < rgb.length; i++) {
                code += rgb[i];
                if(i % 2 == 0) {
                    arr.push(parseInt(code, 16));
                    code = "";
                }
            }

            return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
        }

        var a = getRGB("#00FF00");
        log(a);
    })();

    (function () {

    })();

    //정답 : 2

    (function () {
        var a = 1;

        function f() {
            function n() {
                // alert(a);
            }
            var a = 2;
            n();
        }
        f();
    })()

})

function sum(a, b) { //함수는 항상 값을 반환함, 반환하지 않는다면 암시적으로 undefined를 반환함
    let hap = a + b;

    return hap;
}

function args() {
    return arguments; //배열처럼 보이지만 사실은 배열이 아니라 배열과 비슷한 객체라는 것을 알수 있다.
} 

function sumOnSteroids() {
    var i, res = 0;

    for(i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }

    return res;
}

function render(fog_level = 0, spark_level = 100) {
    log(`Fog Level: ${fog_level} and spark_level: ${spark_level}`);
}

function t(fog_level = 1, spark_level=fog_level) {
    log(`Fog level: ${fog_level} and spark_level: ${spark_level}`);
}

function s(fog_level=10, spark_level= fog_level*10) {
    log(`Fog level: ${fog_level} and spark_level: ${spark_level}`);
}

function sayThings(tone, ...quotes) { //arguments와의 차이점은 이것은 배열이라는 것이다.
    log(Array.isArray(quotes)); //true
    log(`In ${tone} voice, I say ${quotes}`);
}

function sumAll(a, b, c) {
    return a + b + c;
}

var express = function () { //함수 리터럴 표기법 function literal notation
    return 1;
};

function define() {
    return 1;
}

function multiplyByTwo(a, b, c, callback) {
    var i, ar = [];

    for(i = 0; i < 3; i++) {
        ar[i] = callback(arguments[i] * 2);
    }
    return ar;
}

function addOne(n) {
    return n + 1;
}

function outer(param) {
    function inner(theinput) { //비공개 함수
        return theinput * 2;
    }

    return 'The result is ' + inner(param);
}

function a() {
    log('a');

    return function () {
        log('b');
    }
}

function aa() {
    log('A!');

    aa = function () {
        log('B!');
    }
}