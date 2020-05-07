function onClickSubmit() {
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const dob = document.getElementById("dob").value;

	const url = "http://localhost:3000/user/signup";

	const requestBody = {
		firstName,
		lastName,
		email,
		password,
		dob,
	};

	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => handleResponse(data))
		.catch((err) => handleResponse(err));
}

function handleResponse(resp) {
	if (resp.msg) showAlert(resp.msg);
	else if (resp.errors && resp.errors.length > 0) showAlert(resp.errors.map((error) => error.msg));
	else showAlert();
}

function showAlert(alert = null) {
	document.getElementById("container").innerHTML = `Response : ${alert || "Some error occured"}`;
}
