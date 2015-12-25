"use strict";

import {AgendaView} from "../FC.js";

export default class ResourceView extends AgendaView{
  constructor(...args) {
    super(...args);
    this.rsManager = this.calendar.rsManager;
  }

  displayView(date) {
    let dfd = $.Deferred();
    super.displayView(date);

    let fetchingStatus = this.rsManager.fetchingStatus;
    if (!fetchingStatus.done && !fetchingStatus.doing) {
      fetchingStatus.promise.then(() => {
        this.renderResources();
        this.redisplay();
        dfd.resolve();
      });
      this.rsManager.fetch();
    }

    if (fetchingStatus.done) {
      this.renderResources();
      super.displayView(date);
      dfd.resolve();
    }

    return dfd;
  }

  displayEvents(events) {
    let fetchingStatus = this.rsManager.fetchingStatus;
    fetchingStatus.promise.then(() => {
      super.displayEvents(events);
    });
  }

  triggerSelect(span, ev) {
    return this.trigger(
      'select',
      null,
      this.calendar.applyTimezone(span.start),
      this.calendar.applyTimezone(span.end),
      ev,
      this, this.rsManager.getResourceById(span.resourceId)
    );
  }
}
