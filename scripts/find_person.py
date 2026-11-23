from PIL import Image
import numpy as np

img = Image.open('scratch/frames/frame_3.jpg')
print('Image size:', img.size)

# Let's inspect horizontal profile to find person center x
arr = np.array(img)
# background is light/white, person is darker (hair, suit/clothes)
gray = np.mean(arr, axis=2)
# Average across rows where person is standing (e.g. y from 100 to 900)
vert_profile = np.mean(gray[100:900, :], axis=0)
# Darkest regions in vert_profile
print('Min brightness column:', np.argmin(vert_profile), 'value:', np.min(vert_profile))
print('Center 100 cols mean:', np.mean(vert_profile[910:1010]))
print('Left 100 cols mean:', np.mean(vert_profile[50:150]))
print('Right 100 cols mean:', np.mean(vert_profile[1770:1870]))

# Find x range where vert_profile is significantly darker than background
bg_val = (np.mean(vert_profile[50:150]) + np.mean(vert_profile[1770:1870])) / 2
diff = bg_val - vert_profile
person_cols = np.where(diff > 15)[0]
if len(person_cols) > 0:
    print('Person column range:', person_cols[0], 'to', person_cols[-1], 'width:', person_cols[-1] - person_cols[0])
    center_x = (person_cols[0] + person_cols[-1]) // 2
    print('Estimated person center x:', center_x)
