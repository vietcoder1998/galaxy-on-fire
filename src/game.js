const tank1 = new Tank("tank1", 100, 200, 30, 30, "tank1");
const tank2 = new Tank("tank2", 180, 300, 30, 30, "tank2");
const tank3 = new Tank("tank3", 300, 360, 30, 30, "tank3");
const enemy = new Tank("tank4", 600, 400, 30, 30, "tank4");
enemy.color = "red";

const camera = new Camera("camera", 0, 0, 800, 600, "camera1");
const scene = new Scene("game_play", 0, 0, 820, 620, "game1");

const gameController = new GameController();

scene._controller = gameController;
scene._camera = camera;

gameController.addList(tank1, tank2, tank3, enemy, camera);


scene.render();
