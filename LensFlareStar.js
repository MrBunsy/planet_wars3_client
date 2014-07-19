/* 
 * To generate a lens flare star
 */

var LensFlareStar = function() {

//    this.DEFAULT_SIZE = 100;


    this._splurgeDots = function(size, count) {
        var r, a;
        var dots = new Array();
        for (var i = 0; i < count; i++) {
            r = Math.random() * size / 2;
            a = Math.random() * Math.PI * 2;
            dots.push(Vector.fromPolar(r, a));

//            x = Math.cos(a) * r;
//            y = Math.sin(a) * r;
//
//            canvas.beginPath();
//            canvas.moveTo(x + dotR, y);
//            canvas.arc(x, y, dotR, 0, Math.PI * 2, false);
//
//            canvas.fill();
        }

        return dots;
    };

    /**
     * Get count of dots from an array of vectors within radius of pos
     * @param {type} dots
     * @param {type} radius
     * @returns {undefined}
     */
    this._countHere = function(pos, dots, radius) {
        var count = 0;
        var r2 = radius * radius;
        for (var d = 0; d < dots.length; d++) {
            if (dots[d].subtract(pos).getMagnitudeSqrd() < r2) {
                //this dot is within radius of pos
                count++;
            }
        }

        return count;
    };

    this._densityHere = function(pos, dots, radius) {
        //return count divided by area searched
        return this._countHere(pos, dots, radius) / (Math.PI * radius * radius);
    };

    this._drawDots = function(dots, dotR, canvas) {
        for (var i = 0; i < dots.length; i++) {
            canvas.beginPath();
            canvas.moveTo(dots[i].x + dotR, dots[i].y);
            canvas.arc(dots[i].x, dots[i].y, dotR, 0, Math.PI * 2, false);

            canvas.fill();
        }
    };

    /**
     * 
     * @param {type} canvas to draw on
     * @param {type} size of star
     * @param {type} pos Vector, position relative to top left of canvas to draw
     * @returns {undefined}
     */
    this.draw = function(canvas, size, pos) {
        canvas.save();

        canvas.globalCompositeOperation = "lighter";

        //by default, draw a star at 0,0.  relocate accordingly:
        canvas.translate(pos.x, pos.y);
//        canvas.scale(size/this.DEFAULT_SIZE);

        //radius and angle

        var dotR = size / 10;

        var dotCount = 1000;

        var rgbDots = new Array(3);
        //sets of dots for each colour
        rgbDots[0] = this._splurgeDots(size, dotCount);
        rgbDots[1] = this._splurgeDots(size, dotCount);
        rgbDots[2] = this._splurgeDots(size, dotCount);

//        var topLeft = pos.subtract(new Vector(-size/2,-size/2));

        var alpha=0.01;

        canvas.fillStyle = (new Colour(0, 0, 255, alpha)).toRGBA();
        this._drawDots(rgbDots[2], dotR, canvas);

        canvas.fillStyle = (new Colour(0, 255, 0, alpha)).toRGBA();
        this._drawDots(rgbDots[1], dotR, canvas);

        
        
        canvas.fillStyle = (new Colour(255, 0, 0, alpha)).toRGBA();
        this._drawDots(rgbDots[0], dotR, canvas);

//        for (var x = Math.floor(-size / 2); x < size / 2; x++) {
//            for (var y = Math.floor(-size / 2); y < size / 2; y++) {
//                var rgbDensitys = new Array(3);
//                for (var c = 0; c < 3; c++) {
//                    rgbDensitys[c] = this._densityHere(new Vector(x, y), rgbDots[c], dotR);
//                }
//                
//                colour = new Colour(rgbDensitys[0]/(dotCount/2),rgbDensitys[0]/(dotCount/2),rgbDensitys[0]/(dotCount/2));
//                canvas.fillStyle=colour.toRGB();
//                canvas.fillRect(x,y,1,1);
//            }
//        }

//        canvas.fillStyle = (new Colour(0, 255, 0, 0.1)).toRGBA();
//        this._splurgeDots(canvas, dotR, size);
//
//        canvas.fillStyle = (new Colour(255, 0, 0, 0.1)).toRGBA();
//        this._splurgeDots(canvas, dotR, size);
//
//        canvas.fillStyle = (new Colour(0, 0, 255, 0.1)).toRGBA();
//        this._splurgeDots(canvas, dotR, size);


//        canvas.beginPath();
//        canvas.moveTo(size/2,0);
//        canvas.lineTo(-size/2,0);
//        canvas.moveTo(0,size/2);
//        canvas.lineTo(0,-size/2);
//        canvas.stroke();

        canvas.restore();
    };
};