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

    # Images missing alt
    imgs = soup.find_all("img")
    imgs_missing_alt = [img.get("src") for img in imgs if not img.get("alt")]

    # Check for images missing title
    imgs_missing_title = [img.get("src") for img in imgs if not img.get("title")]

    # Keyword counts
    text = soup.get_text().lower()
    keyword_counts = {kw: text.count(kw.lower()) for kw in KEYWORDS}

    # ----------------------------
    # Simple SEO Score Calculation
    # ----------------------------
    score = 0
    total_checks = 4 + len(imgs)  # title, meta, h1, at least one keyword, plus images
    # Title, meta, H1
    score += 1 if title else 0
    score += 1 if meta_desc else 0
    score += 1 if h1_text else 0
    # At least one keyword present?
    score += 1 if sum(keyword_counts.values()) > 0 else 0
    # Images alt/title (bonus points)
    if imgs:
        img_score = sum(1 for img in imgs if img.get("alt") and img.get("title"))
        score += img_score / len(imgs)  # proportion of correctly tagged images
    else:
        total_checks -= len(imgs)  # no images, don’t penalize

    # Convert to 100 scale
    seo_score = round((score / total_checks) * 100)

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

    # Recursively scan pages folder
    for root, dirs, files in os.walk(HTML_DIR):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))

    if not html_files:
        print(f"No HTML files found in {HTML_DIR}")
        exit()

    report = []
    for file in html_files:
        result = scan_html(file)
        report.append(result)

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

        # Keyword counts (only show >0)
        keywords_found = {k:v for k,v in page['keyword_counts'].items() if v>0}
        if keywords_found:
            print("Keyword counts:")
            for k,v in keywords_found.items():
                print(f"  {k}: {v}")
        else:
            print("No keywords found on this page.")

    print("\n✅ Full SEO scan completed.")
