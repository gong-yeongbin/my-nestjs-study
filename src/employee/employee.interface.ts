import { EmployeesEntity } from '../entities/employees.entity';

export interface IEmployee {
	findEmployee(employee_id: number);
	findEmployeeDetail(employee_id: number);
	findEmployeeByDepartment(department_id: number);
	saveEmployee(emyployeeEntity: EmployeesEntity);
	saveEmployeeList(emyployeeEntity: EmployeesEntity[]);
}
