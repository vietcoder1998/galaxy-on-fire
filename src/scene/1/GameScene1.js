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
    const tank1 = new Tank("tank1", 100, 200, 50, 50, 20, "tank1");
    const tank2 = new Tank("tank2", 180, 300, 50, 50, 20, "tank2");
    const tank3 = new Tank("tank3", 300, 360, 50, 50, 20, "tank3");
    const enemy = new EnemyTank("tank4", 600, 400, 50, 50, 20, "tank4");

    tank1.setImage('../../assets/items.png')
    tank2.setImage('../../assets/items.png')
    tank3.setImage("../../assets/items.png");

    enemy.setImage("../../assets/items.png");
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

    const buildingHouse = new DashboardUI(
      "dashboard",
      50,
      500,
      250,
      200,
      20,
      "tank4"
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

    this.addList(
      [dashboard, buildingHouse, tank1, tank2, tank3, enemy],
      "objects"
    );
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

    dashboard.addButton([moveButton, buildButton]);

    // building UI
    const building1 = new FunctionButton();
    building1.w = 20;
    building1.h = 20;
    building1.content = "Building1";

    const building2 = new FunctionButton();
    building2.w = 20;
    building2.h = 20;
    building2.content = "Building2";

    buildingHouse.addButton([building1, building2]);

    ////

    buildButton.x += 80;

    this.render();
  }
}
