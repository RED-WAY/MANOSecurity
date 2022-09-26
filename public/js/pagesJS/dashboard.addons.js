function paintUsersOnClick() {
  // users select interaction
  const rows = document.querySelector("tbody").children;
  for (const tr of rows) {
    tr.addEventListener("click", function () {
      // verify if it's the same selected
      if (!this.classList.contains("tr-clicked")) {
        // remove others selected
        for (const row of rows) {
          row.classList.remove("tr-clicked");
        }

        // add style to selected user
        return this.classList.add("tr-clicked");
      }

      // remove if selected is clicked twice + DISABLE BUTTONS
      userBtnAttributes(false);
      return this.classList.remove("tr-clicked");
    });
  }
}
