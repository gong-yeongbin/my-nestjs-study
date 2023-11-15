import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RegionsEntity } from './regions.entity';
import { LocationsEntity } from './locations.entity';

@Index('region_id', ['regionId'], {})
@Entity('countries', { schema: 'echonrich' })
export class CountriesEntity {
	@Column('char', { primary: true, name: 'country_id', length: 2 })
	countryId: string;

	@Column('varchar', { name: 'country_name', nullable: true, length: 40 })
	countryName: string | null;

	@Column('int', { name: 'region_id', unsigned: true })
	regionId: number;

	@ManyToOne(() => RegionsEntity, (regions) => regions.countries, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'region_id', referencedColumnName: 'regionId' }])
	region: RegionsEntity;

	@OneToMany(() => LocationsEntity, (locations) => locations.country)
	locations: LocationsEntity[];
}
