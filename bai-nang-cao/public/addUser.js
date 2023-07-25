let baseURL = "http://localhost:3000/api/v1/users";
let thead = document.getElementById("thead");
let scores = document.getElementById("scores");
let number = document.getElementById("number");
let playerList = document.getElementById("playerList");

function updatePlayerList(value) {
  playerList.innerHTML = "";

  fetch(baseURL)
    .then((res) => res.json())
    .then((data) => {
      data.users.forEach((element, index) => {
        if (element.user.includes(value)) {
          playerList.innerHTML += `
            <p class="form-control">${element.user}</p>  
          `;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

fetch(baseURL)
  .then((res) => res.json())
  .then((data) => {
    data.users.forEach((element, index) => {
      thead.innerHTML += `
        <th class="flex-th" scope="col">${element.user}</th>  
      `;
    });
  })
  .catch((err) => {
    console.log(err);
  });

fetch(baseURL)
  .then((res) => res.json())
  .then((data) => {
    scores.innerHTML += `
      <td>Tổng điểm(0)</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    `;
  });

function createGame() {
  const playerName = document.getElementById("playerName").value;
  const count = 0;

  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: playerName, count: count }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("playerName").value = "";
      thead.innerHTML += `
        <th class="flex-th" scope="col">${data.user.user}</th>  
      `;
      updatePlayerList("");
    })
    .catch((err) => {
      console.log(err);
    });
}
