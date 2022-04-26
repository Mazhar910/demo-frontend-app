import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public sortListByUpdatedDate(list: any[]): any[] {
    return list.sort((a: any, b: any) => {
      return this.getTime(new Date(b.updatedDate)) - this.getTime(new Date(a.updatedDate));
    });
  }
  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  getDefaultDate() {
    const defaultDate = new Date();
    return defaultDate.toISOString().substring(0, 10);
  }
}
