import imageio_ffmpeg
import subprocess
import numpy as np
import wave
import os

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video_path = r'C:\Users\Anifu\.gemini\antigravity\brain\ee6a9c26-d229-43da-b7fb-30eb1cabf4bc\.user_uploaded\media_1795414141346_ec2c6832.mp4'

os.makedirs('scratch', exist_ok=True)
audio_wav = 'scratch/audio.wav'

# Extract wav 48kHz 16-bit stereo
subprocess.run([ffmpeg, '-i', video_path, '-vn', '-acodec', 'pcm_s16le', '-ar', '48000', '-ac', '2', '-y', audio_wav], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

with wave.open(audio_wav, 'rb') as wf:
    n_channels = wf.getnchannels()
    sampwidth = wf.getsampwidth()
    framerate = wf.getframerate()
    n_frames = wf.getnframes()
    raw = wf.readframes(n_frames)
    audio_data = np.frombuffer(raw, dtype=np.int16).reshape(-1, n_channels)

duration = n_frames / framerate
print(f'Audio duration: {duration:.2f}s, framerate: {framerate}, channels: {n_channels}')

# Let's inspect energy in 0.5s windows across the 14.93s
window_size = int(framerate * 0.5)
n_windows = int(len(audio_data) / window_size)
for i in range(n_windows):
    t_start = i * 0.5
    t_end = t_start + 0.5
    chunk = audio_data[i*window_size : (i+1)*window_size]
    rms = np.sqrt(np.mean(chunk.astype(float)**2))
    print(f'Time {t_start:4.1f}s - {t_end:4.1f}s | RMS: {rms:6.1f}')
