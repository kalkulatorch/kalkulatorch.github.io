let result = [];

function subsetSet(
  input = [
    {
      name: '1',
      value: 1.1,
    },
    {
      name: '2',
      value: 2.2,
    },
    {
      name: '3',
      value: 3.3,
    },
    {
      name: '4',
      value: 4.4,
    },
    {
      name: '5',
      value: 5.5,
    },
  ],
  target = 5.3,
  tolerance = 0.5,
  partial = [],
) {
  const sum = partial.reduce((total, n) => total + n.value, 0);
  
  if(sum > target + tolerance) return;

  if(sum >= target - tolerance && sum <= target + tolerance) {
    partial.sort((a, b) => a.name - b.name);
    if(!result.find(t => JSON.stringify(t.result) === JSON.stringify(partial))) {
      result.push({
        sum,
        result: partial,
        diff: Math.abs(target - sum),
      });
    }
  }

  input.filter(n => !partial.includes(n)).forEach(n => {
    subsetSet(input, target, tolerance, [...partial, n]);
  });
}

function calculate() {
  result = [];
  let inputValue = document.querySelector('#main-input').value;
  
  if(inputValue === '') {
    inputValue = [
      {
        name: '1',
        value: 1.1,
      },
      {
        name: '2',
        value: 2.2,
      },
      {
        name: '3',
        value: 3.3,
      },
      {
        name: '4',
        value: 4.4,
      },
      {
        name: '5',
        value: 5.5,
      },
    ];
  } else {
    const numbers = inputValue.split(/\r?\n/);
    inputValue = numbers.map((n, i) => ({
      name: i.toString(),
      value: Number(n),
    }));
  }
  
  
  const errorTolerance = Number(document.querySelector('#error-tolerance').value);
  const target = Number(document.querySelector('#target').value);
  
  subsetSet(inputValue, target, errorTolerance);
  result.sort((a, b) => a.diff - b.diff);
  console.log(result.map(r => ({ sum: r.sum, result: JSON.stringify(r.result)})));

  const resultInput = document.querySelector('#results');
  const fixed = (n) => (Math.round(n * 100) / 100).toFixed(2);
  const resultString = result.reduce((total, r) => {
    total += `sum: ${fixed(r.sum)}\n`;
    r.result.forEach((n) => {
      total += `index ${n.name} (value: ${fixed(n.value)})\n`;
    });
    total += `------------------------\n\n`;
    return total;
  }, '');
  resultInput.value = resultString;
}
