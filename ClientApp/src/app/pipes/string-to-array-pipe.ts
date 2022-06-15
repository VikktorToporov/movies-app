import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'stringToArrayPipe' })
export class StringToArrayPipe implements PipeTransform {
	transform(string: string | undefined, separator = '/'): any {
		if(string && separator) {
			return string.split(separator);
		}

		return [];
	}
}
