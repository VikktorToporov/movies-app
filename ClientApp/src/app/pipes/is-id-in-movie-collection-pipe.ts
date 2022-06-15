import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'isIdInMovieCollection' })
export class IsIdInMovieCollectionPipe implements PipeTransform {
	transform(id: string, collection: any[]): boolean {
		if(id && collection && collection.length > 0) {
			const match = collection.find((item) => item && item.medialistId === id);

			if (match) {
				return true;
			}
		}

		return false;
	}
}
