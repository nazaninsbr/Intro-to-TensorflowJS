const model = tf.sequential();

const configHidden = {
    units: 4, 
    inputShape: [2],
    activation: 'sigmoid'
}

const configOutput = {
    units: 3, 
    activation: 'sigmoid'
}

const hidden = tf.layers.dense(configHidden);
const output = tf.layers.dense(configOutput);
model.add(hidden);
model.add(output);


const sgdOptimizer = tf.train.sgd(0.5);
const config = {
    optimizer: sgdOptimizer, 
    loss: 'meanSquaredError'
}
model.compile(config);

const trainXs = tf.tensor2d([
    [1, 0.32], 
    [2, 23], 
    [0.234, 0.456], 
    [0.99, 0.52]
]);
const trainYs = tf.tensor2d([
    [3, 2, 0], 
    [0.43, 0.99, 2], 
    [0.99, -0.98, 12], 
    [-0.12, 0.12, 0]
]);

const configFit = {
    epochs: 10, 
    shuffle: true
}

train().then(() => {
    console.log('training complete');
    const testXs = tf.tensor2d([[0.25, 0.8]]);
    let result = model.predict(testXs);
    result.print();
});

async function train() {
    for(let i=0; i<100; i++){
        const response = await model.fit(trainXs, trainYs);
        console.log(response.history.loss);
    }
}