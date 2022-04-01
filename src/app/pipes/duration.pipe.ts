import { Pipe, PipeTransform } from '@angular/core';
import {min} from "rxjs";

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
	constructor() {
	}

	transform(value: number): string {
	let duration = value < 10 ? '0' + value.toString() : value.toString();
    if (value > 59) {
      const minutes = Math.floor(value / 60);
      let minutesStr = minutes.toString();
      if (minutes < 10) {
        minutesStr = '0'+minutesStr;
      }
      const seconds = value % 60;
      let secondsStr = seconds.toString();
      if (seconds < 10) {
        secondsStr = '0' + seconds;
      }
      duration = minutesStr + ':' + secondsStr;
    } else {
      duration = '00:' + duration;
    }
    return duration.toString();
  }
}
