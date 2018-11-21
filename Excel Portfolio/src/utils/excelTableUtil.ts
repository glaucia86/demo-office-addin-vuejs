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
    createTable = async() => {
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
    }

    // Método responsável por garantir que a tabela do Excel seja 
    //criada obtendo uma determinada referência da tabela: 
    ensureTable = async(forceCreate: boolean) => {
        return new Promise(async(resolve, reject) => {
            await Excel.run(async context => {
                // Aqui criará um objeto proxy para ativar a planilha e tentar retornar a referencia da tabela:
                const sheet = context.workbook.worksheets.getActiveWorksheet();
                const tableRef = sheet.tables.getItem(this.tableName);
                return context.sync().then(() => {
                    resolve(tableRef);
                });
            }).catch(() => {
                if(forceCreate) {
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
    }
}
