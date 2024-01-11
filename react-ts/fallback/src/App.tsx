import {
  type PexipEngagePluginContextProps,
  PexipEngagePluginProvider,
  PexipEngagePlugin,
} from "@pexip-engage-public/plugin-react";

// Fill in your plugin source here, it will be in the following structure:
// https://{YOUR-ENTERPRISE-NAME}.plugin.skedify.io/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js
export const PLUGIN_SCRIPT_SRC = "<YOUR_PLUGIN_SCRIPT_SRC>";

function Playground() {
  return (
    <div>
      <PexipEngagePlugin
        // This will override the url above, making it fail on purpose.
        scriptSrc="http://failing-plugin-url"
        fallback={
          <p className="enterprise-fallback">
            Unfortunately something went wrong with the booking module. Try again in a couple of
            minutes or contacts us through <a href="mailto:contact@example.com">e-mail</a> or by
            phone <a href="tel:0032800000000">0800 00 00 00</a>.
          </p>
        }
      />
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
