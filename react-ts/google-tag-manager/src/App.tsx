import { useEffect, useState } from 'react';
import {
  PexipEngagePluginContextProps,
  PexipEngagePluginProvider,
  PexipEngagePlugin,
  PluginInstance,
} from '@pexip-engage-public/plugin-react';

// Replace the placeholder values with your actual enterprise, and remove the `<>` brackets:
export const PLUGIN_SCRIPT_SRC = "<https://{YOUR-ENTERPRISE-NAME}.plugin.skedify.io/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js>";


declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function Playground() {
  const [instance, setInstance] = useState<PluginInstance | null>(null);

  useEffect(() => {
    instance?.addEventListener((event) => {
      console.log({ event });
      switch (event.detail.type) {
        case 'STEP_SHOWN': {
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
          const { step, ...currentSelection } = event.detail.payload;

          window.dataLayer.push({
            event: event.detail.type,
            activeStep: step,
            currentSelection,
          });
          break;
        }
        default: {
          window.dataLayer.push({ event: event.detail.type });
        }
      }
    });
  }, [instance]);

  return (
    <div>
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
