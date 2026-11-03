export const categories = ['Pattern Recognition', 'Visual Counting', 'Numerical Reasoning', 'Spatial Reasoning', 'Abstract Reasoning'];
export const questions = [
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "triangle-values",
    "diagramDescription": "Top row: one triangle, two triangles, three triangles. Bottom row: 3, 6, ?.",
    "options": [
      "5",
      "12",
      "9",
      "8"
    ],
    "answer": 2,
    "source": "user-screenshot",
    "explanation": "One triangle corresponds to 3 and two triangles correspond to 6. Each triangle contributes 3, so three triangles correspond to 9. The correct option is C."
  },
  {
    "category": 0,
    "title": "Choose one of the options to replace the missing square",
    "visual": "alternating-arrows",
    "diagramDescription": "Top row: filled right arrow, outlined up arrow, filled right arrow. Bottom row: outlined up arrow, filled right arrow, ?.",
    "options": [
      "Filled left arrow",
      "Filled down arrow",
      "Outlined down arrow",
      "Outlined up arrow"
    ],
    "optionVisuals": [
      {
        "direction": "left",
        "outlined": false
      },
      {
        "direction": "down",
        "outlined": false
      },
      {
        "direction": "down",
        "outlined": true
      },
      {
        "direction": "up",
        "outlined": true
      }
    ],
    "answer": 3,
    "source": "user-screenshot",
    "explanation": "Read the cells from left to right across both rows. A filled right arrow alternates with an outlined up arrow. The missing cell is an outlined up arrow: option D."
  },
  {
    "category": 1,
    "title": "How many triangles are in the picture?",
    "visual": "count-triangles",
    "diagramDescription": "A downward triangle. Label its top-left, top-middle and top-right points A, B and C; the left midpoint D, the right midpoint E and the bottom vertex F. Draw DB, BE, DE and AE. P is the intersection of AE and DB.",
    "options": [
      "8",
      "9",
      "11",
      "13"
    ],
    "answer": 3,
    "source": "user-screenshot",
    "explanation": "There are 13 triangles, including overlapping triangles and the outer triangle. Label the top points A, B, C from left to right, the side midpoints D and E, the bottom F, and the crossing P. The triangles are ABD, ABE, ABP, ACE, ACF, ADE, ADP, AEF, BCE, BDE, BEP, DEF, and DEP. The correct option is D."
  },
  {
    "category": 3,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-4",
    "diagramDescription": "Five overlapping circles with a square missing at the overlap of the middle circle and the two right-hand circles.",
    "options": [
      "Circular arcs A",
      "Circular arcs B",
      "Circular arcs C",
      "Circular arcs D"
    ],
    "answer": 1,
    "source": "user-screenshot",
    "explanation": "Trace the three circle boundaries into the missing square. Their entry points, curvature, and intersections match option B. The other choices omit an arc or bend it in the wrong direction."
  },
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-5",
    "diagramDescription": "Three rows: 3, 7, 12; 23, 26, 30; 48, 53, ?.",
    "options": [
      "61",
      "58",
      "64",
      "59"
    ],
    "answer": 3,
    "source": "user-screenshot",
    "explanation": "In each row, the second step is one greater than the first: +4 then +5; +3 then +4; +5 then +6. Therefore 53 + 6 = 59, option D."
  },
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-6",
    "diagramDescription": "Top row: a quarter circle, a semicircle, a full circle. Bottom row: 16, 32, ?.",
    "options": [
      "48",
      "64",
      "92",
      "56"
    ],
    "answer": 1,
    "source": "user-screenshot",
    "explanation": "A quarter circle is 16 and a half circle is 32. Doubling the area again gives a full circle worth 64. The correct answer is B."
  },
  {
    "category": 0,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-7",
    "diagramDescription": "A two-row grid of hearts and smiles. The first two bottom cells are horizontal reflections of the cells directly above. The third bottom cell is missing.",
    "options": [
      "Two hearts at top-right and bottom-left, smile at bottom-right",
      "Smiles at top-left and bottom-left, heart at right-center",
      "Smile at top-right and heart at bottom-left",
      "Heart at top-right and smile at bottom-left"
    ],
    "answer": 2,
    "source": "user-screenshot",
    "explanation": "Each bottom-row cell is a horizontal reflection of the cell above it. Reflect the last top cell: the smile moves from top-left to top-right, and the heart moves from bottom-right to bottom-left. That is option C."
  },
  {
    "category": 1,
    "title": "How many squares are in the picture?",
    "visual": "screenshot-8",
    "diagramDescription": "A square rotated 45 degrees and divided by four internal lines. In upright coordinates from 0 to 4, the internal vertical lines are at 2 and 3, and the internal horizontal lines are at 1 and 2.",
    "options": [
      "10",
      "6",
      "12",
      "8"
    ],
    "answer": 0,
    "source": "user-screenshot",
    "explanation": "Count squares of every size: 4 smallest squares, 4 squares with sides twice as long, 1 square with sides three times as long, and the outer square. The total is 4 + 4 + 1 + 1 = 10, option A."
  },
  {
    "category": 3,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-9",
    "diagramDescription": "Two sets of parallel diagonal lines, with a square missing near the center.",
    "options": [
      "One descending line crossing one rising line near the right",
      "Two parallel rising lines and two partial descending segments",
      "One descending line crossing two parallel rising lines",
      "One descending line crossing one rising line near the top"
    ],
    "answer": 2,
    "source": "user-screenshot",
    "explanation": "Continue each visible line through the gap without changing its slope. The missing piece contains one descending diagonal and two separate rising diagonals, matching option C."
  },
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-10",
    "diagramDescription": "Three rows: 2, 4, 12; 7, 14, 42; 12, 24, ?.",
    "options": [
      "84",
      "48",
      "72",
      "96"
    ],
    "answer": 2,
    "source": "user-screenshot",
    "explanation": "Each row doubles the first number, then triples the second: 2 × 2 = 4 and 4 × 3 = 12; 7 × 2 = 14 and 14 × 3 = 42. So 24 × 3 = 72, option C."
  },
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-11",
    "diagramDescription": "One horizontal bar above 4, two bars above 16, three bars above a question mark.",
    "options": [
      "32",
      "28",
      "56",
      "64"
    ],
    "answer": 3,
    "source": "user-screenshot",
    "explanation": "The number of bars gives the exponent of 4: one bar represents 4¹ = 4, two represent 4² = 16, and three represent 4³ = 64. The correct answer is D."
  },
  {
    "category": 4,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-12",
    "diagramDescription": "Top row: an X, a plus sign, their overlay. Bottom row: a rising diagonal, a vertical line, a question mark.",
    "options": [
      "Vertical line and descending diagonal",
      "Vertical line and rising diagonal",
      "Horizontal line and rising diagonal",
      "Two diagonals forming an X"
    ],
    "answer": 1,
    "source": "user-screenshot",
    "explanation": "In each row, the third square combines the lines from the first two squares. A rising diagonal plus a vertical line produces option B."
  },
  {
    "category": 1,
    "title": "How many triangles are in the picture?",
    "visual": "screenshot-13",
    "diagramDescription": "A square with both full diagonals and a horizontal midline. The top midpoint is joined to the center and the right midpoint, subdividing the upper-right quadrant.",
    "options": [
      "20",
      "9",
      "16",
      "21"
    ],
    "answer": 0,
    "source": "user-screenshot",
    "explanation": "Including triangles formed from several smaller regions, there are 20. Label the top points A, B, C, the middle points D, E, F, the bottom corners G, H, and the upper-right crossing P. The triangles are ABE, ACE, ACG, ACH, ADE, AEG, AGH, BCE, BCF, BCP, BEF, BEP, CEF, CEH, CFP, CGH, DEG, EFH, EFP, and EGH. Choose A."
  },
  {
    "category": 3,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-14",
    "diagramDescription": "Two overlapping five-point stars, with a missing square over the central overlap.",
    "options": [
      "Upward point with two short horizontal sides",
      "Horizontal upper segment and crossing sloping segments",
      "Two crossing diagonals above a downward fork",
      "Horizontal segment extending right and crossing diagonals below"
    ],
    "answer": 1,
    "source": "user-screenshot",
    "explanation": "Follow the outlines of both stars across the gap. The horizontal segment near the top and the intersecting sloping edges continue correctly in option B."
  },
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-15",
    "diagramDescription": "Three rows: 4, 7, 6; 9, 14, 11; 16, 24, ?.",
    "options": [
      "21",
      "18",
      "14",
      "36"
    ],
    "answer": 1,
    "source": "user-screenshot",
    "explanation": "The right-hand number in each row is 2 more than the left-hand number: 4 → 6 and 9 → 11. Apply the same relationship to the last row: 16 + 2 = 18, option B."
  },
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-16",
    "diagramDescription": "A four-sided diamond above 32, a pentagon above 40, and a hexagon above a question mark.",
    "options": [
      "48",
      "56",
      "72",
      "24"
    ],
    "answer": 0,
    "source": "user-screenshot",
    "explanation": "Multiply the number of sides by 8. The diamond has 4 sides (32), the pentagon 5 (40), and the hexagon 6 (48). Choose A."
  },
  {
    "category": 4,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-17",
    "diagramDescription": "Top row: four-point, five-point, and six-point stars. Bottom row: a square, a pentagon, and a missing shape.",
    "options": [
      "Trapezoid",
      "Octagon",
      "Eight-point star",
      "Hexagon"
    ],
    "answer": 3,
    "source": "user-screenshot",
    "explanation": "The number of star points matches the number of polygon sides below it: 4 points → square, 5 points → pentagon, and 6 points → hexagon. The correct answer is D."
  },
  {
    "category": 1,
    "title": "How many triangles are in the picture?",
    "visual": "screenshot-18",
    "diagramDescription": "A downward-pointing triangle. Each top corner is connected to the midpoint of the opposite sloping side; the two interior lines cross.",
    "options": [
      "7",
      "11",
      "8",
      "4"
    ],
    "answer": 2,
    "source": "user-screenshot",
    "explanation": "There are 8 triangles. Label the top corners A and B, the bottom C, the left and right side midpoints D and E, and the crossing P. The triangles are ABC, ABD, ABE, ABP, ACE, ADP, BCD, and BEP. Choose C."
  },
  {
    "category": 3,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-19",
    "diagramDescription": "Overlapping upward- and downward-pointing triangles, with a smaller upward-pointing triangle inside. A square near the center-bottom is missing.",
    "options": [
      "Two upward-pointing peaks with a partial edge at the left",
      "Crossing diagonals with a short horizontal segment on the left",
      "An upward peak and a partial downward point at the left",
      "A downward point with crossing lines at top-left and a small triangle at top-right"
    ],
    "answer": 3,
    "source": "user-screenshot",
    "explanation": "Continue the large downward-pointing triangle into the gap: its lower vertex must appear inside the missing piece. The small inner triangle and the crossing at the upper-left must also align. Only option D matches all of these features."
  },
  {
    "category": 2,
    "title": "Choose one of the options to replace the missing square",
    "visual": "screenshot-20",
    "diagramDescription": "Three rows: 31, 24, 15; 53, 44, 33; 28, 22, ?.",
    "options": [
      "12",
      "19",
      "14",
      "15"
    ],
    "answer": 2,
    "source": "user-screenshot",
    "explanation": "Within each row, the second subtraction is 2 larger than the first: −7 then −9, and −9 then −11. The last row starts with −6, so the next step is −8: 22 − 8 = 14. Choose C."
  }
];
export function scoreAnswers(answers) {
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
  return { correct, score: correct * 5, dimensions: categories.map((name, category) => ({ name, correct: questions.reduce((n, q, i) => n + (q.category === category && answers[i] === q.answer ? 1 : 0), 0), total: questions.filter(q => q.category === category).length })) };
}
