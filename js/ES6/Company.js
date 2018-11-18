class Company {
	constructor() {
	  this.listEmployee = new Array();
	}
	// add an employee
	// params: employee, type Employee
	addEmployee(employee) {
		this.listEmployee = [...this.listEmployee, employee];
	}
	// find an index of employee in list of employee
	// params: id of employee
	// return: index of employee in list
	findIndexEmployee(id) {
		for(let index in this.listEmployee) {
			if(this.listEmployee[index].id === id) return index;
		}
	}
	// find infos of employee in list of employee
	// params: id of employee
	// return: employee, type Employee
	findEmployee(id) {
		for(let employee of this.listEmployee) {
			if(employee.id === id) return employee;
		}
	}
	// delete an employee
	// params: id of employee
	deleteEmployee(id) {
		let index = this.findIndexEmployee(id);
		this.listEmployee.splice(index, 1);
	}
	// update infos of employee
	// params: employee, type Employee
	updateEmployee(employee) {
		let index = this.findIndexEmployee(employee.id);
		this.listEmployee[index] = employee;
	}
	// find infos of employee by name
	// params: name of employee
	// return: list employee
	findEmployeeByName(name) {
		name = name.trim().toUpperCase();
		let result = new Company();
		let listEmployee = this.listEmployee.filter(employee => employee.name.toUpperCase().indexOf(name) > -1);
		result.listEmployee = listEmployee;
		return result;
	}
	// sort list of employees by id
	// params: sort (up or down)
	sortListEmployee(sort = 'up') {
		this.listEmployee.sort((a, b) => {
			var idA = a.id.toUpperCase(); // ignore upper and lowercase
			var idB = b.id.toUpperCase(); // ignore upper and lowercase
			if(idA < idB) {
				return -1;
			}
			if(idA > idB) {
				return 1;
			}
			// id must be equal
			return 0;
		});
		if(sort == 'down') this.listEmployee.reverse();
	}
}
