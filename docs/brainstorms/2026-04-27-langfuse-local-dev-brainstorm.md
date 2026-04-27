---
date: 2026-04-27
topic: langfuse-local-dev
---

# Langfuse Local Development Observability

## What We're Building

A local Langfuse instance (Docker Compose) integrated with the Pipecat quickstart bot to provide full pipeline observability during development — covering STT (Deepgram), LLM (OpenAI), and TTS (Cartesia) with per-service TTFB, token usage, and turn structure.

## Why This Approach

Two paths were considered:

- **Custom `BaseObserver`**: Subscribe to Pipecat's `MetricsFrame` events and forward manually to Langfuse SDK. More control, no OTel dependency, but ~50 lines of custom observer code and manual span hierarchy reconstruction.
- **Pipecat OTel → Langfuse** *(chosen)*: Pipecat has a native OpenTelemetry tracing system that automatically maps internal metrics to OTel spans. Langfuse exposes an OTLP HTTP endpoint and published an official integration guide (May 2025). Zero custom observer code — `enable_tracing=True` on `PipelineTask` is the only change to the bot.

The OTel path wins because it hooks into the same metrics system already enabled (`enable_metrics=True`) and gives full pipeline coverage for free.

## Key Decisions

- **Docker Compose for Langfuse**: `git clone https://github.com/langfuse/langfuse.git && docker compose up` — UI at `http://localhost:3000`
- **Dependency**: `pipecat-ai[tracing]` added to `pyproject.toml`; installs `opentelemetry-api`, `opentelemetry-sdk`, and supporting packages ✓
- **Auth**: `LANGFUSE_PUBLIC_KEY` and `LANGFUSE_SECRET_KEY` stored in `.env` (documented in `env.example`); base64-encoded as `Basic <pk:sk>` at runtime in `_setup_langfuse_tracing()` ✓
- **Tracing is opt-in**: `_setup_langfuse_tracing()` is a no-op when keys are absent — no cost or noise in dev environments without Langfuse running ✓
- **Bot changes**: `enable_tracing=True` + optional `conversation_id` on `PipelineTask` — pending

## Open Questions

- Should `conversation_id` be tied to the Daily room name / WebRTC session ID for correlation?
- Add a `docker-compose.override.yml` to the project for the Langfuse stack, or keep it separate?

## Next Steps

→ `/workflows:plan` for implementation details
