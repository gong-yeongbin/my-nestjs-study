import { Column, Entity, OneToMany } from 'typeorm';
import { Countries } from './Countries';

@Entity('regions', { schema: 'echonrich' })
export class Regions {
	@Column('int', { primary: true, name: 'region_id', unsigned: true })
	regionId: number;

	@Column('varchar', { name: 'region_name', nullable: true, length: 25 })
	regionName: string | null;

	@OneToMany(() => Countries, (countries) => countries.region)
	countries: Countries[];
}
