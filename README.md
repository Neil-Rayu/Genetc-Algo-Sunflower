# Genetc-Algo-Sunflower
This is a simulation of a sunfllowers evolution given certain evniormental conditions, it is simulated via a genetic algorthim using a loss/fotness function and corssing over, etc.

In this simulation each sunflower has a 3 chromosomes of length 10, these chromsomoes are repersented as a string of binary;
i.e: ['1000100111', '1001101100', '1111010011']

The first chromosome repersents height of the sunflower, with each '1' adding one unit; the second chromosome repersents root length; the third repersents ammount of petal curve

To give an example on how the fitness of the flower can be found, using the enviormental conidtions, when there is high ammounts of blockage/shade the flower needs to grow taller to get sunlight, but when there is amplpe sun the flower is discouraged to grow taller as it takes more nutrients

The formula used for fitness is here:

```
let fitness =
    heightCnt * shade * multi +
    (heightCnt * soilHealth) / divi +
    rootCnt * soilHealth * 2 +
    heightCnt * ((-1 * birdCnt) / 2) +
    (curveCnt * birdCnt) / 2 +
    curveCnt * waterMulti * waterFall;
```

The variable multi changes, going back to the example before the flower is encouraged to grow taller when there is more shade compared to how it isn't encouraged as much to grow shorter when there is less shade/ the function puts more emphisis on growing taller when there is lack of sun than gorwing shorter when there is lots of sun.

There are a couple functions under the NaturalGeneticAlgorithim class;

**Generate**: Creates a random chromosome of desired length

**Select**: Takes a list of chromosomes and fitness and returns the two chromoomes with the best fitness. (might be changed to a roulette system)

**Crossover**: Takes two chromosomes and picks a random int from 1 to 10, and splits them at the spot and switches
example: random num: 7, 0001011|111 & 0001001|101 => 0001011|101 & 0001001|111

**Mutate**: A 0.005 probability for a mutation where a 1 is swapped to 0

**SimulateApperance**: Using drawn blocks I generate sunflowers to repersent certain heights and root lengths

**NaturalRun**: using all previous methods this will first select two chromosomes, cross them over, and create a new pool of more fit sunflowers


