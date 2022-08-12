// RANDOMIZE CORNERS
const radiusCorners = [
  "top--left",
  "top--right",
  "bottom--left",
  "bottom--right",
];
// randomize corner to remove radius
function borderChange(element) {
  const randomNumber = Math.floor(Math.random() * 4);
  element.classList.add(radiusCorners[randomNumber]);
  radiusCorners.push(radiusCorners[randomNumber]);
}
// reset corners to original config 
function resetBorder(element) {
  element.classList.remove(radiusCorners.at(-1));
  radiusCorners.pop();
}
