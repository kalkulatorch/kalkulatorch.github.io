let result = [];



function calculate() {
  result = [];
  let inputValue = document.querySelector('#main-input').value;
  const tolerance = Number(document.querySelector('#error-tolerance').value);
  const target = Number(document.querySelector('#target').value);
  

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
    const numbers = inputValue.split(/\r?\n/).filter(t => t);
    inputValue = numbers.map((n, i) => ({
      name: i.toString(),
      value: Number(n),
    }));
  }

  for (let index = 0; index < 2**inputValue.length; index++) {
    const mask = dec2bin(index).padStart(inputValue.length, "0").split('').map(t => Number(t) ? true : false);
    let partial = inputValue.filter((t, i) => mask[i]);
    let sum = partial.reduce((total, p) => total + p.value, 0);

    if(sum > target + tolerance) {
      continue;
    };

    if(sum >= target - tolerance && sum <= target + tolerance) {
      if(!result.find(t => JSON.stringify(t.result) === JSON.stringify(partial))) {
        result.push({
          sum,
          result: partial,
          diff: Math.abs(target - sum),
        });
      }
    }
  }
  result.sort((a, b) => a.diff - b.diff);

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
  /*
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
  resultInput.value = resultString;*/
}




function dec2bin(dec){
  return (dec >>> 0).toString(2);
}
