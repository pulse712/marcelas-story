# Marcela's story: one-page site

A static page: plain HTML, CSS and a few lines of JavaScript. There is no build step
and no database. Upload the contents of this `site/` folder to any web host.

## Status: DRAFT

The page is not ready to publish. Open items are listed in the launch checklist
at the bottom of this file.

## Files

| Path | What it is |
|---|---|
| `index.html` | All the copy and structure. Edit text here. |
| `css/styles.css` | Colours, type and layout. Colours are set once at the top, under `:root`. |
| `js/main.js` | Quick-exit button and "one recording plays at a time". The page works without it. |
| `assets/img/` | Screenshots, document excerpts, the video poster and the social share card. |
| `assets/media/` | The video clip (MP4) and the audio recording (M4A). |
| `../tools/prepare_media.py` | Script that produced everything in `assets/` from the original files. |
| `../video-transcripts.md` | Full machine-made transcripts of both recordings (unverified). |

## Preview on your computer

```
cd site
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Editing the text

Open `index.html` in any text editor. Each section starts with a comment such as
`<!-- ============ THE RECORD ============ -->`. Change the words between the tags and save.

Rules the copy follows. Keep to them when editing:

- Court items say "arrested" or "charged", never "convicted", unless a record shows a conviction.
- Every claim names its source (court record or Marcela's evidence).
- Quotes are exact, including spelling mistakes.
- Where a record gives his response, it is included.

## Adding or changing a screenshot

1. Put the original image in `../files/`.
2. Open `../tools/prepare_media.py` and add a line to the `SCREENSHOTS` table:
   the output name, the source file name, and a crop box `(left, top, right, bottom)`
   that cuts off the phone's status bar and the chat header.
3. If a phone number, name or face is still visible after cropping, add a black box
   for it under `REDACTIONS`.
4. Run `python3 tools/prepare_media.py` (needs `pip install pillow av` and the
   `pdfimages` command from poppler-utils).
5. In `index.html`, copy an existing `<li>…</li>` block inside a `<ul class="shots">`,
   point `src` at the new file, set `width` and `height` to the numbers the script printed,
   and write the `alt` text: a full transcription of what the image says.

Injury photographs go inside a `<details class="sensitive">` block so they stay closed
until the visitor opens them.

When higher-resolution originals arrive, replace the files in `../files/`, adjust the
crop boxes (they are in pixels of the original image) and re-run the script.

## What must never appear on the page

- Home addresses, phone numbers, dates of birth, licence, passport or ID numbers.
- Profile photos and the names of other people (relatives, previous partners, children),
  except Dottie Belletto, his mother, and Myles, whom the client asked to name.
- Anything Marcela has not agreed to show.

## Material deliberately left out of this draft

- Identification numbers, the passport number, and the home address in the sworn
  declaration. The declaration's account of the 2025 messages is on the page without those.
- Screenshots that name other people, describe intimate details of assaults, or
  mention Marcela's legal status.
- One screenshot of a message to a third person; its source is not confirmed.

## Launch checklist

1. Marcela confirms in writing that she wants the page published and which photographs to show.
2. Add the final outcome of the 2014 and 2023 cases to the timeline.
3. Someone who knows the voices checks both transcripts by ear; add speaker names.
4. Add dates for the undated exchanges, if Marcela has them.
5. Add a corrections email in About this page when one exists.
6. Swap in full-size images if the originals arrive.
7. In the `<head>` of `index.html`: delete the `robots` "noindex" line, and add the
   live canonical URL and share tags.
8. Upload the `site/` folder to the host and test on a phone: the Quick exit button,
   each "Show photograph" button, the video and the audio.

## Hosting

Any static host works (Netlify, Cloudflare Pages, GitHub Pages, or ordinary web hosting).
Upload the contents of `site/` so that `index.html` sits at the top level. HTTPS should be on.
The client asked for the Google Ads tag (conversion ID `AW-18508832545`), and it is in
the `<head>` of `index.html` with a page-view conversion event. It sets cookies, and the
footer tells visitors so. Do not add other analytics or advertising scripts: visitors may
be in unsafe situations.
