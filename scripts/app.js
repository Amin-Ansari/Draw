let randomButton = document.querySelector("button");
let lists = document.querySelectorAll("ul");
let theNumberInput = document.querySelector(".winner-number ");
let winners = {
  winnerId: [],
};

window.addEventListener("load", showAllTheUsers);
randomButton.addEventListener("click", showWInners);

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
function showWInners() {
  for (let i = 1; i <= Number(theNumberInput.value); i++) {
    let randomId = Math.floor(Math.random() * 101);
    if (randomId == 0) {
      randomId += 1;
    }
    let ulLI = document.querySelectorAll(".winner-user>li");
    if (ulLI.length < Number(theNumberInput.value)) {
      let myPromise = showTheWinner(
        `https://jsonplaceholder.typicode.com/posts/${randomId}`
      );
      myPromise
        .then((responseT) => {
          let li = createLi();
          li.innerHTML += `The user's id: ${responseT.id} <br />`;
          li.innerHTML += `The user's title: ${responseT.title} <br />`;
          lists[0].appendChild(li);
          if (!lists[0].classList.contains("show")) {
            lists[0].classList.add("show");
          }
        })
        .catch(() => {
          console.log("Erorr");
        });
    }
  }
}

function showTheWinner(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (xhr.status == 200) {
        let responseT = JSON.parse(xhr.responseText);
        resolve(responseT);
      }
      reject();
    };
    xhr.send();
  });
}
