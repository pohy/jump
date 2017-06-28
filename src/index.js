const PIXI = require('pixi.js');
import Player from './Player';

const WIDTH = 854;
const HEIGHT = 480;
const RENDERER_CONFIG = {
    antialias: false,
    transparent: false,
    resolution: 1
};

const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, RENDERER_CONFIG);
const stage = new PIXI.Container();
const player = new Player(WIDTH / 2, HEIGHT / 2, stage);

document.getElementById('game').appendChild(renderer.view);
loop();

function loop() {
    requestAnimationFrame(loop);
    player.update();
    renderer.render(stage);
}
