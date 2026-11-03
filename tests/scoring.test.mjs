import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, categories, scoreAnswers } from '../dist/questions.mjs';
test('20-question bank with four valid options and explanations', () => {
  assert.equal(questions.length, 20);
  for (const q of questions) { assert.equal(q.options.length, 4); assert.equal(new Set(q.options).size, 4); assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4); assert.ok(q.explanation.length > 15); }
  assert.deepEqual(categories.map((_, i) => questions.filter(q => q.category === i).length), [2, 4, 8, 4, 2]);
});
test('all correct gives 100 and full marks in every dimension', () => {
  const result = scoreAnswers(questions.map(q => q.answer));
  assert.equal(result.score, 100); assert.equal(result.correct, 20); assert.ok(result.dimensions.every(d => d.correct === d.total));
});
test('skipped answers are never counted as correct', () => {
  assert.equal(scoreAnswers(Array(20).fill(null)).score, 0);
  assert.equal(scoreAnswers([]).score, 0);
});
test('mixed answers produce independently expected totals', () => {
  const result = scoreAnswers([2, 3, 3, 1, 3, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
  assert.equal(result.correct, 5); assert.equal(result.score, 25); assert.deepEqual(result.dimensions.map(d => d.correct), [1, 1, 2, 1, 0]);
});
test('triangle-count answer includes every connected non-collinear triple', () => {
  const points = { A: [0, 0], B: [2, 0], C: [4, 0], D: [1, 1], E: [3, 1], F: [2, 2], P: [1.5, .5] };
  const lines = ['AC', 'AF', 'CF', 'DB', 'BE', 'DE', 'AE'];
  const cross = (a, b, c) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const on = (p, a, b) => cross(a, b, p) === 0 && [0,1].every(i => p[i] >= Math.min(a[i], b[i]) && p[i] <= Math.max(a[i], b[i]));
  const connected = (a, b) => lines.some(([u,v]) => on(points[a], points[u], points[v]) && on(points[b], points[u], points[v]));
  const vertices = Object.keys(points);
  let count = 0;
  for (let i=0;i<vertices.length;i++) for (let j=i+1;j<vertices.length;j++) for(let k=j+1;k<vertices.length;k++) {
    const [a,b,c] = [vertices[i],vertices[j],vertices[k]];
    if(cross(points[a],points[b],points[c]) !== 0 && connected(a,b) && connected(a,c) && connected(b,c)) count++;
  }
  assert.equal(count, 13);
  assert.equal(Number(questions[2].options[questions[2].answer]), count);
});
test('remaining counting puzzles match independent geometric enumeration', () => {
  const countTriangles = (points, lines) => {
    const cross = (a,b,c) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
    const on = (p,a,b) => Math.abs(cross(a,b,p)) < 1e-8 && [0,1].every(i => p[i] >= Math.min(a[i],b[i])-1e-8 && p[i] <= Math.max(a[i],b[i])+1e-8);
    const connected = (a,b) => lines.some(([u,v]) => on(points[a],points[u],points[v]) && on(points[b],points[u],points[v]));
    const vs=Object.keys(points);let count=0;
    for(let i=0;i<vs.length;i++)for(let j=i+1;j<vs.length;j++)for(let k=j+1;k<vs.length;k++){
      const [a,b,c]=[vs[i],vs[j],vs[k]];
      if(Math.abs(cross(points[a],points[b],points[c]))>1e-8&&connected(a,b)&&connected(a,c)&&connected(b,c))count++;
    }
    return count;
  };
  const thirteen=countTriangles({A:[0,0],B:[1,0],C:[2,0],D:[0,1],E:[1,1],F:[2,1],G:[0,2],H:[2,2],P:[1.5,.5]},['AC','CH','HG','GA','AH','CG','DF','BE','BF']);
  const eighteen=countTriangles({A:[0,0],B:[4,0],C:[2,4],D:[1,2],E:[3,2],P:[2,4/3]},['AB','AC','BC','AE','BD']);
  let squares=0;const verticals=[0,2,3,4],horizontals=[0,1,2,4];
  for(const x of verticals)for(const y of horizontals)for(let size=1;size<=4;size++)if(verticals.includes(x+size)&&horizontals.includes(y+size))squares++;
  assert.equal(thirteen,20);assert.equal(eighteen,8);assert.equal(squares,10);
  for(const [index,count] of [[7,squares],[12,thirteen],[17,eighteen]]) assert.equal(Number(questions[index].options[questions[index].answer]),count);
});
// This key is the outcome of the screenshot audit, independent of questions[].answer.
const auditedKey = ['C','D','D','B','D','B','C','A','C','C','D','B','A','B','B','A','D','C','D','C'].map(letter => 'ABCD'.indexOf(letter));
test('all 80 possible single-question choices agree with the audited key', () => {
  for(let question=0;question<20;question++) for(let option=0;option<4;option++) {
    const answers=Array(20).fill(null);answers[question]=option;
    const expected=option===auditedKey[question]?1:0;
    const result=scoreAnswers(answers);
    assert.equal(result.correct,expected,`Question ${question+1}, option ${'ABCD'[option]}`);
    assert.equal(result.score,expected*5);
    assert.equal(result.dimensions.reduce((sum,d)=>sum+d.correct,0),expected);
  }
});
test('all 21 scores from 0 to 100, wrong answers, edits, and extra input are graded correctly', () => {
  for(let correct=0;correct<=20;correct++) {
    const result=scoreAnswers(auditedKey.map((answer,i)=>i<correct?answer:(answer+1)%4));
    assert.equal(result.correct,correct);assert.equal(result.score,correct*5);
  }
  const answers=auditedKey.slice();assert.equal(scoreAnswers(answers).score,100);
  answers[0]=0;assert.equal(scoreAnswers(answers).score,95);
  answers[0]=2;assert.equal(scoreAnswers(answers).score,100);
  assert.equal(scoreAnswers([...answers,0,1,2,3]).score,100);
});
