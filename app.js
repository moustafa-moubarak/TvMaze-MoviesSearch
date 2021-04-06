const searchForm = document.querySelector("#searchForm");
const photos = document.querySelector("#photos");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  removeAllChildNodes(photos);
  searchTerm = searchForm.elements.search.value;
  const config = { params: { q: searchTerm } };
  result = await axios.get(`http://api.tvmaze.com/search/shows`, config);
  makeImages(result.data);
  console.log(result.data);
});

const makeImages = (results) => {
  for (let image of results) {
    if (image.show.image) {
      const div = document.createElement("DIV");
      photos.append(div);
      div.classList.add("imgContainer");
      const img = document.createElement("IMG");
      img.src = image.show.image.medium;
      div.append(img);
      // img.classList.add("img")
      const info = document.createElement("P");

      info.innerText = `Name: ${image.show.name}\n`;
      if (image.show.rating.average) {
        info.innerText += `\nAverage Rating: ${image.show.rating.average}`;
      }
      div.append(info);
    }
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
