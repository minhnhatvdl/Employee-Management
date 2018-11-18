const employee1 = new Employee('1', 'minh nhat', 'minh@nhat.com', 'aaa', '02/11/2018', 'Boss');
const employee2 = new Employee('2', 'minh nguyet', 'minh@nguyet', 'ccc', '18/11/2018', 'Employee');
const employee3 = new Employee('3', 'minh khoa', 'minh@nguyet', 'ccc', '18/10/2018', 'Employee');
const employee4 = new Employee('4', 'minh an', 'minh@nguyet', 'ccc', '18/09/2018', 'Employee');
const employee5 = new Employee('5', 'minh tam', 'minh@nguyet', 'ccc', '16/12/2018', 'Employee');
const employee6 = new Employee('6', 'minh phuc', 'minh@nguyet', 'ccc', '09/03/2018', 'Employee');
const employee7 = new Employee('7', 'minh linh', 'minh@nguyet', 'ccc', '16/07/2018', 'Employee');
const company = new Company();
company.addEmployee(employee1);
company.addEmployee(employee2);
company.addEmployee(employee6);
company.addEmployee(employee7);
company.addEmployee(employee3);
company.addEmployee(employee4);
company.addEmployee(employee5);
// load modal
loadModal = (title = 'Add an employee', type = 1) => {
	// type 1: add an employee
	// type 2: modify infos of employee
	$('#header-title').text(title);
	switch(type) {
		case 1: // type 1: add an employee
			$('#btnAddModal').show();
			$('#btnUpdateModal').hide();
			$('#idEmployee').prop('readonly', false);
		break;
		case 2: // type 2: modify infos of employee
			$('#btnAddModal').hide();
			$('#btnUpdateModal').show();
			$('#idEmployee').prop('readonly', true);
		break;
	}
}
// clear modal
clearModal = () => {
	// reset value
	$('#myModal input.form-control').val('');
	// reset position of employee
	$('#positionEmployee').val(0);
}
// params default 
let currentPage = 1;
const numberEmployeePerPage = 2;
// show list of employee
showListEmployee = listEmployee => {
	// init params list of employees
	const numberTotalEmployee = listEmployee.length;
	let indexEmployeeStart = (currentPage - 1)*numberEmployeePerPage;
	let indexEmployeeEnd = currentPage*numberEmployeePerPage - 1;
	if(indexEmployeeEnd > numberTotalEmployee - 1) indexEmployeeEnd = numberTotalEmployee - 1;
	// table list of employees
	const $tableListEmployee = $('#tableListEmployee');
	// init table
	$tableListEmployee.html('');
	// show table
	for(let i = indexEmployeeStart; i <= indexEmployeeEnd; i++) {
		let btnModify = `<a class="btn btn-primary text-white" data-toggle="modal" href="#myModal" onclick="onModifyEmployee('${listEmployee[i].id}')"><em class="fa fa-pencil"></em></a>`;
		let btnDelete = `<a class="btn btn-danger text-white" data-toggle="modal" onclick="onDeleteEmployee('${listEmployee[i].id}')"><em class="fa fa-trash"></em></a>`;
		$tableListEmployee.append(`<tr>
			<td>${listEmployee[i].id}</td>
			<td>${listEmployee[i].name}</td>
			<td>${listEmployee[i].email}</td>
			<td>${listEmployee[i].date}</td>
			<td>${listEmployee[i].position}</td>
			<td>${btnModify} ${btnDelete}</td>
		</tr>`);
	}
	// create a pagination
	const totalPage = Math.ceil(numberTotalEmployee / numberEmployeePerPage);
	const $listPagination = $('#listPagination');
	const previousPage = `<li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick=goToPage(${(currentPage == 1)? 1: currentPage - 1})>
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>`;
    const nextPage = `<li class="page-item">
      <a class="page-link" href="#" aria-label="Next" onclick=goToPage(${(currentPage == totalPage)? totalPage: currentPage + 1})>
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>`;
    // init pagination
	$listPagination.html('');
    $listPagination.append(previousPage);
	for(let i = 1; i <= totalPage; i++) {
		$listPagination.append(`<li id="page_${i}" class="page-item ${(currentPage == i)? 'active': ''}"><a class="page-link" href="#" onclick=goToPage(${i})>${i}</a></li>`);
	}
    $listPagination.append(nextPage);
}
// go to page
goToPage = page => {
	currentPage = page;
	showListEmployee(company.listEmployee);
}
// click button add an employee
onAddEmployee = () => {
	const id = $('#idEmployee').val();
	const name = $('#nameEmployee').val();
	const email = $('#emailEmployee').val();
	const password = $('#passwordEmployee').val();
	const date = $('#dateEmployee').val();
	const position = $('#positionEmployee').val();
	if(id && name && email && password && date && position != 0) {
		// add an employee
		const newEmployee = new Employee(id, name, email, password, date, position);
		company.addEmployee(newEmployee);
		// refresh list employee
		showListEmployee(company.listEmployee);
		// sweet alert
		swal('Success!', 'An employee has been added!', 'success');
	} else {
		swal('Warning!', 'Fill in the form!', 'warning');
	}
}
// modify employee
onModifyEmployee = id => {
	// init modal
	clearModal();
	loadModal('Modify an employee', 2);
	// get infos of employee
	const employee = company.findEmployee(id);
	// fill in form
	$('#idEmployee').val(employee.id);
	$('#nameEmployee').val(employee.name);
	$('#emailEmployee').val(employee.email);
	$('#passwordEmployee').val(employee.password);
	$('#dateEmployee').val(employee.date);
	$('#positionEmployee').val(employee.position);
}
// delete employee
onDeleteEmployee = id => {
	company.deleteEmployee(id);
	// set current page 1
	currentPage = 1;
	// refresh list employee
	showListEmployee(company.listEmployee);
}
// update employee
onUpdateEmployee = () => {
	const id = $('#idEmployee').val();
	const name = $('#nameEmployee').val();
	const email = $('#emailEmployee').val();
	const password = $('#passwordEmployee').val();
	const date = $('#dateEmployee').val();
	const position = $('#positionEmployee').val();
	if(id && name && email && password && date && position != 0) {
		// update an employee
		const updateEmployee = new Employee(id, name, email, password, date, position);
		company.updateEmployee(updateEmployee);
		// refresh list employee
		showListEmployee(company.listEmployee);
		// sweet alert
		swal('Success!', 'The employee has been updated!', 'success');
	} else {
		swal('Warning!', 'Fill in the form!', 'warning');
	}
}
// search employee by name
onSearchEmployeeByName = () => {
	const name = $('#searchName').val().trim();
	if(name) {
		const { listEmployee } = company.findEmployeeByName(name);
		currentPage = 1;
		// refresh list employee
		showListEmployee(listEmployee);
	} else {
		currentPage = 1;
		showListEmployee(company.listEmployee);
	}
}
// search employee by name with enter
onSearchEmployeeByNameWithEnter = e => {
	if(e.keyCode == 13) {
		onSearchEmployeeByName();
	}
}
// sort list employee
onSortListEmployee = (sort = 'up') => {
	$('#sortUp').toggle();
	$('#sortDown').toggle();
	company.sortListEmployee(sort);
	showListEmployee(company.listEmployee);
}
//
showListEmployee(company.listEmployee);