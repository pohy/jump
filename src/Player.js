const PIXI = require('pixi.js');
import Keyboard from './Keyboard';

export default class Player {
    velocityX = 0;
    velocityY = 0;
    velocityXMax = 8;
    accelerationX = 1;
    slowdownMultiplier = 2;
    width = 32;
    height = 32;
    rect = this.createRect();
    state = {
        moveLeft: false,
        moveRight: false
    };

    constructor(x, y, stage) {
        this.x = x;
        this.y = y;
        stage.addChild(this.rect);
        this.setupKeyboard()
    }
    update() {
        const {moveLeft, moveRight} = this.state;
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (moveLeft && !moveRight) {
            this.moveHorizontal(-1);
        } else if (!moveLeft && moveRight) {
            this.moveHorizontal(1);
        } else {
            this.stopHorizontalMovement();
        }
        this.render();
    }
    render() {
        const {rect, x, y} = this;
        rect.x = x;
        rect.y = y;
    }
    toggleState = (stateKey, value) => () => {
        const {state} = this;
        if (typeof state[stateKey] === 'undefined') {
            throw new Error(`Trying to toggle non existent state '${state}'`);
        }
        this.state[stateKey] = typeof value !== undefined ? value : !state[stateKey]
    };
    moveHorizontal(sign = 1) {
        const {velocityX, velocityXMax, accelerationX} = this;
        const shouldAccelerate = sign > 0 ? velocityX < velocityXMax : velocityX > -velocityXMax;
        this.velocityX += shouldAccelerate ? accelerationX * sign : 0;
    };
    stopHorizontalMovement() {
        const {velocityX, accelerationX, slowdownMultiplier} = this;
        const multipliedAcceleration = accelerationX * slowdownMultiplier;
        const newVX = velocityX
            + (velocityX > 0 ? -multipliedAcceleration : multipliedAcceleration);
        this.velocityX = ((velocityX >= 0 && newVX < velocityX) || (velocityX <= 0 && newVX > velocityX))
            ? 0
            : newVX;
    }
    setupKeyboard() {
        const keyboard = Keyboard.getInstance();
        keyboard.onDown('ArrowRight', this.toggleState('moveRight', true));
        keyboard.onDown('ArrowLeft', this.toggleState('moveLeft', true));
        keyboard.onUp('ArrowRight', this.toggleState('moveRight', false));
        keyboard.onUp('ArrowLeft', this.toggleState('moveLeft', false));
        return keyboard;
    }
    createRect() {
        const {width, height} = this;
        const rect =new PIXI.Graphics();
        rect.beginFill(0x66CCFF);
        rect.drawRect(0, 0, width, height);
        rect.endFill();
        return rect;
    }
}
