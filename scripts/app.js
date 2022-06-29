let randomButton = document.querySelector("button");
let lists = document.querySelectorAll("ul");

window.addEventListener("load", showAllTheUsers);

function showAllTheUsers() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/posts`);
  xhr.onload = function () {
    if (xhr.status == 200) {
      let allTheUsers = this.responseText;
      allTheUsers = JSON.parse(allTheUsers);
      for (let element of allTheUsers) {
        let li = createLi();
        li.innerHTML += `The user's id: ${element.id} <br />`;
        li.innerHTML += `The user's title: ${element.title} <br />`;
        lists[1].appendChild(li);
      }
    }
  };
  xhr.send();
}
function createLi() {
  return document.createElement("li");
}
