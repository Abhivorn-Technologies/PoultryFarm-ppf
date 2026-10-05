import zipfile
import xml.etree.ElementTree as ET
import re
import json

def extract_docx_text(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        
        # XML namespaces in docx
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        paragraphs = []
        for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            texts = [node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
            if texts:
                paragraphs.append("".join(texts))
        
        return paragraphs

paras = extract_docx_text('public/product and breed details.docx')
print(f"Total paragraphs extracted: {len(paras)}")

# Write all paragraphs to a file for complete analysis
with open('scripts/extracted_doc_text.txt', 'w', encoding='utf-8') as f:
    for i, p in enumerate(paras):
        f.write(f"[{i}] {p}\n")

print("Saved extracted text to scripts/extracted_doc_text.txt")
