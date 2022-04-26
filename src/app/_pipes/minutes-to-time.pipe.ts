import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minutesToTime"
})
export class MinutesToTime implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      let hourPart = Math.floor(value / 60);
      let minutePart = Math.floor(value % 60);
      let time = (hourPart > 12 ? (((hourPart - 12) < 10) ? "0" + (hourPart - 12) : hourPart - 12) : hourPart) + ":" + (minutePart < 9 ? "0" + minutePart : minutePart);
      time = (hourPart > 11 ? time + " pm" : time + " am")
      return time;
    }
  }
}
