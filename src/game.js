const tank1 = new Tank("tank1", 100, 200, 30, 30, 20, "tank1");
const tank2 = new Tank("tank2", 180, 300, 30, 30, 20, "tank2");
const tank3 = new Tank("tank3", 300, 360, 30, 30, 20, "tank3");
const enemy = new Tank("tank4", 600, 400, 30, 30, 20, "tank4");
const dashboard = new DashboardUI("dashboard", 50, 500, 700, 200, 20, "tank4");
const map = new TitleMapScene1("tile_map", 20, 20, 800, 800, "game1", 50, 50);

map.setTile([20, 20]);
enemy.color = "red";
tank1.speed = 1;
tank2.speed = 1.5;
tank3.speed = 2;
tank3.attRange = 160;

const camera = new CameraScene1("camera", 50, 50, 700, 400, "camera1");
const gameController = new Scene1Controller();

const scene = new Scene("game_play", 0, 0, 800, 800, "game1");

scene.addList([dashboard, tank1, tank2, tank3, enemy], "objects");
scene.addList([camera], "cameras");
scene.addList([map], "tiles");
scene.addList([gameController], "controllers");

scene.fps = 60;
scene.render();
