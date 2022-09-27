window.addEventListener("hashchange", () => {
  window.scrollTo({
    top: 0,
  });
});

//Social icons logic
const btnEl = document.querySelector(".social-btn");

const toggleOptions = () => {
  const wrapperEl = document.querySelector(".social-wrapper");
  const iconEl = btnEl.querySelector("i");

  wrapperEl.classList.toggle("active");

  if (iconEl.classList.contains("ri-share-line")) {
    iconEl.classList.replace("ri-share-line", "ri-close-line");
  } else {
    iconEl.classList.replace("ri-close-line", "ri-share-line");
  }
};

btnEl.addEventListener("click", toggleOptions);

// const decrement = (element) => {
//   let numberFromProduct = parseInt(
//     document.getElementById(`counter${element}`).innerHTML
//   );
//   if (numberFromProduct > 1) {
//     let incremented = (numberFromProduct -= 1);
//     return (document.getElementById(`counter${element}`).innerHTML =
//       incremented.toString());
//   }
// };
// const increment = (element) => {
//   let numberFromProduct = parseInt(
//     document.getElementById(`counter${element}`).innerHTML
//   );
//   let incremented = (numberFromProduct += 1);
//   console.log("ulazi u ovu svakako");
//   return (document.getElementById(`counter${element}`).innerHTML =
//     incremented.toString());
// };
