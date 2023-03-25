

export const createTable = (adjacencyList, rowLen, colLen) => {
  const table = document.createElement("table");
  table.setAttribute("class", "table");

  for (let i = 0; i < rowLen; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < colLen; j++) {
      const index = i * colLen + j;
      const [cellState] = adjacencyList[index];
      const td = document.createElement("td");
      td.setAttribute("class", "cell");
      td.setAttribute("state", cellState ? "alive" : "dead");
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  return table;
};


export const fluxTable = (state, rowLen, colLen) => {
  const oldTable = document.getElementsByTagName('table')[0];
  const newTable = createTable(state, rowLen, colLen);
  oldTable && oldTable.parentNode.replaceChild(newTable, oldTable);
};
