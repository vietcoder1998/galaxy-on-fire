import { Button } from "../engine";

class FunctionButton extends Button {
  onClick(e) {
    console.log("onclick ->", e);
  }
}
