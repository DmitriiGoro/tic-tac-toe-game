import { checkWinner } from "./checkWinner.js";

export function gameForTwo(
  lastGameBoard = null,
  lastCount = 0,
  clearOnly = false
) {
  const table = document.getElementById("gamefield");
  table.removeEventListener("click", turnClick);

  if (clearOnly) {
    return;
  }
  const cells = document.body.querySelectorAll(".cell");
  document.querySelector(".endgame").style.display = "";

  for (const cell of cells) {
    cell.innerHTML = "";
    cell.style.backgroundColor = "";
  }

  if (lastGameBoard) {
    for (let i = 0; i < lastGameBoard.length; i++) {
      if (lastGameBoard[i]) {
        cells[i].innerHTML = lastGameBoard[i];
      }
    }
  }

  let count = lastCount;
  const board = lastGameBoard || new Array(9).fill(undefined);

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  table.addEventListener("click", turnClick);

  function turnClick(event) {
    const cell = event.target.closest(".cell");

    if (!cell) {
      return;
    }

    const id = cell.id;

    if (board[id]) {
      return;
    }

    let player;

    if (count % 2 === 0) {
      player = "X";
    } else {
      player = "O";
    }

    board[id] = player;
    cells[id].innerHTML = player;
    window.localStorage.setItem("lastGame", JSON.stringify(board));

    count++;
    window.localStorage.setItem("lastCount", count);

    const gameWon = checkWinner({ board, player, winCombos });

    if (gameWon) {
      for (const index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = "greenyellow";
      }

      declareWinner(gameWon.player);
      window.localStorage.removeItem("lastGame");
    } else {
      checkTie();
    }
  }

  function declareWinner(who) {
    // делаем сообщение видимым
    document.querySelector(".endgame").style.display = "block";
    // заполняем его нужным текстом
    document.querySelector(".endgame .text").innerText = who;
  }

  function checkTie() {
    const emptySquares = board.filter((elem) => elem);
    console.log(board);
    console.log(emptySquares);
    // если пустых клеток не осталось
    if (emptySquares.length === 0) {
      // перебираем все клетки и раскрашиваем их зелёным
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "green";
        // отключаем обработчики нажатий
        table.removeEventListener("click", turnClick);
      }
      // выводим сообщение про ничью
      declareWinner("Ничья!");
      return true;
    }
    return false;
  }
}
