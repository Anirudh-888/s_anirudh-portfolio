import imageio_ffmpeg
import subprocess
import json

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video_path = r'C:\Users\Anifu\.gemini\antigravity\brain\ee6a9c26-d229-43da-b7fb-30eb1cabf4bc\.user_uploaded\media_1795414141346_ec2c6832.mp4'

# Let's inspect video stream info with ffmpeg -i
proc = subprocess.run([ffmpeg, '-i', video_path], stderr=subprocess.PIPE, text=True)
print(proc.stderr)
