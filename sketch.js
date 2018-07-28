function setup(){
	noCanvas();

	const values = [];
	for (let i=0; i<30; i++){
		values[i] = random(0, 100);
	}

	const shape = [2, 5, 3];
	const tens = tf.tensor3d(values, shape);


	// const data = tf.tensor([0, 0, 127, 255, 23, 54, 30, 50], [2, 2, 2], 'int32');
	tens.print();
	console.log(tens);
	tens.data().then(function(stuff) {
		console.log(stuff);
	});

	const num = tf.scalar(4); 
	num.print()

	const vtence = tf.variable(tens);

	const c = vtence.add(vtence);
	c.print();

	const valuesAB = []
	for (let i=0; i<15; i++){
		valuesAB[i] = random(0, 100);
	}

	const shapeA = [5, 3];
	const shapeB = [3, 5];
	const a = tf.tensor2d(valuesAB, shapeA);
	const b = tf.tensor2d(valuesAB, shapeB);

	const d = a.matMul(b);
	d.print();
}
