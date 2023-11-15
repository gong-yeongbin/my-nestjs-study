import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Regions } from './Regions';
import { Locations } from './Locations';

@Index('region_id', ['regionId'], {})
@Entity('countries', { schema: 'echonrich' })
export class Countries {
	@Column('char', { primary: true, name: 'country_id', length: 2 })
	countryId: string;

	@Column('varchar', { name: 'country_name', nullable: true, length: 40 })
	countryName: string | null;

	@Column('int', { name: 'region_id', unsigned: true })
	regionId: number;

	@ManyToOne(() => Regions, (regions) => regions.countries, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'region_id', referencedColumnName: 'regionId' }])
	region: Regions;

	@OneToMany(() => Locations, (locations) => locations.country)
	locations: Locations[];
}
