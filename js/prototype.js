const log = console.log;

window.addEventListener("load", () => {
    //프로토타입 속성
    {
        function foo(a, b) {
            return a * b;
        }

        log(foo.length);
        log(foo.constructor);

        //초기값은 비어있다.
        log(typeof foo.prototype);

        //이 빈 객체를 속성과 메서드로 보강할 수 있다. 이것들은 foo() 함수 자체에는 아무런 영향을 미치지 않고, foo()를 생성자로 호출할 때만 사용된다.
        foo.prototype = {};
        log(foo.prototype)

        //프로토타입을 사용하여 메소드와 속성 추가하기
        function Gadget(name, color) {
            this.name = name;
            this.color = color;
            this.price = 500,
                this.rating = 5,
                this.whatAreYou = function () {
                    return `I am a ${this.color} ${this.name}`;
                }
        };

        Gadget.prototype.price = 100;
        Gadget.prototype.rating = 3;
        Gadget.prototype.getInfo = function () {
            return 'Rating ' + this.rating + ', price: ' + this.price;
        }


        //or

        // Gadget.prototype = {
        //     price: 100,
        //     rating: ...
        // }

    }
    //프로토타입의 메소드와 속성 사용하기
    {
        var newtoy = new Gadget('webcam', 'black');
        log(newtoy.name);
        log(newtoy.color);
        log(newtoy.whatAreYou());
        log(newtoy.rating);
        log(newtoy.getInfo());

        Gadget.prototype.get = function (what) {
            return this[what];
        }

        //newtoy 객체가 get() 메소드가 정의되기 전에 생성되었음에도 불구하고, newtoy 객체는 다음과 같이 새로운 메소드에 접근할 수 있다.
        log(newtoy.get('price'));
        log(newtoy.get('color'));

        //자체 속성 대 프로토타입 속성
        Gadget.prototype.getInfo = function () {
            return `Rating: ${Gadget.prototype.rating}
                , price: ${Gadget.prototype.price}`;
        }

        var newtoy2 = new Gadget('webcam', 'black');

        log(newtoy2.name);
        //자바스크립트 엔진은 newtoy 객체의 모든 속성을 검사하지만 rating이라는 속성을 찾지 못했다..
        //그러면 스크립트 엔즌은 이 객체를 만드는 데 사용된 생성자 함수의 prototype을 식별한다. prototype 객체에서 속성이 발견되면 이 속성이 사용된다.
        log(newtoy2.rating);
        log(newtoy2);

        log(newtoy2.constructor === Gadget);
        log(newtoy2.constructor.prototype.rating);
        //모든 객체는 생성자가 있다. prototype은 객체이므로 이것 역시 생성자가 있어야 한다. 즉 prototype을 가진다. 프로토타입 체인을 올라가다 보면
        //결국 최상위 수준 부모인 내장 Object() 객체에 도달한다. 실제로 이는 newtoy.toString()을 호출할 때, newtoy에 자체 toString() 메소드가 없고 prototype에도 없으면 결국
        //Object 객체의 toString() 메소드를 사용한다는 것을 의미한다.

        log(newtoy.toString());

        //프로토타입 속성을 자체 속성으로 덮어 쓰기
        //객체 자체 속성 -> 프로토타입 속성(동일명 사용순서)
        function Gadget2(name) {
            this.name = name;
        }
        Gadget2.prototype.name = 'mirror';
        let toy = new Gadget2('camera');
        log(toy.name);
        //hasOwnProperty()를 사용해 속성의 정의된 위치 확인
        log(toy.hasOwnProperty('name')); // true

        delete toy.name;
        log(toy.name);
        log(toy.hasOwnProperty('name'));

        log(toy.toString());
        log(toy.hasOwnProperty('toString')); //Gadget2의 메소드가 아님
        log(toy.constructor.hasOwnProperty('toString')); //false
        log(toy.constructor.prototype.hasOwnProperty("toString")); //false
        log(Object.hasOwnProperty('toString')); // flase
        log(Object.prototype.hasOwnProperty('toString')); //true

        //속성 열거하기
        var params = {
            productid: 666,
            section: 'products'
        };

        var url = 'http://example.org/page.php?',
            i,
            query = [];

        for (i in params) {
            query.push(i + '=' + params[i]);
        }

        for (i in query) {
            log(query[i]);
        }

        log(url += query.join('&'));
        //주의사항
        /*
            1. 모든 속성이 for...in 루프에 표시되는 것은 아니다. 예를 들어 length(배열의 경우) 및 생성자 속성은 표시되지 않는다. 표시되는 속성을 열거 가능하다고 말한다.
            propertyIsEnumerable() 메소드의 도움으로 어떤 속성이 열거 가능한지 확인할 수 있다. ES5에서는 ES3와 달리 열거할 수 있는 속성을 지정할 수 있다.
            2. 프로토타입 체인을 통해 온 프로토타입도 열거 가능한 경우 표시된다. 객체의 자체 속성인지 프로토타입의 속성인지 여부는 hasownProperty() 메소드를 사용하여 확인할 수 있다.
            3. propertyIsEnumrable() 메소드는 열거가능하고 for...in 루프에 표시될지라도, 모든 프로토타입의 속성에 대한 false를 반환한다.
        */

        function Gadget3(name, color) {
            this.name = name;
            this.color = color;
            this.getName = function () {
                return this.name;
            }
        }

        Gadget3.prototype = {
            price: 100,
            rating: 3
        };

        var newtoy = new Gadget3('webcam', 'black');

        for (var prop in newtoy) {
            log(prop + ' = ' + newtoy[prop]);
        }
        //메소드는 결국 함수인 속성이기 때문에, 결과는 또한 객체의 메소드를 포함한다.

        log(newtoy.hasOwnProperty('name')); //true
        log(newtoy2.hasOwnProperty('price')); //false

        for (var prop in newtoy) {
            if (newtoy.hasOwnProperty(prop)) {
                log(prop + '=' + newtoy[prop]);
            }
        }

        //propertyIsEnumerable()
        //이 메소드는 내장되지 않은 객체의 자체 속성에 대한 true를 반환함
        log(newtoy2.propertyIsEnumerable('name')); //true
        log(newtoy2.propertyIsEnumerable('constructor')); //false
        log(newtoy.propertyIsEnumerable('price'));

        log(newtoy2.constructor.prototype.propertyIsEnumerable('price'));

        //isPrototypeOf() 메소드 사용하기
        var monkey = {
            hari: true,
            feeds: 'bananas',
            breaths: 'air'
        };

        function Human(name) {
            this.name = name;
        }

        Human.prototype = monkey;

        let george = new Human('George');
        log(monkey.isPrototypeOf(george)); //true
        log(Object.getPrototypeOf(george) === monkey); //true

        //secret __proto__ link

        var monkey = {
            feeds: 'bananas',
            breaths: 'air'
        };

        function Human() { };
        Human.prototype = monkey;

        var developer = new Human();
        developer.feeds = "pizza";
        developer.hacks = 'JavaScript';

        log(developer.hacks);
        log(developer.feeds);
        log(developer.breaths);

        log(developer.__proto__ === monkey); //true
        //이 비밀 속성을 학습을 목적으로 사용할 수는 있지만, 실제 스크립트에서 사용하는 것은 좋은 생각이 아니다.
        //IE에서 지원안함

        //prototype은 해당 객체를 만드는데 사용되는 생성자 함수의 속성인 반면, __proto__는 인스턴스(객체)의 속성이므로 __prto__는 prototype과 동일하지 않다.

        log(typeof developer.__proto__);
        log(typeof developer.prototype); //undefined
        log(typeof developer.constructor.prototype);

        //re: __proto__는 학습 또는 디버깅 목적으로만 사용해아 한다. 운이 좋아서 코드가 ES5 환경에서만 동작해도 된다면, Object.getPrototypeof()를 사용할 수 있다.

        //내장 객체 보강

        //Array PHP에는 있지만 js에는 없는 배열에 값이 있는지 확인하는 메서드
        Array.prototype.inArray = function (needle) {
            for (var i = 0, len = this.length; i < len; i++) {
                if (this[i] === needle) {
                    return true;
                }
            }

            return false;
        }

        var colors = ['red', 'green', 'blue'];
        log(colors.inArray('red'));
        log(colors.inArray('yellow'));

        String.prototype.reverse = function () {
            return Array.prototype.reverse.apply(this.split('')).join(''); //배열로 만들고 다시 합침
        }

        log("bublebee".reverse());

        //내장 객체 보강 - 토론

        /*
        프로토타입을 보강할 때, 구현하기 전에 먼저 메소드가 있는지 먼저 확인해야 한다.
        메소드가 있다면 브라우저의 네이트브 구현을 사용할 수 있다. 예를 들어, 문자열에 trim()메소드를 추가해 보자.
        이 메소드는 ES5에는 있지만, 구형 브라우저에서는 지원하지 않는 메소드다.
        */

        if (typeof String.prototype.trim !== 'function') {
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, '');
            }
        }

        log(" hello ".trim());

        //프로토타입 따라잡기

        //프로토타입을 다룰 때 고려해야 할 두 가지 중요한 사항
        /*
        1. prototype 객체를 완전히 대체할 때를 제외하고는 프로토타입 체인은 살아 있다.
        2. prototype.constructor 메소드는 안정적이지 않다.
        */

        function Dog() {
            this.tail = true;
        }

        var benji = new Dog();
        var rusty = new Dog();

        Dog.prototype.say = function () {
            return 'Woof!';
        }


        //둘다 사용가능
        log(benji.say());
        log(rusty.say());

        //이 시점에, 객체를 생성하는 데 사용된 생성자 함수가 무엇인지 확인해 보면 제대로 보고 할 것이다.
        log(benji.constructor === Dog);
        log(rusty.constructor === Dog);

        //덮어쓰기 
        Dog.prototype = {
            paws: 4,
            hair: true
        };

        //이전 객체가 새로운 프로타입의 속성에 접근하지 못한다. 다음과 같이 이전 프로토타입 객체를 가리키는 비밀 링크를 여전히 유지하고 있다.

        log(typeof benji.paws); //undefined
        log(benji.say()); //나옴
        log(typeof benji.__proto__.say); //나옴
        log(typeof benji.__proto__.paws); //undefined


        var lucy = new Dog();
        try {
            log(lucy.say()); //error
        } catch (error) {
            log(error);
        }

        log(lucy.paws);
        //비밀 __proto__ 링크는 다음 코드 행에 표시된 대로 새 프로토타입 객체를 가리킨다.

        log(typeof lucy.__proto__.say); //undefined
        log(typeof lucy.__proto__.paws);

        log(lucy.constructor); // --> Dog()를 카리키지 않고 Object()를 가리킴


        //다음과 같이 프로토타입을 완전히 덮어 쓴 후 constructor 속성을 다시 설정하면, 이 혼란을 쉽게 방지할 수 있다.
        function Dog() { }
        Dog.prototype = {};
        log(new Dog().constructor === Dog); // false
        log(new Dog().constructor === Dog); // true

        //!! 프로토타입을 덮어 쓸 때, constructor 속성을 다시 설정해야 한다.
    }

    //test
    {
        function Foo() { }

        Foo.prototype = {
            say() {
                return "왈";
            }
        }

        log(Foo.prototype.say());
    }
})