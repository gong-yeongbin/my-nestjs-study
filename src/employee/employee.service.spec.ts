import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
	let service: EmployeeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EmployeeService],
		}).compile();

		service = module.get<EmployeeService>(EmployeeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it.todo('특정 사원의 현재 정보 조회');
	it.todo('특정 사원의 이력 정보 조회');
});
