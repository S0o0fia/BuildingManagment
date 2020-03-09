import { NativeDateAdapter } from "@angular/material";
import { MatDateFormats } from "@angular/material/core";
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === "input") {
      let day: string = date.getDate().toString();
      day = +day < 10 ? "0" + day : day;
      // let month = date.toLocaleString('default', { month: 'short' });
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? "0" + month : month;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
      console.log(`${day}-${month}-${year}`);
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: "numeric", year: "numeric", day: "numeric" },
  },

  display: {
      // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "short" },
    dateA11yLabel: { year: "numeric", month: "short", day: "numeric"},
    monthYearA11yLabel: { year: "numeric", month: "short" },
  }
};

// const MY_DATE_FORMATS = {
//     parse: {
//         dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
//     },
//     display: {
//         // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
//         dateInput: 'input',
//         monthYearLabel: {year: 'numeric', month: 'short'},
//         dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//         monthYearA11yLabel: {year: 'numeric', month: 'long'},
//     }
//  };