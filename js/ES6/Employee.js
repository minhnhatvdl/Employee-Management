class Employee {
	constructor(id, name, email, password, date, position) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.date = date;
		this.position = position;
		this.infosEmployee = {id, name, email, date, position};
	}
}