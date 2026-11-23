from PIL import Image
import numpy as np

img = Image.open('scratch/frames/frame_3.jpg')
arr = np.array(img)
gray = np.mean(arr, axis=2)

# Check vertical profile in columns 900 to 1000
horiz_profile = np.mean(gray[:, 900:1000], axis=1)
bg_val = np.mean(gray[20:60, 50:150]) # background near top left

diff = bg_val - horiz_profile
person_rows = np.where(diff > 15)[0]
print('Person top row:', person_rows[0], 'bottom row:', person_rows[-1])
