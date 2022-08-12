// RANDOMIZE CORNERS
const radiusCorners = [
  "top--left",
  "top--right",
  "bottom--left",
  "bottom--right",
];
function borderChange(element) {
  const randomNumber = Math.floor(Math.random() * 4);
  element.classList.add(radiusCorners[randomNumber]);
  radiusCorners.push(radiusCorners[randomNumber]);
}
function resetBorder(element) {
  console.log("alegria");
  element.classList.remove(radiusCorners.at(-1));
  radiusCorners.pop();
}
