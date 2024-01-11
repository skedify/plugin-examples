/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  PexipEngagePluginContextProps,
  PexipEngagePluginProvider,
  PexipEngagePlugin,
  PEXIP_ENGAGE_PLUGIN_EVENT,
  type PluginInstance,
} from "@pexip-engage-public/plugin-react";

// Fill in your plugin source here, it will be in the following structure:
// https://{YOUR-ENTERPRISE-NAME}.plugin.skedify.io/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js
export const PLUGIN_SCRIPT_SRC = "<YOUR_PLUGIN_SCRIPT_SRC>";

function Playground() {
  const [events, setEvents] = useState<string[]>([]);
  const [instance, setInstance] = useState<PluginInstance | null>(null);

  // Global events
  useEffect(() => {
    function listener(event: Event) {
      console.log(event);

      if (event instanceof CustomEvent) {
        const { instance, ...detail } = event.detail;
        const code = JSON.stringify({ timeStamp: event.timeStamp, detail, source: "global" });

        if (event.detail.type === window.PexipEngage?.Plugin.EVENT_CREATION) {
          // New plugin instance, clear events from previous instances
          setEvents([code]);
        } else {
          setEvents((events) => [...events, code]);
        }
      }
    }

    document.addEventListener(PEXIP_ENGAGE_PLUGIN_EVENT, listener);

    return () => document.removeEventListener(PEXIP_ENGAGE_PLUGIN_EVENT, listener);
  }, []);

  // Instance events
  useEffect(() => {
    instance?.addEventListener((event) => {
      const { instance, ...detail } = event.detail;
      const code = JSON.stringify({ timeStamp: event.timeStamp, detail, source: "instance" });

      setEvents((events) => [...events, code]);
    });
  }, [instance]);

  return (
    <div>
      <p>Events:</p>
      {events.map((event) => (
        <code key={event}>{event}</code>
      ))}
      <PexipEngagePlugin onInstanceChange={setInstance} />
    </div>
  );
}

const defaultConfig: PexipEngagePluginContextProps = { scriptSrc: PLUGIN_SCRIPT_SRC };

export default function App() {
  return (
    <PexipEngagePluginProvider value={defaultConfig}>
      {/* All <PexipEngagePlugin /> components will now merge their own passed configuration with the defaultConfig value */}
      <Playground />
    </PexipEngagePluginProvider>
  );
}
