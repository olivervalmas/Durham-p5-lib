/* @class A class that represents an interactive model of an atom complete with a nucleus, electrons and their orbits. The aim
 * of the model is to be aesthetically pleasing and is therefore not scientifically accurate.
 */

class Atom {

    /**
     * Create an atom.
     *
     * @param {number} posX - The x position of the nucleus of the atom.
     * @param {number} posY - The y position of the nucleus of the atom.
     * @param {number} nucleusRadius - The radius of the nucleus, in pixels.
     * @param {number} rotsPerSec - A constant that determines how fast the electrons move around their orbits.
     * @param {number} electronCount - The number of electrons in the atom.
     * @param {number} tailSpheres - The number of spheres that makes up each electron.
     * @param {boolean} smoothing - Whether smoothing is enabled.
     */

    constructor(posX = 0, posY = 0, nucleusRadius = 20, rotsPerSec = 0.75, electronCount = 3, tailSpheres = 15, smoothing = false) {

        this._posX = posX;
        this._posY = posY;
        this._nucleusRadius = nucleusRadius;
        this._radius = nucleusRadius * 8;
        this._electronCount = electronCount;
        this._deltaAngle = PI / electronCount;
        this._rotsPerSec = rotsPerSec;
        this._rotation = 0;
        this._maximumNumberOfElectrons = 10;
        this.generateRandoms(this._maximumNumberOfElectrons);
        this._tailSpheres = tailSpheres;
        this._nucleusNoise = false;

        this._nucleusVibrate = false;
        this._electronVibrate = false;

        this._spinX = false;
        this._spinY = false;
        this._spinZ = false;

        this._enableOrbits = true;
        /*
         * This list represents the names of the first 10 elements in the periodic table and is used as a reference when
         * writing the name of the atom at the top of the page.
         */

        this._names = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon'];
        this._nucleusColor = color(3, 28, 193);
        this._electronColor = color(193, 3, 3);

        //Keeps track of spinning in x-axis
        this._counterX = Math.random(100);
        //Keeps track of spinning in y-axis
        this._counterY = Math.random(100);
        //Keeps track of spinning in z-axis
        this._counterZ = Math.random(100);
        this._smoothing = smoothing;

        this._nucleusColorCounter = 0;
        this._electronColorCounter = 0;

        this._nucleusColorCycleRate = 10;
        this._electronColorCycleRate = 10;

        this._nucleusColorCycle = false;
        this._electronColorCycle = false;

        this._cubeEnabled = false;

    }

    /**
     * Gets the name of the atom (according to the periodic table) from the list defined in the constructor.
     * @returns {string}
     */

    get name() {
        return this._names[this._electronCount - 1];
    }

    /**
     * Gets the maximum number of electrons allowed in order to prevent crashes from too many electrons.
     * @returns {number}
     */

    get maximumNumberOfElectrons() {
        return this._maximumNumberOfElectrons;
    }

    /**
     * Gets the color of the nucleus.
     * @returns {p5.Color}
     */

    get nucleusColor() {
        return this._nucleusColor;
    }

    /**
     * Sets the color of the nucleus.
     * @param {p5.Color} newColor
     */

    set nucleusColor(newColor) {
        this._nucleusColor = newColor;
    }

    /**
     * Gets the color of the electrons.
     * @returns {p5.Color}
     */

    get electronColor() {
        return this._electronColor;
    }

    /**
     * Sets the color of the electrons.
     * @param {p5.Color} newColor
     */

    set electronColor(newColor) {
        this._electronColor = newColor;
    }

    /**
     * Gets the radius (in pixels) of the nucleus.
     * @returns {number}
     */

    get nucleusRadius() {
        return this._nucleusRadius;
    }

    /**
     * Sets the radius (in pixels) of the nucleus.
     * @param {number} newRadius
     */

    set nucleusRadius(newRadius) {
        if (newRadius >= 0) {
            this._nucleusRadius = newRadius;
            /* Here we update the radius of the whole atom every time we change the nucleus radius
        so that everything stays nicely proportioned. */
            this._radius = newRadius * 8;
        }
    }

    /**
     * Gets the current number of electrons in the atom.
     * @returns {number}
     */

    get electronCount() {
        return this._electronCount;
    }

    /**
     * Sets the current number of electrons in the atom.
     * @param {number} newElectronCount
     */

    set electronCount(newElectronCount) {
        if (1 <= newElectronCount <= this._maximumNumberOfElectrons) {
            this._electronCount = newElectronCount;
            this._deltaAngle = PI / this._electronCount;
        }
    }

    /**
     * Gets the orbital speed of the the electrons.
     * @returns {number}
     */

    get electronSpeed() {
        return this._rotsPerSec;
    }

    /**
     * Sets the orbital speed of the electrons.
     * @param {number} newSpeed
     */

    set electronSpeed(newSpeed) {
        this._rotsPerSec = newSpeed;
    }

    /**
     * Gets whether spinning about the x-axis is enabled or disabled.
     * @returns {boolean}
     */

    get spinX() {
        return this._spinX;
    }

    /**
     * Sets whether spinning about the x-axis is enabled or disabled.
     * @param {boolean} newSpinX
     */

    set spinX(newSpinX) {
        this._spinX = newSpinX;
    }

    /**
     * Gets whether spinning about the y-axis is enabled or disabled.
     * @returns {boolean}
     */

    get spinY() {
        return this._spinY;
    }

    /**
     * Sets whether spinning about the y-axis is enabled or disabled.
     * @param {boolean} newSpinY
     */

    set spinY(newSpinY) {
        this._spinY = newSpinY;
    }

    /**
     * Gets whether spinning about the z-axis is enabled or disabled.
     * @returns {boolean}
     */

    get spinZ() {
        return this._spinZ;
    }

    /**
     * Sets whether spinning about the z-axis is enabled or disabled.
     * @param {boolean} newSpinZ
     */

    set spinZ(newSpinZ) {
        this._spinZ = newSpinZ;
    }

    /**
     * Gets whether the nucleus is vibrating.
     * @returns {boolean}
     */

    get nucleusVibrate() {
        return this._nucleusVibrate;
    }

    /**
     * Sets whether the nucleus is vibrating.
     * @param {boolean} newVal
     */

    set nucleusVibrate(newVal) {
        this._nucleusVibrate = newVal;
    }

    /**
     * Gets whether the electrons are vibrating.
     * @returns {boolean}
     */

    get electronVibrate() {
        return this._electronVibrate;
    }

    /**
     * Sets whether the electrons are vibrating.
     * @param {boolean} newVal
     */

    set electronVibrate(newVal) {
        this._electronVibrate = newVal;
    }

    /**
     * Gets whether the nucleus has noise.
     * @returns {boolean}
     */

    get nucleusNoise() {
        return this._nucleusNoise;
    }

    /**
     * Sets whether the nucleus has noise.
     * @param {boolean} newVal
     */

    set nucleusNoise(newVal) {
        this._nucleusNoise = newVal;
    }

    /**
     * Gets whether smoothing is enabled.
     * @returns {boolean}
     */

    get smoothing() {
        return this._smoothing;
    }

    /**
     * Sets whether smoothing is enabled.
     * @param newVal
     */

    set smoothing(newVal) {
        this._smoothing = newVal;
    }

    /**
     * Gets the counterX value.
     * @returns {number} _counterX
     */

    get counterX() {
        return this._counterX;
    }

    /**
     * Gets the counterY value.
     * @returns {number} _counterY
     */

    get counterY() {
        return this._counterY;
    }

    /**
     * Gets the counterZ value.
     * @returns {number} _counterZ
     */

    get counterZ() {
        return this._counterZ;
    }

    /**
     * Gets whether the nucleus has color cycle enabled.
     * @returns {boolean}
     */

    get nucleusColorCycle() {
        return this._nucleusColorCycle;
    }

    /**
     * Sets whether the nucleus has color cycle enabled.
     * @param newVal
     */

    set nucleusColorCycle(newVal) {
        this._nucleusColorCycle = newVal;
    }

    /**
     * Gets the rate at which the nucleus cycles through colors.
     * @return {number}
     */

    get nucleusColorCycleRate() {
        return this._nucleusColorCycleRate;
    }

    /**
     * Sets the rate at which the nucleus cycles through colors.
     * @param newVal
     */

    set nucleusColorCycleRate(newVal) {
        this._nucleusColorCycleRate = newVal;
    }

    /**
     * Gets whether the electrons have color cycle enabled.
     * @returns {boolean}
     */

    get electronColorCycle() {
        return this._electronColorCycle;
    }

    /**
     * Sets whether the electrons have color cycle enabled.
     * @param newVal
     */

    set electronColorCycle(newVal) {
        this._electronColorCycle = newVal;
    }

    /**
     * Gets the rate at which the electron cycles through colors.
     * @returns {number}
     */

    get electronColorCycleRate() {
        return this._electronColorCycleRate;
    }

    /**
     * Sets the rate at which the electron cycles through colors.
     * @param newVal
     */

    set electronColorCycleRate(newVal) {
        this._electronColorCycleRate = newVal;
    }

    /**
     * Gets whether drawing the sketch to a 3D cube is enabled.
     * @returns {boolean}
     */

    get cubeEnabled() {
        return this._cubeEnabled;
    }

    /**
     * Sets whether drawing the sketch to a 3D cube is enabled.
     * @param newVal
     */

    set cubeEnabled(newVal) {
        this._cubeEnabled = newVal;
    }

    /**
     * Generates 20 random rotations between 0 and 2π.
     * These random rotations determine the starting location of each atom meaning that they are not all in sync.
     * @param {number} numberOfRandoms
     */

    generateRandoms(numberOfRandoms) {
        this._randoms = [];
        for (let i = 0; i < numberOfRandoms + 1; i++) {
            this._randoms.push(random(2 * PI));
        }
    }

    /**
     * Calculates the time passed between each call of draw().
     * @returns {number}
     */

    calcDeltaTime() {
        this._old;
        this._now = Date.now();

        if (this._old == null) {
            this._old = Date.now();
        }
        return this._now - this._old;
    }

    /**
     * Draws the nucleus to the canvas.
     * @param {p5.Renderer} g - Optional renderer object for using sketch as a texture.
     */

    drawNucleus(g) {

        if (g) {

            g.push();
            if (this._nucleusVibrate) {
                //If nucleus vibration is on then we randomly move it slightly off center each time we draw it.
                g.translate(this._posX + random(-2, 2), this._posY + random(-2, 2));
            } else {
                g.translate(this._posX, this._posY);
            }

            //Draws a sphere to the canvas in the specified color.
            g.fill(this._nucleusColor);
            g.sphere(this._nucleusRadius / 2);
            g.pop();

            //If nucleusNoise is enabled, draw 50 small white lines from the center of the nucleus to the bounding edge.
            if (this._nucleusNoise) {
                for (let i = 0; i < 50; i++) {
                    //Generates a random vector then multiplies it by the nucleus radius to prevent lines leaving the sphere.
                    let rand = p5.Vector.random3D();
                    rand.mult(this._nucleusRadius / 2);
                    //Lines are drawn in white with an alpha value (transparency) of 30.
                    g.stroke(255, 255, 255, 30);
                    g.line(this._posX, this._posY, 0, rand.x, rand.y, rand.z);
                    g.noStroke();
                }
            }

        } else {

            push();
            if (this._nucleusVibrate) {
                //If nucleus vibration is on then we randomly move it slightly off center each time we draw it.
                translate(this._posX + random(-2, 2), this._posY + random(-2, 2));
            } else {
                translate(this._posX, this._posY);
            }

            //Draws a sphere to the canvas in the specified color.
            fill(this._nucleusColor);
            sphere(this._nucleusRadius);
            pop();

            //If nucleusNoise is enabled, draw 50 small white lines from the center of the nucleus to the bounding edge.
            if (this._nucleusNoise) {
                for (let i = 0; i < 50; i++) {
                    //Generates a random vector then multiplies it by the nucleus radius to prevent lines leaving the sphere.
                    let rand = p5.Vector.random3D();
                    rand.mult(this._nucleusRadius);
                    //Lines are drawn in white with an alpha value (transparency) of 30.
                    stroke(255, 255, 255, 30);
                    line(this._posX, this._posY, 0, rand.x, rand.y, rand.z);
                    noStroke();
                }
            }

        }


    }

    /**
     * Draws the specified number of electrons to the canvas.
     * @param {p5.Renderer} g - Optional renderer object for using sketch as a texture.
     */

    drawElectrons(g) {
        for (let i = 0; i < this._electronCount; i++) {
            //Rotates the canvas by deltaAngle then draws each electron.
            if (g) {
                g.rotateZ(this._deltaAngle);
                this.drawElectron(g, i);
            } else {
                rotateZ(this._deltaAngle);
                this.drawElectron(false, i);
            }

        }
    }

    /**
     * Draws a specific electron and tail. Its position relative to other electrons is determined by the index of the electron.
     * @param {number} index
     * @param {p5.Renderer} g - Optional renderer object for using sketch as a texture.
     */

    drawElectron(g, index) {
        //Gets the current rotation and takes the electron's random relative rotation into account.
        let baseRot = this._rotation + this._randoms[index];
        let deltaRot = Math.PI / 256;
        let jiggle = 0;

        //Loops through
        for (let i = 0; i < this._tailSpheres; i++) {
            let rate = i / this._tailSpheres;
            if (g) {
                g.push();
                g.rotateY(baseRot + deltaRot * i * rate);
                if (this._electronVibrate) {
                    jiggle = random(-0.5, 0.5);
                }
                g.translate(this._radius / 2 + jiggle, jiggle);
                let size = rate * this._nucleusRadius / 2 / 5;

                g.fill(this._electronColor);
                g.ellipsoid(size * 1.5, size);

                g.pop();
            } else {
                push();
                rotateY(baseRot + deltaRot * i * rate);
                if (this._electronVibrate) {
                    jiggle = random(-0.5, 0.5);
                }
                translate(this._radius + jiggle, jiggle);
                let size = rate * this._nucleusRadius / 5;

                fill(this._electronColor);
                ellipsoid(size * 1.5, size);

                pop();
            }

        }
    }

    /**
     * Draws the orbit for each electron onto the canvas.
     * @param {p5.Renderer} g - Optional renderer object for using sketch as a texture.
     * @param {number} thickness - The thickness of the orbit.
     */

    drawOrbits(g, thickness) {
        if (g) {
            g.push();
            g.rotateX(PI / 2);
            g.fill(0);
            for (let i = 0; i < this._electronCount; i++) {
                g.rotateY(this._deltaAngle);
                g.torus(this._radius / 2, thickness, 24, 16);
            }
            g.pop();
        } else {
            push();
            rotateX(PI / 2);
            fill(0);
            for (let i = 0; i < this._electronCount; i++) {
                rotateY(this._deltaAngle);
                torus(this._radius, thickness, 24, 16);
            }
            pop();
        }
    }

    /**
     * Increment counterX by amount if spinX is enabled.
     * @param {number} amount
     */

    incrementCounterX(amount) {
        if (atom.spinX) {
            this._counterX += amount;
        }
    }

    /**
     * Increment counterY by amount if spinY is enabled.
     * @param {number} amount
     */

    incrementCounterY(amount) {
        if (atom.spinY) {
            this._counterY += amount;
        }
    }

    /**
     * Increment counterZ by amount if spinZ is enabled.
     * @param {number} amount
     */

    incrementCounterZ(amount) {
        if (atom.spinZ) {
            this._counterZ += amount;
        }
    }

    /**
     * Cycles through nucleus and electron colors in order to create a rainbow effect. The HSB color system is used in
     * order to make color transitions smoother.
     * @param {number} saturation - The saturation of the color.
     * @param {number} brightness - The brightness of the color.
     */

    cycleColors(saturation, brightness) {

        if (this._nucleusColorCycle) {
            if (this._nucleusColorCounter >= 359) {
                this._nucleusColorCounter = 0;
            } else {
                this._nucleusColorCounter += this._nucleusColorCycleRate;
            }
            this._nucleusColor = color('hsl(' + Math.floor(this._nucleusColorCounter) + ',' + saturation + '%,' + brightness + '%)');
        }

        if (this._electronColorCycle) {
            if (this._electronColorCounter >= 359) {
                this._electronColorCounter = 0;
            } else {
                this._electronColorCounter += this._electronColorCycleRate;
            }
            this._electronColor = color('hsl(' + Math.floor(this._electronColorCounter) + ',' + saturation + '%,' + brightness + '%)');
        }
    }

    /**
     * Draws the nucleus, electrons and orbits to the canvas.
     * @param {p5.Renderer} g - Optional renderer object for using sketch as a texture.
     */

    draw(g) {

        if (g) {

            push();

            this.cycleColors(100, 50);

            clear();
            g.background(130);

            if (atom.smoothing) {
                smooth();
            } else {
                noSmooth();
            }

            g.rotateX(atom.counterX * PI / 128);
            g.rotateY(atom.counterY * PI / 128);
            g.rotateZ(atom.counterZ * PI / 128);

            let deltaTime = this.calcDeltaTime();
            /*
        A bunch of maths that increments the rotation variable depending on the time since the draw function was last called.
        This keeps things looking smooth and consistent if the framerate fluctuates.
         */
            this._rotation += (deltaTime * 2 * PI * this._rotsPerSec / 1000);
            g.noStroke();

            this.drawNucleus(g);

            if (this._enableOrbits) {
                this.drawOrbits(g, 0.75);
            }

            this.drawElectrons(g);

            //Resets this._old so that calcDeltaTime() can be called again.
            this._old = this._now;

            texture(g);
            rotateX(frameCount / 100);
            rotateY(frameCount / 100);
            box(200);

            pop();

        } else {

            this.cycleColors(100, 50);

            clear();
            if (atom.smoothing) {
                smooth();
            } else {
                noSmooth();
            }

            rotateX(atom.counterX * PI / 16);
            rotateY(atom.counterY * PI / 16);
            rotateZ(atom.counterZ * PI / 16);


            let deltaTime = this.calcDeltaTime();
            /*
        A bunch of maths that increments the rotation variable depending on the time since the draw function was last called.
        This keeps things looking smooth and consistent if the framerate fluctuates.
         */
            this._rotation += (deltaTime * 2 * PI * this._rotsPerSec / 1000);
            noStroke();

            this.drawNucleus(false);

            if (this._enableOrbits) {
                this.drawOrbits(false, 0.75);
            }

            this.drawElectrons(false);

            //Resets this._old so that calcDeltaTime() can be called again.
            this._old = this._now;
        }

        this.incrementCounterX(0.3);
        this.incrementCounterY(0.3);
        this.incrementCounterZ(0.3);
    }

    /**
     * Original sketch name: Atom
     *
     * Original author: Canopus (https://www.openprocessing.org/user/135028)
     *
     * Original sketch: https://www.openprocessing.org/sketch/578925
     *
     * License: CC BY-SA 3.0
     */
}
