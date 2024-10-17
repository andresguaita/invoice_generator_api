import * as XLSX from 'xlsx';
import { CreateInvoiceDTO } from '../../interfaces/dtos/InvoiceDTO';


export class ExcelParser {
  public static parse(file: Buffer): CreateInvoiceDTO[] {
    const workbook = XLSX.read(file, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const invoices: CreateInvoiceDTO[] = [];


    rows.forEach((row: any) => {
      if (!row.clientId || !row.amount || !row.productIds) {
        throw new Error('The excel file does not contain the necessary keys to create an invoice.');
      }

      const invoiceDTO: CreateInvoiceDTO = {
        clientId: row.clientId,
        amount: row.amount,
        productIds:  typeof row.productIds === 'number'? [row.productIds] : row.productIds.split(',').map((id: string) => parseInt(id, 10))
      };

      invoices.push(invoiceDTO);
    });

    return invoices;
  }
}
