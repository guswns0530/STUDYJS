const log = console.log;

window.onload = () => {
    //For...of 루프
    {
        const iter = ['a', 'b'];

        for (let i of iter) { //const를 사용하면 새로운 바인딩과 저장공간으로 새로운 변수가 만들어지기 때문에 좋은 방법이다.
            log(i);
        }

        for (let c of "String") {
            log(c);
        }

        //for in 과 for of 루프의 차이점은 for...in 루프는 객체의 모든 열거 가능한 속성을 반복한다는것
        //밤념 for...of 루프는 이터러블 프로토콜을 정의하는 방법에 따라 반복동작을 수행함
    }

    //이터레이터와 이터러블
    {
        //이터레이터
        //js에서 이터레이터는 next 메소드를 제공하는 객체다
        function iterF(array) {
            var nextid = 0;
            return {
                next: function () {
                    if (nextid < array.length) {
                        return { value: array[nextid++], done: false }
                    } else {
                        return { done: true };
                    }
                }
            }
        }

        var it = iterF(['Hello', 'Iterators']);

        log(it.next().value);
        log(it.next().value);
        log(it.next().done);


        //이터러블
        //이터러블은 반복 동작 도는 내부 반복을 정의하는 객체다. for...of에서 사용가능
        let iter1 = {
            0: 'Hello',
            1: 'World of',
            2: 'Iterators',
            length: 3,
            [Symbol.iterator]() {
                let index = 0;
                return {
                    next: () => {
                        let value = this[index];
                        let done = index >= this.length;
                        index++;

                        return { value, done }
                    }
                }
            }
        }

        log(iter1);
        for (let i of iter1) {
            log(i);
        }

        log(Symbol.iterator)

        log(iter1[Symbol.iterator]().next());

    }

    //제네레이터
    {
        function* generatorFunc() { //함수가 제네레이터 함수임을 나타내는 구문 function *generatorFunc() 도 유효함
            log('1');
            yield;
            log('2');
        }

        //둘다 유효함..!
        function* f() { };
        function* f2() { };

        const generatorObj = generatorFunc();//제네레이터 함수 호출시 객체를 반환함
        log(generatorObj);
        log(generatorObj.next());
        log(generatorObj.next());

        function* logger() {
            log('start');
            log(yield);
            log(yield);
            log(yield);
            return ('end');
        }

        var genObj = logger();
        log(genObj.next()); //첫번째는 제네리어터 함수의 실행을 시작하는 것이므로 매개변수는 무시됨
        log(genObj.next('Save'));
        log(genObj.next('Our'));
        log(genObj.next('Souls'));

        function* logger2() {
            yield 'a';
            yield 'b';
        }

        //제네레이터 객체는 제네레이터 함수를 사용하여 작성된다.
        var genObj = logger2();

        // 이터러블
        log(typeof genObj[Symbol.iterator] === 'function'); //true

        //이터레이터
        log(typeof genObj.next === 'functon') //true

        log(genObj[Symbol.iterator]() === genObj); //true       
        log(genObj[Symbol.iterator]());

        //제네레이터 반복
        for (let i of logger2()) {
            log(i);
        }
        //스프레드 연산자를 사용해 이터러블을 배열로 바꿀 수 있다.
        let arr = [...logger2()];
        log(arr);

        //디스트럭처링 구문 사용가능
        let [x, y] = logger2();
        log(x, y);
    }

    //컬렉션
    //ES6는 Map과 WeakMap, Set, Weakset의 네가지 데이터 구조를 도입했다.
    {
        //map
        const m = new Map();
        m.set('first', 1);
        log(m.get('first'));

        log(m.has('first')); //키가 있는지 검사한다. //true

        m.delete('first');
        log(m.has('first')); //false

        m.set('foo', 1);

        const m2 = new Map([
            [ 1, 'one'],
            [ 2, 'two'],
            [3, 'three']
        ]);

        const m3 = new Map().set(1, 'one').set(2, 'two').set(3, 'three');

        log(m2);
        log(m3);

        const obj = {};
        const m4 = new Map([
            [1, 'one'],
            ["two", 'two'],
            [obj, 'three']
        ]);

        log(m4.has(obj));

        //map 반복
        const m5 = new Map([
            [ 1, 'one'],
            [ 2, 'two'],
            [3, 'three']
        ]);

        //keys(), values(), entries()
        for(const k of m5.keys()) {
            log(k);
        }

        for(const v of m5.values()) {
            log(v);
        }

        for(const [key, value] of m5.entries()) {
            log(key, value);
        }
        
        //바로 접근해도 가능
        for(const [key, value] of m5) {
            log(key, value)
        }

        //맵을 배열로 변환 (스프레드 연산자)
        // m5 = new Map();

        const keys = [...m5.keys()];
        log(keys);

        //맵은 이터러블 이므로 스프레드 연산자를 사용하여 전체 Map을 배열로 변환할 수 있다.

        const arr = [...m5]; //128줄
        log(arr);


        //set
        const s = new Set();
        s.add('first'); // true
        s.delete('first'); // true
        s.has('first'); // false

        //맵과 마찬가지로 이터레이터를 통해 Set를 생성 가능
        const color = new Set(['red', 'white', 'blue']);
        log(color);
    }
}
