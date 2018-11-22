/**
 * File: src/components/Root/root.ts
 * Description:
 * Date: 11/20/2018
 * Author: Glaucia Lemos
 * My Alphavantage Key: L4OXENFQTVKZLZ2G (c/support/#api-key)
 * More Free apis here: http://alpha.vantage.stack.network/
 */

import Vue from "vue";
import Component from "vue-class-component";
import waiting from "../WaitingComponent/waiting.vue";
import headerComponent from "../HeaderComponent/headerComponent.vue";
import stock from "../Stock/stock.vue";
import { ExcelTableUtil } from "../../utils/ExcelTableUtil";

const ALPHAVANTAGE_APIKEY: string = "{{ L4OXENFQTVKZLZ2G }}";

@Component({
  data: function() {
    return {
      symbols: [],
      waiting: false,
      error: "",
      newSymbol: "",
      tableUtil: new ExcelTableUtil("Portfolio", "A1:H1", [
        "Symbol",
        "Last Price",
        "Timestamp",
        "Quantity",
        "Price Paid",
        "Total Gain",
        "Total Gain %",
        "Value"
      ])
    };
  },
  components: {
    waiting,
    headerComponent,
    stock
  },
  methods: {
    // Essa função irá fazer a chamada do REST API para obter as estatísticas de
    //estoque em tempo real de acordo com um símbolo específico:
    getQuote(symbol: string) {
      return new Promise((resolve, reject) => {
        const queryEndpoint = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${escape(
          symbol
        )}&interval=1min&apikey=${ALPHAVANTAGE_APIKEY}`;

        fetch(queryEndpoint)
          .then((res: any) => {
            if (!res.ok) {
              reject("Error getting quote!");
            }
            return res.json();
          })
          .then((jsonResponse: any) => {
            const quote: any = jsonResponse["Stock Quotes"][0];
            resolve(quote);
          });
      });
    },

    // Método responsável por adicionar um novo 'symbol':
    addSymbol(symbol: string) {
      if ((<KeyboardEvent>event).key == "Enter") {
        (<any>this).waiting = true;
        (<any>this).getQuote(symbol).then(
          (res: any) => {
            let data = [
              res["1. symbol"], // symbol
              res["2. price"], // Last Price
              res["4. timestamp"], // Timestamp of quote
              0,
              0,
              "=(B:B * D*D) - (E:E * D:D)", // Total Gain $
              "=H:H / (E:E * D:D) * 100", // Total Gain %
              "=B:B * D:D" // Value
            ];
            (<any>this).tableUtil.addRow(data).then(
              () => {
                (<any>this).symbols.unshift(symbol);
                (<any>this).waiting = false;
                (<any>this).newSymbol = "";
              },
              err => {
                (<any>this).error = err;
              }
            );
          },
          err => {
            (<any>this).error = err;
            (<any>this).waiting = false;
          }
        );
      }
    },

    deleteSymbol(index: number) {
      // Aqui irá excluir da table do Excel usando o index:
      let symbol = (<any>this).symbols[index];
      (<any>this).waiting = true;
      (<any>this).tableUtil.getColumnData("Symbol").then(
        async (columnData: string[]) => {
          // O 'if' é para ter certeza de que o 'symbol' foi de fato encontrado:
          if (columnData.indexOf(symbol) != -1) {
            (<any>this).tableUtil.deleteRow(columnData.indexOf(symbol)).then(
              async () => {
                (<any>this).symbols.splice(index, 1);
                (<any>this).waiting = false;
              },
              err => {
                (<any>this).error = err;
                (<any>this).waiting = false;
              }
            );
          } else {
            (<any>this).symbols.splice(index, 1);
            (<any>this).waiting = false;
          }
        },
        err => {
          (<any>this).error = err;
          (<any>this).waiting = false;
        }
      );
    },

    refreshSymbol(index: number) {
      // Aqui irá atualizar um 'stock quote' e a tabela do Excel:
      let symbol = (<any>this).symbols[index]; //this.symbols[index];
      (<any>this).waiting = true;
      (<any>this).tableUtil.getColumnData("Symbol").then(
        async (columnData: string[]) => {
          var rowIndex = columnData.indexOf(symbol);
          if (rowIndex != 1) {
            (<any>this).getQuote(symbol).then((res: any) => {
              // 'last trade' está na coluna B com a ....
              (<any>this).tableUtil
                .updateCell(
                  `B${rowIndex + 2}:B${rowIndex + 2}`,
                  res["2. price"]
                )
                .then(
                  async () => {
                    (<any>this).waiting = false;
                  },
                  err => {
                    (<any>this).error = err;
                    (<any>this).waiting = false;
                  }
                );
            });
          } else {
            (<any>this).error = `${symbol} não encontrado no Excel`;
            (<any>this).symbols.splice(index, 1);
            (<any>this).waiting = false;
          }
        },
        err => {
          (<any>this).error = err;
          (<any>this).waiting = false;
        }
      );
    },

    syncTable() {
      (<any>this).waiting = true;
      (<any>this).tableUtil.getColumnData("Symbol").then(async(columnData: string[]) => {
        (<any>this).symbols = columnData;
        (<any>this).waiting = false;
      }, (err) => {
        (<any>this).error = err;
        (<any>this).waiting = false;
      });
    }
  },

  mounted: function() {
    (<any>this).syncTable();
  }
})
export default class root extends Vue {
  name: "root";
}
