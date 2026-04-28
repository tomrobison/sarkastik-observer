# sarkastik-observer

aka pipecat demos

## Observability with Langfuse (optional)

Trace every conversation — STT latency, LLM token usage, TTS timing — in a local [Langfuse](https://langfuse.com) instance.

### Start Langfuse

```bash
cd ~/code/cloud/langfuse && docker compose up
```

UI available at **http://localhost:3000** (~2 min first start).

### Get API keys

1. Open http://localhost:3000 and create a project
2. Go to **Settings → API Keys** and create a key pair

### Add keys to `.env`

```ini
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_BASE_URL=http://localhost:3000
```

Restart the bot — traces will appear in the Langfuse UI automatically. Each conversation is grouped by a unique `conversation_id` logged at startup.

---

### Troubleshooting

- **Browser permissions**: Allow microphone access when prompted
- **Connection issues**: Try a different browser or check VPN/firewall settings
- **Audio issues**: Verify microphone and speakers are working and not muted
