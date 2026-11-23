import subprocess
import time
import os
import urllib.request

msedge_exe = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

print('Starting Next.js production server with node directly...')
server = subprocess.Popen(['node', './node_modules/next/dist/bin/next', 'start', '-p', '3000'])

try:
    ready = False
    req = urllib.request.Request('http://127.0.0.1:3000', headers={'Host': 'localhost:3000', 'User-Agent': 'Mozilla/5.0'})
    for i in range(20):
        try:
            with urllib.request.urlopen(req, timeout=1) as resp:
                if resp.status == 200:
                    ready = True
                    print('Server is live at http://127.0.0.1:3000')
                    break
        except Exception as e:
            time.sleep(1)
            print(f'Waiting for server... ({i+1}/20): {e}')

    if not ready:
        print('Server failed to start in time!')
    else:
        os.makedirs('scratch/screenshots', exist_ok=True)

        # 1. Capture 1440x900 Desktop Screenshot
        desktop_img = os.path.abspath('scratch/screenshots/screenshot_1440x900.png')
        cmd_desktop = [
            msedge_exe,
            '--headless=new',
            '--disable-gpu',
            '--window-size=1440,900',
            f'--screenshot={desktop_img}',
            'http://127.0.0.1:3000'
        ]
        subprocess.run(cmd_desktop, check=True)
        print(f'Captured desktop screenshot: {desktop_img} ({os.path.getsize(desktop_img)} bytes)')

        # 2. Capture 390x844 Mobile Screenshot
        mobile_img = os.path.abspath('scratch/screenshots/screenshot_390x844.png')
        cmd_mobile = [
            msedge_exe,
            '--headless=new',
            '--disable-gpu',
            '--window-size=390,844',
            f'--screenshot={mobile_img}',
            'http://127.0.0.1:3000'
        ]
        subprocess.run(cmd_mobile, check=True)
        print(f'Captured mobile screenshot: {mobile_img} ({os.path.getsize(mobile_img)} bytes)')

finally:
    print('Terminating server...')
    server.terminate()
    try:
        server.wait(timeout=3)
    except Exception:
        server.kill()
    print('Server terminated.')
