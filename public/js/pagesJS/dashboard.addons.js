const rows = document.querySelector('tbody').children;
for (const tr of rows) {
    tr.addEventListener("click", function () {
        if (!this.classList.contains('tr-clicked')) {
            for (const row of rows) {
                row.classList.remove('tr-clicked');
            }
            return this.classList.add('tr-clicked');
        }
        return false;
    })
}