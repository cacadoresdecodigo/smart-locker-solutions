export default function Select(options, handler) {
  const root = document.getElementById("select_menu");
  const select = document.createElement("select");
  select.id = "dropdown-menu";
  for (let i = 0; i < options.length; i++) {
    const option = new Option(options[i]);
    if (i === 0) {
      option.selected = true;
    }
    select.add(option);
  }
  root.appendChild(select);

  select.addEventListener("change", (e) => {
    const selected = select.options[e.target.selectedIndex].value;
    handler(selected);
  });
}
