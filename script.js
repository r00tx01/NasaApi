const input = document.querySelector("input.bday-date");
const API_KEY = "0YrgAL3u85Wes5VP7VlnMbIZ3Fly1wAfTpRAMJ2U";

const date = new Date().toLocaleDateString("en-ca");
input.max = date;

input.addEventListener("change", (event) => getAPOD(event.target.value));

const getAPOD = (date) => {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Bad server response");
    })
    .then((data) => displayAPOD(data))
    .catch(() => displayNotFound());
};

const displayAPOD = (data) => {
  const apodCard = document.querySelector(".apod");
  apodCard.innerHTML = `
    <h3 class="apod-title">${data.title}</h3>
    <img src=${data.url} title=${data.title} class="apod-pic" />
    `;
};

const displayNotFound = () => {
  const apodCard = document.querySelector(".apod");
  apodCard.innerHTML =
    '<h3 class="apod-title">لم يتم العثور على صورة في هذا التاريخ</h3>';
};
