export default function Modal(root, id, titulo) {
  const dialog = document.createElement("dialog");
  dialog.id = id;
  dialog.classList.add("modal");
  const title = document.createElement("h1");
  title.id = "titulo";
  title.textContent = titulo;
  dialog.appendChild(title);
  root.appendChild(dialog);
}
