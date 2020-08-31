const CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function createColumn(col) {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(content, index = '') {
  return `
    <div class="row">
        <div class="row-info">${index}</div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(index) {
  return String.fromCharCode(CODES.A + index);
}

// function cellContent(rowIndex, collIndex) {
//   return `${toChar(collIndex)}${rowIndex}`;
// }

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => toChar(index))
      .map(el => createColumn(el))
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(cell => createCell())
        .join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
