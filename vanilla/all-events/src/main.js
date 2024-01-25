import './style.css';

let events = [];

console.log('Setting up listeners..');
document.addEventListener('PexipEngagePluginEvent', documentEventListener);

function documentEventListener(documentEvent) {
  // once this listener is called, we can assume the global to filter events.
  // These will be global events, like creation of the Plugin global, creation of an instance, ...
  addEvent(documentEvent);

  if (documentEvent.detail.type === window.PexipEngage.Plugin.EVENT_LOADED) {
    // EVENT_LOADED -> A new plugin instance is available for usage.
    documentEvent.detail.instance.addEventListener(instanceEventListener);
  }
}

function instanceEventListener(instanceEvent) {
  addEvent(instanceEvent);

  if (
    instanceEvent.detail.type ===
    window.PexipEngage.Plugin.EVENT_APPOINTMENT_CREATED
  ) {
    events.push(
      JSON.stringify({
        appointment: window.PexipEngage.Plugin.appointment,
        meta: window.PexipEngage.Plugin.appointment.meta.getAll(),
        customer: window.PexipEngage.Plugin.customer,
      })
    );

    render();
  }
}

function addEvent(event) {
  console.log(event);

  const { instance, ...detail } = event.detail;
  const code = JSON.stringify({ timeStamp: event.timeStamp, detail });

  events.push(code);
  render();
}

const app = document.querySelector('#app');

function render() {
  const eventsEl = document.createElement('div');
  eventsEl.style = 'display:grid;';

  app.innerHTML = '';
  app.appendChild(eventsEl);

  events.forEach((event) => {
    const element = document.createElement('code');
    element.innerText = event;
    eventsEl.appendChild(element);
  });
}
