import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import { CoreService } from './core/core.service';
// import { DatePipe } from '@angular/common';
// import { Workbook } from 'exceljs';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor( ) {
       
   }


  // public exportAsExcelFile(json: any[], excelFileName: string): void {
    
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   console.log('worksheet',worksheet);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['جدول'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  // //   const data: Blob = new Blob([buffer], {
  // //     type: EXCEL_TYPE
  // //   });
  // //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // // }


  // //Project Name : اسم المشروع
  // //Main Section : الفسم الرئيسي
  // //Subsection : القسم الفرعي
  // //Work Type : نوع الأعمال
  // //Item Name : اسم البند
  // //Item Number : رقم البند
  // //Session from : تاريخ البدء
  // //Session to/end : تاريخ الانتهاء
  // //Qunatitiy : الكمية التعاقدية
  // //Unit : الوحدة 
  // //Unit Price : سعر الوحدة 
  // //Total price : السعر الإجمالي
  // generateExcel(data) {
    
  //   //Excel Title, Header, Data
  //   const title = 'جدول الكميات';
  //   const header = ["اسم المشروع", "الفسم الرئيسي", "القسم الفرعي"
  //                   , "نوع الأعمال", "اسم البند", "رقم البند"
  //                   , "تاريخ البدء", "تاريخ الانتهاء", "الكمية التعاقدية"
  //                   , "الوحدة", "سعر الوحدة", "السعر الكلي"]
    
  //   //Create workbook and worksheet
  //   let workbook = new Workbook();
  //   let worksheet = workbook.addWorksheet('جدول الكميات');


  //   //Add Row and formatting
  //   let titleRow = worksheet.addRow([title]);
  //   titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
  //   worksheet.addRow([]);
  //   //let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])


  //   //Add Image
  //   // let logo = workbook.addImage({
  //   //   base64: logoFile.logoBase64,
  //   //   extension: 'png',
  //   // });

  //   // worksheet.addImage(logo, 'E1:F3');
  //   // worksheet.mergeCells('A1:D2');


  //   //Blank Row 
  //   worksheet.addRow([]);

  //   //Add Header Row
  //   let headerRow = worksheet.addRow(header);
    
  //   // Cell Style : Fill and Border
  //   headerRow.eachCell((cell, number) => {
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: 'FFFFFF00' },
  //       bgColor: { argb: 'FF0000FF' }
  //     }
  //     cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  //   })
  //   // worksheet.addRows(data);


  //   // Add Data and Conditional Formatting
  //   data.forEach(d => {
  //     let row = worksheet.addRow(d);
  //     let qty = row.getCell(5);
  //     let color = 'FF99FF99';
  //     if (+qty.value < 500) {
  //       color = 'FF9999'
  //     }

  //     qty.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: color }
  //     }
  //   }

  //   );

  //   worksheet.getColumn(3).width = 30;
  //   worksheet.getColumn(4).width = 30;
  //   worksheet.addRow([]);


  //   //Footer Row
  //   let footerRow = worksheet.addRow(['تم تصديره بواسطة نظام نقرة']);
  //   footerRow.getCell(1).fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: 'FFCCFFE5' }
  //   };
  //   footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

  //   //Merge Cells
  //   worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

  //   //Generate Excel File with given name
  //   workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  //     FileSaver.saveAs(blob,'َجدول الكميات'+ new Date().getTime()+'.xlsx');
  //   })

  // }

}

