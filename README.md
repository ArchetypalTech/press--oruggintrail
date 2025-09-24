# Archetypal Tech

![Archetypal](./archetypal-heading.jpg)

_Presskit for The O'ruggin Trail_

## [press.theoruggintrail.com](https://press.theoruggintrail.com)

```
ip: 66.241.124.168
app-label: presskit-oruggintrail
host: fly.io
```

### 👷‍♂️ Developer

Getting started

This repo uses `pnpm` as its package manager. Although you could use alternatives as this app doesn't require workspaces.

```
brew install pnpm
```

- initialise: `pnpm install`
- start runtime server: `pnpm dev`
- `http://localhost:5173`

### 🚀 Deployments

We are using Github actions to manage deployments automatically.

This means _any_ commit to the repo will initiate the action, which will attempt to deploy to the fly hosting service.

If there are any build errors - the working build remains. In the case of failure you will most likely get a message from Github, or you can check here at https://github.com/ArchetypalTech/www-orug/actions/

⏱️ Approximate deployment time: `2 mins` -> maybe a few mins after to allow propagate changes

### 🧭 App structure

This is a [Svelte](https://svelte.dev/docs) app.

Svelte uses a file-based routing system. Find **Pages** via `src/routes/**`.
Each Page will inherit from a `+layout` and be defined when `+page` is present. So another internal page will be created via `src/routes/example/+page.svelte`, and the site index will be the first `+page` found in `routes/`, resulting in `archetypaltech.com/example`

> +Page.svx content accepts `markdown` any page route delcared with `page-path/+page.svx` allows for `HTML` | `markdown` syntax | `svelte` components 🚀 

You can add `HTML` and set any inline `CSS` in any page. However, this app is using `Tailwind` for the most part for styling.

If you have used any other FE Framework, this is going to be a very similar experience to what you are accustomed to.
