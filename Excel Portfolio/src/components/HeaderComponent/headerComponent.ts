/**
 * File: src/components/HeaderComponent/headerComponent.ts
 * Description:
 * Date: 11/20/2018
 * Author: Glaucia Lemos
 */

import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
      title: String,
      error: String
  }  
})

export default class headerComponent extends Vue {
    name: 'headerComponent';
    title: String;
    error: String;
}