import pypdf
import imageio_ffmpeg
import os

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
print('FFMPEG binary:', ffmpeg_exe)

pdf_path = r'C:\Users\Anifu\.gemini\antigravity\brain\ee6a9c26-d229-43da-b7fb-30eb1cabf4bc\.user_uploaded\media_1795414141063_d934cc68.pdf'
reader = pypdf.PdfReader(pdf_path)

print(f'=== TOTAL PAGES: {len(reader.pages)} ===')
for i, page in enumerate(reader.pages):
    print(f'\n*** PAGE {i+1} ***\n')
    print(page.extract_text())
    print('\n--- LINKS ON PAGE ---')
    if '/Annots' in page:
        for annot in page['/Annots']:
            obj = annot.get_object()
            if '/A' in obj and '/URI' in obj['/A']:
                uri = obj['/A']['/URI']
                print(f'URI: {uri}')
