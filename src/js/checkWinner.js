export function checkWinner({ board, player, winCombos }) {
  const plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);

  let gameWon;

  for (const [index, win] of winCombos.entries()) {
    // если одна из них совпадает с тем, что на доске — формируем информацию о победителе
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}
