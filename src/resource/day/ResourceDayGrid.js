"use strict";

import {DayGrid, htmlEscape} from "../FC.js";
import ResourceGridMixin from "../common/ResourceGridMixin.js";

export default class ResourceDayGrid extends DayGrid {

  constructor(view) {
    super(view);
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
    if (this.getResourcesCount()) {
      span.resourceId = this.getResourceByCol(hit.col).id;
    }
    return span;
  }
}

Object.assign(ResourceDayGrid.prototype, ResourceGridMixin);
