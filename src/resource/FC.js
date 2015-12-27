"use strict";

/* Hold modules of fullCalendar as es6 modules */

/* Business modules */
export let FC = $.fullCalendar;

export let Emitter = FC.Emitter;

export let Calendar = FC.Calendar;

export let Grid = FC.Grid;

export let DayGrid = FC.DayGrid;

export let TimeGrid = FC.TimeGrid;

export let DayTableMixin = FC.DayTableMixin;

export let View = FC.View;

export let views = FC.views;

export let AgendaView = FC.AgendaView;

/* util modules */
export let htmlEscape = FC.htmlEscape;

// export function htmlUnEscape(str) {
//   var ele = document.createElement('span');
//   ele.innerHTML = str;
//   return ele.childNodes.length === 0 ? "" : ele.childNodes[0].nodeValue;
// };
