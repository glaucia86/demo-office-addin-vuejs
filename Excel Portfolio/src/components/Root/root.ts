/**
 * File: src/components/Root/root.ts
 * Description:
 * Date: 11/20/2018
 * Author: Glaucia Lemos
 */

import Vue from 'vue';
import Component from 'vue-class-component';
import waiting from '../WaitingComponent/waiting.vue';
import headerComponent from '../HeaderComponent/headerComponent.vue';
import stock from '../Stock/stock.vue';

@Component({
    data: function() {
        return {
            symbols: [],
            waiting: false,
            error: "",
            newSymbol: ""
        }
    },
    components: {
        waiting,
        headerComponent,
        stock
    },
    methods: {
        getQuote(symbol:string) {
            console.log(symbol);
        },
        addSymbol(symbol:string) {
            console.log(symbol);
        },
        deleteSymbol(index:number) {
            console.log(index);
        },
        refreshSymbol(index:number) {
            console.log(index);
        },
        syncTable() {
            console.log("sync table")
        }
    },
    mounted: function() {
        (<any>this).syncTable();
    }
})

export default class root extends Vue {
    name: 'root'
}