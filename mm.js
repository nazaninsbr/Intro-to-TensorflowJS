function setup(){ 
    noCanvas();
    frameRate(1);
}

function draw(){
	const values = []
	for (let i=0; i<15; i++){
		values[i] = random(0, 100);
	}
    const test = tf.tensor2d(values, [5, 3]);
    tf.tidy(() => {
        const shapeA = [5, 3];
        const shapeB = [3, 5];
        const a = tf.tensor2d(values, shapeA);
        const b = tf.tensor2d(values, shapeB);

        const c = a.matMul(b);
    });
    // console.log("running");

    //
    // do something meaningful here
    //


    // 1. manually delete them if they are not in the tidy function 
    test.dispose();

    // 2. clean up using tidy

    console.log(tf.memory().numTensors);
}