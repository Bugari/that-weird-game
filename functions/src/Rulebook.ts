import type { ButtonData } from "../../src/ButtonData";
import _ from "lodash";
import hasha from "hasha";

const salt = "himalayan";
const bonusTiers = [1, 10, 25, 50, 100, 250, 500, 1000];
const primes = [
  19, 31, 43, 47, 61, 67, 71, 79, 101, 137, 139, 149, 193, 223, 241, 251, 263,
  277, 307, 311, 349, 353, 359, 373,
];
export class Rulebook {
  static encode(
    seed: string,
    cells: Array<Array<ButtonData>>,
    change: ButtonData | null
  ) {
    const pieces = [salt + seed + "/"];
    for (let rowNum = 0; rowNum < cells.length; rowNum++) {
      for (let colNum = 0; colNum < cells[rowNum].length; colNum++) {
        const thisCell = cells[rowNum][colNum];
        pieces.push(
          change && rowNum == change.row && colNum == change.col
            ? change.color[0]
            : thisCell.color[0]
        );
      }
    }
    return pieces.join("");
  }

  static hash(encoded: string) {
    return hasha(encoded, { encoding: "buffer", algorithm: "sha512" });
  }
  static handle(
    seed: string,
    cells: Array<Array<ButtonData>>,
    change: ButtonData | null
  ) {
    const newCells = _.cloneDeep(cells);

    const encoded = this.encode(seed, cells, change);
    console.log("encoded", encoded);
    const hashed = this.hash(encoded);

    let greens = 0;

    let boardFieldsSource = hashed.readUInt32BE(0);
    _.forEach(newCells, (row) => {
      _.forEach(row, (cell: ButtonData) => {
        const mark = boardFieldsSource & 0b11;
        boardFieldsSource >>>= 2;
        if (mark == 0) {
          cell.color = "red";
        }
        if (mark == 1) {
          cell.color = "green";
        }
        if (cell.color == "green") {
          greens++;
        }
      });
    });
    if (change) {
      newCells[change.row][change.col].color = change.color;
    }

    const scoreSource = hashed.readUInt32LE(4);

    let bonusTier = 0;
    _.forEachRight(bonusTiers, (val, idx) => {
      if (scoreSource % val == 0) {
        bonusTier = idx;
        return false;
      }
      return true;
    });
    return {
      points: bonusTiers[bonusTier],
      cells: newCells,
      lose: change && scoreSource % primes[greens] == 0,
    };
  }
}
