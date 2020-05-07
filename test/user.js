const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

chai.should();

chai.use(chaiHttp);

describe("User API", () => {
	/**
	 * Test the POST route
	 */

	// Success POST request

	describe("POST /user/signup", () => {
		it("It should POST a new user", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "test@gmail.com",
				password: "123456",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(200);
					response.should.be.a("object");
					done();
				});
		});

		// Already existing user

		it("User already exists", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "test@gmail.com",
				password: "123456",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(409);
					response.should.be.a("object");
					done();
				});
		});

		// POST without first name

		it("First name is required", (done) => {
			const user = {
				firstName: "",
				lastName: "test2",
				email: "test@gmail.com",
				password: "123456",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(400);
					response.should.be.a("object");
					done();
				});
		});

		// POST without last name

		it("Last name is required", (done) => {
			const user = {
				firstName: "test1",
				lastName: "",
				email: "test@gmail.com",
				password: "123456",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(400);
					response.should.be.a("object");
					done();
				});
		});

		// POST without email

		it("Email field is required", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "",
				password: "123456",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(400);
					response.should.be.a("object");
					done();
				});
		});

		// POST without valid email

		it("Valid email is required", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "test",
				password: "123456",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(400);
					response.should.be.a("object");
					done();
				});
		});

		// POST without password

		it("Password is required", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "test@gmail.com",
				password: "",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(400);
					response.should.be.a("object");
					done();
				});
		});

		// POST with password length<6

		it("Password length  6", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "test@gmail.com",
				password: "123",
				dob: "11-02-1993",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(400);
					response.should.be.a("object");
					done();
				});
		});

		// POST without dob

		it("Date of birth is required", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "test@gmail.com",
				password: "123456",
				dob: "",
			};
			chai.request(server)
				.post("/user/signup")
				.send(user)
				.end((err, response) => {
					response.should.have.status(400);
					response.should.be.a("object");
					done();
				});
		});

		// Invalid URL

		it("Invalid POST Url", (done) => {
			const user = {
				firstName: "test1",
				lastName: "test2",
				email: "test@gmail.com",
				password: "123456",
				dob: "",
			};
			chai.request(server)
				.post("/user/signup/fgdgf")
				.send(user)
				.end((err, response) => {
					response.should.have.status(404);
					response.should.be.a("object");
					done();
				});
		});
	});
});
