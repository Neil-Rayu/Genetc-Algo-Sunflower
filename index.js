let shade = 0.5;
let soilHealth = 0.5;
let birdCnt = 0.1;
let waterFall = 0.5;
console.log(shade, soilHealth, birdCnt, waterFall);
// document.getElementById('envCont').innerText = `Shade Amount: ${shade.toFixed(
//   2
// )}, Soil Health: ${soilHealth.toFixed(2)}, Bird Amount: ${birdCnt.toFixed(
//   2
// )}, Water Fall: ${waterFall.toFixed(2)}`;

let slider = document.getElementById('shadeSlider');
let output = document.getElementById('shadeVal');
output.innerHTML = 'Shade Ammount:' + slider.value;
slider.oninput = function () {
  output.innerHTML = 'Shade Ammount:' + this.value;
  shade = this.value / 100;
};

let slider1 = document.getElementById('soilSlider');
let output1 = document.getElementById('soilVal');
output1.innerHTML = 'Soil Ammount:' + slider.value;

slider1.oninput = function () {
  output1.innerHTML = 'Soil Ammount:' + this.value;
  soilHealth = this.value / 100;
};

let slider2 = document.getElementById('birdSlider');
let output2 = document.getElementById('birdVal');
output2.innerHTML = 'Bird Ammount:' + slider2.value;
slider2.oninput = function () {
  output2.innerHTML = 'Bird Ammount:' + this.value;
  birdCnt = this.value / 100;
};

let slider3 = document.getElementById('waterSlider');
let output3 = document.getElementById('waterVal');
output3.innerHTML = 'Water Ammount:' + slider3.value;

slider3.oninput = function () {
  output3.innerHTML = 'Water Ammount:' + this.value;
  waterFall = this.value / 100;
};
/**
 * @param {string[]} chromosomes
 * @returns {Number} fitness
 *
 * Takes a chromosome, tally the attributes, add/subtract-
 * based on the enviorment conditions and how benefical-
 * certain traits are in those conditions.
 */
function naturalFitness(chromosomes) {
  let heightCnt = 0;
  let seedCnt = 0;
  let curveCnt = 0;
  let rootCnt = 0;
  chromosomes[0].split('').forEach((base) => {
    if (Number(base) == 1) {
      heightCnt++;
    }
  });
  // chromosomes[1].forEach(base => {
  //       if(base == 1){
  //         seedCnt++;
  //       }
  // });
  chromosomes[1].split('').forEach((base) => {
    if (Number(base) == 1) {
      curveCnt++;
    }
  });
  chromosomes[2].split('').forEach((base) => {
    if (Number(base) == 1) {
      rootCnt++;
    }
  });

  let multi = 1;
  if (shade > 0) {
    multi = 2;
  }
  let divi = 2;
  if (soilHealth > 0) {
    divi = 1;
  }
  let waterMulti = 0.3;
  if (waterFall > 0) {
    waterMulti = 2;
  }

  let fitness =
    heightCnt * shade * multi +
    (heightCnt * soilHealth) / divi +
    rootCnt * soilHealth * 2 +
    heightCnt * ((-1 * birdCnt) / 2) +
    (curveCnt * birdCnt) / 2 +
    curveCnt * waterMulti * waterFall;
  return fitness;
}
console.log(naturalFitness(['0000010000', '0000100000', '0000001000']));

var NaturalGeneticAlgorithm = function () {};
NaturalGeneticAlgorithm.prototype.generate = function (length) {
  let chromosome = '';
  for (let i = 0; i < length; i++) {
    if (Math.floor(Math.random() * 10) % 2 == 0) {
      chromosome += '1';
    } else {
      chromosome += '0';
    }
  }
  return chromosome;
};

//Graphics Side

NaturalGeneticAlgorithm.prototype.simulateApperance = function (
  chromosomes,
  fitness
) {
  let flowerCont = document.createElement('div');
  flowerCont.className = 'flowerCont';
  document.getElementById('flowersContTop').appendChild(flowerCont);
  flower = document.createElement('img');
  flower.src = 'flower2.png';
  flowerCont.appendChild(flower);
  const stemCont = document.createElement('div');
  stemCont.className = 'stemCont';
  flowerCont.appendChild(stemCont);
  let stemPiece;
  for (let index = 0; index < chromosomes[0].length; index++) {
    if (chromosomes[0][index] == 1) {
      stemPiece = document.createElement('img');
      stemPiece.src = 'stem.PNG';
      stemCont.appendChild(stemPiece);
    }
  }
  const rootCont = document.createElement('div');
  rootCont.className = 'rootCont';
  document.getElementById('flowersContBottom').appendChild(rootCont);

  let rootPiece;
  for (let index = 0; index < chromosomes[1].length; index++) {
    if (chromosomes[1][index] == 1) {
      rootPiece = document.createElement('img');
      rootPiece.src = 'root.png';
      rootCont.appendChild(rootPiece);
    }
  }
  flowerCont.insertAdjacentText('afterbegin', 'Fitness: ' + fitness.toFixed(2));
};

//

NaturalGeneticAlgorithm.prototype.select = function (population, fitnesses) {
  let max = fitnesses[0];
  let index1 = 0;
  for (let i = 0; i < fitnesses.length; i++) {
    if (fitnesses[i] > max) {
      max = fitnesses[i];
      index1 = i;
    }
  }
  //this.simulateApperance([population[index1][0], population[index1][1]],fitnesses[index1] );

  fitnesses.splice(index1, 1);
  let max2 = fitnesses[0];
  let index2 = 0;
  for (let i = 0; i < fitnesses.length; i++) {
    if (fitnesses[i] > max2) {
      max2 = fitnesses[i];
      index2 = i;
    }
  }
  return [population[index1], population[index2]];
};
NaturalGeneticAlgorithm.prototype.mutate = function (chromosome, p) {
  for (let i = 0; i < chromosome.length; i++) {
    if (Math.random() <= p) {
      if (chromosome.charAt(i) == '1') {
        chromosome =
          chromosome.substring(0, i) + '0' + chromosome.substring(i + 1);
      } else {
        chromosome =
          chromosome.substring(0, i) + '1' + chromosome.substring(i + 1);
      }
    }
  }
  return chromosome;
};
//console.log(g.mutate(x, 0.02));
NaturalGeneticAlgorithm.prototype.crossover = function (
  chromosome1,
  chromosome2
) {
  let n = Math.floor(Math.random() * chromosome1.length);
  //console.log(n);
  let x = chromosome1;
  chromosome1 = chromosome1.substring(0, n) + chromosome2.substring(n);
  chromosome2 = chromosome2.substring(0, n) + x.substring(n);
  return [chromosome1, chromosome2];
};
NaturalGeneticAlgorithm.prototype.selectRoulette = function (
  population,
  fitnesses
) {
  let max = 0;
  for (let i = 0; i < fitnesses.length; i++) {
    if (fitnesses[i] > max) {
      max += fitnesses[i];
    }
  }
  console.log(max);

  let index1 = 0;
  let rand = Math.random() * max;
  let temp = fitnesses[0];
  for (let i = 0; i < fitnesses.length; i++) {
    if (temp >= rand) {
      index1 = i;
      console.log(fitnesses[index1]);
    }
    temp += fitnesses[i + 1];
  }
  //fitnesses.splice(index1, 1);
  let index2 = 0;
  rand = Math.random() * max;
  temp = fitnesses[0];
  for (let i = 0; i < fitnesses.length; i++) {
    if (temp >= rand) {
      index2 = i;
      console.log(fitnesses[index2]);
    }
    temp += fitnesses[i + 1];
  }
  return [population[index1], population[index2]];
};
//console.log(g.crossover(x, y));
NaturalGeneticAlgorithm.prototype.createPool = function (fitness, length) {
  // GENERATE INITIAL CHROMOSOMES
  let genePoolChromosomes = [[], [], [], [], [], []];
  let genePoolFitness = [];
  //Fill starting sunflower chromosomes
  for (let i = 0; i < 5 + 1; i++) {
    for (let j = 0; j < 3; j++) {
      genePoolChromosomes[i].push(this.generate(length));
    }
  }
  //Get fitness for starting pool
  for (let i = 0; i < 5 + 1; i++) {
    genePoolFitness[i] = fitness(genePoolChromosomes[i]);
    this.simulateApperance(
      [genePoolChromosomes[i][0], genePoolChromosomes[i][1]],
      genePoolFitness[i]
    );
  }
  return [genePoolChromosomes, genePoolFitness];
};

NaturalGeneticAlgorithm.prototype.naturalRun = function (
  fitness,
  genePoolChromosomes,
  genePoolFitness
) {
  console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
  //for (let gen = 0; gen < iterations; gen++) {
  let tempC = [[], [], [], [], [], []]; //new temp chromosome list
  for (let i = 0; i < 5 + 1; i += 2) {
    let cross = this.select(genePoolChromosomes, genePoolFitness); //Select Two
    //console.log(cross); //CONSOLE LOG!!
    for (let index = 0; index < 3; index++) {
      let dubleCross = this.crossover(
        //Returns the cross between x1 and y1 so two chromsomes
        this.mutate(cross[0][index], 0.005),
        this.mutate(cross[1][index], 0.005)
      );
      tempC[i].push(dubleCross[0]); //x
      tempC[i + 1].push(dubleCross[1]); //y
    }
  }
  //console.log(tempC);
  genePoolChromosomes = tempC;
  for (let i = 0; i < 5 + 1; i++) {
    genePoolFitness[i] = fitness(genePoolChromosomes[i]);
    this.simulateApperance(
      [genePoolChromosomes[i][0], genePoolChromosomes[i][1]],
      genePoolFitness[i]
    );
  }
  console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
  let sum = 0;
  genePoolFitness.forEach((e) => {
    sum += e;
  });
  //console.log(sum / 10);
  if (genePoolFitness.includes(1)) {
    console.log('HELL YEAHHHS');
    //break;
  }
  //}
  return [genePoolChromosomes, genePoolFitness];
};
let nG = new NaturalGeneticAlgorithm();
//let natural = nG.naturalRun(naturalFitness, 10, 10, 5 + 1);
//console.log(natural);

//nG.simulateApperance(['1110101101', '1111011011']);
console.log('hello');
let chromFit;

document.getElementById('startPool').onclick = () => {
  chromFit = nG.createPool(naturalFitness, 10);
};

document.getElementById('nextGen').onclick = () => {
  chromFit = nG.naturalRun(naturalFitness, chromFit[0], chromFit[1]);
};
