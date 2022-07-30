class GameScene1 extends Scene {
  x;
  y;
  w;
  h;
  constructor(name, x, y, w, h, s, id) {
    super(name, x, y, w, h, s, id);
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;
  }

  init() {
    this.fps = 60;

    const canvas = document.querySelector("canvas#defaultGame");
    const ctx = canvas.getContext("2d");

    // init canvas
    canvas.width = this.w;
    canvas.height = this.h;
    canvas.style.top = this.x + "px";
    canvas.style.left = this.y + "px";

    this._ctx = ctx;
    this._canvas = canvas;
    const tank1 = new Tank("tank1", 100, 200, 30, 30, 20, "tank1");
    const tank2 = new Tank("tank2", 180, 300, 30, 30, 20, "tank2");
    const tank3 = new Tank("tank3", 300, 360, 30, 30, 20, "tank3");
    const enemy = new Tank("tank4", 600, 400, 30, 30, 20, "tank4");
    const dashboard = new DashboardUI(
      "dashboard",
      500,
      500,
      250,
      200,
      20,
      "tank4"
    );
    const map = new TitleMapScene1(
      "tile_map",
      20,
      20,
      800,
      800,
      "game1",
      50,
      50
    );
    const mouse = new MouseActive("mouse", 0, 0, 0, 0, "mouse1", 0);

    map.setTile([20, 20]);
    enemy.color = "red";
    tank1.speed = 1;
    tank2.speed = 1.5;
    tank3.speed = 2;
    tank3.attRange = 160;

    const camera = new CameraScene1("camera", 50, 50, 700, 400, "camera1");
    const gameController = new Scene1Controller();

    this._mouse = mouse;
    this._scene = this;

    this.addList([dashboard, tank1, tank2, tank3, enemy], "objects");
    this.addList([camera], "cameras");
    this.addList([map], "tiles");
    this.addList([gameController], "controllers");

    // add function button
    const moveButton = new FunctionButton();
    moveButton.w = 20;
    moveButton.h = 20;
    moveButton.content = "Move";

    const buildButton = new FunctionButton();
    buildButton.w = 20;
    buildButton.h = 20;
    buildButton.content = "Build";

    dashboard.addButton(moveButton);
    dashboard.addButton(buildButton);

    buildButton.x += 80;


    this.render();
  }
}
