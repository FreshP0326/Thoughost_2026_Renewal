import { meta as broadcastColumnStartMeta } from "./items/broadcast-column-start/meta";
import { meta as kakusatsuShoujo4OpenCallMeta } from "./items/kakusatsu-shoujo-4-open-call/meta";
import { meta as moonshine001PreviewMeta } from "./items/moonshine-001-preview/meta";
import { meta as siteRefreshArchiveMeta } from "./items/site-refresh-archive/meta";

import type { NewsContentModule } from "./types";

export const newsContentModules: NewsContentModule[] = [
  {
    meta: siteRefreshArchiveMeta,
  },
  {
    meta: kakusatsuShoujo4OpenCallMeta,
  },
  {
    meta: moonshine001PreviewMeta,
  },
  {
    meta: broadcastColumnStartMeta,
  },
];
