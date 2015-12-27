"use strict";

import {Emitter} from "../FC.js";

export default class ResourceManager extends Emitter{
  constructor(calendar) {
    super(calendar);
    this.calendar = calendar;
    this._reset();
  }

  fetch() {
    let fetchingStatus = this.fetchingStatus;

    fetchingStatus.start();
    setTimeout(() => {
      this.setResources(this.calendar.options['resources'] || []);
      fetchingStatus.end(this.getResources());
    }, 500);

  }

  reFetch() {
    this._reset();
    this.fetch();
  }

  getResourceById(id) {
    return this.resourcesMap[id];
  }

  getResources() {
    return this.resources;
  }

  setResources(resources) {
    //this._reset();
    resources.forEach((rsc) => {
      var _rsc = this.createResource(Object.assign({}, rsc));
      this.resources.push(_rsc);
    });
    return this.resources;
  }

  createResource(resource) {
    resource.id = resource.id ? resource.id : '';
    this.resourcesMap[resource.id] = resource;
    return resource;
  }

  addResource(resource) {
    var _rsc = this.createResource(resource);
    this.resources.push(_rsc);
    this.trigger('add', _rsc);
  }

  removeResource(resource) {
    this.trigger('remove', _rsc);
  }

  getEventResourceId(event) {
    return String(event[this.getEventResourceField()] || '');
  }

  _reset() {
    this.resources = [];
    this.resourcesMap = {};
    this.fetchingStatus = new FetchingStatus();
  }
}

class FetchingStatus {

  constructor(){
    this.defer = Promise.defer();
    this.promise = this.defer.promise;
    this.doing = false;
    this.done = false;
  }

  start(){
    this.doing = true;
  }

  end(resources){
    this.doning = false;
    this.done = true;
    this.defer.resolve(resources);
  }

}
