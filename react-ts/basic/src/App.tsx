import {
  type PexipEngagePluginContextProps,
  PexipEngagePluginProvider,
  PexipEngagePlugin,
} from "@pexip-engage-public/plugin-react";

// Replace the placeholder values with your actual enterprise, and remove the `<>` brackets:
export const PLUGIN_SCRIPT_SRC = "<https://{YOUR-ENTERPRISE-NAME}.plugin.skedify.io/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js>";

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
