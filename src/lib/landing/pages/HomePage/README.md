# Homepage

The redesigned homepage owns its header, footer, local fonts, SVG illustrations, and CSS module. `LandingChrome` in `LandingRouter.jsx` suppresses the existing shared navigation/footer only at `/`; every other route keeps the original components and routing.

The homepage footer reuses the existing faculty/AI Connect and student-union logo assets, with the club wordmark, social links, and copyright. Both homepage navigation areas link to the existing public `/team` route through React Router. The shared footer and the assessment-day route remain unchanged.

`HomeSections.jsx` composes the sections. Repeated copy, projects, and navigation live in `constants/home.js`; project cards share a single data-driven component. `types.ts` supplies explicit TypeScript types to the JavaScript components through JSDoc, retaining the repository's existing JavaScript architecture. The local TypeScript config checks only the homepage without changing the project compiler or dependencies.

`ProjectsCarousel.jsx` reads the existing `projects` Firestore collection through `useFirestoreFetch`, so every published project appears automatically. The normalizer trims existing field-name/URL whitespace, preserves the project links, and standardizes technology labels without changing stored documents. The two local mockups remain available while loading or when retrying a failed request. The existing `react-slick` dependency supplies infinite scrolling, touch gestures, and keyboard navigation. Hidden/cloned slides are inert; controls support pausing and motion stops when the section or tab is hidden, or reduced motion is enabled. `legacy.d.ts` declares the narrow interfaces used from the existing JavaScript hook and slider library.

Validation from the repository root:

```sh
npm run build
node node_modules/typescript/bin/tsc -p src/lib/landing/pages/HomePage/tsconfig.json
CI=true npm test -- --watchAll=false --runInBand --testPathPattern=HomePage.test.jsx
CI=true npm test -- --watchAll=false --runInBand
```

The original `App.test.js` fails before running its assertions because Firebase's dependency expects `TextEncoder` in Jest. This failure was reproduced before the redesign; the homepage tests avoid importing unrelated application services.

Animations use IntersectionObserver and CSS. Content stays visible if observers are unavailable; reduced motion disables animations and smooth scrolling. Internal section links also move keyboard focus. Route links reset scrolling before navigation so the CTA opens the top of the existing registration page.
