# Import paths

Always use absolute imports with the `#/` alias (e.g. `#/features/shortener/component.tsx`), never relative paths (`./`, `../`).

`@/*` also resolves to `./src/*` but exists only for compatibility with older, unmigrated code — do not use `@/` in new or edited code.
