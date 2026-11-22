# Rooting in Data — Jekyll starter

An original consultancy website inspired by the spacious composition of Veriphae. Includes light and dark themes, responsive navigation, accessible example tabs, an illustrative extraction interaction, project detail dialogs, and direct email links. No competitor code or assets are included.

## Run locally

Install a supported Ruby (3.3 recommended), RubyGems and Bundler, then:

```sh
bundle install
bundle exec jekyll serve
```

Open the local URL Jekyll prints (normally http://localhost:4000). No Node build step is required.

## Edit the site

- `_config.yml`: company name, description, founder, contact email, location, URL and baseurl.
- `_data/services.yml`: the three service cards and their bullet points.
- `_data/examples.yml`: illustrative project descriptions and dialog contents.
- `_data/process.yml`: the four process steps.
- `index.html`: section copy, hero, diagram, about and FAQ.
- `_layouts/default.html`: document metadata, navigation, footer, dialogs and fonts.
- `assets/css/main.css`: all styling, colour tokens, layout and responsive rules.
- `assets/js/main.js`: theme choice, menu, example tabs and dialogs.

## Where homepage content lives

This site uses Jekyll, not a single Markdown document. The homepage template is `index.html`; it uses normal HTML
around Jekyll front matter and Liquid variables. Edit it for the hero, section headings, connection copy, About text,
FAQ and contact section.

Reusable card content lives in `_data/*.yml`:

- `_data/services.yml` controls the **What we do** cards.
- `_data/process.yml` controls the **How it works** steps.
- `_data/examples.yml` controls the **Examples** cards and detail dialogs.

You do not need to create or edit an `index.md`. Jekyll would try to generate the same `/` output as `index.html`,
causing a destination conflict. Add longer pages with a new Markdown file, for example `about.md`, only when you need
a separate page.

## Theme behaviour

On the first visit the theme follows the device's colour preference. The sun/moon button switches themes and stores the choice in localStorage. An early script applies it before the CSS paints. Explicit preview URLs `?theme=light` and `?theme=dark` override the initial choice; switching manually removes that query setting. The theme choice is local to that browser.

To always start with dark on the first visit, replace the `matchMedia` fallback in `_layouts/default.html` with `'dark'`. Keep the saved-choice logic.

## Contact

The supplied address is `ryciewdanych@gmail.com`. Buttons use `mailto:` and open the visitor's email application; this site does not send mail or store enquiries. Change `contact_email` in `_config.yml` to update all email links.

If `contact_email` is set to an empty string, the final section offers a browser-local project brief instead. It can be copied but is not submitted anywhere.

## GitHub Pages

1. Create a repository and copy the source files, including `.github/workflows/pages.yml`.
2. Set your production `url` in `_config.yml`; keep `baseurl` empty for a root domain. Project-path deployments are handled by the workflow's base path.
3. Add a repository Actions secret named `PAGES_ENABLEMENT_TOKEN` containing a token with permission to enable Pages (a fine-grained token with **Pages: write** access, or a classic token with the `repo` scope).
4. Push to `main`. The workflow enables/configures Pages, installs Ruby dependencies, builds Jekyll and deploys `_site`.

The design is technically compatible with static hosts. GitHub restricts using Pages to run an online business; confirm your intended commercial use before making that the production host. Jekyll's generated `_site` directory can also be deployed to another static host without changing the design.

## Content and privacy

The three project examples and hero records are explicitly illustrative. Replace them with real case studies only when accurate and authorised. No fabricated clients, results, prices or testimonials are included.

No analytics, trackers, cookies, form backend or third-party JavaScript libraries are installed. The optional Google Fonts stylesheet requests DM Sans and Instrument Serif from Google; remove those links to use the bundled system font fallbacks with no external fonts. Review your real data practices and add an appropriate privacy page before introducing analytics or enquiry forms.

## Before launch

- Confirm the About text, service scope, contact address and business details.
- Set `url` and check metadata and navigation at the final base path.
- Decide the production host and connect your own domain.
- Test the mail link on your devices.

The private preview is for reviewing the design; your GitHub repository and production domain have not been configured.
