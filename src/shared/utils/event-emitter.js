// @flow

import EventEmitter from "events";

const emitter = new EventEmitter();

export function emit(type: string, message: any) {
  return emitter.emit(type, message);
}

export function addListener(type: string, cb: any => mixed) {
  emitter.on(type, cb);
}

export function removeListener(type: string, cb: any => mixed) {
  emitter.removeListener(type, cb);
}
