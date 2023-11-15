import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { IDepartment } from './department.interface';
import { NotFoundException } from '@nestjs/common';

class MockDepartmentRepository implements IDepartment {
	findDepartmentAndLocation = jest.fn();
}

describe('DepartmentService', () => {
	let service: DepartmentService;
	let departmentRepository: IDepartment;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DepartmentService, { provide: 'DepartmentRepository', useClass: MockDepartmentRepository }],
		}).compile();

		service = module.get<DepartmentService>(DepartmentService);
		departmentRepository = module.get<IDepartment>('DepartmentRepository');
	});

	it('[실패] 부서 및 위치 정보 조회', async () => {
		departmentRepository.findDepartmentAndLocation = jest.fn().mockResolvedValue(null);
		expect(() => service.findDepartmentAndLocation(1)).rejects.toThrowError(new NotFoundException());
	});

	it('[성공] 부서 및 위치 정보 조회', async () => {
		departmentRepository.findDepartmentAndLocation = jest.fn().mockResolvedValue({
			departmentId: 10,
			departmentName: 'Administration',
			managerId: 200,
			locationId: 1700,
			location: { locationId: 1700, streetAddress: '2004 Charade Rd', postalCode: '98199', city: 'Seattle', stateProvince: 'Washington', countryId: 'US' },
		});
		await service.findDepartmentAndLocation(10);
		expect(departmentRepository.findDepartmentAndLocation).toBeCalledTimes(1);
	});
});
