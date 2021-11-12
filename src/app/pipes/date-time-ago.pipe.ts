import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeAgo'
})
export class DateTimeAgoPipe implements PipeTransform {

  private _intervals = [
    { divisor: 31536000, unit: "year" },
    { divisor: 2592000, unit: "month" },
    { divisor: 86400, unit: "day" },
    { divisor: 3600, unit: "hour" },
    { divisor: 60, unit: "minute" },
  ]

  transform(dateString: string): string {
    let date = new Date(dateString);
    let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let unit = "second";
    let intervalReturn = Math.floor(seconds);

    for (let i = 0 ; i < this._intervals.length ; i++) {
      const intervalObject = this._intervals[i];
      const interval = seconds / intervalObject.divisor;
      
      if (interval > 1) {
        intervalReturn = Math.floor(interval);
        unit = intervalObject.unit;
        break;
      }
    }

    return `${ intervalReturn } ${ unit }${ intervalReturn > 1 ? "s" : "" } ago`;
  }
}
