# How to publish a blog post

Every `.md` file in this folder is a blog post at `/blog/<file-name>`. Files starting with `_` (like `_template.md`) and this README are ignored.

## 1. Create the post

1. Copy `_template.md` and rename it. The file name becomes the URL, so use lowercase words and dashes: `whatsapp-tips-for-restaurants.md` → `/blog/whatsapp-tips-for-restaurants`.
2. Fill in the details at the top (the part between the `---` lines). For `author`, use an id from `lib/blog-authors.ts`: `riya-kapoor`, `kunal-verma`, `ananya-rao` or `kabir-sethi`. Add new authors in that file.
3. Write the post below it in Markdown.

## 2. Add images

Put images in `public/images/blog/<file-name>/`, for example `public/images/blog/whatsapp-tips-for-restaurants/cover.jpg`.

- **Cover:** set `cover: /images/blog/whatsapp-tips-for-restaurants/cover.jpg`. Use a 16:8 image, at least 1600×800. JPG, PNG or WebP covers are also used as the link preview on WhatsApp, LinkedIn and X.
- **In the post:** `![What the image shows](/images/blog/whatsapp-tips-for-restaurants/menu.jpg "Optional caption shown under the image")`

Always describe the image in the `[...]` part. It helps Google and people using screen readers.

## 3. Add marketing links

Use these shortcuts as link targets. They're filled in automatically and tagged with UTM parameters (`utm_source=blog`, `utm_campaign=<post name>`), so you can see in analytics which post brought each signup.

| Write this | Goes to |
| --- | --- |
| `[Start free](signup)` | Dashboard signup |
| `[Book a demo](demo)` | Demo request form |
| `[See pricing](pricing)` | Pricing page |
| `[Chat with us](whatsapp)` | BigBrosAI on WhatsApp, with a pre-filled message |

Links to other pages on the site work as normal: `[clinic solutions](/solutions/clinics)`.

## 4. Add call-to-action boxes

A big green CTA box anywhere in the post:

```
:::cta{button="Start for free" href="signup"}
## Your headline here
One or two sentences about why to click.
:::
```

`href` accepts the shortcuts above or any URL. Every post also gets a CTA at the end and in the sidebar, set by `cta:` at the top of the file. If you leave `cta:` out, a default one is used.

Tip and note boxes:

```
:::tip
A useful tip, shown in a lime box.
:::

:::note
Extra information, shown in a green box.
:::
```

## 5. Preview and publish

- Set `draft: true` while you're writing. Drafts show on your computer (`npm run dev`) but not on the live site.
- When it's ready, remove `draft: true`, commit and deploy. The post appears on `/blog`, in the sitemap and in the RSS feed at `/blog/rss.xml`.
- Set `featured: true` to show a post as the big card at the top of `/blog`.
