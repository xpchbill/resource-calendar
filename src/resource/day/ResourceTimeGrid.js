"use strict";

import {TimeGrid} from "../FC.js";
import ResourceGrid from "./ResourceGrid.js";


export default class ResourceTimeGrid extends TimeGrid{

	renderHeadIntroHtml() {
		var view = this.view;
		var weekText;

		if (view.opt('weekNumbers')) {
			weekText = this.start.format(view.opt('smallWeekFormat'));

			return '' +
				'<th class="fc-axis fc-week-number ' + view.widgetHeaderClass + '" ' + view.axisStyleAttr() + '>' +
					'<span>' +
						htmlEscape(weekText) +
					'</span>' +
				'</th>';
		}
		else {
			return '<th class="fc-axis ' + view.widgetHeaderClass + '" ' + view.axisStyleAttr() + '></th>';
		}
	}

	renderBgIntroHtml() {
		return '<td class="fc-axis ' + this.view.widgetContentClass + '" ' + this.view.axisStyleAttr() + '></td>';
	}

	renderIntroHtml() {
		return '<td class="fc-axis" ' + this.view.axisStyleAttr() + '></td>';
	}

	renderFgEvents(events) {
		var calendar, event;
		calendar = this.view.calendar;

		return super.renderFgEvents((function() {
			var i, len, results;
			results = [];
			for (i = 0, len = events.length; i < len; i++) {
				event = events[i];
				if (event['resourceId']) {
					results.push(event);
				}
			}
			return results;
		})());

	}

	spanToSegs(span){
		var copy, genericSegs, i, j, k, len, len1, ref, resourceCnt, resourceIndex, resourceObj, resourceSegs, seg;


		genericSegs = this.sliceRangeByTimes(span);

    resourceCnt = this.getResourcesCount();

    if (!resourceCnt) {
      for (i = 0, len = genericSegs.length; i < len; i++) {
        seg = genericSegs[i];
        seg.col = seg.dayIndex;
      }
      return genericSegs;
    } else {
      resourceSegs = [];
      for (j = 0, len1 = genericSegs.length; j < len1; j++) {
        seg = genericSegs[j];
        for (resourceIndex = k = 0, ref = resourceCnt; k < ref; resourceIndex = k += 1) {
					let resources = this.getResources();
          resourceObj = resources[resourceIndex];
          if (!span.resourceId || span.resourceId === resourceObj.id) {
            copy = $.extend({}, seg);
            copy.col = this.indicesToCol(resourceIndex, seg.dayIndex);
            resourceSegs.push(copy);
          }
        }
      }
      return resourceSegs;
    }
	}

  renderHeadIntroHtml(){
    var view = this.view;
    var weekText;

    if (view.opt('weekNumbers')) {
      weekText = this.start.format(view.opt('smallWeekFormat'));

      return '' +
        '<th class="fc-axis fc-week-number ' + view.widgetHeaderClass + '" ' + view.axisStyleAttr() + '>' +
          '<span>' +
            htmlEscape(weekText) +
          '</span>' +
        '</th>';
    }
    else {
      return '<th class="fc-axis ' + view.widgetHeaderClass + '" ' + view.axisStyleAttr() + '><a href="#">删除</a></th>';
    }
  }

	getHitSpan(hit) {
    var span;
    span = super.getHitSpan(hit);
    if (this.getResourcesCount()) {
      span.resourceId = this.getColResource(hit.col).id;
    }
    return span;
  }

}

Object.assign(ResourceTimeGrid.prototype, ResourceGrid)
