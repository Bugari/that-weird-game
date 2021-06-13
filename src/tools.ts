import { isGameOver, lastScoreChange, score, seed } from "./store";

export function resetGame() {
  isGameOver.update(() => false)
  lastScoreChange.update(() => 0)
  score.update(() => 0)
  seed.update(() => "0")
}

export function makeid(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
