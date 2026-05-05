import {
  ConsoleTemplate,
  FullScreenContainer,
  ThemeProvider,
} from "@pipecat-ai/voice-ui-kit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//@ts-ignore - fontsource-variable/geist is not typed
import "@fontsource-variable/geist";
//@ts-ignore - fontsource-variable/geist is not typed
import "@fontsource-variable/geist-mono";

createRoot(document.getElementById("root")!).render(
  // @ts-ignore
  <StrictMode>
    <ThemeProvider>
      <FullScreenContainer>
        <ConsoleTemplate
          logoComponent={<img src="/labette-logo.svg" alt="Labette" width={150} height={150} />}
          titleText="Coach Lasso Tom 1:1"
          startBotParams={{
            endpoint: "/start",
            requestData: {
              createDailyRoom: true,
              transport: "daily",
            },
          }}

          collapseInfoPanel={true}
          noBotAudio={true}
          noBotVideo={true}
          noMetrics={true}
          noScreenControl={true}
          noUserVideo={true}
          noSessionInfo={true}
          noStatusInfo={true}
          noThemeSwitch={true}
          transportType="daily"
        />
      </FullScreenContainer>
    </ThemeProvider>
  </StrictMode>
);
