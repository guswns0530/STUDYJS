const log = console.log

window.addEventListener('load', () => {
    //내장객체

    //새로운 빈 객체 생성 방법
    var o = {};
    var o1 = new Object();

    //포함되어 있는 속성
    log(o.constructor());
    log(o.toString()); //문자열 컨텍스트에서 사용될 때 
    log(o.valueOf()); //객체 자체 반환

    // alert(o);
    //alert(o.toString());

    log("An Object: " + o);

    //Array()

    var a = new Array();
    var a1 = [];

    a = new Array(1, 2, 3, 'four'); //배열전달
    log(a);

    a = new Array(5) //배열의 길이 간주
    log(a);

    log(typeof a); // 배열은 객체임

    log(a.toString());
    log(a.constructor);
    log(a.valueOf());

    a = [], o = {};

    log(a.length, o.length); //배열은 length속성 자동 정의
    
    a[0] = 1;
    o[0] = 1;
    a.prop = 2;
    o.prop = 2;

    log(a.length); //숫자가 아닌속성 무시
    log(o);

    a.length = 5;
    log(a); 
    a.length = 1;
    log(a);

    a = [3, 5, 1, 7, 'test'];
    //push() 배열의 끝에 새로운 요소 추가
    //pop() 배열의 마지막 요소제거

    a.push('new');
    log(a);
    a.pop();
    log(a);

    var b = a.sort();
    log(b);
    log(a === b);

    log(a.join(', '));

    log(a.slice(1, 3)); // 1 <= i < 3

    log(b = a.splice(1, 2, 100, 101, 102)); //자를 위치부터, 자를 길이, 채울 값
    log(a);

    //Array.from
    function toArray(args) {
        var result = [];
        for(let i = 0, len = args.length; i < len; i++) {
            result.push(args[i]);
        }

        return result;
    }

    function doSomething() {
        var args = toArray(arguments);
        console.log(args);
    }
    doSomething("hellow", "workd");

    function doSomething2() {
        log(Array.from(arguments));
    }

    doSomething2("hellow", "world");

    //Array.of(); 인자에 상관없이 배열생성

    let arr = ['a', 'b', 'c'];
    for(const index of arr.keys()) {
        console.log(index);
    }

    log(arr.keys().next());

    for(const value of arr.values()) {
        log(value);
    }

    log(arr.values().next());

    for(const [index, value] of arr.entries()) {
        log(index, value);
    }
    log(arr.entries().next());

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    log(numbers.find(n => n > 5)); //한개 리턴함
    log(numbers.findIndex(n => n > 5, this)); //index 리턴

    //함수선언
    function sum(a, b) {
        return a + b;
    }

    log(sum(1, 2));

    //함수 표현식
    var sum = function(a ,b) {
        return a + b;
    };

    log(sum(1, 2));

    //생성자 이용
    var sum = new Function('a', 'b', 'return a + b'); //eval() 함수과 똑같은 단점을 가진다.
    log(sum(1, 2));

    var ninja = {
        name: 'Ninja',
        say: function() {
            return 'I am a ' + this.name;
        }
    };

    function F() {};

    log(typeof F.prototype);
    F.prototype = ninja;

    var baby_ninja = new F();
    log(baby_ninja);

    function myFun(a, b, c) {
        return a + b + c;
    }
    log(myFun.toString());

    var some_obj = {
        name: 'Ninja',
        say: function(who) {
            return 'Haya ' + who + ', I am a ' + this.name;
        }
    }

    log(some_obj.say('박현준'));

    //call과 apply
    var my_obj = {
        name: 'Scripting guru'
    };

    log(some_obj.say.call(my_obj, '박현준')); //call의 첫번째 매개변수가 없거나 null인경우 this는 전역개체로 지정함
    log(some_obj.say.apply(my_obj, ['박현준'])); //apply는 배열로 매개변수를 받음

    //인수 객체 재검토 (arguments)
    
    function f() {
        var args = [].slice.apply(arguments);

        return args; //arguments는 배열처럼 보이지만, 실제로는 배열과 비슷한 객체다. 인덱스된 요소와 length 속성을 폼하고 있으므로 배열과 유사하다.
        // 그러나 유사성은 여기까지 배열 메소드를 제공하지 않는다.
    }

    log(f(1, 2, 3));

    //화살표 함수에서의 어휘적 this
    //화살표 함수에서 중요한 적은 일반 함수와 다르게 동작한다는 것이다. 그 차이는 미묘하지만 중요하다. 화살표 함수에서 this는 값이 없다.
    //화살표 함수에는 this 값이 없다. 화살표 함수에서 this의 값은 둘러싼 (어휘적) 범위에서 상속 된다.

    /*
    어휘적 : 함수 범위를 둘러싼 범위
    동적 : 함수를 호출하는 범위(일반적으로 객체)
    */

    var greeter = {
        default: "Hello ",
        greet : function (names) {
            let that = this;

            names.forEach(function(name) {
                log(that.default + name);
            })
        }
    }

    greeter.greet(['world', 'heaven']);


    greeter = {
        default: "Hello ",
        greet : function (names) {
            names.forEach(name =>  {
                log(this.default + name);
            })
        }
    }

    greeter.greet(['world', 'heaven']);

    //객체 유형 추정

    let obj = {};
    log(Object.prototype.toString.call({}));
    log(Object.prototype.toString.call([]));

    log([1, 2, 3].toString());

    var toStr = Object.prototype.toString;

    log((function () {
        return toStr.call(arguments);
    })());

    log(toStr.call(document.body));

    //Boolean
    var b = new Boolean(); //기본값 false;

    log(b.valueOf()); //원시값 호출

    log(Boolean("test")); //true
    log(Boolean("")); //false
    log(Boolean({})) // true

    log(Boolean(new Boolean(false))); //new Boolean으로 생성된 객체이기 때문에 true;

    //Number
    var n = Number('12.12');
    log(n);
    log(typeof n);

    n = new Number('12.12');
    log(n);
    log(typeof n);

    log(Number.MAX_VALUE); //n으로는 접근 불가
    log(Number.POSITIVE_INFINITY);
    log(Number.NEGATIVE_INFINITY);
    log(Number.NaN);

    n = new Number(123.456);
    log(n.toFixed(1)); //반올림

    //* 명시적으로 Nubmer 객체를 먼저 만들지 않고도 이 메서드를 사용할 수 있다. 이 경우 자동으로 Nubmer 객체가 생성된다(그리고 파괴됨)
    log((12345).toExponential()); //지수 변경 

    log((255).toString()); //toString함수에 매개변수 사용 가능(default = 10)
    log((255).toString(16));

    //String
    var primitive = 'Hello'; //primitive = 원시
    log(typeof primitive);

    var strObj = new String('world');
    log(typeof obj);

    log(strObj); //string 객체는 인덱싱되어있다.

    //원시값 
    log(strObj.valueOf());
    log(strObj.toString());
    log(strObj + "");

    //primitive(원시 유형을) 객체로 처리하는 구문 Number와 같이 백그라운드에서 객체로 만들어졌다가 파괴된다.
    log("potato".length);
    log("tomato"[0]);

    //primitive String의 차이

    log(Boolean("")); //false
    log(Boolean(new String(""))); //true 객체이기 때문에

    // Number(), Boolean()과 마찬가지로 new 없이 String()함수를 사용하면, 매개변수가 원시 값으로 변환된다.
    log(String(1));

    //String에 객체 전달시 toString이 먼저 호출됨

    log(String({p: 1}));
    log(String([1, 2, 3]));
    log(String(1 == 1));

    //문자열 객체의 몇 가지 메소드
    var s = new String("Couch Potoato");

    log(s.toUpperCase()); //Upper 대문자
    log(s.toLowerCase()); //Lower 소문자

    log(s.charAt(0)); //인덱스로 접근 s[0]과 동일

    log(s.indexOf('C')); //인덱스 반환
    log(s.indexOf('o', 2)) //2번째부터 검색
    log(s.indexOf('Couch')); //문자열도 가능
    log(s.indexOf('couch')); //존재 x시 -1리턴

    if(s.indexOf('Couch')) { //혼동을 야기함
        log('틀림');
    }

    if(s.indexOf('Couch') !== 1) {
        log('맞음');
    }

    //slice, subString
    log(s.slice(1, 5)); //1 <= i < 5
    log(s.substring(1, 5)); // 1 <= i < 5

    //같아보지만 다름 부정인수를 전달하면 s.subString(i, 0) s.slice(i, s.length - j) 
    //subStr대신 subSTring을 대신 사용 (비표준임)

    log(s.split(" ")); //분리자 기준으로 배열 나눔

    log(s.split(' ').join(' ')); //join은 반대

    //concat + 연산자가 primitive 문자열을 처리하는 것과 동일

    log(s.concat('es'));

    //정규표현식을 매개변수로 사용하는 보다 강력한 메소드 search, match, replace가 있다

    //Math
    log(Math.PI); //파이
    log(Math.SQRT2); //2의 제곱근
    log(Math.E); //오일러의 상수
    log(Math.LN2); //2의 자연 로그
    log(Math.LN10); //10의 자연 로그

    //Math 객체의 메소드
    log((Math.random() * 100)); // 0~ 1 난수 반환

    var num = 5.678;
    
    log(Math.floor(num)); //내림
    log(Math.ceil(num)); //올림
    log(Math.round(num)); //반올림

    let arr1 = [1, 2,3, 4, 5];
    log(Math.min(...arr1));
    log(Math.max(...arr1));

    log(Math.pow(2, 4));
    log(Math.sqrt(9));


    //Date
    log(new Date());
    log(new Date('2015 11 12')); //다양한 형식을 이용해 처리 가능
    // 추천 입력값 년, 월(0, 11), 일, 시간, 분, 초, 밀리초

    log(new Date(2015, 0, 1, 17, 05, 03, 120));

    //허용값을 넘어가면 다음달로 넘어감

    log(Date()); //함수만 호출시 현재 날짜 출력(매개변수 여부 상관없음)

    //date 객체를 사용하기 위한 메소드

    //getMonth, setMonth, getHours, setHours
    var d = new Date(2015, 1, 1);
    log(d.toString());
    
    d.setMonth(2);
    log(d);
    log(d.getMonth());

    log(Date.parse('Jan 11, 2018')); //타임스탬프 생성

    log(new Date(Date.UTC(2018, 0, 11)));
    log(new Date(2018, 0, 11)); //표준시의 타임스탬프를 생성한다.

    log(Date.now() == new Date().getTime()); //now 편리하게 타임스탬프 반환
    log(new Date().valueOf() == Date.now());

    //Date Finall 생일 계산
    var d = new Date(2016, 5, 20);
    var day = ['일', '월', '화', '수', '목', '금', '토'];
    log(day[d.getDay()]);

    var stats = new Array(7);
    stats.fill(0);


    for(var i = 2016; i < 3016; i++) {
        d.setFullYear(i);
        stats[d.getDay()]++;
    }
    log(stats);

    //RegExp
    /*   정규 표현식은 테스트를 검색하고 조작하는 강력한 방법을 제공한다.언어별로 정규 표현식 구문이 다르다.
        자바스크립트는 펄 5구문을 사용한다.
    */  

    var re = new RegExp("j.*t"); //j로 시작하고 t로 끝나며. 그사이에 0개 이상의 문자가 있는 모든 문자열을 차즌ㄴ다.
    var re2 = /j.*t/; //정규식 리터럴 표기법 

    log(typeof re2);
    log(re);

    /*
    global(g): 이 속성이 false(디폴트)이면, 첫 번째 일치 항목이 발견되면 검색이 중지된다. 일치하는 모든 값을 찾고자 할 때는 이 값을 true로 설정한다., 
    igonreCase(i): 대소문자를 구분하지 않으려면 이 속성의 디폴트 값을 false로 한다,
    multiline(m): 두 줄 이상에 걸친 검색시 디폴트를 false로 한다,
    lastIndex: 검색을 시작할 위치, 디폴트는 0이다, 
    source: RegExp 패턴을 포함한다.
    */

    var re = new RegExp('j.*t', 'gmi');
    log(re);

    log(re.global); //한번 설정되면 값을 못바꿈

    re = /t.*t/ig; //정규식 리터럴을 사용해 한정자를 설정하려면 닫는 슬래시 다음에 추가한다.
    log(re.global);

    //RegExp 객체의 메소드 (test, exec)

    log(/j.*t/i.test("Javascript")); //대소문자를 구분하지 않음(i(IgonreCase))
    log(/j.*t/i.exec("Javascript")); //test와 달리 배열을 반환함

    //정규표현식을 인수로 받아들이는 string 메소드
    /*
    match: 일치하는 문자열을 반환한다
    search: 첫 번째 일치 항목의 위치를 반환한다.
    replace: 일치하는 텍스트를 다른 문자열로 대체할 수 있다.
    split: 문자열을 배열 요소로 분할할때 정규식을 허용한다.
    */

    var s = new String("HelloJavaScriptWorld");

    log(s.match(/a/g)); //g 한정자를 사용하면 전역 검색을 수행하므로, 결과 배열에 다음 두 요소 포함['a', 'a']
    log(s.match(/j.*a/i)); //대소문자 구분안함

    log(s.search(/j.*a/i)); //일치하는 문자열의 위치 반환

    log(s.replace(/[A-Z]/g, ''));//대문자 제거
    log(s.replace(/[A-Z]/, ''));// g생략시 첫 번째 일치 항목만 바뀜
    
    log(s.replace(/[A-Z]/g, "_$&"));//일치하는 텍스트를 대체 문자열에 포함시키는 방법 $&
    log(s.replace(/([A-Z])/g, "_$1")); //정규 표현식에 그룹(괄호)이 있으면 각 그룹의 일치 항목은 첫 번째 그룹을 $1, 두번째 그룹을 $2로 사용할 수 있다.
    
    var email = "wooae1234@gmail.com";
    var username = email.replace(/(.*)@.*/, "$1");
    log(username);

    //콜백 대체
    function replaceCallback(match) {
        log(arguments)
        return "_" + match.toLowerCase();
    }

    log(s.replace(/[A-Z]/g, replaceCallback));

    //콜백함수는 여러 매개변수를 받는다. 
    /*
    첫번째 매개변수는 match이다.
    마지막은 검색할 문자열이다.
    마지막 바로 전 매개변수는 match의 위치다.
    나머지 매개변수는 정규식 패턴의 모든 그룹과 일치하는 문자열을 포함한다.
    */

    var glob;

    var re = /(.*)@(.*)\.(.*)/;

    var callback = function() {
        glob = arguments;
        return arguments[1] + ' at ' + arguments[2] + ' dot ' + arguments[3];
    }

    log("stoyan@phpied.com".replace(re, callback));
    log(glob);

    //split()
    var csv = 'one, two,three ,four';
    log(csv.split(',')); //싐표 앞 뒤에 일치하지 않는 공백이 있기 때문에, 배열 결과에도 공백이 있다.
    //\s*는 0개 이상의 공백을 의미한다.\
    log(csv.split(/\s*,\s*/));

    //RegExp가 필요할 때 문자열 전달

    "test".replace('t', 'r'); /* == */ log("test".replace(/t/, 'r'));

    log("pool".replace('o', '*')); //g 한정자가 디폴트로 false이기 때문에 첫번째만 바뀜
    log("pool".replace(/o/g, "*"));

    //Error 객체
    /*
    EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
    */

   try {
        iDontExist(); //에러 호출
    } catch (error) {
        log(error.name, error.message);
    } finally {
        log('Finally!');
    }

    try {
        var total = maybeExists();
        if(total === 0) {
            throw new Error('Division by zero!');
        } else {
            log(50 / total);
        }
    } catch(e) {
        log(e.name + ": " + e.message);
    } finally {
        log('finally');
    }

    function maybeExists() {
        return 0;
    }

    //연습문제

    function F() {
        'use strict';
        this.name = '박현준';

        function C() {
            return this;
        }
        // let C = () => {
        //     return this;
        // }
        return C();
    }

    var o = new F(); //만약에 Arror함수를 사용했더라면 F객체를 반환함

    log(o); //o객체 참조

    function C() {
        this.a = 1;
        return false;
    }

    log(typeof new C());

    let c = [1, 2, [1, 2]];
    c.sort();
    log(c.join('--'));
    
    function MyString(args) {
        
        //문자열로 변환
        this._value = '' + args;
        
        var i = 0;
        while(args[i] !== undefined) {
            this[i] = args[i];
            i++;
        }

        
    }

    var s = new MyString('hello');
    
    log(s.toString());
});
