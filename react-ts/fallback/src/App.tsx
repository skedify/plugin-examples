import {
  type PexipEngagePluginContextProps,
  PexipEngagePluginProvider,
  PexipEngagePlugin,
} from '@pexip-engage-public/plugin-react';
import { scriptSrc } from './pexip-engage-script.ts';

function Playground() {
  return (
    <div>
      <PexipEngagePlugin />
    </div>
  );
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
