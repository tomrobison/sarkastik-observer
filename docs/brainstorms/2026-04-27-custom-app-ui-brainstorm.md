---
date: 2026-04-27
topic: custom-app-ui
---

# Custom App UI (Replace ConsoleTemplate)

## What We're Building

Replace the self-contained `ConsoleTemplate` with `PipecatAppBase` as the provider root. Inside it, `usePipecatConnectionState` drives a two-screen experience:

- **Disconnected → Landing screen**: Pipecat logo + `ConnectButton`
- **Connected → Custom app UI**: composed from lower-level kit primitives (`VoiceVisualizer`, `ConversationPanel`, `UserAudioControl`, `BotAudioPanel`, etc.)

The connecting/transitional states (`connecting`, `authenticating`, etc.) remain on the landing screen — `ConnectButton` handles its own loading state automatically based on transport state.

## Why This Approach

`ConsoleTemplate` is self-contained and blocks any child access to connection state. `PipecatAppBase` exposes the same providers (`PipecatClientProvider` + `ConversationProvider`) but lets us own the rendering. This is the right foundation for a customized app.

## Key Decisions

- `PipecatAppBase` replaces `ConsoleTemplate` — same `startBotParams`, `transportType`, `transportOptions`
- `usePipecatConnectionState` drives the landing ↔ app switch (`isDisconnected` → landing, `isConnected` → app UI)
- Landing screen: Pipecat logo + `ConnectButton` (centered, full-screen)
- `handleConnect` sourced from `PipecatBaseChildProps` (render prop) — passed down to the landing screen
- Initial custom app UI: minimal — waveform + mic control + conversation panel; expandable from there

## Next Steps

→ `/workflows:plan` for implementation details
