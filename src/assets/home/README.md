# Homepage artwork

All artwork is local and independently usable. The SVGs are UI illustrations, not working music, travel, or language applications.

- `developer-club.webp`: transparent illustration of three developers collaborating around shared code, 1200 × 900. Generated with built-in ImageGen, then encoded as WebP with alpha preserved.
- `travel-app.svg`: travel website illustration, 460 × 490. Its photo is embedded, so the SVG has no external requests.
- `moozika-project.svg`: music player illustration, 620 × 410.
- `spealish.svg`: language dashboard illustration, 620 × 410.
- `amalfi-coast.webp`: original generated photograph used in the travel illustration, optimized to 900 × 600.
- Heebo font files: regular, bold, black; downloaded from Google Fonts, served locally, licensed under the accompanying SIL Open Font License.

The homepage hero uses the generic club illustration with a responsive HTML/CSS `community.ts` code window in `HeroVisual.jsx`. The previous music-app hero and track-fetching code illustration were removed. Project-specific artwork remains in the projects carousel.

The developer club illustration was generated using the built-in ImageGen tool with this prompt:

> Use case: illustration-story. Asset type: the main isolated hero artwork for a modern university developer club website, to replace a music app screenshot. Create a sophisticated, beautifully art-directed 3D editorial illustration of three diverse young adult university developers collaborating around one shared charcoal desk. One person explains code on a wide monitor while another types on a laptop and the third reviews alongside them. Friendly collaborative working session, not a corporate meeting. The developers have natural adult proportions, refined understated faces and clothing, not chibi, not toys. Detailed matte materials, dark charcoal and slate surfaces, warm pale skin tones and natural hair, small vivid golden-yellow clothing and equipment accents matching #ffdb30. Main monitor and laptop screens display an anonymous code editor with colored syntax lines on dark backgrounds; no identifiable app interface, no music, no album covers, no product dashboards. Include a small subtle branching workflow motif integrated as thin illuminated yellow lines between the shared monitor and laptops, suggesting working together. Composition: compact cohesive vignette, landscape 4:3, elevated three-quarter view, scene centered and fills the frame with breathing room around the edges. All people, chairs and devices must be fully inside the canvas, no cropping of bodies or equipment. Strong central screen as focal point, gentle realistic contact shadows within the objects, controlled cinematic screen glow. Isolated artwork on truly transparent background with no ground plane extending to the canvas edges, so it can sit on a #101416 webpage. Avoid text, labels, legible words, logos, watermarks, giant floating UI panels, generic neon cyberpunk decorations, purple haze, smiley stock-photo poses. No text anywhere; the website will add its own crisp code panel separately.

The UI illustrations were authored as SVG to keep their text and geometry sharp. The travel photograph was generated using the built-in ImageGen tool with this prompt:

> Use case: photorealistic-natural. Asset type: a scenic photograph embedded inside a small travel website UI mockup. Primary request: beautiful Mediterranean Amalfi coast, pale limestone cliffs with green plants and a few pastel Italian houses at upper right, deep turquoise sea on left, sunlight and subtle summer haze, softly pink warm sky. Landscape 3:2 framing. Realistic natural travel editorial photograph, sharp, no text, no letters, no logo, no border, no interface, no watermark. The image must work as a destination hero photograph behind a white Discover Amazing Places headline at lower left.
