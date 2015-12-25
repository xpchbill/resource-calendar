"use strict";

import {Grid, DayTableMixin, htmlEscape} from "../FC.js";
import ResTrHTML from "./ResTrHTML.hbs";

/* Extract common methods between ResourceDayGrid and ResourceTimeGrid */
export default {
  /**
   * Render resources by call DayTableMixin.updateDayTableCols.
   * For rendering Grid columns by resources.
   * Call it after fetch resources.
   */
  renderResources() {
    DayTableMixin.updateDayTableCols.call(this);
  },

  /**
   * Get resources.
   * @return {Array} resources
   */
  getResources() {
    let calendar = this.view.calendar;
    return calendar.getResources();
  },

  /**
   * Get resources count.
   * @return {Number}
   */
  getResourcesCount() {
    let resources = this.getResources();
    return resources.length;
  },

  /**
   * Add resource id to the span(Moment).
   * @override Grid.events.js
   * @param  {Moment} span  Instance of Moment
   * @param  {Object} event
   * @return {Class}
   */
  transformEventSpan(span, event) {
    return span.resourceId = event['resourceId'];
  },

  /**
   * Get resource by column number.
   * @param  {Number} col
   * @return {Object} resource
   */
  getResourceByCol(col) {
    let resources = this.getResources();
    return resources[this.getResourceIndexByCol(col)];
  },

  /**
   * Get resource index by col and daysPerRow(duration configuration).
   * {this.colCnt} is from DayTableMixin.
   * @param  {Number} col
   * @return {Number}
   */
  getResourceIndexByCol(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return Math.floor(col / this.daysPerRow);
  },

  /**
   * Get grid column num by resource index and day index.
   * @param  {Number} resourceIndex
   * @param  {Number} dayIndex
   * @return {Number}
   */
  getColByRsAndDayIndex(resourceIndex, dayIndex) {
    var col;
    col = resourceIndex * this.daysPerRow + dayIndex;
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return col;
  },

  /**
   * get day index by grid column num.
   * @param  {Number} col
   * @return {Number}
   */
  getDayIndexByCol(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return col % this.daysPerRow;
  },

  /**
   * @override DayTableMixin.getColDayIndex.
   * @param  {Number} col
   * @return {Number}
   */
  getColDayIndex(col) {
    return this.getDayIndexByCol(col);
  },

  /**
   * Compute actual rendered grid column count by rousources
   * and daysPerRow(duration configuration).
   * @override DayTableMixin.computeColCnt
   * @return {Number}
   */
  getResourcesColCount(){
    let rsCount = this.getResourcesCount();
    return (rsCount || 1) * this.daysPerRow;
  },

  /**
   * Compute actual rendered grid column count.
   * @override DayTableMixin.computeColCnt
   * @return {Number}
   */
  computeColCnt() {
    return this.getResourcesColCount();
  },

  /**
   * Compute the allowed selection span on grid.
   * Don't allow selecting span accross resources.
   * @override Grid.prototype.computeSelectionSpan
   * @param  {Object} startSpan
   * @param  {Object} endSpan
   * @return {Object}
   */
  computeSelectionSpan(startSpan, endSpan) {
    var selectionSpan;
    if (startSpan.resourceId !== endSpan.resourceId) {
      return;
    }
    selectionSpan = Grid.prototype.computeSelectionSpan.apply(this, arguments);
    if (selectionSpan) {
      selectionSpan.resourceId = startSpan.resourceId;
    }
    return selectionSpan;
  },

  /**
   * Render the header parts.
   * If resources count over one, call renderHeadTrHtmlByResources method.
   * @override DayTableMixin.renderHeadTrHtml
   * @return {String}
   */
  renderHeadTrHtml() {
    let rsCount = this.getResourcesCount();
    return !rsCount ? DayTableMixin.renderHeadTrHtml.call(this) : this.renderHeadTrHtmlByResources();
  },

  /**
   * Render header by resources.
   * @return {String} HTML string
   */
  renderHeadTrHtmlByResources() {

    this.getResourcesHeadTrHtml();

    let rsCount = this.getResourcesCount();
    return this.daysPerRow > 1 ?
      this.renderHeadResourceTrHtml(1, this.daysPerRow) + this.renderHeadDateTrHtml(rsCount) :
      this.renderHeadResourceTrHtml();
  },

  getResourcesHeadTrHtml() {
    console.log(ResTrHTML({
      title: 324242,
      body: "sssssssssssssss"
    }));
  },

  getDatesHeadTrHtml() {

  },

  renderHeadDateTrHtml(repeat, colspan) {
    return '<tr>' + (this.isRTL ? '' : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml(repeat, colspan) + (this.isRTL ? this.renderHeadIntroHtml() : '') + '</tr>';
  },

  renderHeadDateCellsHtml(repeat, colspan) {
    var date, dayIndex, htmls, i, j, k, ref, ref1;
    if (repeat == null) {
      repeat = 1;
    }
    if (colspan == null) {
      colspan = 1;
    }
    htmls = [];
    for (i = j = 0, ref = repeat; j < ref; i = j += 1) {
      for (dayIndex = k = 0, ref1 = this.daysPerRow; k < ref1; dayIndex = k += 1) {
        date = this.dayDates[dayIndex].clone();
        htmls.push(this.renderHeadDateCellHtml(date, colspan));
      }
    }
    if (this.isRTL) {
      htmls.reverse();
    }
    return htmls.join('');
  },

  renderHeadResourceTrHtml(repeat, colspan) {
    return '<tr>' + (this.isRTL ? '' : this.renderHeadIntroHtml()) + this.renderHeadResourceCellsHtml(repeat, colspan) + (this.isRTL ? this.renderHeadIntroHtml() : '') + '</tr>';
  },

  renderHeadResourceCellsHtml(repeat, colspan) {
    var htmls, i, j, k, len, ref, ref1, resource;
    if (repeat == null) {
      repeat = 1;
    }
    if (colspan == null) {
      colspan = 1;
    }
    htmls = [];
    for (i = j = 0, ref = repeat; j < ref; i = j += 1) {
      ref1 = this.getResources();
      for (k = 0, len = ref1.length; k < len; k++) {
        resource = ref1[k];
        htmls.push(this.renderHeadResourceCellHtml(resource, colspan));
      }
    }
    if (this.isRTL) {
      htmls.reverse();
    }
    return htmls.join('');
  },

  renderHeadResourceCellHtml(resource, colspan) {
    if (colspan == null) {
      colspan = 1;
    }
    return '<th class="fc-resource-cell"' + (colspan > 1 ? ' colspan="' + colspan + '"' : '') + '>' + htmlEscape(resource.title) + '</th>';
  }
}
