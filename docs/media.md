# Homepage media (`public/media/home/`)

Videos are **not** committed to git (`*.mp4` is ignored). They are served from a
CDN in production and from `public/media/home/` during local development.

## Adding or replacing a video

1. Encode it for the web (muted, fast start, plus a poster frame):

   ```bash
   scripts/encode-video.sh path/to/source.mp4 public/media/home/<file>.mp4 720 28
   ```

   Aim for under ~4 MB. If it is larger, raise the last number (quality, 28–32)
   or lower the height (`720`). Short loops can use `1080`.

2. Upload `<file>.mp4` and `<file>-poster.jpg` to the CDN bucket, under the
   same path the site uses (`home/<file>.mp4`).

3. Add both file names to `PUBLISHED` in `src/components/home-1/assets.ts`, so the
   deploy build renders the real media instead of a placeholder.

The file name must match the asset table in `assets.ts` (for example `A10` →
`vernier-inspect.mp4`).

## Pointing the site at the CDN

Set the repository variable `PUBLIC_MEDIA_BASE` (GitHub → Settings → Secrets and
variables → Actions → Variables) to the folder URL, without a trailing slash:

```
https://media.spatia.com/home
```

The next deploy uses it. Leave it unset to serve media from `public/media/home/` instead.
Locally, copy `.env.example` to `.env` to try the CDN URLs.

## Suggested CDN setup (Cloudflare R2)

1. Create an R2 bucket (ours is `spatia`) and connect a custom domain such as
   `media.spatia.com` under the bucket's **Settings → Public access**.
2. Upload the files into a `home/` folder in the bucket.
3. Add a CORS rule allowing `GET` from `https://spatia.com` (only needed if the
   videos are ever fetched by script; plain `<video>` tags work without it).
4. Set `PUBLIC_MEDIA_BASE=https://media.spatia.com/home` as above.
