import type { ButtonData } from "../../src/ButtonData";
import _ from "lodash";
import hasha from "hasha";

const salt = "himalayan";
const bonusTiers = [10, 25, 50, 100, 250, 500, 1000];
export class Rulebook {
  static encode(seed: string, cells: Array<Array<ButtonData>>, change: ButtonData) {
    const pieces = [salt + seed + "/"];
    for (let rowNum = 0; rowNum < cells.length; rowNum++) {
      for (let colNum = 0; colNum < cells[rowNum].length; colNum++) {
        const thisCell = cells[rowNum][colNum];
        pieces.push(
          rowNum == thisCell.row && colNum == thisCell.col
            ? change.color[0].toUpperCase()
            : thisCell.color[0]);
      }
    }
    return pieces.join("");
  }

  static hash(encoded: string) {
    return hasha(encoded, { encoding: "buffer", algorithm: "sha512" });
  }
  static handle(seed: string, cells: Array<Array<ButtonData>>, change: ButtonData) {
    const newCells = _.cloneDeep(cells);

    const encoded = this.encode(seed, cells, change);
    const hashed = this.hash(encoded);

    let boardFieldsSource = hashed.readUInt32BE(0);
    _.forEach(newCells, (row) => {
      _.forEach(row, (cell: ButtonData) => {
        const mark = boardFieldsSource % 4;
        console.log("==> BFS", boardFieldsSource)
        console.log("==> mark", mark)
        boardFieldsSource >>= 2;
        if (mark == 0) {
          cell.color = "red";
          console.log('GOT RED @', cell)
        }
        if (mark == 1) {
          cell.color = "green";
        }
      });
    });
    newCells[change.row][change.col].color = change.color;

    const scoreSource = hashed.readUInt32LE(4);

    const bonusTier = 0;
    _.forEachRight(bonusTiers, (val, idx) => {
      if (bonusTier == 0 && scoreSource % val == 0) {
        bonusTier == idx + 1;
      }
    });
    return { cells: newCells, bonusTier };
  }
}
