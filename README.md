# yogendra-swaroop.tech

A hand-built, dependency-free static site — no Jekyll, no build step, no framework.
Just HTML/CSS/JS you can upload straight to GitHub Pages (or any static host).

## Structure

```
/
├── index.html                    Homepage
├── about.html                    About / résumé / contact
├── 404.html                      Custom 404
├── sitemap.xml                   Sitemap (edit manually per page)
├── robots.txt
├── CNAME                         Custom domain for GitHub Pages
├── Yogendra-Srivastava-Resume.pdf
├── blog/
│   ├── index.html                All-posts listing (with tag filter)
│   ├── oscp-101-the-hard-way.html
│   └── save-your-social-media.html
├── series/
│   ├── index.html                Series listing
│   ├── offensive-security-101.html
│   └── detection-engineering.html
└── assets/
    ├── css/style.css             The entire design system
    ├── js/main.js                Nav, scroll reveal, reading progress, copy buttons
    └── img/
```

## Publishing a new post

1. Duplicate `blog/oscp-101-the-hard-way.html` (or `save-your-social-media.html` for a
   post with no series/hero image) as `blog/your-post-slug.html`.
2. Update the `<title>`, meta tags, `post-header`, and `post-content`.
3. If it belongs to a series, keep the `post-series-badge` and `series-nav` block —
   add your new post as a list item there **and** in the matching `series/*.html` page.
4. Add a card to `blog/index.html` (and `index.html` if it should be featured) and a
   `<url>` entry to `sitemap.xml`.

## Deploying to GitHub Pages

1. Push this folder's contents to the root of a new repo (or `docs/` — update Pages
   settings accordingly).
2. In repo Settings → Pages, set the source branch/folder.
3. `CNAME` is already set to `yogendra-swaroop.tech` — point your domain's DNS at
   GitHub Pages, or delete the file to use the default `*.github.io` URL.

No `npm install`, no `bundle install` — open `index.html` in a browser and it works.
