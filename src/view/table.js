
const getCharacteristic = {
  "1": ["starting-point"],
  "2": ["starting-point", "observer"],
  "3": ["observer"],
  "4": ["target-point"],
  "5": ["target-point", "observer"]
}

export const createTable = (adjacencyList, rowLen, colLen, path) => {
  const table = document.createElement("table");
  table.setAttribute("class", "table");

  for (let i = 0; i < rowLen; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < colLen; j++) {
      const index = i * colLen + j;

      const [cellState, _, cellCharacteristic] = adjacencyList[index];
      const td = document.createElement("td");
      td.setAttribute("class", "cell");
      td.setAttribute("state", cellState ? "alive" : "dead");

      // if (pathObj[index]) {
      //   td.classList.add("highlighted");

      // }

      if (cellCharacteristic) {
        getCharacteristic[cellCharacteristic].map((detail) => {
          return td.classList.add(detail)
        })
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  // update table to highlight path
  // path have indexes of nodes in list format
  path && path.map((index, i) => {
    const [row, col] = [Math.floor(index / colLen), index % colLen];
    const td = table.children[row].children[col];
    td.classList.add("highlighted");
  })


  return table;
};


export const fluxTable = (state, rowLen, colLen, highlighted) => {
  const oldTable = document.getElementsByTagName('table')[0];
  const newTable = createTable(state, rowLen, colLen, highlighted);
  newTable && oldTable.parentNode.replaceChild(newTable, oldTable);
};
