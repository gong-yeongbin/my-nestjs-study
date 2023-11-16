export interface IOpendata {
	getUltraSrtNcst(opendataUltrasrcncstGetEntity: { page_no: number; num_of_rows: number; base_date: string; base_time: string; nx: number; ny: number });
}
