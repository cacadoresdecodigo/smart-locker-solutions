export default function Modal(...childrens) {
  const [id, titulo, form] = childrens;
  const dialog = document.createElement("dialog");
  dialog.id = id;
  dialog.classList.add("modal");
  const title = document.createElement("h1");
  title.id = "titulo";
  title.textContent = titulo;
  dialog.appendChild(title);
  dialog.appendChild(form);
  return dialog;
}
