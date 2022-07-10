const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results");

let dataArray;

async function getCitoyens() {
	const res = await fetch("/citoyen");

	const { citoyens } = await res.json();
	console.log(citoyens);
	dataArray = orderList(citoyens);
	createUserList(dataArray);
}

getCitoyens();

function orderList(data) {
	const orderedData = data.sort((a, b) => {
		if (a.prenom.toLowerCase() < b.prenom.toLowerCase()) {
			return -1;
		}
		if (a.prenom.toLowerCase() > b.prenom.toLowerCase()) {
			return 1;
		}
		return 0;
	});

	return orderedData;
}

function createUserList(usersList) {
	usersList.forEach((user) => {
		const listItem = document.createElement("div");
		listItem.setAttribute("class", "table-item");

		listItem.innerHTML = `
    <div class="container-img">
    
    <p class="name">${user.nom} ${user.prenom}</p>
    </div>
    <p class="email">${user.email}</p>
    <div class="switch-container">
    <label class="switch">
      <input data-id=${user.id} type="checkbox" onchange="checkedAccount(this)"
      ${user.email_valide ? "checked" : ""}
      >
      <span class="slider round"></span>
    </label>
    </div>
    `;
		searchResult.appendChild(listItem);
	});
}

searchInput.addEventListener("input", filterData);

function filterData(e) {
	searchResult.innerHTML = "";

	const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

	const filteredArr = dataArray.filter(
		(el) =>
			el.nom.toLowerCase().includes(searchedString) ||
			el.nom.toLowerCase().includes(searchedString) ||
			`${el.prenom + el.nom}`
				.toLowerCase()
				.replace(/\s/g, "")
				.includes(searchedString) ||
			`${el.prenom + el.nom}`
				.toLowerCase()
				.replace(/\s/g, "")
				.includes(searchedString)
	);

	createUserList(filteredArr);
}

async function checkedAccount(check) {
	const id = check.dataset.id;
	const endpoint = `/citoyen/validation/${id}`;
	const data = {
		compte_valide: check.checked,
		email_valide: check.checked,
	};

	const options = {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(data),
	};

	const res = await fetch(endpoint, options);

	console.log(res);
}
