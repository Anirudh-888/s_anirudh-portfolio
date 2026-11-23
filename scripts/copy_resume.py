import shutil
import os

pdf_src = r'C:\Users\Anifu\.gemini\antigravity\brain\ee6a9c26-d229-43da-b7fb-30eb1cabf4bc\.user_uploaded\media_1795414141063_d934cc68.pdf'
os.makedirs('public', exist_ok=True)
pdf_dst = 'public/resume.pdf'

shutil.copy2(pdf_src, pdf_dst)
print('Copied resume to', pdf_dst, 'Size:', os.path.getsize(pdf_dst))
