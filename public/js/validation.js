function validate(inputs) {
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];
  if ([...inputs].some((e) => !e.value.lenght)) {
    [...inputs]
      .filter((el) => !el.value.length)
      .forEach((el) => (el.style.borderBottom = "2px solid darkred"));
    return M.toast({ html: "Required all fields fullfiled" });
  } else
    [...inputs].forEach((el) => (el.style.borderBottom = "1px solid teal"));

  let basic = [...inputs].filter((e) => e.type == "text");
  let email = [...inputs].filter((e) => e.type == "email");
  let password = [...inputs].filter((e) => e.type == "password");

  let emailValidation = email.every((e) => e.value.includes("@"));
  let passwordValidation = password.every(
    (e) => e.value.length >= 6 && symbols.some((el) => e.value.includes(el))
  );

  (!emailValidation && [
    M.toast({ html: "Email must includes @" }),
    email.forEach((e) => (e.style.borderBottom = "2px solid darkred")),
  ]) ||
    email.forEach((e) => (e.style.borderBottom = "1px solid teal"));

  (!passwordValidation && [
    M.toast({ html: "Password must includes special symbol and must be same" }),
    password.forEach((e) => (e.style.borderBottom = "2px solid darkred")),
  ]) ||
    password.forEach((e) => (e.style.borderBottom = "1px solid teal"));
}

document.querySelector(".validate").addEventListener("click", function () {
  validate(document.querySelectorAll("input"));
});
