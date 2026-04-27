---
date: 2026-04-27
topic: audio-minio
---

# Audio Recording to MinIO

## What We're Building

Stream both sides of every conversation — user input and bot TTS output — to the Langfuse MinIO instance as per-turn WAV files. Each speech turn becomes a separate object, keyed by `conversation_id` and turn number, so recordings are naturally correlated with Langfuse traces.

```
audio/{conversation_id}/turn-01-user.wav
audio/{conversation_id}/turn-01-bot.wav
audio/{conversation_id}/turn-02-user.wav
...
```

## Why This Approach

Two options were considered:

- **Multipart upload per conversation**: single continuous file per stream, but requires ~2.5 min of audio to buffer before the first flush (S3 minimum part size vs. 32KB/s voice audio). Not truly real-time and adds multipart lifecycle complexity.
- **Per-turn WAV files** *(chosen)*: upload fires at natural turn boundaries (`UserStoppedSpeakingFrame` for user, `TTSStoppedFrame` for bot). Simple S3 PUT per turn, no buffering complexity, and files align 1:1 with Langfuse spans.

## Key Decisions

- **Storage**: Langfuse's existing MinIO instance (`localhost:9090`), `langfuse` bucket, `audio/` prefix — no new infrastructure needed
- **Trigger points**: `UserStoppedSpeakingFrame` ends a user turn; `TTSStoppedFrame` ends a bot turn
- **Format**: WAV (16-bit PCM with header) — portable and playable without extra tooling
- **Implementation**: custom Pipecat `FrameProcessor` inserted into the pipeline after STT (captures user audio) and after TTS (captures bot audio)
- **Correlation**: same `conversation_id` used for both Langfuse traces and MinIO path

## Open Questions

- MinIO credentials (`minio`/`miniosecret`) — add to `.env` or read from docker-compose defaults?
- Sample rate for user input vs. bot output — confirm what Pipecat exposes on `AudioRawFrame`
- Should uploads be fire-and-forget (asyncio task) or awaited before the turn proceeds?
- Turn counter: global sequential (`01`, `02`, ...) or separate per speaker?

## Next Steps

→ `/workflows:plan` for implementation details
