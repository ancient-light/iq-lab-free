# IQ Lab — Free English IQ Practice Test

A standalone static website for English-speaking audiences. Layout and teal palette are inspired by iqtest.net/iq-test; all 20 questions and their choices follow the screenshots supplied by the user. The first three diagrams are vector reconstructions; questions 4–20 use the supplied PNGs through precise SVG viewports. The duplicate screenshot of question 15 is omitted.

```sh
git clone https://github.com/ancient-light/iq-lab-free.git
cd iq-lab-free
npm run dev
npm test
```

Requires Node.js 20 or later. Open http://127.0.0.1:4179. No dependency installation or build step is required. Deploy the `dist/` directory.

Live website: https://iq-lab-free-b8b2.safe-stone-0941.chatgpt.site/

Run `npm test` separately to execute the scoring and geometry checks. See `ANSWER_AUDIT.md` for the independently verified answer key.

Includes 20 questions, a 20-minute timer, automatic advance after selecting an answer, editable answers, skipped-question review, local progress recovery, automatic submission on timeout, five skill breakdowns, explanations, a downloadable English report, and responsive layouts. The score measures correct answers on this practice set; it is not a standardized IQ score. No payments, accounts, or third-party resource requests are used by the test.

- Screenshot viewport metadata: `dist/screenshot-assets.mjs`
- Original supplied screenshots: `dist/assets/`
- Diagrams: `dist/diagrams.mjs`
- Questions: `dist/questions.mjs`
- Page: `dist/index.html`
- Interaction: `dist/app.mjs`
- Styles: `dist/style.css`

Hosting identity is saved in `.openai/hosting.json`. The test is free; the hosted Site is public and requires no login.

Answers and explanations were independently reasoned from the diagrams; the screenshots do not contain an official answer key. Visual counting answers are verified by geometric enumeration. Changing the question bank resets the browser session key to avoid grading old answers against different questions.
