//Object Oriented Programming
const log = console.log;
const error = console.error;

window.addEventListener("load", () => {
    var hero = {
        breed: 'Turtle',
        occupation: 'Ninja'
    };

    var dog = {
        name: 'Benji',
        talk: function () {
            alert('Wook, woof!');
        }
    }

    var a = [];
    a[0] = function (expression) {alert(expression)};
    // a[0]('Boo');

    // 객체의 속성에 접근
    log(hero['breed'] + ", " + hero.breed);

    var book = {
        name: 'Catch-22',
        published: 1961,
        author: {
            firstname: 'Joseph',
            lastname: 'Heller'
        }
    };

    log(book.author.firstname); //book['author']['firstname'];

    var key = 'firstname';
    log(book.author[key]); //런타임시 동적으로 접근하는 방법

    //객체의 메소드 호출
    //다른것과 동일하게 속성에 접근후 뒤에 괄호를 붙이면 됨

    hero = {
        breed: 'Turtle',
        occupation: 'Ninja',
        say: function () {
            return 'I am ' + hero.occupation;
        }
    };

    log(hero.say());
    // log(hero['say']());

    hero = {};

    hero.breed = 'turtle';
    hero.name = 'Leonardo';
    hero.sayName = () => {
        return hero.name;
    };

    log(hero.sayName());

    delete hero.name;

    log(hero.sayName()); // undefined

    hero = {
        name: 'Rafaelo',
        sayName: function() { //람다식 사용 x
            return this.name;
        }
    };

    log(hero.sayName());

    var h1 = new Hero('Michelangelo'); //new 키워드를 붙이면 새객체가 반환되고 this가 이 객체를 참조함
    var h2 = new Hero('Donatello'); //new 키워드가 빠져있다면 전역개체를 참조함(window) 

    log(h1.whoAreYou());
    log(h2.whoAreYou());

    window.a = 1;
    log(window.a);
    log(this.a);

    var h = Hero('Leonardo'); //new 키워드가 없어서 function내에서 this는 윈도우를 가리킨다.
    log(typeof h);
    log(name);
    log(window.name);

    log(h1.constructor);

    var h3 = new h1.constructor('Rafaello');
    log(h3.name);

    var o = {};
    log(typeof o.constructor);

    //instanceof 연산자 
    //instanceof를 사용하면 constructor 함수로 생성되었는지 테스트할 수 있다.

    function Hero2() {};
    var h = new Hero2();
    var o = {};

    log(h instanceof Hero2);
    log(h instanceof Object);
    log(o instanceof Hero2);

    var o1 = factory('one');
    log(o1.name);

    (function() {
        function C() {
            this.a = 1;
        }

        var c = new C();

        function C2() {
            this.a = 1;
            return {b: 2};
        }

        var c2 = new C2();
        log(c2);
    })();

    var original = {howmany: 1};
    var mycopy = original;

    log(mycopy.howmany);
    mycopy.howmany = 100;
    log(original.howmany);

    var nullify = function(o)  {
        o.howmany = 0;
    }

    nullify(original);

    log(original.howmany);

    var fido = {breed: 'dog'};
    var benji = {breed: 'dog'};

    log(fido === benji);

    var mydog = benji;

    log(mydog === benji);

    var obj = {
        prop: 1,
        modifier: function() {
            log(this.prop);
        }
    }

    var obj1 = {
        prop: 1,
        modifier () { //function과 :생략 가능
            console.log(this.prop);
        }
    }

    obj.modifier();
    obj1.modifier();

    let vehicle = "car";
    function vehicleType() {
        return "truck";
    };
    let car = {
        [vehicle+ "_model"]: "Ford"
    };
    let truck = {
        [vehicleType() + "_model"]: "Mercedez"
    };

    log(car);
    log(truck);


    //Enumerable : 객체의 속성을 열거할 수 있는지 여부를 나타낸더,
    //Configurable : 이 속성이 false면, 속성을 삭제하거나 편집할 수 없다.

    let obj3 = {
        age: 25
    }

    console.log(Object.getOwnPropertyDescriptor(obj3, 'age'));

    Object.defineProperty(obj3, 'age', {configurable: false})

    console.log(Object.getOwnPropertyDescriptor(obj3, 'age')); 

    //Object.assign

    let a1 = {};
    Object.assign(a1, {age: 25});
    console.log(a1);

    let a2 = {
        age: 23,
        gender: "male"
    };
    Object.assign(a2, {age: 25});

    log(a2);

    console.log(Object.assign({a:1, b:2}, {a: 2}, {c: 4}, {b:3}));

    let a3 = {
        age: 23,
        male: "male",
        superpowers: 'a'
    };
    Object.defineProperty(a3, 'superpowers', {enumberable: false, value:'ES6'});
    log(a3);

    // NaN === NaN, -0 === +0 는 Object.is로 비교하여야 한다.

    log(Object.is(NaN, NaN), NaN === NaN);


    //ES6의 디스트럭처링(분할 할당)
    var config = {
        server: 'localhost',
        port: '8080',
        timeout: 900
    };

    let {server, port} = config;
    log(server, port);

    let {timeout: t} = config;
    log(t);

    server = '127.0.0.1';
    port = '80';
    ({server, port} = config);

    log(server, port);

    function startServer(configValue) {
        log(configValue);
    }

    ({server, port, timeout} = config);
    startServer(server, port, timeout);

    startServer({server, port, timeout} = config);

    let configValue;
    // log(confgiValue = {server, port, timeout} = config)
    (function() {
        let server, port, timeout;
        log(configValue = {server, port, timeout}); //이해됨
    })()


    //디스트럭처링 배열
    const arr = ['a', 'b'];
    const [x, y] = arr;
    log(x, y);

    const days = ['Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [, , sat, sun] = days; //0, 1배열의 요소 무시

    log(sat, sun);

    let testA = 1, testB = 2;
    [testB, testA] = [testA, testB]; // b, a= [1, 2] 위치 바꾸기
    log(testA, testB);

    const [x1, ...y1] = ['a', 'b', 'c']; //나머지 연산자는 마지막에만..
    log(x1, y1);

});

function Hero(name) {
    this.name = name;
    this.occupation = 'Ninja';
    this.whoAreYou = function () {
        return `I'm ${this.name} and I'm a ${this.occupation}`;
    }
}

function factory(name) {
    return {
        name: name
    }
}
