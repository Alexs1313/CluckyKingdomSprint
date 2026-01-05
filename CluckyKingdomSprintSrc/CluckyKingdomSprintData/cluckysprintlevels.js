export const cluckysprintlevels = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;

  const time = Math.max(12, 45 - Math.floor(id * 0.75));

  let needs = {};

  if (id <= 5) {
    needs = {
      orange: 3 + Math.floor(id / 2),
      grape: 2,
      lemon: 2,
      cherry: 2,
    };
  } else if (id <= 10) {
    needs = {
      orange: 4 + (id % 3),
      grape: 3 + (id % 2),
      lemon: 3,
      cherry: 3,
    };
  } else if (id <= 20) {
    needs = {
      orange: 6 + (id % 4),
      grape: 5 + (id % 3),
      lemon: 4 + (id % 2),
      cherry: 4 + (id % 3),
    };
  } else if (id <= 30) {
    const main = id % 4;

    needs = {
      orange: main === 0 ? 12 + (id % 3) : 6 + (id % 2),
      grape: main === 1 ? 12 + (id % 3) : 6 + (id % 2),
      lemon: main === 2 ? 11 + (id % 3) : 5 + (id % 2),
      cherry: main === 3 ? 11 + (id % 3) : 5 + (id % 2),
    };
  } else if (id <= 40) {
    needs = {
      orange: 10 + (id % 4),
      grape: 9 + (id % 4),
      lemon: 9 + (id % 3),
      cherry: 9 + (id % 3),
    };
  } else {
    needs = {
      orange: 14 + (id % 4),
      grape: 13 + (id % 4),
      lemon: 12 + (id % 3),
      cherry: 12 + (id % 3),
    };
  }

  return { id, time, needs };
});
