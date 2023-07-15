export function ehAdmin(email) {
  const [parte1, parte2] = email.split("@");
  return parte2 === "admin.com" ? true : false;
}
