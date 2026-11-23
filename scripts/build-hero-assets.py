import os
import subprocess
import numpy as np
import wave
import imageio_ffmpeg
from PIL import Image

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video_path = r'C:\Users\Anifu\.gemini\antigravity\brain\ee6a9c26-d229-43da-b7fb-30eb1cabf4bc\.user_uploaded\media_1795414141346_ec2c6832.mp4'

os.makedirs('public/hero', exist_ok=True)
os.makedirs('scratch', exist_ok=True)

print("Starting Hero Video Pipeline...")
print("FFMPEG:", ffmpeg)

# 1. Trim 11.5s clip (0.5s to 12.0s or 0.0s to 11.5s)
# From audio analysis, speech is from 1.0s to 10.8s. 0.0s to 11.5s captures entire intro with neutral start/end.
start_time = 0.0
clip_duration = 11.5
fade_duration = 0.5

# Step 1: Crop and scale video segment, apply colorlevels to whiten background
# crop 800:1000:560:60 -> scale to 768:960
crop_filter = "crop=800:1000:560:60,scale=768:960,colorlevels=rimax=0.88:gimax=0.88:bimax=0.88"

raw_clip_video = "scratch/raw_clip.mp4"
raw_clip_audio = "scratch/raw_clip.wav"

cmd_extract_video = [
    ffmpeg, "-ss", str(start_time), "-t", str(clip_duration),
    "-i", video_path,
    "-vf", crop_filter,
    "-c:v", "libx264", "-preset", "fast", "-crf", "18",
    "-an", "-y", raw_clip_video
]
subprocess.run(cmd_extract_video, check=True)
print("Extracted cropped video clip.")

# Extract 48kHz stereo WAV for numpy sample-accurate audio crossfade
cmd_extract_audio = [
    ffmpeg, "-ss", str(start_time), "-t", str(clip_duration),
    "-i", video_path,
    "-vn", "-acodec", "pcm_s16le", "-ar", "48000", "-ac", "2",
    "-y", raw_clip_audio
]
subprocess.run(cmd_extract_audio, check=True)
print("Extracted raw audio.")

# Step 2: Seamless video crossfade using xfade
# Video duration is clip_duration. Offset is clip_duration - fade_duration = 11.0
# The result will be (clip_duration - fade_duration) = 11.0s long.
loop_video = "scratch/loop_video.mp4"
# Split the video into two parts: [0, clip_duration - fade_duration] and [clip_duration - fade_duration, clip_duration]
# But xfade with self: split input into main and tail, then xfade tail onto head!
# Even simpler:
# part A: from 0 to (clip_duration - fade_duration)
# part B: from (clip_duration - fade_duration) to clip_duration
# Crossfade part B into part A!
offset = clip_duration - fade_duration
cmd_xfade_video = [
    ffmpeg, "-i", raw_clip_video,
    "-filter_complex",
    f"[0:v]split=2[v1][v2];"
    f"[v1]trim=0:{offset},setpts=PTS-STARTPTS[main];"
    f"[v2]trim={offset}:{clip_duration},setpts=PTS-STARTPTS[tail];"
    f"[tail][main]xfade=transition=fade:duration={fade_duration}:offset=0[outv]",
    "-map", "[outv]",
    "-c:v", "libx264", "-preset", "fast", "-crf", "18",
    "-y", loop_video
]
subprocess.run(cmd_xfade_video, check=True)
print("Created seamless looping video with xfade.")

# Step 3: Sample-accurate audio crossfade in numpy
with wave.open(raw_clip_audio, 'rb') as wf:
    n_channels = wf.getnchannels()
    sampwidth = wf.getsampwidth()
    framerate = wf.getframerate()
    n_frames = wf.getnframes()
    raw_bytes = wf.readframes(n_frames)
    audio = np.frombuffer(raw_bytes, dtype=np.int16).reshape(-1, n_channels).astype(np.float32)

fade_samples = int(framerate * fade_duration)
total_samples = int(framerate * offset) # length after loop

main_audio = audio[:total_samples].copy()
tail_audio = audio[total_samples:total_samples + fade_samples].copy()

# Ensure lengths match
fade_len = min(fade_samples, len(tail_audio), len(main_audio))
fade_in = np.linspace(0.0, 1.0, fade_len)[:, np.newaxis]
fade_out = np.linspace(1.0, 0.0, fade_len)[:, np.newaxis]

# Crossfade tail onto head of main
main_audio[:fade_len] = main_audio[:fade_len] * fade_in + tail_audio[:fade_len] * fade_out

loop_audio = "scratch/loop_audio.wav"
out_audio_int16 = np.clip(main_audio, -32768, 32767).astype(np.int16)
with wave.open(loop_audio, 'wb') as wf:
    wf.setnchannels(n_channels)
    wf.setsampwidth(sampwidth)
    wf.setframerate(framerate)
    wf.writeframes(out_audio_int16.tobytes())
print("Created sample-accurate audio crossfade.")

# Step 4: Export hero.mp4 and hero.webm
# hero.mp4: H.264 yuv420p (CRF 24, -preset slow) with AAC 96k, +faststart
hero_mp4 = "public/hero/hero.mp4"
cmd_export_mp4 = [
    ffmpeg, "-i", loop_video, "-i", loop_audio,
    "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k",
    "-movflags", "+faststart",
    "-shortest", "-y", hero_mp4
]
subprocess.run(cmd_export_mp4, check=True)
print("Exported public/hero/hero.mp4 (size:", os.path.getsize(hero_mp4), "bytes)")

# hero.webm: VP9 (CRF 36) with Opus 80k
hero_webm = "public/hero/hero.webm"
cmd_export_webm = [
    ffmpeg, "-i", loop_video, "-i", loop_audio,
    "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
    "-c:a", "libopus", "-b:a", "80k",
    "-shortest", "-y", hero_webm
]
subprocess.run(cmd_export_webm, check=True)
print("Exported public/hero/hero.webm (size:", os.path.getsize(hero_webm), "bytes)")

# Step 5: Portrait still at 480x600 as portrait-bust.webp and og.jpg at 1200x630
# Frame at t=2.0s is a very clear front-facing frame
best_frame = "scratch/best_frame.png"
subprocess.run([
    ffmpeg, "-ss", "2.0", "-i", raw_clip_video,
    "-vframes", "1", "-y", best_frame
], check=True)

with Image.open(best_frame) as img:
    # 768x960 image. Head-to-shirt crop at 480x600 (aspect 4:5)
    # Head is near top (around y=60 to 450). Crop center x: 384, y from 10 to 610.
    w, h = img.size
    crop_w, crop_h = 480, 600
    left = (w - crop_w) // 2
    top = 30
    bust = img.crop((left, top, left + crop_w, top + crop_h))
    bust.save("public/portrait-bust.webp", "WEBP", quality=95)
    print("Exported public/portrait-bust.webp")

    # og.jpg at 1200x630
    og = Image.new("RGB", (1200, 630), (244, 242, 238)) # paper background
    # paste portrait on right, with margin
    bust_resized = bust.resize((400, 500), Image.Resampling.LANCZOS)
    og.paste(bust_resized, (720, 65))
    og.save("public/og.jpg", "JPEG", quality=90)
    print("Exported public/og.jpg")

print("Hero video pipeline completed successfully!")
