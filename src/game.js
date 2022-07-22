const tank1 = new Tank("tank1", 100, 200, 30, 30, "tank1");
const tank2 = new Tank("tank2", 180, 300, 30, 30, "tank2");
const tank3 = new Tank("tank3", 300, 360, 30, 30, "tank3");
const boss = new Tank("tank4", 300, 230, 30, 30, "tank4");

const view = new ViewObject("camera", 100, 100, 800, 600, "camera1");
const scene = new Scene("game_play", 0, 0, 1000, 800, "game1");

console.log(scene.obList, scene);
scene.addList(tank1, tank2, tank3, boss, view);

scene.render();
