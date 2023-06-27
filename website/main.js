let form = document.querySelector("form");
let Username = document.querySelector(".username").value;
let Email = document.querySelector(".email").value;
let Password = document.querySelector(".password").value;

form.addEventListener("submit", async function(event) {
	event.preventDefault();

	await fetch("/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: Username,
			email: Email,
			password: Password
		})
	}).then((res) => res.json())
	  .then((result) => { 
		  alert(result.message);
		  console.log(result.message);
	});
});