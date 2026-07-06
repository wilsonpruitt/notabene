# Prompt for next session — Danish body production

*Paste the block below after `/clear`. Working directory is `~/Downloads/prefaces/`.*

---

We're working on the Forord phantom-volumes project — a Kierkegaardian speculative-philosophy work in the form of a critical edition of an imagined Danish authorship (Nicolaus Notabene, 1844–1847), produced as-if-for-print but destined for a sub-site of `wrootpress.com`. The English corpus is textually complete (~136,500 words). The major remaining commitment is the **Danish body text** — period 1840s Copenhagen Danish for the eight phantom volumes and Vol IX, paired with the existing English on a bilingual site modeled on `ambrose.actasanctorum.org`.

**Before doing anything else, read these in order:**

1. `~/Downloads/prefaces/translator_note.md` — the production spec. Orthographic conventions, the systematic key-terms table, foreign-matter handling, punctuation, sentence structure. This is the working brief for the Danish.
2. `~/Downloads/prefaces/general_introduction_henriksen_2026.md` — substantive editorial framing of the whole corpus.
3. `~/Downloads/prefaces/urania_1845.md` — the calibration reference for Notabene's period prose. First volume composed in Notabene's biographical order.
4. `~/Downloads/prefaces/volume_09_liv_og_tid.md`, §§ III–IV — the *Skilsmissebrev* of 28 August 1846 and the burnt *Indlednings-Paragrapher* fragment. The only sustained period-Danish passages already drafted; they calibrate the register.

Also load the project memory `forord-phantom-volumes.md` and the feedback memory `feedback_as-if-for-print-earnestness.md` — both are load-bearing.

## What we're producing

For each of the 8 phantom volumes plus Vol IX, the Danish version of the body text. The Danish is *not* a translation back from the English — it's the *original* in our fiction, of which the English is the Henriksen translation. The Danish should read as natural period 1840s Copenhagen Danish in Notabene's voice. The English follows as the target.

English files for the eight phantom volumes: `~/Downloads/prefaces/preface_0{1,2,3,5,6,7,8}_*.md` plus `urania_1845.md`. Biographical companion: `volume_09_liv_og_tid.md`.

## Orthographic conventions (per Translator's Note § II)

- Period spelling: *aa* for modern *å* (so *Forord*, *Aand*, *Aar*, *Maa*, *Selskab*; never *Forord*, *Ånd*, *år*, *må*)
- All common nouns capitalised, per pre-1948 period practice (*Manden*, *Bogen*, *Selskabet*, *Aanden*)
- Long-s (ſ) preserved on title pages only; modern short-s in body text
- Period compound-word freedom (*Selskabs-Idee*, *Total-Afholdenheds-Selskab*, *Mediations-Læren*, *Indlednings-Paragraph*, *Aarbogs-Skriverkarl*)
- Period punctuation: em-dashes at original length; semicolons in places modern Danish would use commas; periodic sentences not broken for readability
- Subordinate-clause connectors at period frequency: *idet*, *forsaavidt*, *medens*, *ihvorvel*

## Foreign matter (per Translator's Note § V)

- German loanwords Notabene retained in German *stay* German in the Danish — do not translate them: *Mediation*, *Aufhebung*, *plötzlich*, *Sein*, *Nichts*, *Werden*, *Sitte der Zeit*, *Vollziehen*, *Begriff* (when used in the Hegelian sense)
- Latin tags retained: *posito*, *salva conscientia*, *captatio benevolentiæ*, *summa summarum*, *in subsidio*, *in vacuo*, *in succum et sanguinem*
- Greek passages: in Greek script in the Danish

## Suggested production order

1. **Vol I — *Det logiske System*** (proof-of-concept). Shortest of the major volumes, single dominant register (mock-Heibergian satire), most settled philosophical vocabulary, multiple distinct prose forms (Fortale, §§ 1–4, Anhang, Tillæg, Subscriber's Roll). Locks the lexicon and orthography for the corpus.
2. **Vol IV — *Urania*** (first composed historically; most generically varied — treatise, apocalyptic poem, domestic novel chapter, calendar, fictional embassy letter, editor's afterword).
3. Then the rest in Notabene's biographical order: **VIII** (philosophical journal — Socratic prose), **V** (temperance pamphlet — institutional-corporate register), **VI** (Sophiensen sermons — Hegelianised homiletic pastiche; the heaviest speculative-theological register), **III** (Anden Udgave — short, much vocabulary already established from I), **II** (lyric productions — most personal, leanest), **VII** (*Smaastykker* — open Notabene voice, *Springet*-doctrine vocabulary established in the burnt fragment of Vol IX § IV).
4. **Vol IX last** — biographical companion has mixed registers: Henriksen's editorial frame is English-only; the Skilsmissebrev and burnt fragment are already period Danish; the Notabene–Reitzel correspondence needs period Danish; the Vibskov 1962 essay needs *mid-20c Danish literary-historical register* — distinct from Notabene's 1840s register.

## Voice considerations — four distinguishable registers

- **Mock-deferential Notabene** (Vols. I, III, IV, V, VIII): courtly mock-deference of the *Forord*-volumes. Periodic, polite, perpetually astonished at his own audacity. Most ornate of the registers.
- **Speculative-pastiche Sophiensen** (Vol. VI only): Hegelianised theological homiletic. Speculative vocabulary deployed at sustained intensity. Should read as plausible 1840s speculative theology, not as caricature.
- **Bone-tired anonymous lyric author** (Vol. II only): leaner, quieter, more direct. Less periodic. Prose has the discipline of someone declining to be ornate.
- **Openly-signed Notabene** (Vol. VII only): direct, philosophical, less ornate than the mock-deferential register. The register of a writer no longer concealing himself behind the editorial-fiction scaffold.

## Working mechanics

- Save each volume's Danish to a separate file alongside the English: `preface_01_logical_system_danish.md`, etc. Site architecture later decides how to pair them; for now keep them as working files.
- Work section-by-section against the existing English. Don't try to produce Danish for a whole volume at once.
- The English may need minor adjustments after the Danish is drafted, where a Danish formulation suggests a better English rendering than the original target. Flag adjustments; don't silently change the English.
- Wilson is a Methodist pastor with serious interest in scholastic philosophy and primary sources. Danish reading knowledge but not native. Writes in Ulysses + markdown. He wants high voice quality, period-accurate orthography, plausible 1840s Copenhagen Danish. The earnestness *is* the work (see `feedback_as-if-for-print-earnestness`); collapsing toward modern Danish or toward translation-Danish defeats it.

## Recommended starting move

Read the four orientation documents above; then propose a small proof-of-concept Danish passage from Vol I — the opening of the *Fortale*, ~200 Danish words, with the corresponding English at `preface_01_logical_system.md` lines 36–60. Once Wilson confirms the voice works, proceed through the *Fortale* in full, then §§ 1–4, then the *Anhang*. Don't commit to a large body of Danish before the voice is calibrated against Wilson's ear.

After Vol I is in hand and the voice is locked, the rest of the corpus follows on the same template.

The project's full state of completion is in `forord-phantom-volumes.md` in memory. The dual frame (as-if-for-print earnestness, end-state Wroot Press sub-site) and the Kierkegaardian particularity are the load-bearing principles.
