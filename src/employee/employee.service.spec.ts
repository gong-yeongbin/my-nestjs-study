import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { IEmployee } from './employee.interface';
import { NotFoundException } from '@nestjs/common';
import { EmployeeFindDto } from './dto/employee-find.dto';

class MockEmployeeRepositroy implements IEmployee {
	getEmployee = jest.fn();
	getEmployeeDetail = jest.fn();
}

describe('EmployeeService', () => {
	let service: EmployeeService;
	let employeeRepository: IEmployee;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EmployeeService, { provide: 'EmployeeRepository', useClass: MockEmployeeRepositroy }],
		}).compile();

		service = module.get<EmployeeService>(EmployeeService);
		employeeRepository = module.get<IEmployee>('EmployeeRepository');
	});

	it('[실패] 특정 사원의 현재 정보 조회 사원 정보 없음', async () => {
		const employeeFindDto: EmployeeFindDto = { employee_id: 1 };
		employeeRepository.getEmployee = jest.fn().mockResolvedValue(null);
		expect(async () => await service.getEmployee(employeeFindDto)).rejects.toThrowError(new NotFoundException());
	});

	it('[성공] 특정 사원의 현재 정보 조회 사원', async () => {
		const employeeFindDto: EmployeeFindDto = { employee_id: 100 };
		employeeRepository.getEmployee = jest.fn().mockResolvedValue({
			employeeId: 100,
			firstName: 'Steven',
			lastName: 'King',
			email: 'SKING',
			phoneNumber: '515.123.4567',
			hireDate: '1987-06-17',
			jobId: 'AD_PRES',
			salary: 24000,
			commissionPct: null,
			managerId: null,
			departmentId: 90,
		});

		await service.getEmployee(employeeFindDto);
		expect(employeeRepository.getEmployee).toBeCalledTimes(1);
	});

	it('[실패] 특정 사원의 이력 정보 조회', async () => {
		const employeeFindDto: EmployeeFindDto = { employee_id: 1 };
		employeeRepository.getEmployeeDetail = jest.fn().mockResolvedValue(null);
		expect(async () => await service.getEmployee(employeeFindDto)).rejects.toThrowError(new NotFoundException());
	});

	it('[성공] 특정 사원의 이력 정보 조회', async () => {
		const employeeFindDto: EmployeeFindDto = { employee_id: 200 };
		employeeRepository.getEmployeeDetail = jest.fn().mockResolvedValue({
			employeeId: 200,
			firstName: 'Jennifer',
			lastName: 'Whalen',
			email: 'JWHALEN',
			phoneNumber: '515.123.4444',
			hireDate: '1987-09-17',
			jobId: 'AD_ASST',
			salary: '4400.00',
			commissionPct: null,
			managerId: 101,
			departmentId: 10,
			job: { jobId: 'AD_ASST', jobTitle: 'Administration Assistant', minSalary: '3000', maxSalary: '6000' },
			department: { departmentId: 10, departmentName: 'Administration', managerId: 200, locationId: 1700 },
			manager: {
				employeeId: 101,
				firstName: 'Neena',
				lastName: 'Kochhar',
				email: 'NKOCHHAR',
				phoneNumber: '515.123.4568',
				hireDate: '1989-09-21',
				jobId: 'AD_VP',
				salary: '17000.00',
				commissionPct: null,
				managerId: 100,
				departmentId: 90,
			},
		});

		await service.getEmployeeDetail(employeeFindDto);
		expect(employeeRepository.getEmployeeDetail).toBeCalledTimes(1);
	});
});
