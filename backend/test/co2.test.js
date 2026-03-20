import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCo2Savings } from '../src/utils/co2.js';

test('calculateCo2Savings multiplies distance and passengers', () => {
  assert.equal(calculateCo2Savings(10, 2), 2.4);
});
