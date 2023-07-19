export default function Button(root, ...params) {
  const [id, className, text, handler] = params;
  const btn = document.createElement("button");
  btn.id = id;
  if (className) {
    btn.classList.add(className);
  }

  btn.textContent = text;
  root.appendChild(btn);
  if (handler) {
    btn.addEventListener("click", (e) => {
      handler(e);
    });
  }
}
