const searchForm = document.querySelector("#searchForm");
const photos = document.querySelector("#photos");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  removeAllChildNodes(photos)
  searchTerm = searchForm.elements.search.value;
  const config = { params: { q: searchTerm } };
  result = await axios.get(`http://api.tvmaze.com/search/shows`, config);
  makeImages(result.data);
});

const makeImages = (results) => {
  for (let image of results) {
    if (image.show.image) {
      const img = document.createElement("IMG");
      img.src = image.show.image.medium;
      photos.append(img);
      img.classList.add("img");
    }
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
