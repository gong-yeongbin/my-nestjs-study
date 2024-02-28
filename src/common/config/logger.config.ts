import { utilities, WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

export const logger = WinstonModule.createLogger({
	transports: [
		new transports.Console({
			level: 'silly',
			format: format.combine(
				format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
				format.ms(),
				utilities.format.nestLike('NestStudyApp', { colors: true, prettyPrint: true })
			),
		}),
	],
});
