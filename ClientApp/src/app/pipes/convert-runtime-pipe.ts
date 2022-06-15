import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'convertRuntimePipe' })
export class ConvertRuntimePipe implements PipeTransform {
	transform(time: number | undefined): string {
		if(time && time > 0) {
			const h = Math.floor(time / 60);
			const m = time % 60;

			return `${h} h ${m} m`;
		}

		return '';
	}
}
