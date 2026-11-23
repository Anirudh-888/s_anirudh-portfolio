import subprocess
import time
import os

msedge_exe = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
port = 3008

print(f'Starting Next.js server on port {port}...')
server = subprocess.Popen(['node', './node_modules/next/dist/bin/next', 'start', '-p', str(port)])

try:
    time.sleep(3)
    os.makedirs('scratch/screenshots', exist_ok=True)
    profile_dir = os.path.abspath('scratch/edge_profile')

    # 1. Desktop Hero Screenshot (1440x900)
    hero_img = os.path.abspath('scratch/screenshots/screenshot_hero.png')
    cmd_hero = [
        msedge_exe,
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        f'--user-data-dir={profile_dir}',
        '--window-size=1440,900',
        f'--screenshot={hero_img}',
        f'http://localhost:{port}'
    ]
    subprocess.run(cmd_hero, timeout=15)
    if os.path.exists(hero_img):
        print(f'Captured hero screenshot: {hero_img} ({os.path.getsize(hero_img)} bytes)')

except Exception as e:
    print('Error taking screenshots:', e)
finally:
    print('Stopping server...')
    server.terminate()
    try:
        server.wait(timeout=2)
    except Exception:
        server.kill()
    print('Server stopped.')
