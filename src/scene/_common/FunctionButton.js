import { Button } from "../../engine";

export default class FunctionButton extends Button {
  onClick(e) {
    console.log("onclick ->", e);
  }
}
