import { useState, useEffect } from "react";
import {
  type PexipEngagePluginContextProps,
  type PluginInstance,
  PexipEngagePluginProvider,
  PexipEngagePlugin,
} from "@pexip-engage-public/plugin-react";
import { scriptSrc } from "./pexip-engage-script.ts";
import pluginCss from "./plugin.css?inline";

function Playground() {
  const [instance, setInstance] = useState<PluginInstance | null>(null);

  useEffect(() => {
    instance?.setCustomCSS(pluginCss);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pluginCss, instance]);

  return <PexipEngagePlugin onInstanceChange={setInstance} />;
}

const defaultConfig: PexipEngagePluginContextProps = { scriptSrc };

export default function App() {
  return (
    <PexipEngagePluginProvider value={defaultConfig}>
      {/* All <PexipEngagePlugin /> components will now merge their own passed configuration with the defaultConfig value */}
      <Playground />
    </PexipEngagePluginProvider>
  );
}
