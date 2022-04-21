import { getLeftByEventPosition } from '../utils/layOutDay';
// import { eventsTest } from './eventsTest';

const DEFAULT_WIDTH: number = 600;

describe('test for getLeftByEventPosition function', () => {
  it('should return the left position - 200', () => {
    const eventLeft = 0;
    const eventWidth = 200;

    const left = getLeftByEventPosition(DEFAULT_WIDTH, eventLeft, eventWidth);
    expect(left).toBe(200);
  });

  it('should return the left position - 0, because 400 + 400 greater than DEFAULT_WIDTH(600)', () => {
    const eventLeft = 400;
    const eventWidth = 400;

    const left = getLeftByEventPosition(DEFAULT_WIDTH, eventLeft, eventWidth);
    expect(left).toBe(0);
  });
});
