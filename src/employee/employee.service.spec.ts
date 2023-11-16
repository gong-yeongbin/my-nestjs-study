import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { IEmployee } from './employee.interface';
import { NotFoundException } from '@nestjs/common';

import { IDepartment } from '../department/department.interface';

class MockDepartmentRepository implements IDepartment {
	findDepartment = jest.fn();
	findDepartmentAndLocation = jest.fn();
}

class MockEmployeeRepositroy implements IEmployee {
	findEmployee = jest.fn();
	findEmployeeDetail = jest.fn();
	findEmployeeByDepartment = jest.fn();
	saveEmployee = jest.fn();
}

describe('EmployeeService', () => {
	let service: EmployeeService;
	let employeeRepository: IEmployee;
	let departmentRepository: IDepartment;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EmployeeService,
				{ provide: 'EmployeeRepository', useClass: MockEmployeeRepositroy },
				{ provide: 'DepartmentRepository', useClass: MockDepartmentRepository },
			],
		}).compile();

		service = module.get<EmployeeService>(EmployeeService);
		employeeRepository = module.get<IEmployee>('EmployeeRepository');
		departmentRepository = module.get<IDepartment>('DepartmentRepository');
	});

	it('[실패] 특정 사원의 현재 정보 조회 사원 정보 없음', async () => {
		employeeRepository.findEmployee = jest.fn().mockResolvedValue(null);
		expect(async () => await service.findEmployee(1)).rejects.toThrowError(new NotFoundException());
	});

	it('[성공] 특정 사원의 현재 정보 조회 사원', async () => {
		employeeRepository.findEmployee = jest.fn().mockResolvedValue({
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

		await service.findEmployee(100);
		expect(employeeRepository.findEmployee).toBeCalledTimes(1);
	});

	it('[실패] 특정 사원의 이력 정보 조회', async () => {
		employeeRepository.findEmployeeDetail = jest.fn().mockResolvedValue(null);
		expect(async () => await service.findEmployee(1)).rejects.toThrowError(new NotFoundException());
	});

	it('[성공] 특정 사원의 이력 정보 조회', async () => {
		employeeRepository.findEmployeeDetail = jest.fn().mockResolvedValue({
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

		await service.findEmployeeDetail(200);
		expect(employeeRepository.findEmployeeDetail).toBeCalledTimes(1);
	});

	it('[실패] 특정 부성의 급여를 특정 비율로 인상', async () => {
		const employeeUpdateDto: { department_id: number; increase: number } = { department_id: 1, increase: 5 };
		departmentRepository.findDepartment = jest.fn().mockResolvedValue(null);
		employeeRepository.findEmployeeByDepartment = jest.fn().mockResolvedValue([]);

		expect(() => service.updateSalaryByDepartment(employeeUpdateDto)).rejects.toThrowError(new NotFoundException());
	});
	it('[성공] 특정 부성의 급여를 특정 비율로 인상', async () => {
		const employeeUpdateDto: { department_id: number; increase: number } = { department_id: 10, increase: 5 };
		departmentRepository.findDepartment = jest.fn().mockResolvedValue({
			departmentId: 10,
			departmentName: 'Administration',
			managerId: 200,
			locationId: 1700,
			location: { locationId: 1700, streetAddress: '2004 Charade Rd', postalCode: '98199', city: 'Seattle', stateProvince: 'Washington', countryId: 'US' },
		});
		employeeRepository.findEmployeeByDepartment = jest.fn().mockResolvedValue([
			{
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
			},
		]);

		await service.updateSalaryByDepartment(employeeUpdateDto);
		expect(departmentRepository.findDepartment).toBeCalledTimes(1);
		expect(employeeRepository.findEmployeeByDepartment).toBeCalledTimes(1);
		expect(employeeRepository.saveEmployee).toBeCalledTimes(1);
	});
});
