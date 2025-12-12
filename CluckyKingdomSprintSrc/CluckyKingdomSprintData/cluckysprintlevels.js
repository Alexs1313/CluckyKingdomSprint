export const cluckysprintlevels = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const time = Math.max(15, 45 - Math.floor(id * 0.6));

  let needs = {};

  if (id <= 5) {
    needs = {
      orange: 1 + Math.floor(id / 2),
      grape: 1,
      lemon: 1,
      cherry: 1,
    };
  } else if (id <= 15) {
    needs = {
      orange: 1 + (id % 3),
      grape: 1 + (id % 2),
      lemon: 1 + Math.floor(id / 6),
      cherry: 1 + (id % 2),
    };
  } else if (id <= 30) {
    needs = {
      orange: 2 + (id % 4),
      grape: 2 + (id % 3),
      lemon: 2 + (id % 5),
      cherry: 2 + (id % 4),
    };
  } else if (id <= 40) {
    needs = {
      orange: 3 + (id % 4),
      grape: 3 + (id % 3),
      lemon: 3 + (id % 5),
      cherry: 3 + (id % 4),
    };
  } else {
    needs = {
      orange: 5 + (id % 3),
      grape: 5 + (id % 4),
      lemon: 5 + (id % 2),
      cherry: 5 + (id % 3),
    };
  }

  return { id, time, needs };
});
