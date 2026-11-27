# T-Studio: Rust desktop app that automates lesson-video editing

> Built by Mohamed Abidi. Source: `D:\projects\tache-lik\t-studio` (v1/v2.0 workspace).
> Predecessor (v0): Python prototype in `t_studio/` and the FastAPI service `tache-lik-video-pipeline` (Aug–Oct 2025).

## One-line pitch
Teachers drop in lesson videos and get upload-ready files in one click, with **AI voice cleaning**, watermark, name tag, intro/outro and the right compression, on Windows and macOS. A Rust rewrite turned a slow ~1 GB Python tool into a light, fast app that **all teachers love using**.

## v0 → v1 (founder's figures)
| | Old (Python) | New (Rust) |
|---|---|---|
| App size | **~1 GB** (measured build: 771 MB, PyTorch + 2× FFmpeg + Python runtime) | **60–70 MB** installed (Windows installer: **24.8 MB**) |
| 5-minute video | **10–30 min** to process | **~20 s** |

Measured benchmark (i5-9400F + GTX 1650, real lessons, `bench/compare.sh`): **4.5–5.9× faster** than v0 even before full tuning (2:03 lesson 41.2 s → 7.0 s; 10:24 lesson 204 s → 45 s). Installed test: a 3:08 lesson processed in 25 s on NVENC.

## Why v0 was slow, and what v1 changed
- v0 re-encoded each video up to **4×** (resize → watermark → intro → compress). v1 uses **one decode and one encode** through a single FFmpeg filter graph per video.
- v0 loaded PyTorch and DeepFilterNet per video. v1 uses **DeepFilterNet 3 in native Rust**, loaded once per session, processing mono voice once.
- v0 "used the GPU" but fell back to CPU (invalid NVENC flags like `-tune film`). v1 runs a **real hardware probe** at startup with a per-vendor flag table: **NVENC, Intel Quick Sync, AMD AMF, VideoToolbox**, x264 CPU fallback. Encoders that fail on real videos get demoted automatically. A test checks every generated flag against FFmpeg's option list.
- **Trimmed FFmpeg** built in Docker from pinned sources: **198 MB → 19 MB**.

## Audio / AI voice pipeline
- **DeepFilterNet 3** noise suppression + **Silero VAD** speech gate for pauses + broadcast voice chain
- **EBU R128 two-pass loudness** normalization to **−14 LUFS** with a −1.5 dBFS limiter; intro/outro loudness matched
- Stage A runs at **0.045× realtime** (27 s for a 10-minute lesson); parallel denoising in 30 s segments with crossfades (~1.9× faster)
- Found and worked around a `deep-filter-rt` bug (cloned models shared state and corrupted concurrent audio), with a regression test
- Evaluated MossFormer2 / MossFormerGAN / Resemble Enhance in blind listening tests and rejected them on size or quality

## Encoding tuning
VMAF-driven encoder sweep: a longer keyframe interval cut screen-recording sizes **30–50%** at no quality cost. NVENC tuned to VMAF ~96.9 (equal to v0's x264). The CPU path is now **smaller than v0** at the same quality (1.30 vs 1.47 MB/min).

## App
- **Tauri 2** shell (Rust backend, system webview), **Svelte 5 + TypeScript + Vite + Tailwind v4** UI
- 3-step flow: **Drop → Pick profile → Start**. JSON profiles. Visual watermark editor. Queue with crash resume
- **EN / FR / AR (RTL)**. NSIS installer (Windows), DMG (macOS)
- **Signed auto-update** served by the Tache-Lik backend (MinIO-hosted), builds triggered from T-Hub
- CI on Windows and macOS: fmt, clippy `-D warnings`, 60 engine/audio tests, and the build fails if the installer is over 60 MB
- Headless CLI (`tstudio-cli`) for batch runs and benchmarks

## Stack
Rust (2024 edition, `unsafe_code = deny`), Tauri 2, Svelte 5, TypeScript, Tailwind CSS, FFmpeg, DeepFilterNet 3, Silero VAD (ONNX via tract), GitHub Actions. v0: Python, FastAPI, PyTorch, DeepFilterNet, Docker.

## CV bullets (ready to tailor)
- Rewrote the teachers' video-processing tool from Python to **Rust/Tauri**: app size **~1 GB → 60–70 MB**, a 5-minute lesson **10–30 min → ~20 s**, now used by all Tache-Lik teachers.
- Built a single-pass FFmpeg engine with hardware-encoder detection (NVENC/QSV/AMF/VideoToolbox) and VMAF-tuned settings that cut file sizes 30–50% at equal quality.
- Implemented an AI voice-cleanup chain (DeepFilterNet 3 in native Rust, Silero VAD, EBU R128 loudness to −14 LUFS) running at 0.045× realtime.
