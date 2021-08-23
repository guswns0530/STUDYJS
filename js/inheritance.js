const log = console.log;

window.addEventListener("load", () => {
    //프로토타입 체인
    {
        function Shape() {
            this.name = 'Shape';
            this.toString = function () {
                return this.name;
            }
        }

        function TwoDShape() {
            this.name = '2D shape';
        }

        function Triangle(side, height) {
            this.name = 'Triangle';
            this.side = side;
            this.height = height;
            this.getArea = function () {
                return this.side * this.height / 2;
            }
        }

        TwoDShape.prototype = new Shape();
        Triangle.prototype = new TwoDShape();
        
        TwoDShape.prototype.constructor = TwoDShape;
        Triangle.prototype.constructor = Triangle;
    }
})