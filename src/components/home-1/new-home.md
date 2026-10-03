# Homepage Spec v4 (input for opencode)

## Instructions for the coding agent

Update the existing **Home** page only. Do not change the Technology page yet. Build the sections **in the order below**; the order is the storyline. Use the copy verbatim unless a `[PLACEHOLDER]` is marked. Keep the site's existing styling and components; make each section a reusable component. Do not add claims, logos, stats, robot brand names or testimonials that are not in this file.

**Media placeholders:** every `[MEDIA: Axx]` tag refers to an entry in the **Asset manifest** at the bottom. Until the real file exists, render a 16:9 (or the stated ratio) neutral placeholder box showing the asset ID and description. When the file is dropped into the stated path, the component must pick it up with no code change. Video rules: `muted loop playsinline autoplay preload="metadata"` with a poster image; lazy-load anything below the fold; disable autoplay under `prefers-reduced-motion`.

---

## Naming (read first)

- **Spatia** is the brand. **Spatia AssembleX** is the intelligence layer platform that everything runs on.
- **Platform tagline (use verbatim):** From seeing the part to completing the task, Spatia brings intelligence directly to the robot.
- **Solutions built on the platform:**
  1. **Cognitive Assembly**
  2. **Dynamic Inspection, Vernier**
  3. **Zero-CAD platform** `[NAME PLACEHOLDER]`
- The name "AssembleX" now refers to the platform, not to the assembly solution alone.
- **Always pair "physical AI" with the qualifier:** CAD-native, deterministic, no training data. Do not imply end-to-end learned control.
- **Tone:** precise, engineering-led, plain language. No hype words. Do not name competitors on the page.
- **Do not name robot brands or state a number of supported robots anywhere on the page.**

## Storyline (structure borrowed from reference sites, wording is ours)

| # | Section | Pattern |
|---|---|---|
| 1 | Announcement bar | guide banner |
| 2 | Hero | category claim, 2 CTAs, video |
| 3 | Built-for strip | stand-in for customer logos |
| 4 | Key numbers band | stat band |
| 5 | Four advantages | advantage cards |
| 6 | Meet Spatia AssembleX | "what it is" platform intro |
| 7 | What we automate | numbered solutions with clips |
| 8 | How it works | three steps |
| 9 | Us vs typical AI vision | comparison table |
| 10 | Proof | demo video, case-study slots |
| 11 | Conversion band | "send us a part" |
| 12 | Brochure and partners | two blocks |
| 13 | Contact form | form |

---

## 1. Announcement bar

**Text:** New: how CAD-native perception works. **Link:** Read the overview → `/technology`

---

## 2. Hero

**Eyebrow:** Physical AI for manufacturing

**H1:** Robots that see, adapt and inspect on the factory floor.

**Subhead:** CAD-native perception for assembly and dynamic inspection. No training data. No custom fixtures.

**Primary CTA:** Book a demo → `/contact`
**Secondary CTA:** Explore solutions → `#solutions`

**Hero media:** looping video with two lanes: parts in a bin with pose overlays and a robot pick, and a moving part with a deviation highlight. `[MEDIA: A01]`

---

## 3. Built-for strip

Four short tags in one row, no logos:

**CAD-native · Robot-agnostic · Edge-deployed · No training data**

---

## 4. Key numbers band (3 stats)

| Stat | Label |
|---|---|
| 0 | Training images needed per new part |
| 600–1000 | Synthetic views generated per part from CAD |
| 1 | Robot-agnostic layer between perception and motion |

**Footnote (small text):** Validated in simulation. Real-rig validation in progress.

`[ADD real-hardware numbers when available, e.g. "X successful picks out of Y". Do not add accuracy (microns/mm), cost-reduction or pick-rate claims until measured.]`

---

## 5. Four advantages

**Section title:** Why manufacturers choose us

| Card | Copy |
|---|---|
| Start from CAD | Your existing CAD model is the only input a new part needs. No image collection, no labeling, no retraining. |
| Fixture-free | The system locates the actual part in real time, reducing or removing custom jigs and fixtures. |
| Robot-agnostic | One vision stack designed to work across robot brands, so perception is reusable as your fleet grows. |
| Debuggable, not a black box | The output is an explicit 6D pose. When something fails, the cause is traceable: calibration, occlusion, lighting or grasp. |

Small icon per card. `[MEDIA: A02 icon set]`

---

## 6. Meet Spatia AssembleX

**Eyebrow:** The intelligence layer

**H2:** Spatia AssembleX

**Tagline (verbatim):** From seeing the part to completing the task, Spatia brings intelligence directly to the robot.

**Copy:** AssembleX is the platform behind every Spatia solution. It turns a CAD model into a live 6D pose, then carries that pose through calibration, grasp definition, motion planning and execution, so the robot can act on what it sees.

**Diagram (four labeled stages, left to right):** See → Locate → Plan → Act
- See: RGB-D camera input
- Locate: exact 6D pose matched to CAD
- Plan: IK and collision-aware motion
- Act: grasp, place, verify

`[MEDIA: A03 platform diagram, animated SVG]`

**CTA:** See the technology → `/technology`

---

## 7. What we automate (`id="solutions"`)

**Section title:** Our focus in manufacturing
**Intro:** Two solutions and one platform, all running on Spatia AssembleX.

### 01 Cognitive Assembly

**Tagline:** Automate the handling that feeds your assembly line.

**Copy:** Cognitive Assembly finds parts in bins, trays and on conveyors, decides how to handle each one, and completes the task at the pace of your line, driven straight from your CAD models.

**Card-level clip:** parts brought from random positions to the assembly target with no fixtures. `[MEDIA: A04]`
*(Show pick-and-place alignment only. Do not depict force-based insertion until that capability ships.)*

**Tabs or chips, each with its own short clip:**

| Chip | Line | Media |
|---|---|---|
| Pick | Reach into bins and trays without fixtures. | `[MEDIA: A05]` |
| Sort | Recognize parts and route each one. | `[MEDIA: A06]` |
| Stack | Build ordered layers from random infeed. | `[MEDIA: A07]` |
| Load | Feed machines and downstream stations. | `[MEDIA: A08]` |
| Place | Set parts at the target with alignment corrections. | `[MEDIA: A09]` |

**CTA:** Explore Cognitive Assembly → `/cognitive-assembly` `[PAGE TO BE DESIGNED]`

### 02 Dynamic Inspection: Vernier

**Tagline:** Compare every part to its CAD, in motion.

**Copy:** Vernier runs on Spatia AssembleX to check live parts against their design geometry and flag deviations, including on moving parts.

**Chips:** Dimensional checks · Deviation flagging · Conveyor-tracked parts

**Media:** clip of a part passing the camera with a deviation highlighted `[MEDIA: A10]`; still of a deviation heat-map against the CAD `[MEDIA: A11]`

**CTA:** Join the early-access list → `/contact?interest=vernier`
**Badge:** **Early access** (roadmap)

### 03 Zero-CAD platform `[NAME PLACEHOLDER]`

**Tagline:** No CAD model? Start anyway.

**Copy:** For parts without a usable CAD file, a separate platform learns objects directly from the scene. `[CONFIRM BEHAVIOR WITH ENGINEERING]`

**Media:** clip of an unknown object being scanned and then picked `[MEDIA: A12]`

**CTA:** Talk to us → `/contact?interest=zero-cad`
**Badge:** **Coming soon** `[CONFIRM STATUS]`

Layout: one large media block per solution, alternating left and right.

---

## 8. How it works: three steps

**Section title:** From CAD to cell in three steps
**Link below:** See the technology → `/technology`

| Step | Copy | Media |
|---|---|---|
| 1. Upload | Drop in your part's CAD model. The system generates reference views automatically. | `[MEDIA: A13]` CAD upload screen recording |
| 2. Define | Set the grasp offset relative to the part and connect your camera and robot. | `[MEDIA: A14]` grasp definition screen recording |
| 3. Run | The system finds each part's exact position and orientation and the robot handles it. | `[MEDIA: A15]` live run with pose overlay |

**Line under steps:** No training step. Designed so a new part goes live the same day. `[Keep "designed so" until real-hardware validation exists.]`

---

## 9. Us vs typical AI vision

**Section title:** Built for the factory floor, not the demo stage

| | Typical AI vision | Spatia AssembleX |
|---|---|---|
| New part | Collect images, label, retrain | Start from CAD |
| Output | Opaque prediction | Exact 6D pose with traceable failure causes |
| Compute | Heavy GPU or foundation-model inference | Runs on industrial edge hardware |
| Robots | Tied to one vendor's ecosystem | One vision stack designed for multiple robot brands |

---

## 10. Proof

**Section title:** See it working

**Main media:** lab demo video of a real rig once recorded. Until then, use the simulation demo with a visible "Simulation" label. `[MEDIA: A16]`

**Case-study cards (2):** "Cognitive Assembly case study: coming soon" and "Inspection case study: coming soon". `[MEDIA: A17, A18 thumbnails]` `[Hide this row if you prefer nothing that says "coming soon" here.]`

**Do not use testimonials, customer quotes or logos until real ones exist.**

---

## 11. Conversion band

**H2:** Send us a part. See it handled.

**Copy:** Share a CAD file and your use case. We'll show you how it runs on your part.

**CTA:** Send us your part → `/contact?interest=send-a-part`

**Background media (subtle, optional):** slow loop of a part being picked `[MEDIA: A19]`

**Note:** only add a time promise (e.g. "within 72 hours") if operations can honor it. `[DECISION]`

---

## 12. Brochure and partners (two side-by-side blocks)

**Block A: Dive deeper**
**Copy:** Download the overview of Spatia AssembleX, Cognitive Assembly and Vernier.
**CTA:** Download brochure → `[MEDIA: A20 PDF]`

**Block B: For system integrators**
**Copy:** Reuse one CAD-native vision stack across robot brands and customer projects.
**CTA:** Become a partner → `/contact?interest=partner`

---

## 13. Contact form

**Fields:** Name · Work email · Company · Interest (dropdown: Cognitive Assembly, Vernier, Zero-CAD platform, Partnership) · Message · How did you hear about us? (Search, Event, Referral, LinkedIn, Other)
**Submit label:** Request a demo

---

## Footer

**Platform:** Spatia AssembleX
**Solutions:** Cognitive Assembly · Vernier · Zero-CAD platform
**Company:** Technology · Contact
Keep existing legal links.

---

## SEO

- **Title:** Spatia AssembleX | Physical AI for Manufacturing
- **Meta description:** Physical AI for manufacturing. CAD-native perception for cognitive assembly and dynamic inspection with no training data or custom fixtures.
- **Primary keywords:** physical AI manufacturing, CAD-based pose estimation, zero-shot 6D pose, robot bin picking, dynamic inspection, fixtureless robot picking
- **Social share image:** `[MEDIA: A21]` 1200x630

---

## Asset manifest (media placeholders)

Put files in `/public/media/home/`. Video: MP4 (H.264), 1920x1080, 6 to 10 s seamless loop, no audio, under 4 MB each, plus a `-poster.webp`. Stills: WebP, 1600 px wide.

| ID | File name | Section | Type | What it shows |
|---|---|---|---|---|
| A01 | hero-loop.mp4 | 2 Hero | Video | Bin picking with pose overlays, plus moving part with deviation highlight |
| A02 | advantage-icons.svg | 5 Advantages | Icon set | Four line icons |
| A03 | platform-diagram.svg | 6 Platform | Animated SVG | See → Locate → Plan → Act |
| A04 | assembly-overview.mp4 | 7-01 | Video | Parts brought to an assembly target without fixtures |
| A05 | asm-pick.mp4 | 7-01 Pick | Video | Robot picks from a bin |
| A06 | asm-sort.mp4 | 7-01 Sort | Video | Mixed parts recognized and routed |
| A07 | asm-stack.mp4 | 7-01 Stack | Video | Parts stacked in ordered layers |
| A08 | asm-load.mp4 | 7-01 Load | Video | Part loaded into a machine or station |
| A09 | asm-place.mp4 | 7-01 Place | Video | Part placed with alignment correction |
| A10 | vernier-inspect.mp4 | 7-02 | Video | Part passes camera, deviation flagged |
| A11 | vernier-deviation.webp | 7-02 | Still | Deviation heat-map against CAD |
| A12 | zerocad-scan-pick.mp4 | 7-03 | Video | Unknown object scanned then picked |
| A13 | step1-upload.mp4 | 8 Step 1 | Screen recording | CAD upload |
| A14 | step2-define.mp4 | 8 Step 2 | Screen recording | Grasp definition |
| A15 | step3-run.mp4 | 8 Step 3 | Video | Live run with pose overlay |
| A16 | proof-demo.mp4 | 10 Proof | Video | Lab or simulation demo (label "Simulation" if sim) |
| A17 | case-assembly.webp | 10 Proof | Still | Case-study thumbnail |
| A18 | case-inspection.webp | 10 Proof | Still | Case-study thumbnail |
| A19 | cta-loop.mp4 | 11 CTA | Video | Slow background pick loop |
| A20 | brochure.pdf | 12 Brochure | PDF | Product overview |
| A21 | og-image.png | SEO | Image | Social share, 1200x630 |

---

## Claim-compliance table (read before publishing)

| Statement on page | Backing status | Rule |
|---|---|---|
| CAD-based onboarding; 600 to 1000 synthetic views | Production-ready | OK |
| Zero-shot pose, no training | Sim-validated, real hardware in progress | Say "validated in simulation"; no field claims |
| Robot-agnostic | Architecture is robot-agnostic; internal evidence is one simulator implementation plus a second robot in progress | Say "designed for multiple robot brands". Do not name brands, give a count, or say "works with any robot" |
| "From seeing the part to completing the task" | Pick in progress, place in development, not validated end to end | Positioning line only; do not promise full task completion in feature copy |
| "Cognitive" in Cognitive Assembly | Name only | Do not claim reasoning or learning beyond pose estimation, motion and planned failure detection |
| Pick, place, sort, stack, load | Pick in progress; place in development; sort/stack/load not in inventory | Chips only; confirm with engineering before promising. Media must be real footage or labeled simulation |
| Vernier (inspection) | Roadmap, not started | **Early access**; no accuracy claims |
| Zero-CAD platform | Outside documented scope boundaries | **Coming soon** until scope docs are updated |
| "Physical AI" category | Positioning term | Always pair with the CAD-native, deterministic qualifier |
| Same-day go-live | Core promise | "Designed so" wording until real-hardware validation |
| Accuracy (microns/mm), cost savings, pick rates, customer logos, testimonials | No data yet | Do not publish |
| Force-based insertion | Roadmap | Do not mention or depict |

---

## Naming options for the zero-CAD platform

Scout · Freeform · Blueprintless · SeeAny · Origin  