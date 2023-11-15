import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentsEntity } from './departments.entity';
import { CountriesEntity } from './countries.entity';

@Index('country_id', ['countryId'], {})
@Entity('locations', { schema: 'echonrich' })
export class LocationsEntity {
	@PrimaryGeneratedColumn({ type: 'int', name: 'location_id', unsigned: true })
	locationId: number;

	@Column('varchar', { name: 'street_address', nullable: true, length: 40 })
	streetAddress: string | null;

	@Column('varchar', { name: 'postal_code', nullable: true, length: 12 })
	postalCode: string | null;

	@Column('varchar', { name: 'city', length: 30 })
	city: string;

	@Column('varchar', { name: 'state_province', nullable: true, length: 25 })
	stateProvince: string | null;

	@Column('char', { name: 'country_id', length: 2 })
	countryId: string;

	@OneToMany(() => DepartmentsEntity, (departments) => departments.location)
	departments: DepartmentsEntity[];

	@ManyToOne(() => CountriesEntity, (countries) => countries.locations, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'country_id', referencedColumnName: 'countryId' }])
	country: CountriesEntity;
}
