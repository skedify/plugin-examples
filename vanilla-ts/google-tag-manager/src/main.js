import './style.css';

// helper functions to easily get the global/instance of a PexipEngage Plugin.
function getGlobal() {
  return window.PexipEngage && window.PexipEngage.Plugin;
}

async function getInstance() {
  const Plugin = getGlobal();

  if (Plugin) {
    return Plugin.awaitFirstInstance();
  } else {
    return new Promise((resolve) => {
      document.addEventListener(
        'SkedifyPluginEvent',
        () => resolve(getGlobal().awaitFirstInstance()),
        { once: true }
      );
    });
  }
}

// The main logic of our tracking application.
async function init() {
  const instance = await getInstance();
  const Plugin = getGlobal();

  // We use the global constant definition to map to our own identifiers for GTM, as the global constants of Plugin.X are not guaranteed to stay the same.
  const EVENT_TYPES = {
    [Plugin.EVENT_LOADED]: 'plugin-loaded',
    [Plugin.EVENT_APPOINTMENT_CREATED]: 'appointment-created',
    [Plugin.EVENT_APPOINTMENT_EDITED]: 'appointment-edited',
    [Plugin.EVENT_APPOINTMENT_CANCELLED]: 'appointment-cancelled',
    [Plugin.EVENT_APPOINTMENT_COMPLETED]: 'appointment-completed',
    [Plugin.EVENT_INVITE_ACCEPTED]: 'invite-accepted',
    /**
     * This event has an additional payload, it can be used to track user progress.
      interface StepShownPayload {
        step: "office" | "timetable" | "customer" | "questions" | "subject" | "employee" | "meeting-type";
        employee?: { id: string; firstName: string | null; lastName: string | null };
        meetingType?: "video" | "phone" | "on_location" | "office";
        office?: { id: string; title: string };
        subject?: { id: string; title: string };
      }
     */
    [Plugin.EVENT_STEP_SHOWN]: 'user-progress',
  };

  function parsePexipEngageEventToGTMEvent(detail) {
    /**
     * Check if the received event is one we wish to track.
     * To ignore certain events, simply remove them from the EVENT_TYPES object.
     */
    if (detail.type in EVENT_TYPES) {
      // Get the GTM_KEY we wish to use in our own tracking.
      const GTM_KEY = EVENT_TYPES[detail.type];

      if (GTM_KEY !== 'user-progress') return { event: GTM_KEY };

      /**
       * For the user-progress event, we receive additional information we also want to track in GTM, so we enrich that specific event.
       */
      const { step, ...currentSelection } = detail.payload;

      return { event: GTM_KEY, activeStep: step, currentSelection };
    } else {
      // In this example, we add this warning here for clarity, to see which events we're ignoring.
      console.warn('Ignoring event: ', detail);

      return null;
    }
  }

  instance.addEventListener((event) => {
    const gtmEvent = parsePexipEngageEventToGTMEvent(event.detail);

    // Push our parsed events onto the dataLayer variable, if they're not `null`
    gtmEvent && window.dataLayer.push(gtmEvent);
  });
}

init();
