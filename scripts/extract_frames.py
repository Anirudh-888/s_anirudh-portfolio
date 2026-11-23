import imageio_ffmpeg
import subprocess
import os

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video_path = r'C:\Users\Anifu\.gemini\antigravity\brain\ee6a9c26-d229-43da-b7fb-30eb1cabf4bc\.user_uploaded\media_1795414141346_ec2c6832.mp4'

os.makedirs('scratch/frames', exist_ok=True)

# Extract frames at 1s, 3s, 5s, 7s, 10s
for t in [1, 3, 5, 7, 10]:
    out_img = f'scratch/frames/frame_{t}.jpg'
    subprocess.run([ffmpeg, '-ss', str(t), '-i', video_path, '-vframes', '1', '-q:v', '2', '-y', out_img], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f'Extracted {out_img}, size:', os.path.getsize(out_img) if os.path.exists(out_img) else 'Failed')
