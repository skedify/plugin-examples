import { useState, useEffect } from "react";
import {
  type PexipEngagePluginContextProps,
  type PluginInstance,
  PexipEngagePluginProvider,
  PexipEngagePlugin,
} from "@pexip-engage-public/plugin-react";
import pluginCss from "./plugin.css?inline";

// Fill in your plugin source here, it will be in the following structure:
// https://{YOUR-ENTERPRISE-NAME}.plugin.skedify.io/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js
export const PLUGIN_SCRIPT_SRC = "<YOUR_PLUGIN_SCRIPT_SRC>";

function Playground() {
  const [instance, setInstance] = useState<PluginInstance | null>(null);

  useEffect(() => {
    instance?.setCustomCSS(pluginCss);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pluginCss, instance]);

  return <PexipEngagePlugin onInstanceChange={setInstance} />;
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
