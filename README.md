# The Widest Spread on the Tape — Qualcomm (QCOM) FQ3 2026 Earnings Preview

An interactive earnings preview published **July 28, 2026**, ahead of Qualcomm's fiscal Q3 report on **Wednesday, July 29, after market close**.

**Live site:** https://rene-math97.github.io/qcom-fq3-2026-widest-spread/

**No rating. No price target.**

---

## The finding

Thirty-six analysts cover Qualcomm. Their published price targets run from **$100 to $314**.

```
Spread            = $314 − $100      = $214
As share of price = $214 ÷ $162.88   = 131%
Ratio             = $314 ÷ $100      = 3.14×
```

Visa, reporting the same week, spans $330 to $450 — a **1.36×** ratio. Qualcomm's is **3.14×**, with a consensus rating of **Hold**.

**That dispersion is not confusion. It is a dated, quantified fork**, and both halves come from Qualcomm's own mouth.

## Half one: the exit is on the record

Asked directly about Apple on the April 29 call, CFO Akash Palkhiwala:

> "No change, Tim, to our assumption there. We have said **20% share of the phones that will launch in fall this year and no product relationship beyond that**."

On FY2027 he added that sell-side models around **"a little over $2 billion"** of QCT product revenue are **"a reasonable place to model the business."** The 10-Q is blunter: Apple's shift to in-house modems "will have a **significant negative impact** on our QCT revenues, results of operations and cash flows."

Most bear cases are forecasts. This one is guidance.

**Two agreements, different expiries** — conflating them is the most common error in QCOM commentary:

| | Chip supply | Patent licence |
|---|---|---|
| Status | Ends after fall 2026 launches | Runs to **March 2027** |
| Management view | "No product relationship beyond that" | "Same scale that it is at" |
| Margin | Thin modem, **below** corporate average | **72% EBT margin** |

Losing Apple removes revenue that was already dilutive to blended margin — so the earnings hit should be less than proportional to the revenue hit.

## Half two: the replacement is real, large, and barely started

At its **June 24, 2026 Investor Day**, Qualcomm raised the FY2029 non-handset target to **$40B — roughly double the prior target**:

| Target FY2029 | Goal | Annualising today | Gap |
|---|---|---|---|
| Automotive | **$10B** | ~$5.3B | Working — +38%, guided ~+50% |
| IoT | **>$14B** | ~$6.9B | Needs to roughly double |
| **Data Center** | **>$15B** | **$141M** (with QGOV), **−$121M EBT** | The leap |
| Non-GAAP EPS | **>$18** | $10.81 street FY26 | Today's price ≈ **9× that** |

Contracted: a **Meta** multi-generation CPU agreement (but the C1000 doesn't reach production until **H2 2028**), an **unnamed hyperscaler** shipping **December 2026**, **HUMAIN** at 200MW, plus **Alphawave** closed and **Modular** acquired to attack Nvidia's CUDA moat.

**A $314 target is roughly the $18 FY2029 EPS goal at a market multiple. A $100 target assumes the bridge never gets built.**

## Two things the page resolves

**The GAAP anomaly.** Last quarter reported **GAAP EPS of $6.88 against non-GAAP of $2.65**. An earlier version of this page flagged the gap without being able to explain it. Cause: a **$5.7B tax benefit worth $5.33/share** from releasing a valuation allowance after new Treasury/IRS CAMT guidance. All comparisons here use non-GAAP.

**A falsifiable management claim.** The China weakness is attributed to memory prices, not demand — shipments "materially under-shipped consumer demand" — and management dated the turn: handset revenue from Chinese customers "will reach a **bottom in the third quarter** and return to sequential growth in the following quarter." That is checkable on Wednesday.

## The model

```
Implied price = FY2027 EPS × Forward P/E
```

- **Managed Decline** ($10.81 × 15.0×) → **$162.15** — within a dollar of spot
- **Handset Cliff** ($8.50 × 12.0×) → **$102** — essentially the published $100 street low
- **Bridge Gets Built** ($12.00 × 18.0×) → **$216** — near the $220.57 average

No DCF: the terminal value turns on whether $40B of non-handset revenue arrives against a dated customer exit. That's a step function, not a growth rate.

## Sourcing standard

Primary SEC filings and the earnings transcript first, market data second, reporting last and flagged. My arithmetic tagged **computed**. Conflicts disclosed rather than resolved silently.

### Flagged at the point of use, not buried

- **The September price increase** (double-digit %, effective Sept 1) is a **single Bloomberg scoop from a client letter**. Qualcomm declined to comment; Reuters could not independently verify. Every other outlet traces to it.
- **The iPhone 18 modem reporting** rests on **documents stolen in a cyberattack** on Tata Electronics, and the outlet says it hasn't seen the files directly. **No Apple statement on any of this exists in 2026.**
- **Data centre FY2026/FY2027 revenue figures** circulating from Investor Day appear only in third-party write-ups and are **not used**. Only the company-sourced ">$15B by FY2029" appears.
- **Modular's price** is reported at "$3.9B"/"nearly $4B"; Qualcomm disclosed only "up to 19.2 million shares."

### Where filings beat the press

Secondary coverage widely dates the Arm countersuit trial to **March 2026** and the appeal to the **Federal Circuit**. The 10-Q says **October 5, 2026** and the **Third Circuit**. The filing wins.

### Disclosed conflicts

FQ3 consensus is **$2.23 on $9.68B** (two sources) versus **$1.93 on $10.2B** (a third) — the latter sits *below* the guided EPS floor and *above* the guided revenue ceiling simultaneously, so it isn't used. Forward P/E is 16.55× and 14.87×. Average target is $220.57 and $227.90. China Q2 shipments fell 4.3% (IDC) or 2% (Counterpoint).

---

## Stack

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no external data calls. Dark and light themes.

```
├── index.html          # redirect to web-app/
├── web-app/
│   ├── index.html      # the preview
│   ├── style.css       # design system + dispersion bar
│   └── app.js          # scenario engine, dispersion markers, margin bars
└── README.md
```

## Disclaimer

Independent research written for a public portfolio. **Not investment advice**, not a recommendation to buy or sell any security, and it carries no rating or price target. Do your own work.
