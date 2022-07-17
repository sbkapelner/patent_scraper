const dataDisplay = document.getElementById("data");

fetch("http://localhost:3000/results")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((item) => {
      const patentNo = `${item}\n`;
      dataDisplay.insertAdjacentHTML("beforeend", patentNo);
    })
  )
  .catch((err) => console.log(err));

function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("data");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
}
