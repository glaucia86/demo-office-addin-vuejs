/**
 * File: src/components/Root/root.ts
 * Description:
 * Date: 11/20/2018
 * Author: Glaucia Lemos
 */

import Vue from "vue";
import Component from "vue-class-component";
import waiting from "../WaitingComponent/waiting.vue";
import headerComponent from "../HeaderComponent/headerComponent.vue";
import stock from "../Stock/stock.vue";

@Component({
  data: function() {
    return {
      symbols: [],
      waiting: false,
      error: "",
      newSymbol: ""
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
        const queryEndpoint = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${escape(symbol)}&interval=1min&apikey=${ALPHAVANTAGE_APIKEY}`;

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

    addSymbol(symbol: string) {
      console.log(symbol);
    },

    deleteSymbol(index: number) {
      console.log(index);
    },

    refreshSymbol(index: number) {
      console.log(index);
    },
    
    syncTable() {
      console.log("sync table");
    }
  },
  mounted: function() {
    (<any>this).syncTable();
  }
})
export default class root extends Vue {
  name: "root";
}
