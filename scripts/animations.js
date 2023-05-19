const randInt = (a, b) => Math.round(Math.random() * (b - a) + a);

// Embed SVG
(() => {
  const element = document.getElementById('svg-container');
  const url = './images/final_dark.svg';

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.overrideMimeType('image/svg+xml');
  xhr.onload = () => element.appendChild(xhr.responseXML.documentElement);
  xhr.send('');
})();

// CCTV images
(() => {
  const alarmInterval = 3000;
  const alarmOffSpread = 1000;
  const alarmOffTimeout = 4000;
  const camerasCount = 20;
  const changeInterval = 7000;
  const changeSpread = 3000;
  const imagesCount = 40;

  for (let i = 1; i <= camerasCount; i++) {
    const selector = `.display.cctv[data-ref="cctv-${i}"] .cctv-footage`;
    const element = document.querySelector(selector);
    element.style.backgroundImage = `url(./images/cctv/${i}.jpg)`;

    const change = () => {
      const i = randInt(1, imagesCount);
      element.style.backgroundImage = `url(./images/cctv/${i}.jpg)`;
      setTimeout(change, changeInterval + randInt(-changeSpread, changeSpread));
    }
    setTimeout(change, changeInterval + randInt(-changeSpread, changeSpread));
  }

  setInterval(() => {
    const i = randInt(1, camerasCount);
    const selector = `.display.cctv[data-ref="cctv-${i}"]`;
    const element = document.querySelector(selector);
    element.classList.add('alarm')
    setTimeout(() => {
      element.classList.remove('alarm');
    }, alarmOffTimeout + randInt(-alarmOffSpread, alarmOffSpread));
  }, alarmInterval);
})();

// Charts
const chartConfig = {
  colors: [
    '#059e90', //#0090ff
    '#e53b4a', //#
    '#ffd861'  //#
  ],
  options: {
    hover: { mode: null },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  },
};
(() => {
  const data = {
    datasets: [{
      backgroundColor: chartConfig.colors,
      borderColor: '#000000',
      borderWidth: 0,
      data: [300, 100, 50],
    }],
  };
  const config = {
    data: data,
    options: chartConfig.options,
    type: 'doughnut',
  };
  const chart1 = new Chart(document.getElementById('graph-1'), config);
  setInterval(() => {
    for (let i = 0; i < chart1.data.datasets[0].data.length; i++) {
      chart1.data.datasets[0].data[i] += randInt(-15, 15);
    }
    chart1.update();
  }, 500);
})();

(() => {
  const data = {
    datasets: [{
      backgroundColor: chartConfig.colors,
      borderColor: '#000000',
      data: [300, 250, 350],
    }],
    labels: [1, 2, 3],
  };
  const config = {
    data: data,
    options: {
      ...chartConfig.options,
      scales: {
        y: {
          beginAtZero: true,
          max: 400,
          min: 0,
        },
      },
    },
    type: 'bar',
  };
  const chart2 = new Chart(document.getElementById('graph-2'), config);
  setInterval(() => {
    for (let i = 0; i < chart2.data.datasets[0].data.length; i++) {
      chart2.data.datasets[0].data[i] += randInt(-35, 35);
    }
    chart2.update();
  }, 350);
})();

(() => {
  let t = 100;
  const frequency = 1 / 8;
  const points = [...Array(t).keys()];
  const data = {
    labels: points,
    datasets: [{
      borderColor: chartConfig.colors[0],
      borderWidth: 4,
      data: points.map(x => Math.sin(x * frequency)),
      fill: false,
      tension: 0.1,
    }, {
      borderColor: chartConfig.colors[1],
      borderWidth: 4,
      data: points.map(x => Math.cos(x * frequency)),
      fill: false,
      tension: 0.1,
    }, {
      borderColor: chartConfig.colors[2],
      borderWidth: 4,
      data: points.map(x => -Math.sin(x * frequency)),
      fill: false,
      tension: 0.1,
    }],
  };
  const config = {
    data: data,
    options: {
      ...chartConfig.options,
      elements: {
        point: { radius: 0 },
      },
    },
    type: 'line',
  };
  const chart3 = new Chart(document.getElementById('graph-3'), config);
  setInterval(() => {
    for (let i = 0; i < chart3.data.datasets.length; i++) {
      chart3.data.datasets[i].data.shift();
    }
    chart3.data.datasets[0].data.push(Math.sin(t * frequency));
    chart3.data.datasets[1].data.push(Math.cos(t * frequency));
    chart3.data.datasets[2].data.push(-Math.sin(t * frequency));
    chart3.update('none');
    t++;
  }, 300);
})();

// Buttons
(() => {
  const randomButtonsCount = 61;
  const randomButtons = [];
  for (let i = 1; i <= randomButtonsCount; i++) {
    randomButtons.push(
      document.querySelector(`#btn-${i}`)
    );
  }
  setInterval(() => {
    randomButtons.forEach(btn => {
      const method = Math.random() < 0.5 ? 'remove' : 'add';
      btn.classList[method]('active');
    });
  }, 750);

  [{
    id: 'kb1',
    keys: 29,
  }, {
    id: 'kb2',
    keys: 27,
  }].forEach(({ id, keys }) => {
    const kb1ButtonsCount = keys;
    const kb1Buttons = [];
    for (let i = 1; i <= kb1ButtonsCount; i++) {
      kb1Buttons.push(
        document.querySelector(`#${id}-${i}`)
      );
    }
    setInterval(() => {
      kb1Buttons.forEach(x => x?.classList?.remove?.('active'));
      const randomKey = kb1Buttons[randInt(0, kb1ButtonsCount - 1)];
      if (randomKey) {
        randomKey.classList.add('active');
        setTimeout(() => randomKey.classList.remove('active'), 100);
      }
    }, 200);
  });
})();
