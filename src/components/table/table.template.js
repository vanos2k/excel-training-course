const CODES = {
  A: 65,
  Z: 90,
};

function createCell(row) {
  return function(_, col) {
    return `
      <div class="cell"
           data-col="${col}"
           data-row="${row}"
           data-id="${row}:${col}"
           data-type="cell"
           contenteditable
       ></div>
    `;
  };
}

function createColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, index = '') {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  ;
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
