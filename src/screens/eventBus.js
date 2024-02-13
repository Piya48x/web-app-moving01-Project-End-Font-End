// eventBus.js
const eventBus = new Map();

export function subscribe(event, callback) {
  if (!eventBus.has(event)) {
    eventBus.set(event, []);
  }
  eventBus.get(event).push(callback);
}

export function publish(event, data) {
  if (!eventBus.has(event)) {
    return;
  }
  eventBus.get(event).forEach(callback => callback(data));
}
