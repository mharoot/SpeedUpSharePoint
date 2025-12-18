#
# HOW TO USE: 
# source venv/bin/activate 
# python seo_scan.py   
#

import os
from bs4 import BeautifulSoup

# ----------------------------
# CONFIGURATION
# ----------------------------
HTML_DIR = "./pages"

KEYWORDS = [
    "SharePoint", "SharePoint Performance", "Enterprise SharePoint Performance",
    "Enterprise", "Performance", "SharePoint SQL", "SharePoint architecture",
    "Speed Up SharePoint", "Enterprise SharePoint Performance Experts",
    "hybrid SharePoint SQL", "Design SharePoint", "query performance",
    "Enterprise Security", "SharePoint remains", "high-performance SharePoint",
    "SharePoint SQL architectures", "Enterprise Risk", "Enterprise Data",
    "Enterprise Search", "enterprise teams", "meet enterprise",
    "High Performance", "performance bottlenecks", "measurable performance",
    "Speed"
]

# ----------------------------
# FUNCTIONS
# ----------------------------
def scan_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, "html.parser")

    # Title
    title = soup.title.string.strip() if soup.title else None

    # Meta description
    meta = soup.find("meta", attrs={"name":"description"})
    meta_desc = meta["content"].strip() if meta else None

    # H1
    h1 = soup.find("h1")
    h1_text = h1.get_text(strip=True) if h1 else None

    # Images
    imgs = soup.find_all("img")
    imgs_missing_alt = [img.get("src") 
                    for img in imgs 
                    if not img.get("alt") or not img.get("alt").strip()]

    imgs_missing_title = [(img.get("src"), str(img)) 
                      for img in imgs 
                      if not img.get("title") or not img.get("title").strip()]


    # Keywords
    text = soup.get_text().lower()
    keyword_counts = {kw: text.count(kw.lower()) for kw in KEYWORDS}

    # ----------------------------
    # Weighted SEO Score (0-100)
    # ----------------------------
    score = 0
    # Main elements (20 each)
    score += 20 if title else 0
    score += 20 if meta_desc else 0
    score += 20 if h1_text else 0
    score += 20 if sum(keyword_counts.values()) > 0 else 0

    # Images (total 20 points distributed evenly)
    if imgs:
        correct_imgs = sum(1 for img in imgs if img.get("alt") and img.get("title"))
        img_score = (correct_imgs / len(imgs)) * 20
        score += img_score
    else:
        score += 20  # no images, give full points

    seo_score = round(score)

    return {
        "file": os.path.relpath(file_path, HTML_DIR),
        "title": title or "MISSING",
        "meta_description": meta_desc or "MISSING",
        "h1": h1_text or "MISSING",
        "imgs_missing_alt": imgs_missing_alt,
        "imgs_missing_title": imgs_missing_title,
        "keyword_counts": keyword_counts,
        "seo_score": seo_score
    }

# ----------------------------
# MAIN
# ----------------------------
if __name__ == "__main__":
    html_files = []

    if not os.path.exists(HTML_DIR):
        print(f"❌ Directory not found: {HTML_DIR}")
        exit(1)

    # Recursively scan pages folder
    for root, dirs, files in os.walk(HTML_DIR):
        # Optional: skip hidden folders
        dirs[:] = [d for d in dirs if not d.startswith(".")]

        for file in files:
            if file.lower().endswith(".html"):
                full_path = os.path.join(root, file)
                html_files.append(full_path)

    if not html_files:
        print(f"No HTML files found in {HTML_DIR}")
        exit()

    print(f"🔍 Found {len(html_files)} HTML files\n")

    report = []
    for file in html_files:
        try:
            result = scan_html(file)
            report.append(result)
        except Exception as e:
            print(f"⚠️ Error scanning {file}: {e}")

    # Print summary per page
    for page in report:
        print(f"\nPage: {page['file']}")
        print(f"SEO Score: {page['seo_score']}/100")
        print(f"Title: {page['title']}")
        print(f"Meta description: {page['meta_description']}")
        print(f"H1: {page['h1']}")

        if page['imgs_missing_alt']:
            print("Images missing alt:")
            for img in page['imgs_missing_alt']:
                print(f"  - {img}")
        else:
            print("All images have alt text ✅")

        if page['imgs_missing_title']:
            print("Images missing title:")
            for img in page['imgs_missing_title']:
                print(f"  - {img}")
        else:
            print("All images have title ✅")

        keywords_found = {k: v for k, v in page['keyword_counts'].items() if v > 0}
        if keywords_found:
            print("Keyword counts:")
            for k, v in keywords_found.items():
                print(f"  {k}: {v}")
        else:
            print("No keywords found on this page.")

    print("\n✅ Full SEO scan completed.")
