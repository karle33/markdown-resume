# Repository maintenance instructions

Before changing this repository, read [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md).

## Required workflow

- Use Yarn 1.22.22 and keep `yarn.lock` authoritative.
- Preserve the legacy Babel decorators configuration unless the MobX code is migrated at the same time.
- Before handing off a code change, run:

  ```bash
  CI=true NODE_OPTIONS=--openssl-legacy-provider yarn test --runInBand
  NODE_OPTIONS=--openssl-legacy-provider yarn build
  ```

- The production base path is `/markdown-resume/`; do not replace asset URLs with root-relative `/static/...` paths.
- Deployments are performed by `.github/workflows/pages.yml` after a push to `master`.
- Do not run `deploy.sh`. It targets the upstream author's repository and force-pushes.

## Architecture guardrails

- `src/store/resume.js` is the source of truth for the layout and persists it under the `layout` localStorage key.
- Every layout item has two content representations: `value` for Markdown mode and `origin` for normal mode. The modes are intentionally independent unless a feature explicitly updates both.
- Imported JSON must pass `parseImportedLayout` before reaching `resume.switchLayout`.
- Local pictures are Data URLs, limited to 2 MB, and must be written to both `value` and `origin` through `resume.setPicture`.
- The theme-color feature deliberately represents colored text as Markdown backticks / HTML `<code>`. `Bucket` must keep add/remove behavior symmetrical.
- Formatting components directly update DOM content and `data-markdown` / `data-origin`; persistence normally occurs when the selected grid is committed. Be careful when replacing this flow.
- Treat imported resume files as trusted content. Structural validation exists, but `origin` HTML is not sanitized before `dangerouslySetInnerHTML`.

## Compatibility

- The stack is legacy React 16 + MobX 5 + Material-UI 3 + Webpack 4.
- Node 24 can test and build with `NODE_OPTIONS=--openssl-legacy-provider`.
- `yarn start` is not compatible with Node 24 because the old dev-server dependency requests the removed `http_parser` binding. See the development document before changing the toolchain.
