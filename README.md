# Logan Czarnecki — personal website

A small, no-build static website: plain HTML, CSS, and a little JavaScript.
No dependencies, no build step. Just open the files or serve the folder.

## Structure

```
index.html      About — intro + resume (the landing page)
blog.html       Blog — "work in progress" for now
cat.html        Cat — photo gallery
contact.html    Contact — email, GitHub, LinkedIn
styles.css      All styling (edit the CSS variables at the top to re-theme)
script.js       Mobile nav toggle + cat gallery lightbox
assets/         resume.pdf goes here
images/         favicon + site images
images/cat/     your cat photos go here
blog/           individual blog post pages go here (later)
```

## Run it locally

Open `index.html` directly in a browser, or serve the folder so links behave
exactly like in production:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Things to fill in

- **`assets/resume.pdf`** — add your resume PDF here (the "Download Resume" button links to it).
- **About text + resume** — in `index.html`, replace the `TODO` bio paragraph and the
  placeholder Experience / Education / Skills entries with your real info.
- **Cat photos** — drop images into `images/cat/` named `cat1.jpg`, `cat2.jpg`, … (up to
  `cat6.jpg` are wired up). To add more, copy a `<figure>` line in `cat.html`. Missing
  images are hidden automatically, and an empty-state shows if there are none.

## Adding a blog post

1. Create `blog/your-post.html` (copy the head/header/footer from another page).
2. In `blog.html`, remove the "work in progress" notice and uncomment the `<ul class="post-list">`
   block, then add an entry linking to your new post.

## Notes

- The nav and footer are intentionally duplicated in each page (no build step to share them).
  If you change one, update all four pages.
- Dark mode follows the visitor's system setting automatically (`prefers-color-scheme`).

## Deploy (GitHub Pages)

This is a static site, so GitHub Pages works with zero config: in the repo on GitHub, go to
**Settings → Pages**, set the source to the `main` branch and the root (`/`) folder, and save.
The site publishes at `https://logan-czar.github.io/personal-website/`.
