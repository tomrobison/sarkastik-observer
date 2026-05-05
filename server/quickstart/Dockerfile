FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    libopus0 \
    libsrtp2-1 \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

WORKDIR /app

COPY uv.lock pyproject.toml ./
RUN uv sync --locked --no-install-project --no-dev

COPY ./bot.py .

CMD uv run bot.py --host 0.0.0.0 --port ${PORT:-7860} --transport daily
