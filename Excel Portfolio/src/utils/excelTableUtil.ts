/**
 * File: src/utils/excelTableUtil.ts
 * Description: arquivo responsável por lidar como um 'helper' para trabalhar com as
 * tabelas do Microsoft Excel em conjunto com o office.js
 * Date: 11/21/2018
 * Author: Glaucia Lemos
 * Excel API Reference: https://docs.microsoft.com/en-us/javascript/api/overview/office?view=office-js
 */

export class ExcelTableUtil {
  tableName: string;
  location: string;
  headers: string[];

  /**
   * Construtor base inerente a classe: 'ExcelTableUtil':
   */
  constructor(tableName: string, location: string, headers: string[]) {
    this.tableName = tableName;
    this.location = location;
    this.headers = headers;
  }

  //Método responsável por criar 'StockTable' e define a linha do cabeçalho:
  createTable = async () => {
    return new Promise(async (resolve, reject) => {
      await Excel.run(async context => {
        // Aqui criará um objeto proxy para ativar a planilha e enfim criar a tabela:
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const tableRef = sheet.tables.add(this.location, true);
        tableRef.name = this.tableName;
        tableRef.getHeaderRowRange().values = [this.headers];
        return context.sync().then(() => {
          resolve(tableRef);
        });
      }).catch(createError => {
        reject(createError);
      });
    });
  };

  // Método responsável por garantir que a tabela do Excel seja
  //criada obtendo uma determinada referência da tabela:
  ensureTable = async (forceCreate: boolean) => {
    return new Promise(async (resolve, reject) => {
      await Excel.run(async context => {
        // Aqui criará um objeto proxy para ativar a planilha e tentar retornar a referencia da tabela:
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const tableRef = sheet.tables.getItem(this.tableName);
        return context.sync().then(() => {
          resolve(tableRef);
        });
      }).catch(() => {
        if (forceCreate) {
          // Aqui criará uma nova tabela porque uma determinada tabela existente não foi encontrada:
          this.createTable().then(
            async tableRef => {
              resolve(tableRef);
            },
            createError => {
              reject(createError);
            }
          );
        } else {
          resolve(null);
        }
      });
    });
  };

  // Método responsável por acrescentar uma linha à tabela do Excel:
  addRow = async data => {
    return new Promise(async (resolve, reject) => {
      this.ensureTable(true).then(
        async (tableRef: Excel.Table) => {
          await Excel.run(async context => {
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            // Aqui adicionaremos uma nova linha:
            tableRef = sheet.tables.getItem(this.tableName);
            tableRef.rows.add(null, [data]);
            // Aqui iremos verificar se 'autofit' das colunas e linha tem suporte para a API do Office:
            if (Office.context.requirements.isSetSupported("ExcelApi", 1.2)) {
              sheet.getUsedRange().format.autofitColumns();
              sheet.getUsedRange().format.autofitRows();
            }
            sheet.activate();
            return context.sync().then(() => {
              resolve();
            });
          }).catch(err => {
            reject(err);
          });
        },
        err => {
          reject(err);
        }
      );
    });
  };
}
