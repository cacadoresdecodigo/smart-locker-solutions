export default function Table(root, ...params) {
  const [dados, idTabela, headers, handler] = params;

  const table = document.createElement("table");
  table.setAttribute("id", idTabela);

  const thead = document.createElement("thead");
  thead.classList.add("tabela_header");

  const headerRow = document.createElement("tr");

  for (let i = 0; i < headers.length; i++) {
    const th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (let i = 0; i < dados.length; i++) {
    const bodyRow = document.createElement("tr");
    bodyRow.classList.add("body_row");
    for (const [key, value] of Object.entries(dados[i])) {
      if (key !== "senha") {
        bodyRow.insertCell().textContent = value;
      }
    }
    tbody.appendChild(bodyRow);
  }

  table.appendChild(tbody);
  root.appendChild(table);

  if (handler) {
    handler(table);
  }
}
