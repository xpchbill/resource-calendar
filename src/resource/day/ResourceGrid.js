"use strict";

import {Grid, DayTableMixin, htmlEscape} from "../FC.js";

export default {

	/**
	 * Render resources by call DayTableMixin.updateDayTableCols.
	 * @return {[type]} [description]
	 */
	renderResources(){
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
	 * Add resource id for the span(Moment)
	 * @param  {Class} span  Instance of Moment.
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
  getColResource(col) {
		let resources = this.getResources();
    return resources[this.getColResourceIndex(col)];
  },

	/**
	 * Get column number by resource's index.
	 * {this.colCnt} is from DayTableMixin.
	 * @param  {Number} col
	 * @return {Number}
	 */
  getColResourceIndex(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return Math.floor(col / this.daysPerRow);
  },

  indicesToCol(resourceIndex, dayIndex) {
    var col;
    col = resourceIndex * this.daysPerRow + dayIndex;
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return col;
  },

  getColDayIndex(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return col % this.daysPerRow;
  },

  computeColCnt() {
		let rsCount = this.getResourcesCount();
    return (rsCount || 1) * this.daysPerRow;
  },

  renderHeadDateCellsHtml(repeat, colspan) {
    var date, dayIndex, htmls, i, j, k, ref, ref1;

    htmls = [];

    return htmls.join('');
  },

  computeSelectionSpan(startSpan, endSpan) {
    var selectionSpan;
    if (!this.allowCrossResource && startSpan.resourceId !== endSpan.resourceId) {
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
   * @return {String}
   */
  renderHeadTrHtml() {
		let rsCount = this.getResourcesCount();
    if (!rsCount) {
      return DayTableMixin.renderHeadTrHtml.call(this);
    } else {
      if (this.daysPerRow > 1) {
        return this.renderHeadResourceTrHtml(1, this.daysPerRow) + this.renderHeadDateTrHtml(rsCount);
      } else {
        return this.renderHeadResourceTrHtml();
      }
    }
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
