import { Pipe, PipeTransform } from "@angular/core";
import { Months } from "src/constants/constants";

@Pipe({
  name: "numberToMonth"
})
export class NumberToMonth implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return Object.values(Months)[value];
  }
}
