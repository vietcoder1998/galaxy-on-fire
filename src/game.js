const tank1 = new Tank("tank1", 100, 200, 30, 30, 20, "tank1");
const tank2 = new Tank("tank2", 180, 300, 30, 30, 20, "tank2");
const tank3 = new Tank("tank3", 300, 360, 30, 30, 20, "tank3");
const enemy = new Tank("tank4", 600, 400, 30, 30, 20, "tank4");
enemy.color = "red";

tank1.speed = 1;
tank2.speed = 1.5;
tank3.speed = 2;

const camera = new Camera("camera", 50, 50, 800, 600, "camera1");
const scene = new Scene("game_play", 0, 0, 1000, 700, "game1");
const mouse = new MouseObject("mouse1", 0, 0, 0, 0);
const gameController = new Scene1Controller();

tank3.attRange = 160
scene._controller = gameController;
scene._camera = camera;

gameController.addList(mouse, tank1, tank2, tank3, enemy, camera);

scene.fps = 44;
scene.render();
