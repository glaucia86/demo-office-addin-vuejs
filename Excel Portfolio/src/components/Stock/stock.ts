/**
 * File: src/components/Stock/stock.ts
 * Description:
 * Date: 11/20/2018
 * Author: Glaucia Lemos
 */

import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        symbol: String,
        index: Number
    },
    methods: {
        refreshSymbol(index:Number) {
            this.$emit("refreshSymbol", index);
        },
        deleteSymbol(index:Number) {
            this.$emit("deleteSymbol", index);
        }
    }
})

export default class stock extends Vue {
    name: 'stock';
    symbol: String;
    index: Number;
}