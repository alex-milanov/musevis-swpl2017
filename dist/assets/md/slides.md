# First Steps in Functional Reactive JavaScript

## The Story so far

## Functional Programming

### Imperative vs Functional
```
	let a = 1;
	let max = 10;
	while (a < max) {
		a++;
	}
	console.log(a);
```

### State and Operations

### Haskell is Useless
[Simon Peyton Jones - Haskell is useless](https://www.youtube.com/watch?v=iSmkqocn0oQ)
![nirvana](./assets/img/nirvana.png)

## The Function

- First Class Sitizen
- Pure Functions
- Higher Order Functions

### ES6 Arrow Functions

```js
	// before
	function plusOneOld(num) {
		return num + 1;
	}

	// after
	const plusOneNew = num => num + 1;

	plusOneOld(2);
```

## Higher Order Functions


### Array Operations

```js
// initial
const arr1 = [1, 2, 3, 4, 5];
console.log('initial', arr1);

// map
const arr2 = arr1.map(n => n * 10);
console.log('map', arr2);

// filter
const arr3 = arr1.filter(n => n > 2);
console.log('filter', arr3);

// reduce
const arr4 = arr1.reduce((sum, n) => sum + n, 0);
console.log('reduce', arr4);
```

## Async Operations

### Callback Hell

### Promises

## Reactive Programming

### Obserables
```js
const source = Rx.Observable.create(observer => {
	observer.onNext(42);
	observer.onCompleted();

	return () => console.log('disposed');
});

const subscription = source.subscribe(
	x => console.log('Next: ' + x),
	err => console.log('Error: ' + err),
	() => console.log('Completed')
);
```

## References
[Simon Peyton Jones - Haskell is useless](https://www.youtube.com/watch?v=iSmkqocn0oQ)

~

[FunFunFunction - Functional programming in JavaScript](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)

~

[Mostly Adequate Guide to Functional Programming](https://github.com/MostlyAdequate/mostly-adequate-guide)

~

[RxMarbles.com](http://rxmarbles.com/)

~

Egghead.io

## Live Coding
