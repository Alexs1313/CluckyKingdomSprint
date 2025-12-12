export const cluckySprintKingdomFruitImages = {
  orange: require('../../assets/images/cluckySprintFruit1.png'),
  grape: require('../../assets/images/cluckySprintFruit2.png'),
  lemon: require('../../assets/images/cluckySprintFruit3.png'),
  cherry: require('../../assets/images/cluckySprintFruit4.png'),
};

export const cluckySprintKingdomWallpapers = {
  0: require('../../assets/images/cluckySprintbg.png'),
  1: require('../../assets/images/cluckySprintBg1.png'),
  2: require('../../assets/images/cluckySprintBg2.png'),
};

export const cluckySprintKingdomCrownImages = [
  require('../../assets/images/cluckySprintcrw1.png'),
  require('../../assets/images/cluckySprintcrw1.png'),
  require('../../assets/images/cluckySprintcrw3.png'),
  require('../../assets/images/cluckySprintcrw4.png'),
  require('../../assets/images/cluckySprintcrw4.png'),
];

export const htmlLoader = `
<!DOCTYPE html>
<html>
  <head>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .dots-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .dot {
        height: 20px;
        width: 20px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: #b3d4fc;
        animation: pulse 1.5s infinite ease-in-out;
      }

      .dot:last-child {
        margin-right: 0;
      }

      .dot:nth-child(1) {
        animation-delay: -0.3s;
      }

      .dot:nth-child(2) {
        animation-delay: -0.1s;
      }

      .dot:nth-child(3) {
        animation-delay: 0.1s;
      }

      .dot:nth-child(4) {
        animation-delay: 0.3s;
      }

      .dot:nth-child(5) {
        animation-delay: 0.5s;
      }

      @keyframes pulse {
        0% {
          transform: scale(0.8);
          background-color: #b3d4fc;
          box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
        }
        50% {
          transform: scale(1.2);
          background-color: #6793fb;
          box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
        }
        100% {
          transform: scale(0.8);
          background-color: #b3d4fc;
          box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
        }
      }
    </style>
  </head>
  <body>
    <section class="dots-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </section>
  </body>
</html>
  `;
