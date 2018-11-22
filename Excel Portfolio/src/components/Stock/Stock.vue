<template>
    <div class="pct100 itemRow">
        <div class="left ms-font-l">{{symbol}}</div>
        <div class="right">
            <div class="left icon"><i class="ms-Icon ms-Icon--Refresh" aria-hidden="true" v-on:click="refreshSymbol(index)"></i></div>
            <div class="left icon"><i class="ms-Icon ms-Icon--Delete" aria-hidden="true" v-on:click="deleteSymbol(index)"></i></div>
        </div>
    </div>
</template>

<script lang="ts" src="./Stock.ts" />

<style />
