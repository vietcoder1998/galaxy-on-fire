class MiMi {
  init = {
    x: 35,
    y: 35,
    size: 100,
    round: 20,

    eye: {
      range_move_scale: 0.1,
      x: 50,
      y: 70,
      space_scale: 0.35,
      scale: 0.28,
      round: 5,
      color: "#7FFFD4",
      height_scale: 0.28,
    },

    sleep_mode: {
      height_scale: 0.1,
    },
  };

  state = "active";

  body = {
    out_bound: {
      size: this.init.size + 4,
      round: this.init.round + 2,
      x: this.init.x - 2,
      y: this.init.y - 2,
      color: "black",
    },

    bound: {
      size: this.init.size + 2,
      round: this.init.round + 1,
      x: this.init.x - 1,
      y: this.init.y - 1,
      color: "white",
    },

    face: {
      size: this.init.size,
      round: this.init.round,
      x: this.init.x,
      y: this.init.y,
      color: "black",
    },

    eyes: {
      left: {
        size: this.init.size * this.init.eye.scale,
        round: this.init.eye.round,
        x: this.init.eye.x,
        y: this.init.eye.y,
        color: this.init.eye.color,
        height: this.init.size * this.init.eye.height_scale,
      },

      right: {
        size: this.init.size * this.init.eye.scale,
        round: this.init.eye.round,
        x: this.init.eye.x + this.init.eye.space_scale * this.init.size,
        y: this.init.eye.y,
        color: this.init.eye.color,
        height: this.init.size * this.init.eye.height_scale,
      },
    },
  };

  fps = 60;

  constructor(ctx) {
    this.ctx = ctx;
    this.draw();
  }

  get max_range_left_eye() {
    return {
      max: {
        x: this.init.eye.x + this.init.size * this.init.eye.range_move_scale,
        y: this.init.eye.y + this.init.size * this.init.eye.range_move_scale,
      },
      min: {
        x: this.init.eye.x - this.init.size * this.init.eye.range_move_scale,
        y: this.init.eye.y - this.init.size * this.init.eye.range_move_scale,
      },
    };
  }

  get max_range_right_eye() {
    return {
      max: {
        x:
          this.init.eye.x +
          this.init.size *
            (this.init.eye.range_move_scale + this.init.eye.space_scale),
        y: this.init.eye.y + this.init.size * this.init.eye.range_move_scale,
      },
      min: {
        x:
          this.init.eye.x +
          this.init.size *
            (this.init.eye.space_scale - this.init.eye.range_move_scale),
        y: this.init.eye.y - this.init.size * this.init.eye.range_move_scale,
      },
    };
  }

  get face() {
    return this.body.face;
  }

  get bound() {
    return this.body.bound;
  }

  get left_eye() {
    return this.body.eyes.left;
  }

  get right_eye() {
    return this.body.eyes.right;
  }

  get out_bound() {
    return this.body.out_bound;
  }

  sleep(time = 1) {
    const exp =
      ((this.init.eye.height_scale - this.init.sleep_mode.height_scale) *
        this.init.size) /
      this.fps;

    const action = setInterval(() => {
      if (
        this.left_eye.height >
        this.init.sleep_mode.height_scale * this.init.size
      ) {
        this.left_eye.height -= exp;
      }
      if (
        this.right_eye.height >
        this.init.sleep_mode.height_scale * this.init.size
      ) {
        this.right_eye.height -= exp;
      }
      this.state = "sleep";
      this.draw();
    }, (time * 1000) / this.fps);

    setTimeout(() => {
      clearInterval(action);
    }, 1000);
  }

  wakeup(time = 1) {
    this.state = "active";
    const exp =
      ((this.init.eye.height_scale - this.init.sleep_mode.height_scale) *
        this.init.size) /
      this.fps;

    const action = setInterval(() => {
      if (this.left_eye.height <= this.init.eye.height_scale * this.init.size) {
        this.left_eye.height += exp;
      }
      if (
        this.right_eye.height <=
        this.init.eye.height_scale * this.init.size
      ) {
        this.right_eye.height += exp;
      }
      this.draw();
    }, (time * 1000) / this.fps);

    setTimeout(() => {
      clearInterval(action);
    }, 1000);
  }

  move_both_eye_with_time(x, y, time) {
    const cur_moving = {
      x: (x - (this.left_eye.x + this.right_eye.x) / 2) / this.fps,
      y: (y - this.init.eye.y) / this.fps,
    };

    if (this.state !== "sleep") {
      const action = setInterval(() => {
        // move left
        if (
          this.max_range_left_eye.min.x <= this.left_eye.x + cur_moving.x &&
          this.left_eye.x + cur_moving.x <= this.max_range_left_eye.max.x
        ) {
          this.left_eye.x += cur_moving.x;
        }

        if (
          this.max_range_left_eye.min.y <= this.left_eye.y + cur_moving.y &&
          this.left_eye.y + cur_moving.y <= this.max_range_left_eye.max.y
        ) {
          this.left_eye.y += cur_moving.y;
        }

        // move right
        if (
          this.max_range_right_eye.min.x <= this.right_eye.x + cur_moving.x &&
          this.right_eye.x + cur_moving.x <= this.max_range_right_eye.max.x
        ) {
          this.right_eye.x += cur_moving.x;
        }

        if (
          this.max_range_right_eye.min.y <= this.right_eye.y + cur_moving.y &&
          this.right_eye.y + cur_moving.y <= this.max_range_right_eye.max.y
        ) {
          this.right_eye.y += cur_moving.y;
        }

        this.draw();
      }, (time * 1000) / this.fps);

      setTimeout(() => {
        clearInterval(action);
      }, time * 1000);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.ctx
      .roundRect(
        this.out_bound.x,
        this.out_bound.y,
        this.out_bound.size,
        this.out_bound.size,
        this.out_bound.round,
        this.out_bound.color
      )
      .stroke(); //or .fill() for a filled rect

    this.ctx
      .roundRect(
        this.bound.x,
        this.bound.y,
        this.bound.size,
        this.bound.size,
        this.bound.round,
        this.bound.color
      )
      .stroke(); //or .fill() for a filled rect
    this.ctx
      .roundRect(
        this.face.x,
        this.face.y,
        this.face.size,
        this.face.size,
        this.face.round,
        this.face.color
      )
      .stroke(); //or .fill() for a filled rect
    this.ctx
      .roundRect(
        this.left_eye.x,
        this.left_eye.y,
        this.left_eye.size,
        this.left_eye.height,
        this.left_eye.round,
        this.left_eye.color
      )
      .stroke(); //or .fill() for a filled rect
    this.ctx
      .roundRect(
        this.right_eye.x,
        this.right_eye.y,
        this.right_eye.size,
        this.right_eye.height,
        this.right_eye.round,
        this.right_eye.color
      )
      .stroke(); //or .fill() for a filled rect
  }
}
