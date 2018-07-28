let xs_val = [];
let ys_val = [];

let m, b;

const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

function loss(pred, labels){
    // (pred, label) => pred.sub(label).square().mean();
    return pred.sub(labels).square().mean()
}

function setup(){
    createCanvas(400, 400);

    m = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));
    const optimizer = tf.train.sgd(learningRate);
}
function draw(){

    tf.tidy(() => {
        if(xs_val.length >0){
            const labelsTens = tf.tensor1d(ys_val);
            optimizer.minimize(() => loss(predict(xs_val), labelsTens));
        }
    });
    
    

    background(0);
    stroke(255);
    strokeWeight(4); 
    for (let i=0; i<xs_val.length; i++){
        let px = map(xs_val[i], 0, 1, 0, width);
        let py = map(ys_val[i], 0, 1, 0, height);
        point(px, py);
    }
    tf.tidy(() => {
        let xs = [0, 1];
        let ys = predict(xs);

        let x1 = map(xs[0], 0, 1, 0, width);
        let x2 = map(xs[1], 0, 1, 0, width);
        let liney = ys.dataSync();
        let y1 = map(liney[0], 0, 1, 0, height);
        let y2 = map(liney[1], 0, 1, 0, height);

        line(x1, y1, x2, y2);
    });
}

function predict(xs){
    const tfxs = tf.tensor1d(xs);
    const predYs = tfxs.mul(m).add(b);
    return predYs;
}


function mousePressed(){
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 0, 1);
    xs_val.push(x);
    ys_val.push(y);
}