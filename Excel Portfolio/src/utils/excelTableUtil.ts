/**
 * File: src/utils/excelTableUtil.ts
 * Description: arquivo responsável por lidar como um 'helper' para trabalhar com as
 * tabelas do Microsoft Excel em conjunto com o office.js
 * Date: 11/21/2018
 * Author: Glaucia Lemos
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
}

