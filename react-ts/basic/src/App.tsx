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
      <PexipEngagePlugin />
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
