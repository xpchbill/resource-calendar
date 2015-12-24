"use strict";

import {
  DayGrid, htmlEscape
}
from "../FC.js";
import ResourceGrid from "./ResourceGrid.js";

export default class ResourceDayGrid extends DayGrid {

  constructor(view) {
    super(view);
    this.resourceCnt = 0;
  }

  /**
   * Render time scale HTML.
   * @override
   * @return {String}
   */
  renderBgIntroHtml() {
    var view = this.view;

    return '' +
      '<td class="fc-axis ' + view.widgetContentClass + '" ' + view.axisStyleAttr() + '>' +
      '<span>' + // needed for matchCellWidths
      (view.opt('allDayHtml') || htmlEscape(view.opt('allDayText'))) +
      '</span>' +
      '</td>';
  }

  /**
   * Render
   * @return {String}
   */
  renderIntroHtml() {
    return '<td class="fc-axis" ' + this.view.axisStyleAttr() + '></td>';
  }

  getHitSpan(hit) {
    var span;
    span = super.getHitSpan(hit);
    if (this.resourceCnt) {
      span.resourceId = this.getColResource(hit.col).id;
    }
    return span;
  }
}

Object.assign(ResourceDayGrid.prototype, ResourceGrid);
