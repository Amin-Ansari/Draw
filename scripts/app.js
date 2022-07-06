let randomButton = document.querySelector("button");
let lists = document.querySelectorAll("ul");
let theNumberInput = document.querySelector(".winner-number ");
let winners = {
  winnerId: [],
};

window.addEventListener("load", showAllTheUsers);
randomButton.addEventListener("click", showTheWiner);

function showAllTheUsers() {
  let winnerPromise = new Promise(winnerExecutor);
  function winnerExecutor(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://jsonplaceholder.typicode.com/posts`);
    xhr.onload = function () {
      if (xhr.status == 200) {
        let allTheUsers = this.responseText;

        resolve(allTheUsers);
      } else {
        reject();
      }
    };
    xhr.send();
  }
  winnerPromise.then(onFullFiled);
}
function onFullFiled(allTheUsers) {
  allTheUsers = JSON.parse(allTheUsers);
  for (let element of allTheUsers) {
    let li = createLi();
    li.innerHTML += `The user's id: ${element.id} <br />`;
    li.innerHTML += `The user's title: ${element.title} <br />`;
    lists[1].appendChild(li);
  }
}

function createLi() {
  return document.createElement("li");
}
function showTheWiner() {
  for (let i = 1; i <= Number(theNumberInput.value); i++) {
    let randomId = Math.floor(Math.random() * 101);
    if (randomId == 0) {
      randomId++;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://jsonplaceholder.typicode.com/posts`);
    xhr.onload = function () {
      if (xhr.status == 200) {
        let allTheUsers = this.responseText;
        allTheUsers = JSON.parse(allTheUsers);
        for (let element of allTheUsers) {
          if (element.id === randomId) {
            let currentWinner = document.querySelectorAll(".winner-user > li");
            if (currentWinner.length < Number(theNumberInput.value)) {
              console.log(currentWinner.length);
              let li = createLi();
              li.innerHTML += `The user's id: ${element.id} <br />`;
              li.innerHTML += `The user's title: ${element.title} <br />`;
              lists[0].appendChild(li);
              if (!lists[0].classList.contains("show")) {
                lists[0].classList.add("show");
              }
            }
          }
        }
      }
    };
    xhr.send();
  }
}
