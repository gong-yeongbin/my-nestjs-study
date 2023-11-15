import { Column, Entity, OneToMany } from 'typeorm';
import { CountriesEntity } from './countries.entity';

@Entity('regions', { schema: 'echonrich' })
export class RegionsEntity {
	@Column('int', { primary: true, name: 'region_id', unsigned: true })
	regionId: number;

	@Column('varchar', { name: 'region_name', nullable: true, length: 25 })
	regionName: string | null;

	@OneToMany(() => CountriesEntity, (countries) => countries.region)
	countries: CountriesEntity[];
}
