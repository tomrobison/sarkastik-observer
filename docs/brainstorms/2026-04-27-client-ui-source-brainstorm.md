---
date: 2026-04-27
topic: client-ui-source
---

# Where Does the /client/ UI Come From?

## What We Learned

The browser UI served at `http://localhost:7860/client/` does **not** live in this repo. It comes from a separate Python package:

**Package:** `pipecat-ai-small-webrtc-prebuilt` (v2.5.0 at time of writing)
**Source repo:** https://github.com/pipecat-ai/small-webrtc-prebuilt

## How It Gets Mounted

In `pipecat/runner/run.py` (inside the installed pipecat package):

```python
from pipecat_ai_small_webrtc_prebuilt.frontend import SmallWebRTCPrebuiltUI
app.mount("/client", SmallWebRTCPrebuiltUI)
```

The package ships a prebuilt static frontend (`client/dist/index.html` + assets) and the `frontend.py` module wraps it as a FastAPI `StaticFiles` mount. A redirect at `/` sends the browser to `/client/`.

## Local Path

```
.venv/lib/python3.12/site-packages/pipecat_ai_small_webrtc_prebuilt/client/dist/
```

## Implications

- To customize the UI, fork or clone https://github.com/pipecat-ai/small-webrtc-prebuilt and build your own frontend package, or serve a custom static directory instead of the prebuilt one.
- Version is pinned transitively through the `pipecat-ai[runner]` extras — check `uv.lock` for the exact version in use.
- The client is a read-only dependency; changes here won't affect it.
