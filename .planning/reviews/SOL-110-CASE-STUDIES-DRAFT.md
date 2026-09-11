No repo files were changed. I used the brainstorming skill to keep both drafts short and evidence-bound.

### `content/work/postmates.mdx`

```mdx
---
title: Postmates (Uber)
dek: Postmates promised to deliver everything. As a product analyst, I worked on market and fraud analysis while helping narrow that promise around core offerings. Acquired by Uber in 2020 for $2.65B.
role: Product analyst
tools:
  - Market analysis
  - Fraud analysis
  - Product positioning
year: 2020
status: shipped
titleCardWords:
  - EARLY.
  - EVERYTHING.
  - ANALYSIS.
  - FOCUS.
  - ACQUIRED.
client: Postmates
order: 5
feature:
  fig: $2.65B
  line: acquisition by Uber in 2020, after work to narrow the promise around core offerings.
indexLine: Market and fraud analysis in the wide-open era. Acquired by Uber in 2020 for $2.65B.
---

## The problem

I joined Postmates early as a product analyst in 2020. The company sold everything, with a promise to deliver everything.

Fraud was common within that wide-open model. One custom order requested 100 gallons of Hennessy in the Bronx.

The positioning problem was the breadth of the promise. Postmates needed to focus on core offerings rather than promise delivery of everything.

## What I did

**01. Analysis.** I worked on market and fraud analysis across the wide-open model.

**02. Positioning.** I helped Postmates cut back the promise and focus on its core offerings.

## Outcome

The promise shifted from delivering everything toward a narrower position around core offerings. Acquired by Uber in 2020 for $2.65B.

Postmates was one of four companies behind my work that reached an exit.
```

### `content/work/neuton.mdx`

```mdx
---
title: Neuton.AI
dek: I helped launch a foreign AI company by positioning its product for North America in 2020. Nordic Semiconductor acquired the technology in 2025; the price was never disclosed.
role: Helped launch
tools:
  - North American positioning
  - Product launch
year: 2025
status: shipped
titleCardWords:
  - EARLY.
  - AI.
  - POSITIONING.
  - LAUNCH.
  - ACQUIRED.
client: Neuton.AI
order: 6
feature:
  fig: "2025"
  line: technology acquired by Nordic Semiconductor. The price was never disclosed.
indexLine: Helped launch through North American positioning in 2020. Technology acquired by Nordic Semiconductor in 2025; the price was never disclosed.
---

## The problem

I joined Neuton.AI early in 2020, during the early days of AI products. As a foreign company, it needed help positioning the product for North America.

## What I did

**01. Positioning.** I worked on a North American position for the AI product.

**02. Launch.** I helped launch Neuton.AI with that market position in place.

## Outcome

The positioning work came before Nordic Semiconductor acquired Neuton.AI's technology in 2025. The price was never disclosed.

I held no cap-table position. Neuton.AI was one of four companies behind my work that reached an exit.
```

## 1. Stronger restatements and causal claims

None.

The Neuton draft deliberately says, “The positioning work came before Nordic Semiconductor acquired Neuton.AI's technology in 2025.” This preserves sequence without claiming that the positioning caused the acquisition.

The Postmates draft also presents the positioning change and acquisition separately.

## 2. Details requiring explicit publication approval

- Postmates: “Fraud was common within that wide-open model.”
- Postmates: The custom order for 100 gallons of Hennessy in the Bronx. This is the most sensitive detail.
- Postmates: The internal shift from delivering everything toward core offerings.
- Postmates: The claim that the operator personally helped narrow the promise.
- Neuton.AI: Describing the client publicly as a foreign company.
- Neuton.AI: Disclosing the 2020 North American positioning engagement.
- Neuton.AI: Stating that the positioning preceded the acquisition.
- Neuton.AI: “I held no cap-table position.” This already appears on the home page, but it remains a personal financial disclosure.

## 3. Schema fields not directly supplied

No requested field is empty. These values required editorial judgment:

- `tools`: No software tools were supplied. I used evidence-backed activity names, following the Guardicore precedent.
- `order`: I used `5` and `6` because the existing ordered studies occupy positions `1` through `4`.
- `status`: I used `shipped` because both engagements and their stated outcomes are complete.
- `titleCardWords`: These are editorial summaries drawn only from supplied facts.
- `feature`: The schema comment says only the study with `order: 1` uses this field. I included it because the brief explicitly requested it, although these values may not render.
- Neuton.AI `year`: I used `2025` as instructed, while the body identifies `2020` as the positioning and launch period.

## 4. Home-page copy and draft locations

Postmates renders:

- “Postmates”
  - Draft: `title` and `client`.
- “Product analyst · 2020”
  - Draft: `role`, `year`, and the first sentence under “The problem.”
- “Market and fraud analysis in the wide-open era · acquired by Uber, $2.65B”
  - Draft: `indexLine`.
  - Market and fraud analysis also appears in the `dek` and step 01.
  - The wide-open model appears under “The problem” and step 01.
  - The acquisition appears in the `dek`, `feature`, `indexLine`, and “Outcome.”

Neuton.AI renders:

- “Neuton.AI”
  - Draft: `title` and `client`.
- “Helped launch · 2025”
  - Draft: `role`, `year`, `dek`, step 02, and “Outcome.”
- “Technology acquired by Nordic Semiconductor · not a cap-table position”
  - Draft: `dek`, `feature`, `indexLine`, and “Outcome.”
  - The cap-table clarification appears explicitly in “Outcome.”

Both ledger rows appear under “Position” and “The story the market repeats.” Each draft therefore names the positioning problem and includes a numbered positioning step. The surrounding home-page statement about staying until a narrative sells is general practice copy, not a company-specific fact.