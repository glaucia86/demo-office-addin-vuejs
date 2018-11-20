<template>
<div>
   <waiting v-if="waiting"></waiting>
   <header-component v-bind:error="error" title="Excel Portfolio"></header-component>
   <div class="padding10">
      <div class="pct100 tbl-head">
         <span class="ms-font-l">Stock Symbols</span>
      </div>
      <div class="pct100">
         <input class="ms-TextField-field"
            v-model="newSymbol"
            v-on:keyup="addSymbol(newSymbol)"
            placeholder="Enter a stock symbol (ex: MSFT)" />
      </div>
      <stock v-for="(symbol, index) in symbols"
         v-bind:key="symbol"
         v-bind:symbol="symbol"
         v-bind:index="index"
         v-on:refreshSymbol="refreshSymbol(index)"
         v-on:deleteSymbol="deleteSymbol(index)">
      </stock>
      <div class="pct100 itemRow" v-if="symbols.length == 0">
         <em class="ms-font-l">No symbols added</em>
      </div>
   </div>
</div>
</template>

<script lang="ts" src="./root.ts" />
<style></style>
