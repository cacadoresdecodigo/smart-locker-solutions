export default function Select(options, handler, selecionado) {
  const root = document.getElementById("select_menu");
  const select = document.createElement("select");
  select.id = "dropdown-menu";
  for (let i = 0; i < options.length; i++) {
    const option = new Option(options[i]);
    select.add(option);

    if (selecionado && options[i] === selecionado) {
      option.selected = true;
    }
  }
  root.appendChild(select);

  select.addEventListener("change", (e) => {
    const selected = select.options[e.target.selectedIndex].value;
    handler(selected);
  });

  return select;
}
