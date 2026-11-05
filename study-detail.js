/* Day-by-day detail for study days 1-100: key ideas, try-it, numbered steps, done-when.
   Shape: { dayNumber: { taskIndex: { pts, tryIt, steps, end } } }. Merged into the task text by plan-data.js. */
const STUDY_DETAIL = {
 "1": {
  "0": {
   "pts": [
    "Big-O describes how work grows as input size n grows, ignoring constants. O(1) is constant, O(log n) halves each step, O(n) is one pass, O(n^2) is a loop inside a loop. Interviewers expect you to state it for every solution.",
    "217 Contains Duplicate: put each number in a Set and return true if you see one twice. O(n) time, O(n) space. Sorting first is O(n log n) time with no extra set.",
    "1 Two Sum: for each number, check whether target minus the number is already in a Map from value to index; then store the current one. O(n) time, O(n) space.",
    "242 Valid Anagram: count letters in a Map or 26-slot array, adding for one string and subtracting for the other; all counts must end at zero. O(n) time, O(1) space for lowercase letters.",
    "Common mistake: using the same element twice in Two Sum. Check the map before inserting the current number."
   ],
   "steps": [
    "Read the Big-O section (about 15 min) and write down O(1), O(log n), O(n), O(n log n), O(n^2) with one real example each.",
    "For each problem, set a 20-minute timer and think first. Write the brute force in a comment, then its complexity.",
    "Only after 20 minutes read a hint, not the full solution. Then code the optimal version.",
    "Write time and space as a comment above each solution.",
    "Log each problem in NOTES.md with the pattern name (hash set, hash map, counting) so you can re-solve it later."
   ],
   "end": "All three problems pass on LeetCode and each has a brute-force and optimal version with complexity written in a comment."
  },
  "1": {
   "pts": [
    "An execution context is the environment code runs in. Creation phase sets up variables, then execution runs line by line. Function calls push a new context onto the call stack.",
    "var is hoisted and initialised to undefined. let and const are hoisted too but sit in the temporal dead zone (TDZ) until their line runs; touching them earlier throws ReferenceError.",
    "Scope chain: a name is looked up in the current scope, then each outer scope, up to global. Scope is fixed by where code is written (lexical), not where it is called.",
    "A closure is a function that keeps access to variables of the scope it was created in, even after that scope returned. Example: function counter(){ let n=0; return () => ++n; }",
    "Gotcha: var in a loop shares one variable, so setTimeout callbacks all print the final value. let creates a new binding per iteration."
   ],
   "tryIt": "Run for (var i=0;i<3;i++) setTimeout(()=>console.log(i)) and predict the output, then change var to let and explain the difference in one sentence.",
   "end": "You have 5 working closure examples (counter, once, private state, var loop bug and its fix) and can explain TDZ without notes."
  }
 },
 "2": {
  "0": {
   "pts": [
    "A hash map stores key-value pairs with average O(1) lookup, insert and delete. Reach for it when you need to count, group, or ask have I seen this before.",
    "Map vs Object: Map keeps insertion order, accepts any key type, has .size, and has no inherited keys like toString. Use Object for fixed-shape records, Map for dynamic keys. Set stores unique values.",
    "49 Group Anagrams: build a key from each word (sorted letters, or a 26-count string) and push the word into a Map of key to list. O(n * k log k) with sorting, k = word length.",
    "347 Top K Frequent Elements: count with a Map, then either bucket by frequency (index = count) for O(n), or use a heap for O(n log k). Bucket approach is simplest.",
    "Common mistake: using a plain object with user-controlled keys, or using an array as a Map key (compares by reference, never matches)."
   ],
   "steps": [
    "Write 3 lines each on Map vs Object and when to pick which, then run a quick example with new Map([[1,'a']]).",
    "Solve 49: first the sorted-key version, then try a count-array key if time allows.",
    "Solve 347 with the bucket idea: counts Map, then an array of length n+1 where index is frequency.",
    "Above each solution write a comment like // time O(n), space O(n) and say what n and k mean.",
    "Add both problems to NOTES.md under the pattern name hash map grouping/counting."
   ],
   "end": "49 and 347 are accepted and each solution has time and space written as a comment."
  },
  "1": {
   "pts": [
    "this is decided by how a function is called, not where it is written (except arrow functions). Four rules, in priority order: new, explicit (call/apply/bind), implicit (obj.method()), default (undefined in strict mode, global otherwise).",
    "Implicit binding is lost when you detach a method: const f = obj.say; f() has no obj. This is the most common bug, for example passing obj.method as a callback.",
    "call(thisArg, a, b) runs now; apply(thisArg, [a, b]) runs now with an array; bind(thisArg) returns a new function with this fixed.",
    "Arrow functions have no own this; they use the this of the surrounding scope at creation, and bind cannot change it. Do not use them as object methods that need this.",
    "To build bind: return a function that calls the original with fn.apply(ctx, [...preArgs, ...args])."
   ],
   "tryIt": "Predict then run: const o={n:1, f(){return this.n}}; const g=o.f; console.log(o.f(), g()); explain why the second differs.",
   "steps": [
    "Write myCall(ctx, ...args) on Function.prototype: assign this to a temporary Symbol key on Object(ctx), call it, delete the key, return the result.",
    "Write myBind(ctx, ...pre) returning a function that applies the original with ctx and pre plus new args.",
    "Handle the new case in myBind: if called with new, ignore ctx (check this instanceof the bound function).",
    "Write 10 this puzzles (method, detached method, setTimeout, arrow in method, class method, new, call), write your prediction first, then run.",
    "Note every wrong prediction and the rule that explains it."
   ],
   "end": "Your myCall and myBind pass tests against the native versions and you got at least 8 of 10 puzzles right or can explain the misses."
  }
 },
 "3": {
  "0": {
   "pts": [
    "A prefix sum array stores running totals, so the sum of any range is prefix[j+1] - prefix[i] in O(1) after one O(n) pass. Reach for it when a problem asks about sums of subarrays or ranges.",
    "238 Product of Array Except Self: first pass stores the product of everything to the left of each index; second pass multiplies by a running product from the right. O(n) time, O(1) extra space besides the output. No division.",
    "303 Range Sum Query: build prefix sums once in the constructor; sumRange(l, r) returns prefix[r+1] - prefix[l]. O(n) build, O(1) per query.",
    "560 Subarray Sum Equals K: keep a running sum and a Map of how many times each prefix sum was seen. At each step add map[sum - k] to the answer. O(n) time, O(n) space. Start with map {0:1}.",
    "Common mistake in 560: forgetting to seed the map with 0 and 1, which misses subarrays starting at index 0. Sliding window does not work here because numbers can be negative."
   ],
   "steps": [
    "Solve 303 first as the warm-up and write the prefix formula in a comment.",
    "Solve 238 with a left pass then a right pass writing into the output array.",
    "For 560, write the brute force O(n^2) first, then convert to the hashmap version.",
    "Trace 560 on [1,2,3] with k=3 by hand to see the map change.",
    "Record each time and space complexity in comments and add the pattern prefix sum to NOTES.md."
   ],
   "end": "238, 303 and 560 are accepted and you can explain in one sentence why 560 needs a hashmap of prefix sums."
  },
  "1": {
   "pts": [
    "Every object has a hidden [[Prototype]] link. Property lookup walks this chain until it finds the key or reaches null. Object.getPrototypeOf(obj) reads it.",
    "Object.create(proto) makes an object linked to proto. Constructor functions use new: it creates an object, links it to F.prototype, runs F with this set to it, and returns it.",
    "class is syntax over the same prototypes. Methods live on Class.prototype, not on each instance. extends links Child.prototype to Parent.prototype. static members live on the class itself.",
    "Private #fields are truly private (language-enforced), unlike an underscore convention. Mixins copy methods in with Object.assign(Class.prototype, mixin) to share behaviour without deep inheritance.",
    "instanceof checks whether Class.prototype appears anywhere in the object's prototype chain. Gotcha: arrow functions and methods defined in the constructor are per-instance copies, not shared."
   ],
   "tryIt": "Create class A{} and const a=new A(); print Object.getPrototypeOf(a)===A.prototype and Object.getPrototypeOf(A.prototype)===Object.prototype.",
   "steps": [
    "Draw the chain for [] : [] -> Array.prototype -> Object.prototype -> null.",
    "Draw the chain for a class instance with one parent class, labelled with where each method lives.",
    "Rewrite a small class using only a constructor function and prototype assignment.",
    "Add a private #count with a getter and a static create() method, and confirm a.#count outside the class is a syntax error.",
    "Write your own instanceof(obj, Ctor) by looping Object.getPrototypeOf."
   ],
   "end": "Two chain diagrams are saved in NOTES.md and your custom instanceof matches the real one on 4 test cases."
  }
 },
 "4": {
  "0": {
   "pts": [
    "Both problems are about membership: a Set gives O(1) is this present. Reach for a Set when a brute-force nested loop is only checking whether something exists.",
    "128 Longest Consecutive Sequence: put all numbers in a Set; only start counting from a number whose predecessor (n-1) is not in the Set, then walk n+1, n+2... O(n) time, O(n) space. Sorting would be O(n log n).",
    "36 Valid Sudoku: keep a Set of seen strings like r0-5, c3-5, b1-5 (row, column, 3x3 box index = floor(r/3)*3+floor(c/3)). Return false on a repeat. One pass over 81 cells, O(1) time and space for the fixed board.",
    "Then re-solve 49 Group Anagrams from a blank file with no notes. If you need more than 15 minutes or peek, schedule it again in 3 days.",
    "Common mistake in 128: starting a walk from every number, which silently becomes O(n^2). The only-start-at-sequence-start check prevents it."
   ],
   "steps": [
    "Solve 128 brute force first (sort and scan), then rewrite with the Set trick.",
    "Solve 36 by writing the three key formats on paper before coding.",
    "Close all notes, open an empty file, and re-solve 49 with a 15-minute timer.",
    "Compare to your earlier solution and note anything you forgot.",
    "Add the problems to NOTES.md with last-solved dates."
   ],
   "end": "128 and 36 are accepted, and 49 was re-solved without notes in under 15 minutes."
  },
  "1": {
   "pts": [
    "JavaScript runs one thing at a time on the call stack. Async work (timers, network) is handled outside, then its callback is queued for the event loop to push onto the stack when it is empty.",
    "Two queues: the macrotask queue (setTimeout, setInterval, I/O, UI events) and the microtask queue (Promise then/catch/finally, queueMicrotask, await continuations).",
    "Order rule: run one macrotask, then drain ALL microtasks, then render if needed (requestAnimationFrame runs just before paint), then the next macrotask.",
    "setTimeout(fn, 0) is not instant: it is a macrotask, so it runs after the current code and all pending microtasks. Example: setTimeout, Promise.resolve().then, console.log prints sync log, then promise, then timeout.",
    "Gotcha: code after await runs as a microtask, not synchronously. A long synchronous loop blocks everything, including timers and rendering."
   ],
   "tryIt": "Predict then run: console.log(1); setTimeout(()=>console.log(2)); Promise.resolve().then(()=>console.log(3)); console.log(4); the answer is 1 4 3 2.",
   "steps": [
    "Watch the Philip Roberts talk (about 25 min) and sketch the stack, queues and loop from memory.",
    "Write 10 snippets mixing setTimeout, Promise.then, async/await and sync logs.",
    "For each, write the predicted order on paper before running.",
    "Include one with an async function that logs before and after await, and one with a then inside a then.",
    "For every wrong prediction write which rule you missed."
   ],
   "end": "You predicted at least 8 of 10 outputs correctly and can state the order macrotask, microtasks, render out loud."
  }
 },
 "5": {
  "0": {
   "pts": [
    "Spaced repetition: re-solving a problem after a gap is what moves it into long-term memory. Redo each failed problem from a blank file; do not reread your old code.",
    "53 Maximum Subarray (Kadane): walk once keeping current = max(num, current + num) and best = max(best, current). Intuition: drop a negative running sum. O(n) time, O(1) space.",
    "121 Best Time to Buy and Sell Stock: track the minimum price so far; at each day profit = price - min, keep the max. One pass, O(n) time, O(1) space.",
    "Both are one-pass problems that carry a small running state instead of looking back. Reach for this when the brute force checks every pair or subarray.",
    "Common mistake: initialising best to 0 in Kadane, which fails for an all-negative array. Start best at the first element."
   ],
   "steps": [
    "List the problems you got wrong or needed hints for this week from NOTES.md and re-solve each from scratch (limit 25 min total).",
    "Solve 121 first: write the O(n^2) pair check, then the min-so-far version.",
    "Solve 53: write the brute force over all subarrays, then Kadane.",
    "Test 53 on [-3,-1,-2] and 121 on a strictly falling array to check edge cases.",
    "Write time and space in comments and update last-solved dates."
   ],
   "end": "53 and 121 are accepted and every failed problem from the week is re-solved or re-scheduled."
  },
  "1": {
   "pts": [
    "A Promise is in one of three states: pending, fulfilled or rejected. Once settled it never changes. then() always returns a new promise, which is what makes chaining work.",
    "Returning a value from a then passes it on; returning a promise waits for it; throwing turns into a rejection. An error skips down the chain to the next catch. finally runs either way and does not change the value.",
    "Promise.all fails fast on the first rejection; allSettled waits for all and reports each result; race settles with the first to settle; any resolves with the first fulfilled and rejects only if all reject.",
    "Unhandled rejections crash modern Node (since version 15) and log warnings in browsers. Always end chains with catch or use try/catch with await.",
    "Pitfalls: await in a for loop runs things one by one (use Promise.all to run in parallel); forEach(async ...) does not wait, so use for...of or map plus Promise.all."
   ],
   "tryIt": "Write three fake tasks that each take 200 ms, time them with await in a loop versus Promise.all, and compare (about 600 ms versus 200 ms).",
   "steps": [
    "Create a delay(ms, value, fail) helper returning a promise.",
    "Run all, allSettled, race and any on the same three delays, one failing, and print each result.",
    "Build a chain where the middle then throws and show which catch runs and that the later then is skipped.",
    "Show the forEach+async trap by logging after forEach and noticing it prints before the work finishes.",
    "Fix it two ways: for...of for sequential, map + Promise.all for parallel."
   ],
   "end": "You can state the difference between all, allSettled, race and any in one line each and your timing test shows sequential versus parallel."
  }
 },
 "6": {
  "0": {
   "pts": [
    "Destructuring unpacks values: const {a, b: renamed = 5, ...rest} = obj; const [x, , y] = arr. Spread (...) expands, rest (...) collects. Both make shallow copies only.",
    "An iterable has a [Symbol.iterator]() method returning an iterator with next() giving {value, done}. for...of, spread and destructuring all use this protocol. Generators (function*) with yield create iterators easily and run lazily.",
    "Symbol is a unique key (often used for hidden or protocol keys). Map allows any key type; WeakMap and WeakSet hold keys weakly so they do not stop garbage collection, and are not iterable.",
    "Proxy intercepts operations on an object (get, set, has, deleteProperty) and Reflect gives the default behaviour to forward to. Optional chaining a?.b?.() and nullish ?? avoid the falsy-value bug of ||.",
    "Tagged templates call a function with the string pieces and values: tag`a${x}b`. Gotcha: spread and Object.assign copy one level only, so nested objects are still shared."
   ],
   "tryIt": "Write const range = {from:1,to:4,[Symbol.iterator](){...}} and spread it into an array, expecting [1,2,3,4].",
   "steps": [
    "Write a custom iterable class Range with the iterator method returning next().",
    "Rewrite it as a generator function* range(start, end, step=1) and compare the code length.",
    "Use a generator to produce an infinite sequence and take the first 5 with a manual loop and break.",
    "Write a Proxy that logs every property read and throws on reading an unknown key.",
    "Write one tagged template that escapes HTML in interpolated values."
   ],
   "end": "range() works with for...of, spread and Array.from, and you can explain the iterator protocol without looking."
  },
  "1": {
   "pts": [
    "Approach for all five: state the brute force and cost first, then the optimal. Most use two pointers: a read index scanning the array and a write index marking where the next kept value goes.",
    "26 Remove Duplicates (sorted): write index only advances when nums[read] differs from nums[write-1]. O(n) time, O(1) space. Brute force with extra array is O(n) space.",
    "27 Remove Element: copy every value not equal to val to the write index. O(n) time, O(1) space. 88 Merge Sorted Array: fill from the back using three pointers so you never overwrite unread values. O(m+n) time, O(1) space.",
    "169 Majority Element: a Map count is O(n) space; the Boyer-Moore vote (candidate and counter, +1 if same, -1 if different) is O(n) time, O(1) space. 189 Rotate Array: reverse whole array, then reverse the first k and the rest. O(n) time, O(1) space; use k % n.",
    "Common mistake: merging 88 from the front, which overwrites values you still need; and forgetting k can exceed n in 189."
   ],
   "steps": [
    "For each problem write the brute force and its time/space as a comment before coding.",
    "Code the optimal version and run it on the empty array, one element, and all-equal inputs.",
    "Do 26 and 27 first (same write-pointer pattern), then 88, 189, 169.",
    "Add a // time O(?), space O(?) line to each solution.",
    "Mark 88 and 189 for re-solving next week because they are the easiest to get subtly wrong."
   ],
   "end": "All five are accepted with brute force and optimal approaches written down with time and space."
  },
  "2": {
   "pts": [
    "Goal: create the P1 JS utilities library with ESM, lint and tests. ESM means setting type module in package.json and using import/export.",
    "Vitest basics: describe groups tests, it defines one, expect asserts. vi.fn() makes a spy that records calls; vi.useFakeTimers() lets you advance time with vi.advanceTimersByTime(ms) without waiting.",
    "debounce(fn, ms) runs fn only after ms of silence; throttle(fn, ms) runs at most once per ms, with options for leading (run immediately) and trailing (run last call after the window).",
    "memoize caches results by an argument key; curry collects arguments until fn.length is reached; compose(f,g)(x)=f(g(x)), pipe runs left to right.",
    "Gotcha: preserve this and arguments in debounce, and key memoize by something like JSON.stringify(args) unless you accept a single-argument limit."
   ],
   "steps": [
    "Run npm init, set type module, add ESLint (flat config) and Vitest, and add npm scripts for lint and test.",
    "Create src/debounce.js and its test using fake timers: call 3 times quickly, advance time, expect one call.",
    "Create src/throttle.js with leading and trailing options, plus tests for both.",
    "Create src/memoize.js (with a custom key resolver), src/curry.js, src/compose.js and src/pipe.js, each with at least 3 tests.",
    "Export everything from src/index.js, commit, and make sure npm test and npm run lint pass."
   ],
   "end": "npm test is green for debounce, throttle, memoize, curry, compose and pipe, and the repo is committed."
  }
 },
 "7": {
  "0": {
   "pts": [
    "EventEmitter keeps a Map from event name to an array of listeners. on adds, off removes, once adds a wrapper that removes itself after one call, emit calls each listener with the arguments.",
    "Error event rule: emit('error') with no listener should throw the error, as Node does. Copy the listener array before looping so off() inside a listener does not skip others.",
    "deepClone must handle cycles by keeping a WeakMap from original to clone, and special-case Date, Map and Set. structuredClone exists, but you are building your own to learn.",
    "Promise.all resolves with an array in input order and rejects on the first failure; allSettled returns {status, value|reason}; race settles with the first; any resolves with the first fulfilled or rejects with an AggregateError.",
    "Gotcha: accept any iterable and non-promise values in the polyfills by wrapping each item in Promise.resolve()."
   ],
   "steps": [
    "Create src/EventEmitter.js with on, off, once, emit; test once fires only once and off inside a listener is safe.",
    "Add the error-event behaviour and a test that expects a throw with no listener.",
    "Create src/deepClone.js with a WeakMap for cycles; test a self-referencing object, Date, Map and Set.",
    "Create src/promiseAll.js, allSettled.js, race.js, any.js using Promise.resolve on each item.",
    "Test ordering for all, the AggregateError for any, and an empty input array for each."
   ],
   "end": "All new modules have passing tests and deepClone handles a cyclic object without a stack overflow."
  },
  "2": {
   "pts": [
    "This is a timed check: redo 238, 49 and 128 cold, then one new medium. Cold means blank file, no notes, a running timer.",
    "238 uses left and right product passes (O(n), O(1) extra). 49 uses a Map keyed by a sorted or counted signature. 128 uses a Set and only starts a walk at a sequence start (O(n)).",
    "For the new problem pick 560 Subarray Sum Equals K (prefix sum plus Map of counts, O(n) time and space) or a Valid Sudoku (36) variant if you already solved 560 cleanly.",
    "Stalling is data: note the exact moment you were stuck (pattern recognition, edge cases, or syntax).",
    "Common mistake: spending 30 minutes on one problem; at 25 minutes of no progress read a hint and note it."
   ],
   "steps": [
    "Start a 75-minute timer and split it: 10 minutes each for 238, 49 and 128, leaving about 45 for the new one.",
    "Write each solution in a blank file with no notes and no autocomplete help.",
    "If a solution fails, stop, debug with one small test, and record the cause.",
    "After the timer, list each stall point in NOTES.md.",
    "Schedule a re-solve for each problem that took over 15 minutes or needed a hint."
   ],
   "end": "All four problems attempted within 75 minutes and each stall point is written in NOTES.md."
  },
  "3": {
   "pts": [
    "A relational database stores data in tables of rows and columns. SELECT picks columns, WHERE filters rows, ORDER BY sorts, LIMIT caps the count, and JOIN combines tables on matching columns.",
    "A primary key uniquely identifies each row (not null, no duplicates). A foreign key is a column that must match a primary key in another table, which keeps references valid.",
    "NULL means unknown or missing, not zero. NULL = NULL is not true; use IS NULL and IS NOT NULL. Comparisons with NULL give unknown, so those rows are filtered out of WHERE.",
    "SQLBolt lessons 1-12 cover SELECT, WHERE, ORDER, LIMIT and an intro to joins. Typing each query yourself is the point.",
    "Gotcha: WHERE column != 'x' also drops rows where column is NULL."
   ],
   "tryIt": "In the SQLBolt sandbox, query a table with NULLs in one column using WHERE col = NULL versus WHERE col IS NULL and write down the difference.",
   "steps": [
    "Do lessons 1-6 (SELECT, WHERE, strings, ORDER, LIMIT), typing every query.",
    "Do lessons 7-12 (joins intro, NULLs, expressions, aggregates intro as listed).",
    "Write 3 queries of your own from memory per group of lessons.",
    "Answer in NOTES.md in your own words: primary key, foreign key, NULL semantics.",
    "Add one example where NULL surprised you."
   ],
   "end": "Lessons 1-12 are finished and your NOTES.md has written answers for primary key, foreign key and NULL semantics."
  }
 },
 "8": {
  "0": {
   "pts": [
    "Two pointers: use two indexes moving through an array, usually from both ends inward on a sorted array, or one slow and one fast. Reach for it when you need pairs or a check from both sides and the brute force is O(n^2).",
    "125 Valid Palindrome: left and right pointers skip non-alphanumeric characters, compare lowercased characters, move inward. O(n) time, O(1) space.",
    "167 Two Sum II (sorted input): sum the two ends; if too small move left up, if too big move right down. O(n) time, O(1) space. It works because the array is sorted.",
    "15 3Sum: sort, fix one number, then run two pointers on the rest; skip duplicates for all three positions. O(n^2) time. Sorting makes duplicates adjacent.",
    "Common mistake in 15: not skipping duplicate values after finding a match, which returns repeated triplets."
   ],
   "steps": [
    "Solve 125, then 167, then 15 in that order since each builds on the last.",
    "For each, write the brute force and its cost, then the two-pointer version.",
    "For 15, draw sorted [-2,-2,0,0,2,2] and trace which indexes get skipped.",
    "Write the pattern signature in NOTES.md: sorted input or symmetric check, need pairs, want O(1) space.",
    "List one problem where two pointers would NOT work (unsorted two sum needs a Map)."
   ],
   "end": "125, 167 and 15 are accepted and your pattern signature note is written."
  },
  "1": {
   "pts": [
    "for await...of loops over async iterables, awaiting each value. An async generator (async function*) can both await and yield, ideal for paginated APIs or streams.",
    "Pagination example: loop fetching page after page and yield each page's items until the API returns no next page. The consumer pulls items lazily and can break early.",
    "AbortController gives you controller.signal to pass to fetch(url, {signal}); calling controller.abort() rejects with an AbortError. Check signal.aborted inside your own long loops.",
    "setTimeout and setInterval are macrotasks; recursive Promise.then calls are microtasks. Microtasks always drain before the next macrotask, so an endless microtask loop starves timers and rendering.",
    "Gotcha: abort does not stop work that does not check the signal. Always clear timers (clearTimeout) when cancelling."
   ],
   "tryIt": "Write async function* count(){ for(let i=0;i<3;i++){ await new Promise(r=>setTimeout(r,100)); yield i; } } and consume it with for await.",
   "steps": [
    "Create a fake API function getPage(n) that resolves after 100 ms with items and a next flag.",
    "Write async function* paginate(getPage) that yields items one by one across pages.",
    "Consume with for await and break after 5 items to prove laziness.",
    "Write fetchWithCancel(url, {timeout}) using AbortController that aborts after the timeout and returns a cancel() function.",
    "Test timeout and manual cancel, and show the microtask starvation example by a short experiment you stop immediately."
   ],
   "end": "paginate yields all items lazily and fetchWithCancel rejects with AbortError on timeout and on manual cancel."
  }
 },
 "9": {
  "0": {
   "pts": [
    "Both problems use two pointers on heights. Area or trapped water depends on the shorter of two walls, which tells you which pointer to move.",
    "11 Container With Most Water: left and right start at the ends; area = min(height) * width; move the pointer at the shorter wall inward since moving the taller one cannot help. O(n) time, O(1) space.",
    "42 Trapping Rain Water, solution 1: prefixMax and suffixMax arrays; water at i = min(left max, right max) - height[i]. O(n) time, O(n) space.",
    "42 solution 2: two pointers with leftMax and rightMax; process the side with the smaller max, because that side's water level is already decided. O(n) time, O(1) space.",
    "Common mistake: moving the taller pointer in problem 11, or adding negative water (always take max(0, ...) if you compute it loosely)."
   ],
   "steps": [
    "Solve 11 with brute force (all pairs, O(n^2)) and then two pointers.",
    "Solve 42 using prefix and suffix max arrays first and get it accepted.",
    "Rewrite 42 with two pointers, keeping the first version for comparison.",
    "Trace [0,1,0,2,1,0,1,3,2,1,2,1] by hand with both versions to confirm 6.",
    "Write time and space comments for both versions."
   ],
   "end": "11 is accepted, and 42 is accepted in both the array version and the two-pointer version."
  },
  "1": {
   "pts": [
    "CommonJS uses require and module.exports, loads synchronously and exports a copy of the value. ESM uses import/export, is statically analysed, and exports live bindings that update when the exporter changes them.",
    "Circular imports: CommonJS may give you a partially filled exports object; ESM gives a live binding that may be in the TDZ if read too early. Top-level await works only in ESM, and import() loads a module dynamically and returns a promise.",
    "Garbage collection uses mark-and-sweep: start from roots (globals, stack), mark everything reachable, free the rest. Unreachable means collectable, not unused.",
    "WeakRef points to an object without keeping it alive; FinalizationRegistry runs a callback after collection, but timing is not guaranteed, so never rely on it for correctness.",
    "Five leak sources: forgotten timers or intervals, listeners never removed, growing global caches or Maps, closures holding big objects, detached DOM nodes."
   ],
   "tryIt": "Write a script that pushes a 1 MB buffer into a global array every 100 ms and watch the memory grow in process.memoryUsage().",
   "steps": [
    "Make a.mjs and b.mjs that import each other and show a live binding by changing an exported let from the exporting module.",
    "Do the same with CommonJS and show the difference.",
    "Write a leaky script (global array or interval holding data) and run it in Node with --inspect.",
    "Open chrome://inspect, take a heap snapshot, run for some seconds, take a second, and use the Comparison view to find the growing objects.",
    "Fix the leak and take a third snapshot to show it no longer grows."
   ],
   "end": "You have two heap snapshots showing the growing retained object, and the fixed version stays flat."
  }
 },
 "10": {
  "0": {
   "pts": [
    "Sliding window: keep a left and right index over a contiguous range, expand right, and shrink left when a rule breaks. Reach for it when asked about the longest or shortest contiguous subarray or substring.",
    "121 Best Time to Buy and Sell Stock revisit: the window is buy day to sell day; if price drops below the buy price, move the left (buy) pointer to the current day. O(n) time, O(1) space.",
    "3 Longest Substring Without Repeating: right moves forward; keep a Set (or Map of last index) and shrink left until the new character is unique. O(n) time, O(min(n, alphabet)) space.",
    "424 Longest Repeating Character Replacement: track counts and the highest count in the window; the window is valid while windowLength - maxCount <= k, otherwise move left. O(n) time, O(26) space.",
    "Common mistake in 3 with a Map: jumping left backwards when a duplicate index is older than left. Use max(left, lastIndex+1)."
   ],
   "steps": [
    "Re-solve 121 without notes and say how it fits the window idea.",
    "Solve 3 with a Set and shrinking loop; then try the Map of last index version.",
    "Solve 424: write the window-valid rule on paper first.",
    "Test 3 on 'abba' and 424 on 'AABABBA' with k=1 (answer 4).",
    "Write the pattern signature (contiguous range, expand and shrink, constraint check) in NOTES.md."
   ],
   "end": "121, 3 and 424 are accepted and the window rule is written for each in a comment."
  },
  "1": {
   "pts": [
    "Module pattern: use a function scope or ES module to hide private state and export only a small public API. Factory functions return new objects without new or this.",
    "Observer and pub/sub: observers subscribe to one subject; pub/sub adds a broker so publishers and subscribers do not know each other. Strategy via functions means passing the behaviour as a function argument instead of building a class hierarchy.",
    "Dependency injection by args: pass collaborators (clock, db, fetch) as parameters so tests can supply fakes. Immutability means returning new objects ({...a, x:1}) instead of editing; Object.freeze is shallow.",
    "Result-style handling returns {ok:true, value} or {ok:false, error} so failures are visible in the types of your code. Custom Error classes should set name and use new Error(msg, {cause}) to keep the original error.",
    "Gotcha: extending Error without setting this.name and passing cause loses the root cause in logs."
   ],
   "tryIt": "Write class NotFoundError extends Error and throw it from a catch that wraps another error using {cause}, then print err.cause.message.",
   "steps": [
    "Write a counter module with a private variable and a public increment/get API.",
    "Write createPubSub() with subscribe (returns an unsubscribe), publish, and a test.",
    "Write a function applyDiscount(price, strategyFn) and three strategies passed as functions.",
    "Write a getUser(id, {db}) that takes the db as an argument and test it with a fake db.",
    "Write ok/err helpers and an AppError class with a code and cause, and test both paths."
   ],
   "end": "pubsub, strategy, DI, Result and AppError are in a patterns/ folder with at least one test each."
  }
 },
 "11": {
  "0": {
   "pts": [
    "Both are sliding-window problems with counts, which is an extension of the window pattern from days 10 and earlier.",
    "567 Permutation in String: use a fixed window of length s1.length; keep a count of letters needed and compare counts as the window moves (add right char, remove left char). O(n) time, O(1) space for 26 letters.",
    "76 Minimum Window Substring: keep needed counts and a matched counter; expand right until all needs are met, then shrink left while still valid, recording the smallest window. O(n + m) time, O(m) space.",
    "For 76 it is fine to read a solution; then close it and rewrite from memory next day. Hard problems are mostly about recognising the template.",
    "Common mistake: tracking the number of distinct letters satisfied (a have/need counter) wrongly; update it only when a count reaches exactly the needed number, not on every add."
   ],
   "steps": [
    "Solve 567 first with the count-array comparison, then optimise to a matches counter if time allows.",
    "Attempt 76 for 25 minutes. If stuck, read an explanation, not code golf.",
    "Re-implement 76 yourself without looking at the solution until it passes.",
    "Write the sliding window with counts template in NOTES.md: need map, have counter, expand, shrink while valid.",
    "Schedule 76 for a cold re-solve tomorrow (Day 12 does this)."
   ],
   "end": "567 is accepted, 76 is accepted using your own code, and the template is written in NOTES.md."
  },
  "1": {
   "pts": [
    "SQL clause order of writing: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. Order of execution differs: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.",
    "WHERE filters rows before grouping; HAVING filters groups after aggregates. Aggregates are COUNT, SUM, AVG, MIN, MAX. COUNT(*) counts rows, COUNT(col) skips NULLs.",
    "DISTINCT removes duplicate rows. LIKE uses % (any text) and _ (one character). IN checks a list, BETWEEN is inclusive of both ends.",
    "NULL handling: use IS NULL, COALESCE(col, default) to replace NULL, and remember aggregates ignore NULLs except COUNT(*).",
    "Gotcha: you cannot use an aggregate in WHERE (use HAVING), and selecting a column not in GROUP BY is an error in Postgres."
   ],
   "tryIt": "Write a query that counts rows per category and keeps only categories with more than 2 rows, using GROUP BY and HAVING.",
   "steps": [
    "Work through Mode SQL Basic and then Intermediate sections, typing every query.",
    "For each topic write one query of your own in NOTES.md: group with having, distinct, like, in/between.",
    "Write a query that mixes WHERE, GROUP BY, HAVING and ORDER BY and say the execution order aloud.",
    "Run COUNT(*) versus COUNT(col) on a column with NULLs and record the difference.",
    "Write COALESCE on a nullable column and an IS NULL filter."
   ],
   "end": "You finished the Basic and Intermediate Mode sections and can explain WHERE versus HAVING with a query."
  }
 },
 "12": {
  "0": {
   "pts": [
    "Monotonic deque: a double-ended queue that keeps indexes whose values are in decreasing order, so the front is always the current window maximum. Reach for it when asked for the max or min of every window.",
    "239 Sliding Window Maximum: for each index, pop from the back while its value is less than or equal to the new value; push the index; pop from the front if it is outside the window; front holds the max. Each index is pushed and popped once, O(n) time, O(k) space.",
    "In JavaScript an array with shift() is O(n) per call, so use head and tail pointers or an index array to keep it O(n) overall.",
    "Then re-solve 76 Minimum Window Substring from memory using your template: need counts, matched counter, expand, shrink while valid.",
    "Common mistake: storing values instead of indexes in the deque, which makes it impossible to tell when the front leaves the window."
   ],
   "steps": [
    "Write the O(n*k) brute force for 239 and its cost.",
    "Draw the deque for [1,3,-1,-3,5,3,6,7] with k=3 step by step.",
    "Code the deque version storing indexes; test k=1 and k equal to array length.",
    "Close all notes and re-solve 76 in 25 minutes.",
    "Record whether 76 was clean in NOTES.md and re-schedule if not."
   ],
   "end": "239 is accepted in O(n) and 76 is accepted from memory."
  },
  "1": {
   "pts": [
    "A JOIN combines rows from two tables where a condition matches. INNER keeps only matching rows; LEFT keeps all rows from the left table, with NULLs where there is no match; RIGHT is the mirror; FULL keeps unmatched rows from both.",
    "Self-join joins a table to itself using two aliases, for example employees to their managers: FROM emp e JOIN emp m ON e.manager_id = m.id.",
    "A scalar subquery returns one value; IN (subquery) checks membership; EXISTS (subquery) is true if any row is returned and is often faster and safer than IN with NULLs.",
    "Finding rows with no match: LEFT JOIN then WHERE right.id IS NULL (an anti-join).",
    "Gotcha: filtering a LEFT JOIN's right table in WHERE turns it into an inner join; put that condition in the ON clause instead."
   ],
   "tryIt": "With a users and orders table, write the query that lists users with no orders using LEFT JOIN plus IS NULL, then again using NOT EXISTS.",
   "steps": [
    "Finish the SQLBolt joins lessons, typing every query.",
    "Start PG Exercises 'Joins and Subqueries' and do the first 10 questions.",
    "Write each of the four join types on a small example and note which rows disappear.",
    "Write one self-join and one EXISTS query in NOTES.md.",
    "Re-do any question you needed to look up, from scratch."
   ],
   "end": "SQLBolt joins are finished, 10 PG Exercises joins questions are done, and you can say what each join type keeps."
  }
 },
 "13": {
  "0": {
   "pts": [
    "V8 pipeline: it parses source to bytecode and runs it in the Ignition interpreter; hot functions are compiled by TurboFan into optimised machine code using assumptions about types.",
    "Hidden classes (shapes): objects created with the same properties in the same order share a shape, so property access becomes a fast fixed-offset read. Inline caching remembers shapes seen at a call site.",
    "Deoptimisation: if an assumption breaks (a new shape, a different type), V8 throws away optimised code and falls back. Keep shapes stable: initialise all properties in the constructor in the same order, do not add properties later or delete.",
    "Profile before changing: Chrome DevTools Performance tab for CPU, Memory tab for heap, and node --inspect (or --cpu-prof) for Node. Measure with performance.now() over many iterations.",
    "Gotcha: micro-benchmarks lie if the function gets optimised away or run too few times; warm up first and use a result so the work is not dead code."
   ],
   "tryIt": "Time 1e7 reads of obj.x where objects have the same shape versus a mix of two different property orders, using performance.now().",
   "steps": [
    "Write a hot loop summing a field over 1e6 objects built with inconsistent shapes (different property order or optional fields added later).",
    "Measure it with several runs and record the median time.",
    "Refactor to a constructor or factory that assigns all properties in one fixed order and measure again.",
    "Run node --cpu-prof or attach DevTools via node --inspect and find the hot function in the profile.",
    "Write the before and after numbers and one explanation sentence in NOTES.md."
   ],
   "end": "You have measured before and after times for the same loop and written down whether the shape-stable version was faster."
  },
  "1": {
   "pts": [
    "Binary search finds a target in a sorted range by halving it each time: O(log n) time, O(1) space. Reach for it when data is sorted or when you can answer is this value too small or big for a monotonic yes/no check.",
    "704 Binary Search: lo=0, hi=n-1, while lo<=hi compare nums[mid]; invariant: if the target exists it is within [lo, hi]. 74 Search a 2D Matrix: treat the matrix as one sorted array of m*n items and map mid to row=floor(mid/n), col=mid%n. O(log(m*n)).",
    "875 Koko Eating Bananas: binary search on the answer k from 1 to max pile; for each k count hours with sum of ceil(pile/k); find the smallest k with hours <= h. O(n log max).",
    "153 Find Min in Rotated Sorted Array: compare mid with hi; if nums[mid] > nums[hi] the min is to the right, otherwise it is at mid or left (hi=mid). 33 Search in Rotated Sorted Array: one half is always sorted; check if the target lies in the sorted half and discard the other. O(log n).",
    "Common mistake: infinite loops from lo=mid or hi=mid with the wrong loop condition, and mid overflow is not an issue in JS but write mid = lo + floor((hi-lo)/2) anyway."
   ],
   "steps": [
    "Write the loop invariant as a comment before each solution (for example target is within [lo, hi]).",
    "Solve 704 and 74 first and test with 1-element and not-found cases.",
    "Solve 875, first writing a canEatAll(k) helper and checking its monotonic property.",
    "Solve 153, then 33 using the sorted-half idea; trace [4,5,6,7,0,1,2].",
    "Record which of lo<=hi versus lo<hi each problem used and why."
   ],
   "end": "All five are accepted and each has a written loop invariant."
  },
  "2": {
   "pts": [
    "Continue P1 with four async and cache utilities, each with tests. Map-based LRU: a Map keeps insertion order, so on get delete and re-set the key to mark it newest; evict map.keys().next().value when over capacity.",
    "asyncPool(limit, items, fn): run at most limit promises at once, start the next as one finishes, and keep results in input order. Resolve when all done and reject on first error.",
    "retry with exponential backoff and jitter: wait base * 2^attempt then add random jitter so many clients do not retry in sync. Stop after maxAttempts and rethrow the last error.",
    "withTimeout(promiseFactory, ms) uses an AbortController: create a controller, set a timer that calls abort, pass signal to the work, and clear the timer on success.",
    "Gotcha: in tests use vi.useFakeTimers for backoff delays so tests run instantly, and mock Math.random for jitter."
   ],
   "steps": [
    "Create src/lru.js (Map-based) with get/set/size and tests for eviction order and updating an existing key.",
    "Create src/asyncPool.js and test that active tasks never exceed limit using a counter in the task.",
    "Create src/retry.js with options {attempts, baseMs, jitter} and test with a function failing twice then succeeding.",
    "Create src/withTimeout.js with AbortController and test both a timeout and a fast success.",
    "Export all from index.js, run lint and tests, and commit."
   ],
   "end": "Tests pass for LRU eviction order, pool concurrency limit, retry attempt count and timeout abort."
  }
 },
 "14": {
  "0": {
   "pts": [
    "A Promise implementation needs state, value, and a list of handlers. then registers handlers and returns a new promise; handlers always run asynchronously (use queueMicrotask).",
    "The resolution procedure (Promises/A+ section 2.3): if a value is a thenable (an object or function with a then method), call its then to adopt its state. Reject a promise that resolves to itself with a TypeError.",
    "Resolve and reject must be callable once only; a thrown error in a handler rejects the next promise. then with non-function arguments passes the value through.",
    "Run the official promises-aplus-tests suite via an adapter exposing resolved, rejected and deferred. Fix failures one section at a time.",
    "Gotcha: calling handlers synchronously is the most common failure; also remember catch(f) is then(undefined, f) and finally forwards the original value."
   ],
   "steps": [
    "Create src/MyPromise.js with constructor(executor), states, and resolve/reject guarded by a settled flag.",
    "Implement then using queueMicrotask and the resolution procedure for thenables and self-resolution.",
    "Add catch, finally, and static resolve and reject.",
    "Add the adapter file and run npx promises-aplus-tests; fix failures until the suite passes.",
    "Finish the README with a complexity table for every utility, bring coverage above 90 percent with vitest --coverage, and tag v1.0 with git tag."
   ],
   "end": "The Promises/A+ suite passes, coverage is above 90 percent, and v1.0 is tagged."
  },
  "2": {
   "pts": [
    "A timed contest check: 75 minutes, three cold re-solves (3 Longest Substring Without Repeating, 15 3Sum, 33 Search in Rotated Sorted Array) plus one new medium.",
    "3 is a sliding window with a Set or last-index Map (O(n)). 15 is sort plus two pointers with duplicate skipping (O(n^2)). 33 is binary search checking which half is sorted (O(log n)).",
    "Pick the new medium from the sliding window or two-pointer problems you have not solved yet, for example 424 Longest Repeating Character Replacement or 11 Container With Most Water if you did not do them cold.",
    "Practise talking out loud: state the pattern, brute force, then optimal and the complexity, as you would in an interview.",
    "Common mistake: coding before naming the pattern; take two minutes to state the approach first."
   ],
   "steps": [
    "Start a 75-minute timer; give each cold problem 12 minutes and keep the rest for the new one.",
    "Write each solution in a blank file with no hints and say your approach aloud first.",
    "After the time ends, check failures and note which step failed (pattern, edge case, or bug).",
    "Write the stall points and time per problem in NOTES.md.",
    "Schedule a re-solve for any problem that needed more than 15 minutes."
   ],
   "end": "Three cold problems and one new medium were attempted in 75 minutes, with times and stalls logged."
  },
  "3": {
   "pts": [
    "Goal: have a working local Postgres and use psql. The Docker command runs a Postgres 16-style server with a password and exposes port 5432.",
    "Connect with psql -h localhost -U postgres. Useful commands: \\l lists databases, \\dt lists tables, \\d table describes one, \\q quits, \\timing shows query time.",
    "PG Exercises Basic (15) covers SELECT and WHERE; Joins (10 more) covers JOIN and subqueries. Type each answer and compare it with the official one.",
    "Phase 1 retro: be honest about which topics (closures, event loop, binary search, joins) you still cannot explain; those are your review list.",
    "Gotcha: a container without a volume loses data when removed; add -v pgdata:/var/lib/postgresql/data if you want to keep it."
   ],
   "steps": [
    "Run the docker command, then docker ps to confirm the container is up.",
    "Connect with psql and run SELECT version(); and \\l.",
    "Do PG Exercises Basic, all 15 questions, typing each in the PG Exercises editor.",
    "Do 10 more questions from Joins and compare to the solutions.",
    "Write the Phase 1 retro in NOTES.md: three topics still shaky and a plan for each."
   ],
   "end": "Postgres is running in Docker, 25 exercises are done, and your Phase 1 retro is written in NOTES.md."
  }
 },
 "15": {
  "0": {
   "pts": [
    "A singly linked list is a chain of nodes, each with a value and a next pointer. Insert or delete at a known node is O(1); finding a node is O(n); there is no index access.",
    "206 Reverse Linked List: walk with prev and curr; save curr.next, point curr.next to prev, advance both. O(n) time, O(1) space. Return prev at the end.",
    "21 Merge Two Sorted Lists: use a dummy head node and a tail pointer; attach the smaller of the two current nodes each step, then attach the remaining list. O(n+m) time, O(1) space.",
    "141 Linked List Cycle: Floyd's tortoise and hare: slow moves 1, fast moves 2; if they meet there is a cycle, if fast hits null there is none. O(n) time, O(1) space; a Set of visited nodes works at O(n) space.",
    "Common mistake: losing the rest of the list by overwriting next before saving it, and forgetting the null checks (fast and fast.next)."
   ],
   "steps": [
    "Implement class ListNode and a LinkedList with append, prepend, remove(value) and toArray.",
    "Solve 206 and draw prev/curr/next for a 3-node list on paper.",
    "Solve 21 with a dummy head; test with one empty list.",
    "Solve 141 with the Set first, then Floyd's version.",
    "Write the pointer-juggling checklist in NOTES.md (save next first, use dummy node, check null)."
   ],
   "end": "206, 21 and 141 are accepted and your LinkedList class has tests for append, remove and toArray."
  },
  "1": {
   "pts": [
    "Node = V8 (runs JavaScript) + libuv (event loop, async I/O) + a thread pool (default 4 threads) for work like fs, crypto and DNS lookup. JavaScript itself stays single-threaded.",
    "Event loop phases per cycle: timers, pending callbacks, idle/prepare, poll (I/O), check (setImmediate), close callbacks. Poll waits for I/O when nothing else is scheduled.",
    "process.nextTick callbacks run right after the current operation, before promise microtasks; then promise microtasks; both run between phases. Overusing nextTick can starve I/O.",
    "setTimeout(fn, 0) versus setImmediate: from the main module the order is not guaranteed; inside an I/O callback setImmediate always runs first.",
    "Gotcha: blocking the loop with synchronous CPU work stops all requests, since there is one JS thread."
   ],
   "tryIt": "Run setTimeout, setImmediate, Promise.then and process.nextTick together in a file and write down the order before looking at the output.",
   "steps": [
    "Draw the six phases as a circle in NOTES.md with what each runs.",
    "Write 8 snippets: nextTick vs promise, timeout vs immediate (main vs inside fs.readFile), nested timers.",
    "Predict each output on paper before running.",
    "Run them and mark right or wrong; explain each miss using a phase.",
    "Add a snippet where a sync loop of 2 seconds delays a 0 ms timer, to see blocking."
   ],
   "end": "You predicted at least 6 of 8 outputs and can recite the six phases and the nextTick-before-microtask rule."
  }
 },
 "16": {
  "0": {
   "pts": [
    "Three linked-list problems that all use the same ideas: a dummy node, fast and slow pointers, and in-place pointer changes.",
    "143 Reorder List: find the middle with slow/fast, reverse the second half, then merge the two halves alternately. O(n) time, O(1) space.",
    "19 Remove Nth Node From End: use a dummy head; move fast n steps ahead, then move both until fast reaches the end; slow.next is the node to remove. One pass, O(n) time, O(1) space.",
    "2 Add Two Numbers: digits are stored in reverse order, so walk both lists adding digit by digit with a carry; build the result with a dummy head; keep going while either list or carry remains. O(max(n,m)) time.",
    "Common mistake: removing the head in 19 without a dummy node, and dropping the final carry in 2."
   ],
   "steps": [
    "Solve 19 first (dummy node plus gap of n) and test removing the head.",
    "Solve 2 and test 99 + 1 style input to check the carry is kept.",
    "Solve 143 in three clear helper steps: findMiddle, reverse, merge.",
    "Draw 1->2->3->4->5 through each step of 143.",
    "Re-solve 206 from yesterday cold to confirm you can reuse it as a helper."
   ],
   "end": "143, 19 and 2 are accepted and each solution lists time and space."
  },
  "1": {
   "pts": [
    "fs/promises gives promise-based file functions (readFile, readdir, stat). path.join and path.resolve build file paths safely; os gives system info; events provides EventEmitter; util.promisify turns a callback function into a promise one.",
    "util.parseArgs reads CLI flags: parseArgs({options:{dir:{type:'string'}, verbose:{type:'boolean'}}}) returns values and positionals.",
    "A Buffer is a fixed-size chunk of raw bytes. Encodings convert it to text: utf8, base64, hex. Buffer.from('hi').toString('hex') gives 6869.",
    "crypto basics: createHash('sha256').update(data).digest('hex') hashes; createHmac(alg, secret) signs with a key; randomBytes(n) gives secure random bytes. Never use Math.random for secrets.",
    "Gotcha: readFile loads the whole file into memory; for large files hash with a stream (done on Day 17). Never use plain hashing for passwords."
   ],
   "tryIt": "Print Buffer.from('hello').toString('base64') and decode it back, then print the sha256 hex of 'hello'.",
   "steps": [
    "Create hashdir.js using util.parseArgs with a --dir flag and --algo option.",
    "Use fs.readdir with withFileTypes and skip subdirectories.",
    "For each file read it, hash with crypto, and print filename and hex hash.",
    "Add an HMAC option using a --secret flag and compare outputs.",
    "Run it on a folder and confirm one hash against the sha256sum command."
   ],
   "end": "hashdir.js prints hashes that match sha256sum for at least two files."
  }
 },
 "17": {
  "0": {
   "pts": [
    "Three harder linked-list problems with hash maps and pointer tricks.",
    "138 Copy List with Random Pointer: pass 1, map each original node to a new copy in a Map; pass 2, set copy.next and copy.random using the map. O(n) time, O(n) space; an interleaving trick gets O(1) extra space.",
    "287 Find the Duplicate Number: treat value as next pointer (index to nums[index]); Floyd's cycle detection finds the cycle entry, which is the duplicate. O(n) time, O(1) space, without modifying the array.",
    "146 LRU Cache: a hashmap from key to node plus a doubly linked list ordered by recency; get and put move the node to the front, eviction removes the tail. Both operations O(1). Use dummy head and tail nodes to avoid null checks.",
    "Common mistake in 146: forgetting to delete the evicted key from the map, or not updating the node when put is called on an existing key."
   ],
   "steps": [
    "Solve 138 with the Map version first.",
    "Solve 287 and read the explanation of phase 2 (reset one pointer to the start) if needed.",
    "Solve 146 by drawing the list and map for capacity 2 on paper, then code it.",
    "Add the doubly-linked-list LRU to jsutils (P1) as src/lruList.js with tests identical to the Map version.",
    "Benchmark both versions with 1e6 get/set operations and write the numbers in the README."
   ],
   "end": "138, 287 and 146 are accepted and jsutils has both LRU versions with a benchmark result written down."
  },
  "1": {
   "pts": [
    "A stream processes data in chunks instead of loading it all in memory. Types: Readable (source), Writable (sink), Duplex (both), Transform (changes data passing through).",
    "Backpressure: when the writer is slower than the reader, write() returns false and the producer should wait for the drain event. highWaterMark is the buffer size (bytes, or object count) that triggers this. pipe and pipeline handle it for you.",
    "Object mode lets streams carry JS objects instead of Buffers or strings.",
    "stream.pipeline(a, b, c, callback) (or the promise version in stream/promises) connects streams, propagates errors and cleans up all streams; plain pipe does not. Readable streams are async iterable: for await (const chunk of readable).",
    "Gotcha: handling stream errors with pipe leaks file handles, so prefer pipeline."
   ],
   "tryIt": "Use fs.createReadStream on a text file and print the number of chunks and bytes using for await.",
   "steps": [
    "Create a Transform with transform(chunk, enc, cb){ cb(null, chunk.toString().toUpperCase()) }.",
    "Pipe fs.createReadStream('in.txt') through it and then zlib.createGzip() into a write stream out.txt.gz using pipeline.",
    "Decompress with gunzip -c out.txt.gz and check the text is uppercase.",
    "Write a Readable that reads a large file with a small highWaterMark and log the chunk size.",
    "Make a slow Writable and observe write() returning false and the drain event."
   ],
   "end": "out.txt.gz decompresses to the uppercased input and you observed backpressure via write() returning false."
  }
 },
 "18": {
  "0": {
   "pts": [
    "A stack is last in, first out. In JavaScript use an array with push and pop (both O(1)). Reach for a stack when the most recent unmatched thing matters: brackets, undo, nested structures.",
    "20 Valid Parentheses: push opening brackets; on a closing bracket pop and check it matches; the stack must be empty at the end. O(n) time, O(n) space.",
    "155 Min Stack: keep a second stack of minimums (or store pairs of value and current min) so getMin is O(1); every operation is O(1).",
    "150 Evaluate Reverse Polish Notation: push numbers; on an operator pop two, apply, push the result. The first popped is the right operand. O(n) time, O(n) space. Division truncates toward zero (Math.trunc).",
    "Common mistake: swapping operand order for - and /, and forgetting to check that the stack is empty at the end of 20."
   ],
   "steps": [
    "Solve 20 using a Map of closing to opening brackets.",
    "Solve 155 with pairs [value, minSoFar] and test pop of the min.",
    "Solve 150 and write a test for 4 13 5 / + (answer 6).",
    "Write the stack pattern signature: most recent unmatched item matters.",
    "Add complexity comments to each solution."
   ],
   "end": "20, 155 and 150 are accepted and each has complexity comments."
  },
  "1": {
   "pts": [
    "node:http createServer((req, res) => ...) gives you a request and a response object, both streams. Routing is manual: look at req.method and req.url (parse with new URL(req.url, 'http://x')).",
    "Parse a JSON body by collecting chunks (for await (const c of req)), joining them, then JSON.parse in a try/catch and returning 400 on bad JSON. Set a size limit to avoid memory abuse.",
    "Status codes: 200 OK, 201 created, 204 no content, 400 bad input, 404 not found, 405 method not allowed, 500 server error. Set Content-Type: application/json and use res.writeHead and res.end.",
    "Keep-alive reuses a TCP connection for many requests. Chunked encoding (Transfer-Encoding: chunked) sends a body of unknown length in pieces; res.write(chunk) several times then res.end() uses it automatically when no Content-Length is set.",
    "Gotcha: forgetting res.end() leaves the client hanging, and sending headers twice throws an error."
   ],
   "tryIt": "Create a server that returns JSON {ok:true} on GET /health and test with curl -i localhost:3000/health.",
   "steps": [
    "Create server.js with createServer and a route table keyed by METHOD + path.",
    "Add GET /health, POST /echo (parse JSON body, return it) and a 404 and 405 fallback.",
    "Add a body size limit and a 400 on invalid JSON; test with curl -d.",
    "Add GET /stream that writes 5 lines one per second with res.write and ends; test with curl -N.",
    "Check curl -i for Connection: keep-alive and Transfer-Encoding: chunked headers."
   ],
   "end": "curl shows correct status codes for all routes and /stream arrives line by line with chunked encoding."
  }
 },
 "19": {
  "0": {
   "pts": [
    "A monotonic stack keeps its items in sorted order (always decreasing or increasing). When a new item breaks the order, pop until it fits; each pop is where you learn an answer. Reach for it when asked for the next greater or smaller element.",
    "739 Daily Temperatures: store indexes of days still waiting for a warmer day; when today is warmer than the day on top, pop it and set its answer to today minus that index. O(n) time, O(n) space, since each index is pushed and popped once.",
    "853 Car Fleet: sort cars by position descending; compute each car's time to reach the target as (target - position) / speed; a car joins the fleet ahead if its time is less than or equal; count only times that exceed the previous fleet time. O(n log n) time.",
    "Store indexes rather than values in 739 so you can compute distances.",
    "Common mistake in 853: not sorting by position first, or using floor division for the time instead of exact division."
   ],
   "steps": [
    "Write the O(n^2) brute force for 739 and then the stack version.",
    "Trace [73,74,75,71,69,72,76,73] by hand showing the stack contents each step.",
    "Solve 853 by computing times and checking fleets from closest to the target.",
    "Test 853 on target=12, position [10,8,0,5,3], speed [2,4,1,1,3] (answer 3).",
    "Write the monotonic stack signature in NOTES.md: next greater or smaller element."
   ],
   "end": "739 and 853 are accepted and each solution has complexity comments."
  },
  "1": {
   "pts": [
    "child_process runs other programs: spawn streams output for long jobs, exec buffers output (small results), fork starts another Node script with a message channel. Use for running commands or isolating work in another process.",
    "cluster starts several Node processes sharing one server port, to use all CPU cores for an HTTP server. worker_threads run JavaScript in threads inside one process, ideal for CPU-heavy work, and talk by messages (postMessage, MessageChannel).",
    "SharedArrayBuffer lets threads share memory; Atomics (add, load, store, wait) make access to it safe. Without Atomics you get race conditions.",
    "Choose: I/O-bound work (network, files) needs no extra threads since async I/O handles it; CPU-bound work (hashing, image resizing, fibonacci) blocks the loop, so move it to a worker thread or another process.",
    "Gotcha: starting a thread has a cost, so use a worker pool, not one worker per request."
   ],
   "tryIt": "Run a recursive fib(40) on the main thread while a setInterval prints a tick every 100 ms and watch the ticks stop.",
   "steps": [
    "Create a server with GET /fast (instant) and GET /fib?n=40 computing fibonacci synchronously.",
    "Request /fib in one terminal and /fast in another; show /fast blocked.",
    "Move fib into a worker_threads Worker and show /fast stays responsive.",
    "Run the same fib through child_process.fork and compare time and overhead.",
    "Write a short note in NOTES.md: which to use for CPU-bound versus I/O-bound and why."
   ],
   "end": "/fast responds immediately while /fib runs in a worker, and your note states when to use each option."
  }
 },
 "20": {
  "0": {
   "pts": [
    "HTTP/1.1 sends one request at a time per connection (browsers open several). HTTP/2 multiplexes many requests over one connection with header compression. HTTP/3 uses QUIC over UDP to avoid TCP-level head-of-line blocking.",
    "Before a request: DNS turns a name into an IP, TCP does a three-way handshake, and TLS handshake agrees on encryption keys and verifies the server certificate. Each step adds latency.",
    "Cookies: the server sets them with Set-Cookie, the browser returns them in Cookie. HttpOnly hides them from JavaScript, Secure sends only over HTTPS, SameSite limits cross-site sending.",
    "CORS is a browser rule that blocks cross-origin reads unless the server allows it with Access-Control-Allow-Origin. A preflight is an OPTIONS request the browser sends first for non-simple requests (such as custom headers or PUT).",
    "Caching: ETag identifies a version; the client sends If-None-Match and a 304 Not Modified response means use the cached copy. Cache-Control (max-age, no-store, no-cache) sets the rules."
   ],
   "tryIt": "Run curl -v https://example.com and point out the DNS line, TLS handshake lines, request headers and response status.",
   "steps": [
    "Run curl -v and curl --http2 -I against a site, and note the protocol and TLS lines.",
    "Use dig example.com to see DNS answers and the TTL.",
    "In DevTools Network, open a page and read the Timing tab (DNS, connect, SSL, waiting).",
    "Reload and find a 304 or from-cache response; read the ETag and Cache-Control headers.",
    "Create a small local server that sets cookies and a cross-origin fetch from another port; observe the preflight OPTIONS request."
   ],
   "end": "You have noted DNS, TCP, TLS and response timings for one site and shown a preflight and a 304 response."
  },
  "1": {
   "pts": [
    "A queue is first in, first out. A queue with two stacks pushes onto an input stack and, when asked to pop or peek, moves everything to an output stack if it is empty. Each element moves at most twice, so operations are O(1) amortised.",
    "84 Largest Rectangle in Histogram: monotonic stack of increasing heights; when a shorter bar arrives, pop and compute area with the popped height times the width back to the new stack top. Add a final sentinel bar of height 0. O(n) time, O(n) space.",
    "239 Sliding Window Maximum redo: monotonic deque of indexes in decreasing value order; O(n). Redo it without notes and check it takes under 15 minutes.",
    "22 Generate Parentheses: backtracking (try one choice, recurse, undo it). Add '(' if open < n, add ')' if close < open. The output count is a Catalan number, so time is roughly O(4^n / sqrt(n)).",
    "Common mistake in 84: forgetting to flush remaining bars at the end, and using the wrong left boundary after popping."
   ],
   "steps": [
    "Implement MyQueue with push, pop, peek and empty using two arrays as stacks, and test it.",
    "Solve 84: draw [2,1,5,6,2,3] with the stack at each step (answer 10).",
    "Redo 239 cold with a 15-minute timer.",
    "Solve 22 by writing the recursion tree for n=2 on paper first.",
    "Add complexity comments for all four and schedule 84 and 22 for re-solve."
   ],
   "end": "84 and 22 are accepted, 239 is solved cold, and MyQueue passes its tests."
  },
  "2": {
   "pts": [
    "P2 is a CLI log analyser. Start with the scaffold: parse flags with util.parseArgs or commander, with a clear help text and sensible exit codes.",
    "Write a generator script that writes about 1 GB of fake access-log lines to disk using a write stream and respects backpressure (wait for drain), otherwise memory will blow up.",
    "Streaming line reader: use readline.createInterface({input: fs.createReadStream(file), crlfDelay: Infinity}) and for await over lines, so memory stays flat regardless of file size.",
    "Measure memory with process.memoryUsage().rss and heapUsed sampled every second. Flat memory proves streaming; a growing line means you accidentally hold the whole file.",
    "Gotcha: fs.readFile on a 1 GB file crashes or uses 1 GB RAM; also generate varied lines (IP, path, status, bytes, time) so later steps are realistic."
   ],
   "steps": [
    "Create the P2 repo with package.json (type module), a bin/logstat.js entry and parseArgs options --file and --gen.",
    "Write scripts/generate-log.js producing common-log-format lines to a write stream, honoring drain.",
    "Generate the 1 GB file and check size with ls -lh.",
    "Write src/readLines.js as an async generator wrapping readline.",
    "Count the lines and print memory used (rss and heapUsed) at the end, with a test on a tiny sample file."
   ],
   "end": "The 1 GB file is generated, the reader counts every line, and peak memory stays flat (tens of MB, not 1 GB)."
  }
 },
 "21": {
  "0": {
   "pts": [
    "A transform pipeline streams data through small stages: parse each line, filter, group by a key into a Map, then keep the top N. Streaming keeps memory flat even for huge files.",
    "worker_threads run JavaScript on separate threads so CPU-heavy work does not block the event loop. Each worker has its own memory; data is copied via postMessage (or shared with SharedArrayBuffer).",
    "Split the input into chunks (by byte ranges aligned to line ends), send each chunk to a worker, then merge the partial group-by Maps in the main thread.",
    "Gotcha: creating workers is expensive and too many chunks adds copy overhead. Use a fixed pool (about the CPU core count) and benchmark; parallel is not always faster."
   ],
   "steps": [
    "Write parse(line), filter(rec), groupBy(records, keyFn) and topN(map, n) as pure functions in src/pipeline.js with a unit test for each.",
    "Wire them with a readline stream over the file and run on a sample of about 1M generated lines. Record the time with console.time.",
    "Create src/worker.js that receives a chunk of lines, runs parse -> filter -> group, and posts back a plain object of partial counts.",
    "Create src/pool.js: start N workers, hand out chunks as workers become free, collect results, then merge the Maps and run topN.",
    "Write bench.js that runs single-thread and N = 1, 2, 4, cores workers three times each and prints the median time.",
    "Put a table of results in PERF.md plus two sentences on why speedup is below N (copy cost, merge cost, disk read)."
   ],
   "end": "Done when topN output is identical in single and multi-worker mode and PERF.md shows measured timings for both."
  },
  "2": {
   "pts": [
    "Timed block: 75 minutes for 3 problems cold (no notes) plus one unseen medium. The goal is to simulate an interview, not to learn new patterns.",
    "LC 206 Reverse Linked List: walk with prev/curr pointers, saving next before flipping curr.next. O(n) time, O(1) space.",
    "LC 146 LRU Cache: a hash map from key to node plus a doubly linked list ordered by recency; get/put move the node to the front, evict from the tail. O(1) per operation.",
    "LC 84 Largest Rectangle in Histogram: keep a stack of increasing bar heights; when a lower bar arrives, pop and compute width for each popped bar. O(n) time, O(n) space.",
    "Common mistake: losing the next pointer before reassigning it, or forgetting a sentinel bar (height 0) at the end of the histogram so the stack is never fully flushed."
   ],
   "steps": [
    "Set a 75-minute timer. Spend at most 20 minutes on each of 206, 146, 84; no hints or looking at old solutions.",
    "Talk out loud as if in an interview: restate the problem, give an example, state the approach and complexity before coding.",
    "After each problem, test with one edge case (empty list, single node, all equal bars) by hand.",
    "Spend the remaining time on the unseen medium linked-list or stack problem; pick it blind from the list.",
    "Log in NOTES.md: time per problem, which needed a hint, and re-solve any failed problem within 3 days."
   ],
   "end": "Done when all three cold problems are written and traced on an example, and each miss has a one-line cause in NOTES.md."
  },
  "3": {
   "pts": [
    "OSI is a 7-layer teaching model; TCP/IP is the 4-layer model actually used (link, internet, transport, application). You mostly care about IP (addressing), TCP/UDP (transport) and HTTP (application).",
    "TCP gives a reliable ordered byte stream after a handshake; UDP sends independent datagrams with no delivery guarantee but low overhead (DNS, video, games).",
    "A socket is an endpoint identified by IP + port. A connection is a pair of sockets. The OS gives your process a file descriptor (a small integer handle) for each open socket.",
    "TCP is a stream, not messages: one write can arrive split, or two writes merged. Chat servers need a delimiter such as newline to find message boundaries."
   ],
   "tryIt": "Run nc localhost 4000 (or telnet) in two terminals against your server and check that a line typed in one appears in the other.",
   "steps": [
    "Create chat.js using net.createServer((socket) => { ... }) listening on port 4000.",
    "Keep a Set of connected sockets: add on connection, delete on 'close' and 'error'.",
    "On 'data', buffer the text, split on newline, and write each full line to every other socket (skip the sender).",
    "Add a 'name' prefix: first line from a client becomes its nickname.",
    "Connect with three nc clients, disconnect one abruptly (Ctrl+C), and confirm the server survives.",
    "In NOTES.md answer: what is a connection, a socket, a file descriptor? One sentence each."
   ],
   "end": "Done when three clients chat through your server and killing one client does not crash it."
  }
 },
 "22": {
  "0": {
   "pts": [
    "Recursion solves a problem by solving smaller copies of it. Every recursive function needs a base case (stops) and a step that moves toward it. Missing base case means stack overflow.",
    "LC 50 Pow(x,n): fast exponentiation. x^n = (x^(n/2))^2, times x if n is odd. That makes O(log n) time. Handle negative n by computing 1/x with -n, and watch n = -2^31.",
    "LC 78 Subsets: at each element choose to include or exclude it, giving 2^n subsets. Time O(n * 2^n) since each subset is copied; recursion depth is n.",
    "Draw the tree: root is [], each level decides one element, leaves are the finished subsets. Coding is then just walking your drawing.",
    "Common mistake: pushing the same path array into results instead of a copy, so every result ends up empty or identical."
   ],
   "steps": [
    "On paper draw the include/exclude tree for [1,2,3]. Label each leaf with its subset.",
    "Write pow recursively for positive n first, then add the negative-exponent case and test 2^-2, 2^10, 0^0 behavior.",
    "Code subsets with dfs(index, path): if index == n push a copy of path; else dfs without nums[index], then push it, dfs, pop.",
    "Trace the call order for [1,2,3] and compare with your drawing.",
    "Note the time and space complexity of both in NOTES.md and re-solve both tomorrow from scratch."
   ],
   "end": "Done when both pass on LeetCode and your hand-drawn tree matches the order of your code's output."
  },
  "1": {
   "pts": [
    "uncaughtException fires when a thrown error is never caught; the process state is unknown, so log it and exit. unhandledRejection fires for a rejected promise with no handler; in modern Node it also crashes by default.",
    "SIGTERM is what Docker/Kubernetes send to ask you to stop; SIGINT is Ctrl+C. Handle both with process.on, since by default the process dies instantly without cleanup.",
    "Graceful shutdown: stop accepting new connections (server.close), let in-flight requests finish, close DB and queue clients, then exit with code 0. Add a timer that force-exits after about 10s.",
    "Structured logging with pino writes one JSON object per line (level, time, msg, fields) so tools can search it. Exit code 0 means success; nonzero means failure, which orchestrators use to restart."
   ],
   "tryIt": "Start an HTTP server with a 5 second slow route, press Ctrl+C mid-request, and confirm the request still completes before the process exits.",
   "steps": [
    "npm i pino. Create logger.js exporting pino({ level: process.env.LOG_LEVEL || 'info' }).",
    "Add process.on('unhandledRejection') and process.on('uncaughtException') handlers that log with logger.fatal and call process.exit(1).",
    "Write a shutdown(signal) function: log, server.close(), await your DB close, clearTimeout on a 10s forced-exit timer, then process.exit(0).",
    "Register it for SIGTERM and SIGINT, with a guard so it runs only once.",
    "Test: curl a slow route, send kill -TERM <pid>, and check the response completes and new connections are refused.",
    "Apply the same shutdown code to your P2 server."
   ],
   "end": "Done when kill -TERM lets an in-flight request finish and the process exits with code 0 within 10 seconds."
  }
 },
 "23": {
  "0": {
   "pts": [
    "Backtracking is recursion that builds a candidate step by step, and undoes (pops) the last step to try the next choice. Reach for it when asked for all permutations, combinations or subsets.",
    "Template: dfs(path): if path is complete, save a copy; for each choice: skip invalid, push, dfs, pop.",
    "LC 46 Permutations: track a used[] array so each element appears once per path. Time O(n * n!).",
    "LC 90 Subsets II: sort first; inside a level, skip nums[i] if it equals nums[i-1] and i > start, to avoid duplicate subsets. LC 39 Combination Sum: elements may be reused, so recurse with the same index; stop when remaining < 0.",
    "Common mistake: forgetting to pop (undo) after the recursive call, or saving path itself instead of a copy of it."
   ],
   "steps": [
    "Write the template from memory in NOTES.md before touching a problem.",
    "Solve 46 with a used array; then try the swap-in-place variant if time allows.",
    "Solve 90: sort, use a start index loop, and add the duplicate-skip rule. Test [1,2,2].",
    "Solve 39: loop from start index, recurse with i (not i+1), prune when the running sum exceeds target.",
    "Draw the recursion tree for 39 with candidates [2,3] and target 6 and mark pruned branches.",
    "Re-solve all three tomorrow without notes."
   ],
   "end": "Done when all three pass and you can recite the choose / explore / un-choose template from memory."
  },
  "1": {
   "pts": [
    "package.json describes the project: name, version, main/exports, scripts, dependencies (needed at runtime), devDependencies (build/test only), and engines (required Node version).",
    "Semver is MAJOR.MINOR.PATCH. ^1.2.3 allows 1.x.x updates; ~1.2.3 allows 1.2.x only. The lockfile (package-lock.json or pnpm-lock.yaml) pins exact versions: always commit it and install with npm ci in CI.",
    "npm scripts are shell commands run with npm run name; npx runs a package binary without installing it globally. Workspaces let one repo hold several packages that import each other.",
    "12-factor config: store config in environment variables, never in code. Load a .env with node --env-file=.env (Node 20.6+) or dotenv; never commit .env, commit .env.example instead."
   ],
   "tryIt": "Set engines to a Node version you do not have, run npm install with engine-strict and read the error.",
   "steps": [
    "Create a folder mono with package.json containing \"workspaces\": [\"packages/*\"] and \"private\": true.",
    "Create packages/shared (exports a add() or formatDate() function) and packages/app that depends on shared via \"shared\": \"*\".",
    "Run npm install at the root and check node_modules/shared is a symlink to your package.",
    "Add scripts: start, test (node --test) and lint at each level; run one from root with npm run start -w app.",
    "Add .env.example and .env (gitignored); read a PORT value in app via node --env-file=.env.",
    "Add engines.node and commit the lockfile."
   ],
   "end": "Done when app imports a function from shared and runs from the repo root with config read from .env."
  }
 },
 "24": {
  "0": {
   "pts": [
    "All three are backtracking, each adding one twist to yesterday's template: duplicates, a grid, and a digit-to-letters map.",
    "LC 40 Combination Sum II: each number used once and input has duplicates. Sort, recurse with i+1, and skip candidates[i] equal to candidates[i-1] when i > start. Prune when sum exceeds target.",
    "LC 79 Word Search: DFS from every cell matching word[0]; mark the cell visited (for example set to '#') then restore it on return. Time about O(m*n*4^L), L = word length.",
    "LC 17 Letter Combinations: recurse over digits, loop over that digit's letters, append, recurse, pop. Output size is up to 4^n; handle empty input by returning [].",
    "Common mistake: forgetting to restore the visited marker in Word Search, which breaks every later path."
   ],
   "steps": [
    "Solve 17 first (simplest) and confirm empty-string input returns an empty list.",
    "Solve 40 by copying your 39 solution, then add sorting and the duplicate-skip rule. Test [10,1,2,7,6,1,5] target 8.",
    "Solve 79: write dfs(r, c, k), bounds check, char check, mark, four directions, unmark.",
    "Add an early exit: return true as soon as a path is found, instead of exploring all.",
    "Write the time complexity for each in NOTES.md and flag any you needed a hint for."
   ],
   "end": "Done when all three pass on LeetCode and you can explain exactly where each undoes its choice."
  },
  "1": {
   "pts": [
    "Test pyramid: many fast unit tests, fewer integration tests (several parts together, such as HTTP plus DB), very few slow end-to-end tests. Fast feedback is the goal.",
    "node:test (built in, run with node --test) and Vitest both offer describe/it/expect-style tests. A mock fakes a dependency and records calls; a stub returns canned data; a spy wraps the real function and watches calls.",
    "Fake timers let you test setTimeout/debounce code instantly by advancing a fake clock instead of waiting. supertest sends HTTP requests to your app in-process without opening a real port.",
    "Isolation: each test must set up its own state and not depend on order. Shared mutable state between tests is the main cause of flaky tests."
   ],
   "tryIt": "Write a test using fake timers that proves a debounced function fires once after 300 ms, not before.",
   "steps": [
    "Install vitest and supertest as dev dependencies in P2 and add \"test\": \"vitest run\" to package.json.",
    "Export the router and pipeline functions so they can be imported without starting the server.",
    "Write unit tests for router matching: static path, :param extraction, 404 on unknown path, wrong method.",
    "Write unit tests for pipeline stages with small fixed inputs, including empty input and a malformed line.",
    "Write one supertest test per route: status code and JSON body.",
    "Run with coverage and note the untested branches in NOTES.md."
   ],
   "end": "Done when npm test passes, covers router and pipeline, and runs in under 5 seconds."
  }
 },
 "25": {
  "0": {
   "pts": [
    "Merge sort: split in half, sort each, merge two sorted halves. O(n log n) always, O(n) extra space, stable. Quick sort: pick a pivot, partition so smaller go left, recurse. Average O(n log n), worst O(n^2) on bad pivots, O(1) extra space.",
    "Lomuto partition uses one scan with a boundary index and is simple; Hoare uses two pointers moving inward and makes fewer swaps but is easier to get wrong at boundaries.",
    "Heap sort: build a max-heap in O(n), then repeatedly swap the root with the last item and sift down. O(n log n), in place, not stable.",
    "LC 75 Sort Colors: Dutch national flag, three pointers (low, mid, high), one pass, O(n) time and O(1) space. LC 912: use merge or heap sort to avoid quick sort's worst case.",
    "Common mistake: off-by-one at partition boundaries, or incrementing mid after swapping with high in Sort Colors (you must re-check the swapped value)."
   ],
   "steps": [
    "Write merge sort first and test on empty, single, duplicates and already sorted input.",
    "Write Lomuto quick sort, then Hoare; compare outputs against Array.sort on 1000 random arrays.",
    "Write heapify(i, size) and heap sort; test the same random arrays.",
    "Solve LC 912 with merge sort or heap sort and LC 75 with the three-pointer method.",
    "In NOTES.md write a table: algorithm, best, average, worst, space, stable or not."
   ],
   "end": "Done when all three sorts match Array.sort on random tests and 912 and 75 are accepted."
  },
  "1": {
   "pts": [
    "A window function computes over a set of rows related to the current row without collapsing them like GROUP BY. Syntax: func() OVER (PARTITION BY col ORDER BY col).",
    "ROW_NUMBER gives unique 1,2,3; RANK leaves gaps after ties (1,1,3); DENSE_RANK does not. LAG/LEAD read the previous/next row's value. SUM() OVER (ORDER BY ...) gives a running total.",
    "A CTE (WITH name AS (...)) is a named subquery that makes queries readable. A recursive CTE has an anchor query UNION ALL a recursive part, and is used for trees such as org charts or categories.",
    "Gotcha: you cannot filter on a window function in WHERE; wrap it in a CTE or subquery and filter outside. Always include a stop condition in recursive CTEs."
   ],
   "tryIt": "Write a query returning each order with the previous order's amount (LAG) and a running total per customer.",
   "steps": [
    "Open pgexercises.com (or a local Postgres) and do the Aggregates section.",
    "Do the Window Functions section: ranking, running totals, partition by month.",
    "Write top-3-per-group using ROW_NUMBER() inside a CTE, then WHERE rn <= 3 outside.",
    "Do the Recursive section: walk a hierarchy from a root down, and up from a leaf.",
    "Save your hardest 5 queries to sql/window.sql with a comment saying what each does."
   ],
   "end": "Done when you can write a top-N-per-group query and a recursive hierarchy query without looking anything up."
  }
 },
 "26": {
  "0": {
   "pts": [
    "Binary search needs a sorted or monotonic condition. To search on the answer, define can(x) that is false then true as x grows, and find the first true value. Cost is O(log range * cost of can).",
    "LC 153 Find Minimum in Rotated Sorted Array: compare mid with the right end; if nums[mid] > nums[right] the minimum is to the right, else it is at mid or left. O(log n).",
    "LC 981 Time Based Key-Value Store: a map from key to a list of (timestamp, value) pairs. set appends; get binary searches the largest timestamp <= the query. O(log n) per get.",
    "LC 4 Median of Two Sorted Arrays is hard: binary search a partition point on the shorter array so left halves hold the smaller half overall. Target O(log(min(m,n))). Attempting counts; do not spend more than 25 minutes.",
    "Common mistake: infinite loops from lo = mid instead of mid + 1, or choosing the wrong loop condition (lo < hi vs lo <= hi)."
   ],
   "steps": [
    "Redo 153 from scratch with lo < hi and hi = mid; trace [4,5,6,7,0,1,2].",
    "Solve 981: implement get with binary search on the stored timestamps, returning '' when none qualifies.",
    "Attempt 4 for 25 minutes, then read the editorial on partitioning and rewrite it yourself.",
    "Write your binary search invariant in one sentence in NOTES.md for each problem.",
    "Re-attempt 4 in two days."
   ],
   "end": "Done when 153 and 981 pass and you can state the loop invariant of each in one sentence."
  },
  "1": {
   "pts": [
    "CASE WHEN ... THEN ... ELSE ... END is SQL's if/else. COALESCE(a, b) returns the first non-NULL value. Remember NULL comparisons use IS NULL, and NULL + 1 is NULL.",
    "Dates: now(), date_trunc('month', ts), extract(), interval arithmetic such as ts - interval '7 days'. UNION combines results removing duplicates (UNION ALL keeps them); INTERSECT and EXCEPT do set math.",
    "JSONB stores JSON in binary: col->'key' returns JSON, col->>'key' returns text, @> tests containment. generate_series(1,10) or between dates creates rows, useful for filling gaps in reports.",
    "Full-text search: to_tsvector('english', body) turns text into searchable tokens, to_tsquery builds a query, @@ matches, a GIN index makes it fast, ts_rank orders by relevance."
   ],
   "tryIt": "Using generate_series, produce a daily revenue report that shows 0 for days with no orders.",
   "steps": [
    "Create an orders table (id, customer_id, status, total, created_at, meta JSONB) and insert about 200 rows using generate_series and random().",
    "Write 3 queries with CASE and COALESCE (order size buckets, null-safe totals).",
    "Write 3 queries with date_trunc: orders per month, last-7-days revenue, week-over-week.",
    "Write 2 queries with UNION/EXCEPT and 1 with JSONB operators.",
    "Add a tsvector column, a GIN index, and a search query ordered by ts_rank.",
    "Save all 10 queries in sql/reports.sql with a short comment each."
   ],
   "end": "Done when sql/reports.sql has 10 working queries including one full-text search using a GIN index."
  }
 },
 "27": {
  "0": {
   "pts": [
    "Node runs your JavaScript on one thread. A slow synchronous function (big loop, JSON.parse of huge text, regex backtracking) blocks every other request. Symptom: high latency under low CPU use of other requests.",
    "Profiling: node --cpu-prof writes a .cpuprofile you can open in Chrome DevTools; clinic flame (or 0x) draws a flame graph where wide bars are time sinks. --prof plus node --prof-process gives a text report.",
    "autocannon is a load tester: autocannon -c 50 -d 10 url shows requests/sec and latency percentiles. Always measure before and after a change.",
    "Event-loop lag: perf_hooks.monitorEventLoopDelay() gives a histogram of how late timers fire; p99 above about 100 ms means something is blocking. --trace-gc prints garbage collection pauses."
   ],
   "tryIt": "Run autocannon against a route containing a 200 ms busy loop and read the p99 latency.",
   "steps": [
    "Create server.js with a /fast route and a /slow route that runs a synchronous loop (for example computing fib(35) or sorting 1M numbers).",
    "Add monitorEventLoopDelay, enable() it, and log p50/p99 every 5 seconds.",
    "Run autocannon on /fast alone, then on /fast while another autocannon hits /slow. Record both p99 values.",
    "Start with node --cpu-prof, run the load, stop, and open the .cpuprofile in Chrome DevTools Performance tab; find the hot function.",
    "Fix it: move the work to a worker_thread, cache, or use a better algorithm. Re-run autocannon.",
    "Run once with --trace-gc and note how often GC runs under load.",
    "Write before/after numbers in PERF.md."
   ],
   "end": "Done when PERF.md shows p99 latency before and after fixing the blocking handler and the lag histogram confirms the improvement."
  },
  "1": {
   "pts": [
    "Same backtracking template with pruning: abandon a branch as soon as it cannot lead to a valid answer, which cuts the search tree dramatically.",
    "LC 51 N-Queens: place one queen per row; track used columns and both diagonals using sets (row-col and row+col are constant along diagonals). Prune immediately on conflict.",
    "LC 131 Palindrome Partitioning: at each index try every end position; only recurse if s[start..end] is a palindrome. Optionally precompute a palindrome table to avoid rechecking.",
    "LC 22 Generate Parentheses: add '(' if open < n, add ')' if close < open. These two rules are the pruning. LC 17 redo: digits to letters.",
    "Common mistake: building the board string and checking validity at the end instead of rejecting conflicts as you place."
   ],
   "steps": [
    "Solve 51 with column and two diagonal sets; build the board only when row == n.",
    "Solve 131 with a helper isPalindrome(l, r); then try the memoized table version.",
    "Redo 22 from memory in under 10 minutes; write the two pruning rules at the top as comments.",
    "Redo 17 from memory in under 10 minutes.",
    "For each problem write down: what is the pruning condition and how many branches does it remove?"
   ],
   "end": "Done when all four pass and each has its pruning condition written down in NOTES.md."
  },
  "2": {
   "pts": [
    "Aggregates (grouped counts) must be written to a database efficiently. Inserting one row per query is slow because of a network round trip and a transaction commit each time.",
    "Batched multi-row INSERT sends many rows in one statement (INSERT ... VALUES (...),(...)). In Postgres, COPY ... FROM STDIN streams rows and is usually the fastest bulk load. SQLite is fastest with one transaction around prepared inserts.",
    "Always bound the batch size (for example 500 to 5000 rows) to limit memory and statement size; Postgres has a limit of 65535 bound parameters per statement.",
    "An export subcommand reads the table and writes CSV or JSON; stream it rather than loading everything."
   ],
   "steps": [
    "Create the aggregates table (key, count, sum) with a primary key and a migration or schema.sql file.",
    "Write sink.js with insertBatch(rows) using a multi-row parameterized INSERT with ON CONFLICT DO UPDATE (or the SQLite equivalent).",
    "Write a second version using COPY (pg-copy-streams) for Postgres, or a single transaction with prepared statements for SQLite.",
    "Benchmark one-row-at-a-time, multi-row INSERT and COPY on the same 100k aggregates; run each three times.",
    "Add the export subcommand: node cli.js export --format csv > out.csv, streaming rows from the table.",
    "Add a test that sinks 1000 rows and exports them back identically; update PERF.md with the comparison table."
   ],
   "end": "Done when PERF.md compares three insert strategies with real timings and export round-trips the data."
  }
 },
 "28": {
  "0": {
   "pts": [
    "A router matches method + path to a handler and extracts :params (for /users/:id, id = '42'). Store routes as {method, regex or segments, handler} and loop to find the first match.",
    "Middleware chain: an array of functions (req, res, next). next() runs the following one; a middleware that does not call next ends the chain. Write a small compose() that tracks the current index.",
    "JSON body parser: collect request chunks, JSON.parse on end, return 400 on invalid JSON and 413 if the body exceeds a size limit. Error handler: a catch around the chain that maps errors to status codes and a JSON body.",
    "Gotcha: async handler errors must be caught and passed to the error handler, or the request hangs forever."
   ],
   "steps": [
    "Create src/router.js with add(method, path, handler) and match(method, url) returning handler + params.",
    "Create src/app.js with use(mw), handle(req, res), compose-style next(), and a final 404 handler.",
    "Add middlewares: json body parser, request logger, and the error handler (4 args or a try/catch wrapper).",
    "Wrap async handlers so a rejected promise calls the error handler.",
    "Write supertest integration tests: param route, JSON POST, invalid JSON gives 400, unknown route gives 404, thrown error gives 500.",
    "Add graceful shutdown from Day 22, then tag: git tag v1.0 and push the tag."
   ],
   "end": "Done when all integration tests pass, SIGTERM exits cleanly, and the v1.0 tag is pushed."
  },
  "2": {
   "pts": [
    "Timed block: 75 minutes, three cold problems plus one unseen medium backtracking problem. Work like an interview: explain first, code second, test third.",
    "LC 46 Permutations: backtracking with a used array, O(n * n!). LC 739 Daily Temperatures: monotonic stack of indexes with decreasing temperatures; pop when a warmer day arrives and record the day gap. O(n).",
    "LC 912 Sort an Array: write merge sort or heap sort cold. O(n log n).",
    "For the unseen problem, say out loud what you would prune before writing code.",
    "Common mistake: spending 40 minutes stuck on one problem; after 20 minutes write down what you tried, then move on."
   ],
   "steps": [
    "Start a 75-minute timer; do 46, 739 and 912 in that order, max 20 minutes each.",
    "Write the complexity above each solution as a comment before submitting.",
    "Use the remaining time on one unseen backtracking medium.",
    "Log time taken and result for each in NOTES.md.",
    "Re-solve every problem that took over 20 minutes within 3 days."
   ],
   "end": "Done when all four attempts are logged with times and complexities in NOTES.md."
  },
  "3": {
   "pts": [
    "A DBMS stores data and gives you safe concurrent access, a query language, indexes, transactions and recovery after a crash. Relational model: data in tables (relations) of rows (tuples) and columns.",
    "Keys: primary key uniquely identifies a row; foreign key references another table's key; candidate key is any column set that could be the primary key; composite key uses multiple columns.",
    "Multi-tenancy with a tenant_id column: every table has tenant_id, and every query filters on it. Forgetting that filter leaks data between customers, so you will enforce it centrally later.",
    "ACID: Atomicity (all or nothing), Consistency (constraints hold), Isolation (concurrent transactions do not see half-done work), Durability (committed data survives a crash)."
   ],
   "tryIt": "Draw an ER diagram for orgs, users, boards and tasks with tenant_id on each table and mark every foreign key.",
   "steps": [
    "Watch CMU 15-445 lecture 1 and write 5 lines of notes.",
    "Sketch tables for the P3 domain: organizations, users, memberships, boards, tasks.",
    "Mark primary keys, foreign keys and tenant_id columns on the diagram.",
    "In NOTES.md explain one example each for atomicity and isolation.",
    "Write the Phase 2 retro: what went well, what was slow, 3 weak spots to fix in phase 3."
   ],
   "end": "Done when an ER sketch with keys and tenant_id exists and the Phase 2 retro is in NOTES.md."
  }
 },
 "29": {
  "0": {
   "pts": [
    "A binary tree node has val, left and right. Most tree problems are solved with recursion: handle null (base case), solve left and right, combine. This is depth-first search (DFS).",
    "LC 226 Invert Binary Tree: swap left and right at every node, recurse. LC 104 Maximum Depth: 1 + max(depth(left), depth(right)). Both O(n) time, O(h) space where h is tree height.",
    "LC 100 Same Tree: both null is true, one null is false, values differ is false, else compare left and right. LC 572 Subtree of Another Tree: at each node of the big tree, test Same Tree against the subtree; O(m*n) worst case.",
    "Common mistake: forgetting the null base case, or returning from only one branch when both subtrees must be checked."
   ],
   "steps": [
    "Write a TreeNode class and a helper to build a tree from an array like [1,2,3,null,4].",
    "Write recursive preorder, inorder and postorder traversals and print them for one tree.",
    "Solve 104, then 226, then 100 (each in under 10 minutes).",
    "Solve 572 by reusing your Same Tree function.",
    "Note the time and space complexity of each and re-solve tomorrow."
   ],
   "end": "Done when all four pass and you can write the null-base-case recursion pattern from memory."
  },
  "1": {
   "pts": [
    "TypeScript adds static types to JavaScript and is erased at build time. Use interface or type for object shapes (both work; interfaces can be extended and merged, types can express unions).",
    "Generics make reusable typed code: function first<T>(a: T[]): T | undefined. Unions (string | number) must be narrowed with typeof, in or equality checks before use.",
    "Utility types: Partial<T> makes all optional, Pick/Omit select or drop keys, Record<K,V> builds a map type. unknown forces you to check before use; any switches type checking off, so avoid it.",
    "Set \"strict\": true in tsconfig. Run files directly with tsx (npx tsx file.ts); ts-node is the older option. Types do not validate runtime data, so external input still needs validation."
   ],
   "tryIt": "Write a function taking unknown input and use a type guard to safely read a string name property from it.",
   "steps": [
    "In P1 run npm i -D typescript tsx @types/node and npx tsc --init, then set strict to true.",
    "Rename one utility file and one route or command file from .js to .ts.",
    "Add types to function parameters and return values; replace any with unknown plus narrowing.",
    "Define an interface for your main data record and use Pick/Omit for a create-input type.",
    "Run with npx tsx, fix every tsc --noEmit error, and add a typecheck script."
   ],
   "end": "Done when two P1 files are TypeScript and npx tsc --noEmit passes with strict on."
  }
 },
 "30": {
  "0": {
   "pts": [
    "Tree recursion that returns a value up and updates a global answer on the way. Reach for it when the answer depends on both subtrees.",
    "LC 543 Diameter of Binary Tree: height(node) returns 1 + max of children heights; at each node the diameter candidate is leftHeight + rightHeight. O(n). LC 110 Balanced: return -1 if any subtree is unbalanced else its height, which gives O(n) rather than O(n^2).",
    "LC 235 LCA of a BST: from the root, if both values are smaller go left, if both bigger go right, else the current node is the answer. O(h), O(1) space iteratively.",
    "LC 102 Level Order (BFS): use a queue; each round process exactly queue.length nodes to form one level. O(n).",
    "Common mistake: using queue.shift() on a large array (O(n) each), or forgetting to snapshot the level size before the loop."
   ],
   "steps": [
    "Solve 102 first to practice the queue loop with a captured level size.",
    "Solve 543 using a closure variable best updated inside height().",
    "Solve 110 with the -1 sentinel version; compare against the naive version by thought.",
    "Solve 235 iteratively using the BST ordering property.",
    "Write complexities in NOTES.md and re-solve 543 and 110 tomorrow."
   ],
   "end": "Done when all four pass and you can explain why the height-returning trick makes 110 linear."
  },
  "1": {
   "pts": [
    "REST models nouns as resources (/boards/12/tasks) and uses HTTP methods as verbs: GET reads, POST creates, PUT replaces, PATCH partially updates, DELETE removes. GET, PUT and DELETE should be idempotent (repeating them gives the same state).",
    "Status codes: 200 OK, 201 Created, 204 No Content, 400 bad input, 401 not logged in, 403 forbidden, 404 missing, 409 conflict, 422 validation failed, 429 rate limited, 500 server bug.",
    "Errors use one format, RFC 7807 problem details: {type, title, status, detail}. Pagination: offset (page=3) is simple but slow and unstable on big tables; cursor (after=<id>) is stable and fast.",
    "OpenAPI is a YAML/JSON description of paths, parameters, request bodies and responses. Writing it first (design-first) lets you agree on the contract before coding. Version in the URL (/v1) or by header."
   ],
   "tryIt": "Write the OpenAPI snippet for GET /boards/{id}/tasks with a cursor parameter and a 404 problem response.",
   "steps": [
    "List TaskBoard resources: users, boards, lists, tasks, comments and how they nest.",
    "Create openapi.yaml with info, servers, and paths for CRUD on boards and tasks.",
    "Define components/schemas for Task, TaskCreate, Problem and a paginated list.",
    "Add cursor pagination parameters (limit, after) and filtering (status, assignee).",
    "Paste it into editor.swagger.io and fix every validation error."
   ],
   "end": "Done when openapi.yaml validates and covers CRUD for boards and tasks with a shared Problem error schema."
  }
 },
 "31": {
  "0": {
   "pts": [
    "Pattern: tree traversal that carries extra information down (a bound, a max so far) or picks nodes by position. BFS handles level-based questions, DFS handles path-based ones.",
    "LC 199 Right Side View: BFS level by level and take the last node of each level (or DFS visiting right first, recording the first node at each depth). O(n).",
    "LC 1448 Count Good Nodes: DFS passing the maximum value seen on the path; a node is good if its value >= that maximum. O(n).",
    "LC 98 Validate BST: pass (low, high) bounds down; each node must be strictly between them. Checking only the immediate children is wrong. O(n).",
    "Common mistake in 98: comparing only parent and child, which misses a node in the left subtree that is bigger than an ancestor."
   ],
   "steps": [
    "Solve 199 with BFS and take the last element of each level.",
    "Solve 1448 with dfs(node, maxSoFar).",
    "Solve 98 with dfs(node, lo, hi) using null for unbounded; test [5,4,6,null,null,3,7], which is invalid.",
    "Try the inorder variant of 98 (inorder must be strictly increasing) and compare.",
    "Re-solve 98 tomorrow without notes."
   ],
   "end": "Done when all three pass and you can explain why the bounds approach is needed in 98."
  },
  "1": {
   "pts": [
    "Lifecycle (Fastify): onRequest, preParsing, preValidation, preHandler, handler, onSend, onResponse. Express is a linear chain of middleware; order of app.use calls decides order of execution.",
    "Fastify plugins encapsulate: decorators, hooks and routes registered inside a plugin are scoped to it and its children, so one part of the app cannot accidentally change another. Express uses routers for grouping.",
    "Async errors: in Fastify, throw inside an async handler and it is handled; in Express 4 you must call next(err) or wrap handlers, otherwise the request hangs. Express 5 catches rejected promises.",
    "Validate input with zod: schema.parse(body) throws on invalid data; use safeParse to return a 400. NestJS layers the same ideas as modules, providers (injectable services), guards (auth), pipes (validation), interceptors (wrap handlers)."
   ],
   "tryIt": "Add two hooks that log 'A' and 'B' and predict, then confirm, their execution order for one request.",
   "steps": [
    "Create a Fastify project with TypeScript or JS and add zod.",
    "Define taskSchema and createTaskSchema with zod; infer the TypeScript type from it.",
    "Build an in-memory CRUD: GET /tasks, GET /tasks/:id, POST /tasks, PATCH /tasks/:id, DELETE /tasks/:id.",
    "Validate bodies with safeParse and return 400 with the zod error messages; return 404 for missing ids.",
    "Add a global error handler and an onRequest hook that logs method and URL.",
    "Test each route with curl or a .http file."
   ],
   "end": "Done when all five task routes work in memory, invalid input returns 400, and unknown ids return 404."
  }
 },
 "32": {
  "0": {
   "pts": [
    "BST property: left subtree < node < right subtree, so an inorder (left, node, right) traversal visits values in sorted order.",
    "LC 230 Kth Smallest in a BST: do inorder traversal and stop at the kth visited node. Iterative with a stack gives O(h + k) time. Recursive is fine too.",
    "LC 105 Construct Binary Tree from Preorder and Inorder: preorder's first item is the root; find it in inorder to know the left subtree size; recurse on both slices. Use a hashmap from value to inorder index to get O(n).",
    "Common mistake: slicing arrays at every call (O(n^2)); pass index ranges and a value-to-index map instead."
   ],
   "steps": [
    "Solve 230 recursively with a counter, then iteratively with a stack.",
    "On paper, build the tree from preorder [3,9,20,15,7] and inorder [9,3,15,20,7] to see how the root splits the arrays.",
    "Code 105 with a map of inorder indexes and a preIndex pointer; build left before right.",
    "Verify by running your inorder traversal on the built tree.",
    "Re-solve 105 in 2 days from scratch."
   ],
   "end": "Done when both pass and you can build a tree from a preorder and inorder pair on paper."
  },
  "1": {
   "pts": [
    "Never store plain passwords. Use a slow salted hash: argon2 or bcrypt. A salt is random data per user so identical passwords hash differently; the cost factor controls how slow each guess is for an attacker.",
    "Sessions: server stores state, client holds a session id cookie; easy to revoke. JWT: signed token carrying claims, stateless, but hard to revoke before expiry. Choose short-lived access tokens plus refresh tokens.",
    "Refresh rotation: each refresh issues a new refresh token and invalidates the old one. Reuse detection: if an old token is used again, someone stole it, so revoke the whole token family.",
    "Cookie flags: HttpOnly (JS cannot read it), Secure (HTTPS only), SameSite=Lax or Strict (limits cross-site sending). CSRF is a site tricking the browser into sending your cookie; SameSite plus CSRF tokens defend against it."
   ],
   "tryIt": "Hash a password with argon2 or bcrypt twice and show that the two stored hashes differ but both verify.",
   "steps": [
    "Create docs/auth.md with sections: registration, login, access token, refresh token, logout.",
    "Specify the password rule: argon2id, parameters, minimum length.",
    "Specify token lifetimes (for example access 15 min, refresh 7 days) and where each is stored (refresh in HttpOnly cookie).",
    "Describe the refresh rotation table: id, user_id, token_hash, family_id, expires_at, revoked_at.",
    "Describe reuse detection and what happens on logout.",
    "List the CSRF defense and the cookie flags you will set."
   ],
   "end": "Done when docs/auth.md describes register, login, refresh rotation with reuse detection, logout and cookie flags."
  }
 },
 "33": {
  "0": {
   "pts": [
    "LCA of a general binary tree (LC 236): DFS returns the node if it equals p or q; if both left and right recursion return non-null, the current node is the LCA. O(n).",
    "LC 124 Binary Tree Maximum Path Sum (attempt): each node returns the best downward path (node + max(0, best child)); update a global answer with node + left gain + right gain. O(n). Ignore negative gains.",
    "BST delete: if the node has 0 or 1 child return the other child; if it has two, replace its value with the inorder successor (smallest in right subtree) and delete that successor. O(h).",
    "Inorder iterator: keep a stack; push all left nodes; next() pops, then pushes left nodes of the popped node's right child. Average O(1) per call, O(h) space."
   ],
   "steps": [
    "Solve 236 and test when p is an ancestor of q.",
    "Attempt 124 for 25 minutes; if stuck, read the idea (return one-sided gain, update global with both sides) and rewrite it.",
    "Implement BST delete for all three cases and print inorder before and after.",
    "Implement the inorder iterator class with next() and hasNext() and test on a small BST.",
    "Add the common mistake to NOTES.md: not clamping negative gains to 0 in 124."
   ],
   "end": "Done when 236 passes, 124 is attempted, and both BST delete and the iterator work on a sample tree."
  },
  "1": {
   "pts": [
    "Authentication asks who are you; authorization asks what may you do. RBAC assigns permissions to roles (admin, member); ABAC decides using attributes (owner of resource, department, time).",
    "OAuth2 lets an app act on a user's behalf without their password. Authorization code flow: app redirects to the provider, user consents, provider redirects back with a code, the app's server exchanges the code for tokens. OIDC adds an ID token with the user's identity.",
    "PKCE protects public clients: the app creates a random code_verifier, sends its hash (code_challenge) in the first redirect, and sends the verifier when exchanging the code, so a stolen code is useless.",
    "Scopes limit what a token can do. API keys are simple secrets for service callers. Service-to-service auth uses client credentials or signed tokens."
   ],
   "tryIt": "State in two sentences why a stolen authorization code cannot be exchanged when PKCE is used.",
   "steps": [
    "Draw a sequence diagram with four actors: user, browser app, your API, identity provider.",
    "Add each step: redirect with client_id, redirect_uri, scope, state, code_challenge; login and consent; redirect back with code and state.",
    "Add the token exchange POST with code_verifier and the response (access, refresh, ID token).",
    "Mark where state is checked and why (it blocks CSRF on the callback).",
    "Write a short RBAC table for TaskBoard roles: owner, admin, member, viewer."
   ],
   "end": "Done when the diagram shows every redirect, state, and PKCE value, and the RBAC table is written."
  }
 },
 "34": {
  "0": {
   "pts": [
    "An ORM (Prisma, Drizzle) maps tables to typed objects and builds queries for you; a query builder (Knex) composes SQL; raw SQL (pg) gives full control. More abstraction means faster development but less control over the generated SQL.",
    "Migrations are versioned scripts that change the schema; commit them and run them in CI and deploys. A transaction groups statements so they all succeed or none apply.",
    "A connection pool reuses a limited number of DB connections. Opening a connection per request is slow and exhausts Postgres, whose default limit is about 100 connections.",
    "The N+1 problem: one query for a list plus one query per row for related data. Detect it by logging queries; fix it with a join or batch load. The repository pattern hides data access behind functions like taskRepo.findByBoard()."
   ],
   "tryIt": "Turn on query logging and count how many SQL statements your list-with-authors endpoint runs for 10 rows.",
   "steps": [
    "Start Postgres with docker compose and create a tasks table with a migration.",
    "Write CRUD for tasks with Prisma (or Drizzle) in repo-orm.ts.",
    "Write the same CRUD with raw pg using a Pool and parameterized queries ($1, $2) in repo-raw.ts.",
    "Add a transaction that creates a task and an audit row; test that failure rolls back both.",
    "Create an N+1 on purpose (tasks with their board name), log queries, and fix it with a join or include.",
    "Write a short comparison in NOTES.md: lines of code, type safety, control, speed."
   ],
   "end": "Done when both implementations pass the same CRUD checks and you have shown and fixed an N+1 by counting queries."
  },
  "1": {
   "pts": [
    "Binary tree serialization turns a tree into a string and back. Preorder traversal with explicit null markers is enough to rebuild the tree uniquely.",
    "LC 297 Serialize/Deserialize: serialize with preorder, writing '#' for null, joined by commas; deserialize by reading tokens in order with an index or queue, recursing left then right. O(n) both ways.",
    "LC 124 and LC 105 redo: write each from scratch within 15 minutes. LC 133 Clone Graph (intro): DFS or BFS with a map from original node to its clone; create a clone when first seen, and reuse the map entry on revisits, which handles cycles. O(V+E).",
    "Common mistake: cloning a node again on every visit, which loops forever on cycles."
   ],
   "steps": [
    "Solve 297 with preorder plus null markers; test with an empty tree and a skewed tree.",
    "Redo 124 cold; write the gain rule in one line.",
    "Redo 105 cold using the inorder index map.",
    "Solve 133 with DFS and a Map, creating the clone before visiting neighbors.",
    "Log which of the four needed hints and re-solve those on Day 37."
   ],
   "end": "Done when 297 and 133 pass and 124 and 105 are redone without hints."
  },
  "2": {
   "pts": [
    "P3 is a multi-tenant task board API. Kickoff means a runnable skeleton: TypeScript, Fastify, Postgres in Docker, a Prisma schema, migrations and seed data.",
    "docker compose runs Postgres locally with a named volume so data survives restarts. DATABASE_URL in .env tells Prisma where to connect.",
    "Schema entities: users, orgs, memberships (user + org + role), boards, lists, tasks, comments, audit_log. Put org_id on tenant-owned tables and add indexes on foreign keys.",
    "The seed script inserts predictable demo data and should be repeatable (clear then insert, or upsert)."
   ],
   "steps": [
    "Create the repo with package.json, tsconfig (strict) and a Fastify server returning GET /health.",
    "Add docker-compose.yml with postgres:16, port 5432 and a volume; run docker compose up -d.",
    "Run npx prisma init and write schema.prisma for the 8 models with relations and org_id fields.",
    "Run npx prisma migrate dev --name init and inspect tables in psql.",
    "Write prisma/seed.ts creating 2 orgs, 3 users, memberships, a board, lists and tasks; set the seed command in package.json.",
    "Draw the ERD (Mermaid or dbdiagram.io) into docs/erd.md and commit."
   ],
   "end": "Done when docker compose up, migrate and seed all run on a clean clone and the ERD is committed."
  }
 },
 "35": {
  "0": {
   "pts": [
    "Auth module endpoints: POST /auth/register, /auth/login, /auth/refresh, /auth/logout. Register hashes the password with argon2 and returns no secrets.",
    "Access JWT is short-lived and signed; the refresh token is a random string stored hashed in the DB (like a password) with a family id, so it can be rotated and revoked.",
    "Refresh: look up the hash, if revoked then revoke the whole family (reuse detected); else mark it used, issue a new pair. Logout revokes the current token.",
    "RBAC middleware reads the role from the verified token or membership and rejects with 403. Validate all inputs with zod; map errors to one JSON format."
   ],
   "steps": [
    "Create src/auth/service.ts: register, login, issueTokens, refresh, logout, with argon2.hash/verify.",
    "Add a refresh_tokens table (id, user_id, token_hash, family_id, expires_at, revoked_at) via migration.",
    "Write routes with zod schemas for each endpoint and an error handler that returns 400, 401, 403 and 409 correctly.",
    "Write requireAuth and requireRole('admin') preHandler hooks.",
    "Write tests: register ok, duplicate email 409, wrong password 401, refresh rotates, reused refresh token revokes the family, admin route returns 403 for a member.",
    "Never log passwords or tokens; check your logs once."
   ],
   "end": "Done when the auth tests pass including refresh reuse detection and a 403 for the wrong role."
  },
  "2": {
   "pts": [
    "Timed block: 75 minutes for LC 98, 102, 236 cold, then one unseen tree medium. This checks whether last week's tree patterns stuck.",
    "LC 98 Validate BST: pass lo/hi bounds down, O(n). LC 102 Level Order: queue with per-level size, O(n).",
    "LC 236 LCA of a Binary Tree: return a node if it matches p or q; the node where left and right both return non-null is the LCA. O(n).",
    "For the unseen problem, first classify it: is the answer built from children (postorder), passed down (preorder), or by level (BFS)?",
    "Common mistake: ignoring that Validate BST needs bounds from all ancestors, not only the parent."
   ],
   "steps": [
    "Start a 75-minute timer; solve 98, 102, 236 with max 15 minutes each.",
    "Spend the remaining time on one unseen tree medium; classify it before coding.",
    "Test each solution with an empty tree and a one-node tree.",
    "Log times and misses in NOTES.md.",
    "Schedule re-solves of anything over 20 minutes."
   ],
   "end": "Done when all four attempts are logged with times and a one-line cause for each miss."
  },
  "3": {
   "pts": [
    "An image is a read-only template (OS files plus your app); a container is a running instance of an image. Containers are isolated processes, not full virtual machines.",
    "Core commands: docker run -d --name x -p 5432:5432 image, docker ps, docker logs -f x, docker exec -it x sh, docker stop/rm. Port mapping host:container exposes a container port.",
    "Volumes keep data outside the container's disposable filesystem (a named volume or bind mount); without one, data is lost when the container is removed. Containers on the same compose network reach each other by service name.",
    "docker compose describes several services in docker-compose.yml and starts them together with docker compose up."
   ],
   "tryIt": "Start Postgres with a volume, create a table, remove the container, start it again and confirm the table survived.",
   "steps": [
    "Run docker run hello-world, then docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pw postgres:16 and connect with psql.",
    "Use docker logs and docker exec to open psql inside the container.",
    "Write docker-compose.yml with services postgres and redis, each with a named volume and a published port.",
    "Run docker compose up -d, check docker compose ps, and connect to both (redis-cli ping).",
    "Run docker compose down, then up again, and verify data is still there; then down -v to see it disappear."
   ],
   "end": "Done when Postgres and Redis run from one compose file and the data survives down and up."
  }
 },
 "36": {
  "0": {
   "pts": [
    "A heap is a complete binary tree stored in an array where each parent is <= its children (min-heap) or >= (max-heap). Push and pop cost O(log n); peeking the top is O(1). Parent of i is (i-1)>>1; children are 2i+1 and 2i+2.",
    "Use a heap when you repeatedly need the smallest or largest item, or the top k. JavaScript has no built-in heap, so implement push (sift up) and pop (swap root with last, sift down).",
    "LC 703 Kth Largest in a Stream: keep a min-heap of size k; its top is the answer. LC 1046 Last Stone Weight: max-heap, pop two, push the difference. LC 973 K Closest Points: max-heap of size k by distance, O(n log k). LC 215: min-heap of size k, O(n log k).",
    "Common mistake: using the wrong heap direction. For the k largest keep a min-heap so you can drop the smallest."
   ],
   "steps": [
    "Write class MinHeap with push, pop, peek, size and a comparator; test by popping 1000 random numbers and checking order.",
    "Solve 703 using the heap with size capped at k.",
    "Solve 1046 using the comparator for max behavior.",
    "Solve 973 comparing squared distances (no sqrt needed).",
    "Solve 215 with the heap, then read about quickselect (average O(n)) in NOTES.md."
   ],
   "end": "Done when the heap passes a random sort test and all four problems are accepted."
  },
  "1": {
   "pts": [
    "Integration tests run your app with a real database instead of mocks, catching SQL, migration and wiring bugs. Use a real Postgres from docker compose or testcontainers (starts a throwaway container from test code).",
    "Isolation per test: wrap each test in a transaction and roll it back, or truncate tables between tests. Factories (createUser({ role: 'admin' })) build data with sensible defaults; fixtures are fixed data files.",
    "Test authenticated routes by logging in once in a helper and passing the token. Contract tests check responses match your OpenAPI schema so the API cannot drift.",
    "Flaky tests come from shared state, time, random data and real network calls. Fix the cause: fake clocks, fixed seeds, no ordering dependence."
   ],
   "tryIt": "Run your test suite twice in random order and confirm the results are identical.",
   "steps": [
    "Add a test database (docker compose service or testcontainers) and a global setup that runs migrations.",
    "Write factories for user, org and task in test/factories.ts.",
    "Add per-test cleanup (TRUNCATE ... CASCADE in beforeEach, or rollback).",
    "Write a loginAs(user) helper and test GET /boards for member, admin and anonymous.",
    "Add a test that checks one response against the OpenAPI schema.",
    "Run the suite 5 times and fix anything that fails intermittently."
   ],
   "end": "Done when the suite runs against real Postgres, passes 5 times in a row, and covers anonymous, member and admin access."
  }
 },
 "37": {
  "0": {
   "pts": [
    "Pattern: heaps schedule or merge by priority. A max-heap gives the next best item; two heaps give a running median.",
    "LC 621 Task Scheduler: count task frequencies, put them in a max-heap, and each time slot run the most frequent available task, parking it on cooldown. There is also a formula: (maxFreq - 1) * (n + 1) + count of tasks with max frequency, compared with total tasks.",
    "LC 355 Design Twitter: store each user's tweets with a global timestamp; getNewsFeed merges the recent tweets of the user and followees using a heap, keeping the top 10. Follow and unfollow use sets.",
    "LC 295 Median from Data Stream: a max-heap for the lower half and a min-heap for the upper half, kept within one element in size. Median is the top or the average of both tops. addNum O(log n), findMedian O(1).",
    "Common mistake: forgetting to rebalance the two heaps after each insert."
   ],
   "steps": [
    "Reuse your heap class from Day 36 with a comparator.",
    "Solve 295: push to lower, move its top to upper, rebalance sizes; test with 1,2,3,4.",
    "Solve 621 using the max-heap simulation and verify against the formula on two examples.",
    "Solve 355: store tweets in per-user arrays and merge the last 10 of each followee.",
    "Write the two-heap invariant in NOTES.md."
   ],
   "end": "Done when all three pass and you can state the two-heap size rule in one sentence."
  },
  "1": {
   "pts": [
    "OWASP Top 10 is the list of common web risks. Injection: attacker data becomes code (SQL, command); fix with parameterized queries. Broken access control: users reach data they should not; check ownership on every request. SSRF: your server fetches an attacker-chosen URL; allowlist hosts and block private IPs.",
    "Mass assignment: spreading req.body into a DB update lets users set role or org_id; pick allowed fields explicitly. XSS: untrusted text runs as script in a browser; escape output and set a Content-Security-Policy. Insecure deserialization: do not parse untrusted data into live objects.",
    "helmet sets safe HTTP headers; a rate limiter slows brute force. Keep secrets in environment or a secrets manager, never in git. npm audit lists known vulnerable dependencies; commit the lockfile and prefer provenance-signed packages.",
    "API keys done right: generate a random key with a short prefix (for lookup), store only a hash of the secret, attach scopes, support rotation, and show the full key exactly once."
   ],
   "tryIt": "Send a login request with ' OR 1=1 -- as the email and confirm your parameterized query treats it as plain text.",
   "steps": [
    "Add @fastify/helmet and @fastify/rate-limit to P3; limit login to about 5 tries per minute per IP.",
    "Audit your handlers: any req.body spread into a DB write? Replace with a zod-picked object.",
    "Write a test that a member cannot read another org's task (expect 404 or 403).",
    "Create an api_keys table: id, org_id, prefix, secret_hash, scopes, created_at, revoked_at.",
    "Write createApiKey() that returns prefix.secret once and stores only the hash; write the lookup by prefix plus constant-time hash compare.",
    "Run npm audit and note any high findings in NOTES.md."
   ],
   "end": "Done when helmet and rate limits are active, a cross-org read test passes, and API keys are stored hashed and shown once."
  }
 },
 "38": {
  "0": {
   "pts": [
    "A trie (prefix tree) stores strings character by character; each node has children (map or array of 26) and an end-of-word flag. Reach for it for prefix lookups and word-dictionary problems.",
    "LC 208 Implement Trie: insert walks and creates nodes; search needs the end flag; startsWith does not. O(L) per operation, L = word length.",
    "LC 211 Add and Search Words: '.' matches any letter, so at a dot recurse into all children; other characters follow a single child. Worst case exponential in dots but fine for typical input.",
    "LC 212 Word Search II: build a trie of all words and DFS the grid once, following trie nodes; prune branches with no matching prefix and remove found words. Much faster than running Word Search per word.",
    "Common mistake: using search for startsWith (or vice versa), forgetting the end flag."
   ],
   "steps": [
    "Implement TrieNode and Trie for 208 and test insert('apple'), search('app') false, startsWith('app') true.",
    "Extend to 211 with a recursive search(node, i) that branches at '.'.",
    "Solve 212: build the trie, DFS from each cell, mark visited, store the word at the end node and clear it once found.",
    "Add pruning: delete leaf nodes after exploring (optional) and note the speedup.",
    "Write complexities and re-solve 211 tomorrow."
   ],
   "end": "Done when 208, 211 and 212 pass and you can explain why the trie beats searching each word separately in 212."
  },
  "1": {
   "pts": [
    "Structured logs are JSON lines with fields (level, time, msg, reqId, userId) so you can filter by request. A request ID is a unique ID per request, returned in a response header and included in every log line.",
    "AsyncLocalStorage (node:async_hooks) holds per-request context that follows async calls, so code deep in the stack can log the request ID without passing it as an argument.",
    "Logs record events; metrics are numbers over time (request count, latency percentiles); traces follow one request across services as spans. OpenTelemetry is the vendor-neutral standard for emitting all three.",
    "Health (liveness) says the process is up; readiness says it can serve traffic (DB connected). Orchestrators restart on failed liveness and stop routing on failed readiness."
   ],
   "tryIt": "Make a request and grep your logs for its request ID to see every line it produced.",
   "steps": [
    "Create requestContext.ts with an AsyncLocalStorage store holding { reqId }.",
    "Add an onRequest hook: read x-request-id or generate one with crypto.randomUUID(), run the rest of the request inside store.run().",
    "Configure pino with a mixin() that adds the current reqId to every log line; set the x-request-id response header.",
    "Add GET /healthz (always 200) and GET /readyz (runs SELECT 1 and returns 503 on failure).",
    "Test: stop Postgres, check /readyz returns 503 while /healthz returns 200.",
    "Skim the OpenTelemetry Node getting-started page and note what a span is."
   ],
   "end": "Done when every log line for a request carries the same reqId and /readyz fails when the database is down."
  }
 },
 "39": {
  "0": {
   "pts": [
    "Pattern: intervals [start, end]. Sort by start (or end), then sweep once comparing the current interval with the last one. Sorting makes it O(n log n).",
    "LC 56 Merge Intervals: sort by start; if the next start <= last end, set last end = max(last end, next end); else push as new. LC 57 Insert Interval: add all intervals ending before the new one, merge all overlapping ones, then add the rest. O(n).",
    "LC 435 Non-overlapping Intervals: sort by end and greedily keep the interval that ends earliest; count the ones you skip as removals. O(n log n). LC 252 Meeting Rooms: sort by start and check whether any start < previous end.",
    "Common mistake: assigning last end = next end instead of the max, which breaks when one interval is nested inside another."
   ],
   "steps": [
    "Solve 252 first (sort, adjacent comparison).",
    "Solve 56 with the max-end merge; test [[1,4],[2,3]].",
    "Solve 57 with the three-phase scan and no sorting.",
    "Solve 435 sorting by end; note why sorting by start is not the right greedy here.",
    "Write the touching rule ([1,2] and [2,3]) for each problem in NOTES.md."
   ],
   "end": "Done when all four pass and you have noted whether touching intervals overlap in each problem."
  },
  "1": {
   "pts": [
    "Normalization removes redundancy. 1NF: atomic values, no repeating groups. 2NF: no column depends on part of a composite key. 3NF: no column depends on another non-key column. BCNF: every determinant is a candidate key.",
    "Denormalize on purpose when reads dominate and joins are costly (store a counter or a copied name), accepting the duty to keep copies in sync.",
    "Constraints enforce rules in the database: PRIMARY KEY, FOREIGN KEY with ON DELETE (CASCADE, RESTRICT, SET NULL), UNIQUE, CHECK, NOT NULL. Soft delete adds deleted_at but every query must filter it, and unique constraints need a partial index.",
    "Multi-tenancy: shared schema with tenant_id (cheapest), schema per tenant, or database per tenant (strongest isolation, most operations work). Row-Level Security policies filter rows automatically using a setting like SET LOCAL app.org_id; the app must connect as a non-superuser role, since superusers bypass RLS."
   ],
   "tryIt": "Write a policy so a role can only SELECT rows where org_id equals current_setting('app.org_id') and test it with two orgs.",
   "steps": [
    "Take a flat orders table with repeating product columns and normalize it to 3NF on paper, naming the violated form at each step.",
    "Write DDL for P3 tables with PKs, FKs and chosen ON DELETE rules plus a CHECK on task status.",
    "Add a partial unique index such as UNIQUE (org_id, slug) WHERE deleted_at IS NULL.",
    "Create a non-superuser role app_user; ALTER TABLE tasks ENABLE ROW LEVEL SECURITY; CREATE POLICY using org_id = current_setting('app.org_id')::uuid.",
    "In a transaction run SET LOCAL app.org_id = '...' and show that SELECT only returns that org's rows.",
    "Write the three multi-tenancy options in NOTES.md with one pro and con each."
   ],
   "end": "Done when an RLS policy hides another org's rows from app_user and the normalization steps are written."
  }
 },
 "40": {
  "0": {
   "pts": [
    "LC 253 Meeting Rooms II: minimum rooms needed equals the maximum number of overlapping meetings. Sort starts and ends separately and sweep with two pointers, or keep a min-heap of end times. O(n log n).",
    "Greedy means making the locally best choice at each step; it works only when that choice never needs undoing. Always test it against a counterexample.",
    "LC 55 Jump Game: track the furthest index reachable; if the current index exceeds it, return false. O(n). LC 45 Jump Game II: BFS-like windows; when you reach the end of the current window, count a jump and extend to the furthest reach. O(n).",
    "LC 134 Gas Station: if total gas < total cost, return -1; otherwise sweep and whenever the tank goes negative, reset the start to the next station. O(n).",
    "Common mistake: in Jump Game II counting a jump on every step instead of only at the end of each window."
   ],
   "steps": [
    "Solve 253 with two sorted arrays and two pointers; then try the heap version.",
    "Solve 55 with the furthest-reach variable.",
    "Solve 45 by tracking currentEnd and farthest; increment jumps when i == currentEnd.",
    "Solve 134 with a total check plus a running tank with reset; trace [1,2,3,4,5] cost [3,4,5,1,2].",
    "For each greedy write a one-line reason why it is safe."
   ],
   "end": "Done when all four pass and each greedy has a written one-line justification."
  },
  "1": {
   "pts": [
    "A B-tree index keeps keys sorted in a balanced tree of pages, so lookups are O(log n) instead of a full table scan. Indexes speed reads but slow writes and use disk.",
    "Composite index (a, b, c) helps queries filtering on a, on a and b, or on a, b, c (leftmost prefix), not on b alone. Put equality columns first, then the range or sort column. A covering index holds every column the query needs, enabling an index-only scan.",
    "Partial index: CREATE INDEX ... WHERE status = 'open' indexes only some rows, keeping it small. Selectivity is how few rows a value matches; indexes pay off when selective.",
    "EXPLAIN shows the planned query; EXPLAIN ANALYZE actually runs it and shows real times and row counts. Compare Seq Scan to Index Scan, and watch estimated vs actual rows."
   ],
   "tryIt": "Run EXPLAIN ANALYZE on a WHERE query before and after adding an index and note the change in execution time.",
   "steps": [
    "Read The Index, Luke chapters 1 to 3 (anatomy, WHERE clause, performance and scalability) and note 5 lines.",
    "Seed P3 with about 100k tasks across several orgs using generate_series.",
    "Pick 3 real queries: tasks by (org_id, status), tasks by assignee ordered by due date, comments by task_id.",
    "Run EXPLAIN ANALYZE on each and save the output in docs/indexes.md.",
    "Add 3 indexes (composite, partial and one on a foreign key) in a Prisma migration.",
    "Re-run EXPLAIN ANALYZE and record before and after times and scan types."
   ],
   "end": "Done when docs/indexes.md shows three queries moving from a sequential scan to an index scan with measured times."
  }
 },
 "41": {
  "0": {
   "pts": [
    "Presigned URL: the server signs a temporary S3 upload or download link, so the browser sends the file straight to S3 and your API never handles the bytes. Set a short expiry (about 5 minutes) and restrict content type and size.",
    "Webhook signing: the sender computes HMAC-SHA256(secret, raw body) and sends it in a header. The receiver recomputes it and compares with crypto.timingSafeEqual. Always sign the raw body, not re-serialized JSON.",
    "Retries can deliver the same event twice, so receivers store an idempotency key (event id) and ignore repeats. Senders retry with exponential backoff and stop after N tries.",
    "Optimistic concurrency: rows carry a version number. The client sends If-Match with the version it read; the UPDATE adds WHERE version = $v. Zero rows updated means someone else won, so return 412 or 409.",
    "ETag is a fingerprint of a response. Client sends If-None-Match; if unchanged the server replies 304 with no body. Version APIs in the URL (/v1) and announce removals with Deprecation and Sunset headers."
   ],
   "tryIt": "Write a 15-line Node script that signs a JSON body with HMAC-SHA256, then verifies it, and show that changing one character of the body makes verification fail.",
   "end": "Done when you can explain, without notes, how a webhook receiver rejects a forged request and a duplicate delivery."
  },
  "1": {
   "pts": [
    "Greedy: make the locally best choice at each step and never undo it. Reach for it when sorting or a single pass suggests an obvious 'take the best now' rule, and a counter-example does not break it.",
    "LC 846 Hand of Straights: count cards, repeatedly take the smallest remaining card and require the next W-1 consecutive values to exist. O(n log n) time, O(n) space.",
    "LC 763 Partition Labels: record each letter's last index, scan and extend the current end; cut when index equals end. O(n) time, O(1) space (26 letters).",
    "LC 678 Valid Parenthesis String: keep a range [lo, hi] of possible open counts, treating '*' as -1, 0 or +1. Clamp lo at 0; fail if hi < 0; valid if lo is 0 at the end. O(n) time, O(1) space.",
    "LC 1899 Merge Triplets: ignore any triplet with a value above the target, then check each target position is matched by some kept triplet. O(n). Common mistake: skipping the 'discard overshooting triplets' step."
   ],
   "steps": [
    "Spend 20 minutes per problem; if stuck, read only the hint, not the code.",
    "Solve 763 and 1899 first (simplest), then 846, then 678.",
    "Write one sentence per problem: 'the greedy choice is X'.",
    "For 763 and 846, write the informal proof: why a smaller choice can never beat the greedy choice (exchange argument: swap any other choice for the greedy one and the result is no worse).",
    "Re-solve 678 from a blank file after 30 minutes without looking."
   ],
   "end": "Done when all four are accepted and you have written a short proof sketch for two of them."
  },
  "2": {
   "pts": [
    "Cursor pagination: return items after the last seen (created_at, id) pair using WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT n. Unlike OFFSET it stays fast and stable while rows are inserted.",
    "Soft delete: set deleted_at instead of removing the row, and add 'deleted_at IS NULL' to every read. A partial index with the same condition keeps queries fast.",
    "Audit log in the same transaction: insert the audit row in the same BEGIN/COMMIT as the change, so you never have a change without a record or a record without a change.",
    "Org scoping: every query filters by org_id taken from the authenticated membership, never from the request body."
   ],
   "steps": [
    "Create migrations: boards, lists, tasks (org_id, version int default 1, deleted_at) and audit_log (org_id, actor_id, entity, entity_id, action, diff jsonb, created_at).",
    "Write a requireOrgMember middleware that loads the caller's membership and rejects non-members with 403 (404 for other orgs' resources).",
    "Implement CRUD routes for boards, lists and tasks; each handler runs one transaction that does the change and inserts the audit row.",
    "Implement GET /tasks with filters (status, assignee, label) and a cursor query param encoded as base64 of created_at and id.",
    "Implement PATCH /tasks/:id requiring If-Match or a version field; UPDATE ... WHERE id=$1 AND version=$2 SET version=version+1, and return 409 when zero rows change.",
    "Write integration tests: stale version returns 409, soft-deleted task is hidden, user from org B cannot read org A's task, and the audit row exists after a change."
   ],
   "end": "Done when the four integration tests pass and a paginated list walks through 50 seeded tasks with no duplicates or gaps."
  }
 },
 "42": {
  "0": {
   "pts": [
    "Unit tests cover pure logic (services, validators); integration tests hit the real HTTP app and a test database. Aim for at least 70% line coverage, but prioritise auth, permissions and money-like flows.",
    "Security basics: helmet sets safe HTTP headers, CORS limits which browser origins may call you, and a rate limiter returns 429 after too many requests per window.",
    "N+1 problem: one query for a list, then one extra query per row. Detect by logging queries during a test and counting; fix with a JOIN or a single WHERE id = ANY($1) query.",
    "OpenAPI is a machine-readable description of your routes. Serving it at /docs gives clients a contract and a try-it UI."
   ],
   "steps": [
    "Add a coverage run (for example vitest or jest with --coverage) and write tests until the report shows 70% or more; start with the gaps in auth and org checks.",
    "Add helmet, a CORS allowlist from env, and a rate limiter on login and write routes.",
    "Generate or hand-write the OpenAPI file and serve it at /docs; export a Bruno or Postman collection into the repo.",
    "Log SQL count for GET /boards/:id with 20 lists; if it is more than about 3 queries, rewrite as a join and assert the count in a test.",
    "Finish the README (setup, env vars, run, test, endpoints), write the Phase 3 retro in NOTES.md, and run git tag v1.0."
   ],
   "end": "Done when CI is green with coverage at 70% or more, /docs loads, the N+1 test passes and tag v1.0 exists."
  },
  "2": {
   "pts": [
    "Pattern: heap or greedy problems often reduce to 'always take the best available item'. Use a heap when 'best' changes as items are added, a sort when it does not.",
    "LC 215: min-heap of size k gives O(n log k); quickselect averages O(n) but is O(n^2) worst case. LC 56: sort by start, merge when next start <= current end, O(n log n).",
    "LC 208 Trie: nodes hold a map of children and an end flag; insert, search and startsWith each take O(length of word).",
    "Common mistake: in 56, forgetting to take max of the two ends when merging (an interval can be fully inside another)."
   ],
   "steps": [
    "Set a 75-minute timer and open a blank file for each problem; no notes, no editorial.",
    "Do 215, 56, 208 in that order, aiming for about 15 minutes each.",
    "Spend the remaining time on the unseen medium: first list 3 candidate patterns, then pick one.",
    "Afterwards write a note: time taken, what you looked up, what failed on the first submission.",
    "Add any problem that took over 25 minutes to a redo list for next week."
   ],
   "end": "Done when you have attempted all four under the timer and logged the time for each in NOTES.md."
  },
  "3": {
   "pts": [
    "ACID: Atomic (all or nothing), Consistent (constraints always hold), Isolated (concurrent transactions do not see each other's half-done work), Durable (committed data survives a crash).",
    "BEGIN starts a transaction, COMMIT keeps it, ROLLBACK discards it. A SAVEPOINT lets you roll back only part of a transaction; in Postgres an error aborts the whole transaction unless you roll back to a savepoint.",
    "WAL (write-ahead log): Postgres writes the change to a sequential log and flushes it before acknowledging COMMIT. After a crash it replays the log to recover committed work.",
    "A phantom read is when the same query run twice in one transaction returns new rows because another transaction inserted matching rows in between."
   ],
   "tryIt": "In psql, BEGIN, insert a row, SAVEPOINT a, run a failing statement, ROLLBACK TO a, then COMMIT, and check that the first insert survived.",
   "end": "Done when you have written down a one-sentence definition of a phantom read and 3 questions about isolation levels for next week."
  }
 },
 "43": {
  "0": {
   "pts": [
    "Graph: nodes joined by edges. An adjacency list (map from node to neighbours) uses O(V+E) memory and suits most problems; an adjacency matrix uses O(V^2) and suits dense graphs.",
    "BFS uses a queue and visits nodes level by level (shortest path in unweighted graphs). DFS uses recursion or a stack and goes deep first. Both are O(V+E) with a visited set.",
    "LC 200 Number of Islands: for each unvisited '1', run DFS/BFS to mark its island and count one. O(rows*cols) time. LC 695: same, but return the size of each island and keep the max.",
    "LC 133 Clone Graph: map each original node to its copy; DFS, creating the copy on first visit and wiring neighbours from the map. O(V+E).",
    "Common mistake: marking a node visited when popped instead of when pushed, which adds duplicates in BFS."
   ],
   "steps": [
    "Write generic bfs(start) and dfs(start) functions for an adjacency list from memory first.",
    "Solve 200 using DFS, then re-solve it using BFS.",
    "Solve 695 by changing 200 to return area.",
    "Solve 133, drawing a 4-node graph and the old-to-new map before coding.",
    "Save the BFS and DFS templates in your cheat sheet file."
   ],
   "end": "Done when 200, 695 and 133 are accepted and the two templates are saved."
  },
  "1": {
   "pts": [
    "Isolation levels: read uncommitted (Postgres treats it as read committed), read committed (default, each statement sees data committed before it began), repeatable read (one snapshot for the whole transaction), serializable (behaves as if transactions ran one at a time).",
    "Anomalies: dirty read (see uncommitted data), non-repeatable read (same row changes between reads), phantom (new rows appear), write skew (two transactions read overlapping data and write different rows, breaking a rule).",
    "MVCC (multi-version concurrency control): updates create a new row version, so readers never block writers. Each transaction sees the versions visible to its snapshot.",
    "Postgres repeatable read prevents phantoms too; serializable can abort a transaction with a serialization failure, so the app must retry."
   ],
   "tryIt": "Open two psql sessions and show a non-repeatable read at read committed, then show it disappears at repeatable read.",
   "end": "Done when you have reproduced non-repeatable read, phantom (or write skew) and a serialization failure, and written one line on how each is prevented."
  }
 },
 "44": {
  "0": {
   "pts": [
    "Pattern: grid problems are graphs where each cell connects to its 4 neighbours. Use BFS for 'minimum steps/time' and DFS or BFS for 'flood a region'.",
    "LC 417 Pacific Atlantic: instead of starting from every cell, flood inward from the ocean borders (uphill moves only) twice, then intersect the two reachable sets. O(rows*cols).",
    "LC 130 Surrounded Regions: mark every 'O' reachable from the border as safe, then flip the remaining 'O' to 'X' and restore the safe ones. O(rows*cols).",
    "LC 994 Rotting Oranges: multi-source BFS, pushing all rotten oranges at the start, one BFS level per minute. Answer is the levels used, or -1 if fresh oranges remain. O(rows*cols).",
    "Common mistake: forgetting bounds checks or counting the final empty level as an extra minute in 994."
   ],
   "steps": [
    "Write a 4-direction helper (dirs array plus in-bounds check) and reuse it.",
    "Solve 994 first (clean BFS by level), tracking fresh count.",
    "Solve 130 with a border-first flood.",
    "Solve 417 with two floods and a set intersection.",
    "Re-solve 994 the next day from a blank file."
   ],
   "end": "Done when all three are accepted and you can explain why starting from the borders is cheaper than starting from every cell."
  },
  "1": {
   "pts": [
    "Row locks: UPDATE and DELETE lock the rows they touch until the transaction ends. SELECT ... FOR UPDATE locks rows you only read, so nobody changes them before you do.",
    "FOR UPDATE SKIP LOCKED skips rows another worker already locked. This makes a safe job queue: many workers each claim different rows with no waiting.",
    "Deadlock: transaction A holds row 1 and wants row 2, B holds row 2 and wants row 1. Postgres detects it and aborts one. Avoid it by always locking rows in the same order.",
    "Optimistic locking uses a version column and retries on conflict (good when conflicts are rare). Pessimistic locking uses FOR UPDATE (good when conflicts are common). Advisory locks are app-defined locks on a number you choose."
   ],
   "tryIt": "Create a jobs table, then in two psql sessions run SELECT ... FOR UPDATE SKIP LOCKED LIMIT 1 inside transactions and confirm each session gets a different row.",
   "end": "Done when you have triggered a deadlock with two sessions, found the 'deadlock detected' message in the log, and written the fix (consistent lock order)."
  }
 },
 "45": {
  "0": {
   "pts": [
    "Topological sort orders nodes of a directed graph so every edge goes from earlier to later. It exists only if there is no cycle. Reach for it on 'prerequisites' or 'build order' problems.",
    "Kahn's algorithm: compute in-degree of each node, queue the nodes with in-degree 0, pop one, decrement its neighbours, queue those that reach 0. O(V+E).",
    "LC 207 Course Schedule: run Kahn; if you processed fewer nodes than courses, there is a cycle, so return false.",
    "LC 210 Course Schedule II: same, but return the pop order, or an empty array if a cycle exists.",
    "DFS version uses three states per node (unvisited, in progress, done); meeting an in-progress node means a cycle. Common mistake: using only a visited boolean, which cannot detect cycles."
   ],
   "steps": [
    "Build the adjacency list from prerequisites, noting the direction: [a, b] means b before a.",
    "Implement Kahn for 207 and submit.",
    "Extend it to return the order for 210.",
    "Re-implement 207 with the three-state DFS and compare.",
    "Write both templates in your cheat sheet."
   ],
   "end": "Done when 207 and 210 pass with both Kahn and DFS written out."
  },
  "1": {
   "pts": [
    "Scans: a sequential scan reads the whole table; an index scan follows the index to matching rows; a bitmap scan collects matches from an index then reads heap pages in order. The planner picks the cheapest by estimated cost.",
    "Joins: nested loop (good for few outer rows with an index), hash join (build a hash table of one side, good for large unsorted inputs), merge join (both sides sorted).",
    "ANALYZE refreshes table statistics the planner uses to estimate row counts; bad estimates cause bad plans. VACUUM reclaims dead row versions left by MVCC; bloat is the wasted space.",
    "pg_stat_statements is an extension that records total time and call count per normalised query, so you can find the slowest ones. EXPLAIN (ANALYZE, BUFFERS) shows the actual plan and timings."
   ],
   "tryIt": "Run EXPLAIN ANALYZE on a query filtering a 100k-row table by an unindexed column, add an index, run it again, and note how the scan type and time change.",
   "end": "Done when you have listed the 3 slowest queries from the P3 test run with their mean time and one planned fix each."
  }
 },
 "46": {
  "0": {
   "pts": [
    "Union-Find (disjoint set) tracks which nodes are in the same group. find(x) returns the group's root; union(a, b) merges two groups. With path compression and union by size, each operation is nearly O(1).",
    "LC 684 Redundant Connection: process edges in order; the first edge whose endpoints already share a root closes a cycle, so return it. O(n) with near-constant unions.",
    "LC 323 Connected Components: start with n components and subtract one for each union that actually merges two groups. O(n+E).",
    "LC 261 Graph Valid Tree: a valid tree has exactly n-1 edges and no cycle (every union must merge two groups).",
    "Common mistake: forgetting to call find() on both ends before comparing, and comparing raw parent values."
   ],
   "steps": [
    "Write a UnionFind class (parent array, size array, find with path compression, union returning true if it merged).",
    "Solve 684 using it.",
    "Solve 323 by counting successful unions.",
    "Solve 261 by checking edge count first, then using union failures as cycle detection.",
    "Save the class in your cheat sheet."
   ],
   "end": "Done when all three pass and the UnionFind class is saved from memory."
  },
  "1": {
   "pts": [
    "Postgres stores tables as fixed-size pages (8 KB) in a heap file; indexes point to a row by page and slot. Changes are written to the WAL first, and pages are flushed to disk later by checkpoints.",
    "Crash recovery: replay WAL records since the last checkpoint. Streaming replication ships the WAL to replicas, which replay it. PITR (point-in-time recovery) = a base backup plus archived WAL replayed up to a chosen moment.",
    "B+tree: sorted pages updated in place; fast reads and range scans, random writes. LSM-tree: writes go to memory then are flushed as sorted immutable files, merged by compaction; very fast writes, reads may check several files.",
    "Choose LSM for write-heavy workloads (logs, time series, messaging metadata); choose B+tree for read-heavy and mixed workloads with range queries. LSM trades read and space amplification for write speed."
   ],
   "tryIt": "In two sentences, explain why an LSM database absorbs 100k writes per second more easily than a B+tree one.",
   "end": "Done when your notes contain a table comparing B+tree and LSM and a one-paragraph 'when I would choose LSM' answer."
  }
 },
 "47": {
  "0": {
   "pts": [
    "LC 127 Word Ladder: BFS where each word is a node and words differing by one letter are neighbours. Build buckets keyed by patterns like 'h*t' to find neighbours quickly. O(N * L^2) for N words of length L.",
    "BFS gives the shortest sequence because it explores by number of changes. Add each word to visited when queued, not when popped.",
    "Redo 200 and 207 cold: blank file, 15 minutes each, no hints. Anything you miss goes on the redo list.",
    "Common mistake: building neighbours by trying all 26 letters for every word without a set lookup, which is slow if the word list is a plain array."
   ],
   "steps": [
    "Solve 127 with pattern buckets; draw 'hit' -> 'hot' -> 'dot' on paper first.",
    "Redo 200 cold with BFS.",
    "Redo 207 cold with Kahn's algorithm.",
    "Write the one-page cheat sheet: BFS, DFS, topological sort, union-find, each with a template, complexity and a trigger phrase.",
    "Note which of the redos were slower than 15 minutes."
   ],
   "end": "Done when 127 is accepted, 200 and 207 are re-solved cold and the cheat sheet is saved."
  },
  "1": {
   "pts": [
    "Document model (MongoDB): data stored as JSON-like documents in collections, no fixed schema. Embed child data when it is read together and bounded in size; reference by id when it is shared, large or grows unbounded.",
    "Indexes work like in SQL (single, compound, text, TTL). The aggregation pipeline passes documents through stages such as $match, $group, $sort, $lookup. Multi-document transactions exist but cost performance.",
    "Consistency knobs: write concern (how many nodes must acknowledge a write) and read concern/preference (which data version and which node you read from).",
    "Other families: key-value (Redis, DynamoDB) for fast lookups; wide-column (Cassandra) for huge write volume; graph (Neo4j) for relationship traversal; time-series for metrics. Default to Postgres unless a clear need says otherwise."
   ],
   "tryIt": "Model a blog with posts and comments twice, once embedded and once referenced, and write one sentence on when each breaks down.",
   "end": "Done when you can name one workload for each NoSQL family and say why Postgres would be worse for it."
  }
 },
 "48": {
  "0": {
   "pts": [
    "Redis is an in-memory data structure server. Strings (counters, cache), hashes (objects), lists (queues), sets (unique members), sorted sets (leaderboards, ranked by score), streams (append-only log with consumer groups).",
    "TTL: EXPIRE sets a lifetime for a key. Persistence: RDB takes periodic snapshots (compact, may lose recent writes); AOF logs every write (safer, larger). Eviction policies such as allkeys-lru decide what to drop when memory is full.",
    "Pub/sub is fire-and-forget (messages are lost if no subscriber is listening); streams keep messages. Pipelining sends many commands without waiting for each reply, cutting round trips.",
    "MULTI/EXEC queues commands and runs them together but has no conditional logic. Lua scripts run atomically and can branch, so use them for 'check then set' operations."
   ],
   "tryIt": "Run ZADD scores 100 alice 80 bob 120 carol, then ZREVRANGE scores 0 2 WITHSCORES and ZRANK bob, and explain why each is O(log N)-ish.",
   "steps": [
    "Start Redis with docker run -p 6379:6379 redis:7 and open redis-cli.",
    "Try one command family each: SET/GET/INCR with EX, HSET/HGETALL, LPUSH/RPOP, SADD/SMEMBERS, XADD/XRANGE.",
    "Build a leaderboard: ZADD, ZINCRBY, ZREVRANGE with scores, ZRANK for a user's position.",
    "Write a Lua script with EVAL that does 'if GET key is nil then SET key value EX 60' and returns 1 or 0.",
    "Check CONFIG GET maxmemory-policy and note which policy you would pick for a cache."
   ],
   "end": "Done when the leaderboard works in redis-cli and you can state when to choose MULTI versus Lua."
  },
  "1": {
   "pts": [
    "Dijkstra finds shortest paths from one source in a graph with non-negative weights. Keep a min-heap of (distance, node); pop the smallest, relax each neighbour, push improvements. O(E log V).",
    "LC 743 Network Delay Time: run Dijkstra from k; answer is the largest distance, or -1 if any node is unreached.",
    "LC 787 Cheapest Flights Within K Stops: plain Dijkstra on cost can fail because of the stop limit; use Bellman-Ford style rounds (k+1 rounds, relaxing from a copy of last round's costs), O(K * E).",
    "LC 778 Swim in Rising Water: Dijkstra where the path cost is the maximum cell height along the path instead of a sum. O(n^2 log n) on an n by n grid.",
    "Common mistake: using a plain array as a 'heap' and re-sorting, or forgetting to skip stale heap entries."
   ],
   "steps": [
    "Implement a MinHeap class (push, pop, size) from memory, or reuse yours.",
    "Write dijkstra(graph, src) and solve 743.",
    "Solve 778 by changing the relax step to max(current, cell).",
    "Solve 787 with k+1 rounds of Bellman-Ford using a copied distance array.",
    "Write down why Dijkstra fails with negative edges."
   ],
   "end": "Done when 743, 787 and 778 pass and Dijkstra runs on your own heap class."
  },
  "2": {
   "pts": [
    "Base62 uses 0-9, a-z, A-Z so an integer id becomes a short string (62^7 is about 3.5 trillion). Encode by repeated divide and mod by 62.",
    "ID strategies: autoincrement id then base62 (simple, unique, but guessable); random string (not guessable, needs a collision check). Unique constraint on the code column is the real guard.",
    "301 is a permanent redirect that browsers cache, so you lose click counts; 302 is temporary and every click reaches you. Use 302 if you want analytics.",
    "Handle insert collisions by catching the unique violation and retrying with a new code; reject custom aliases that already exist with 409."
   ],
   "steps": [
    "Read the URL-shortener section of the System Design Primer and write 5 bullets of notes.",
    "Create base62.js with encode and decode plus tests (round trip, 0, large numbers).",
    "Create the links table: id bigserial, code unique, url, created_at, expires_at, plus a unique index on code.",
    "Implement POST /links (generate code, or accept alias, validate URL, return 409 on a duplicate alias) and retry on random-code collision.",
    "Implement GET /:code returning 302 with Location, 404 if missing and 410 if expired.",
    "Write tests for expiry, duplicate alias, invalid URL and redirect status."
   ],
   "end": "Done when you can create a link with and without an alias and the redirect and expiry tests pass."
  }
 },
 "49": {
  "0": {
   "pts": [
    "Cache-aside: read from Redis; on a miss, load from Postgres and store it with a TTL. Negative caching stores 'not found' for a short TTL (about 30 seconds) so missing codes do not hit the database repeatedly.",
    "Cache stampede: many requests miss the same key at once and all hit the database. Fix with single-flight: one request rebuilds while the others wait, using an in-process promise map or a short Redis lock (SET key NX EX).",
    "Redis Streams are an append-only log. XADD adds an event; a consumer group lets several workers read with XREADGROUP and confirm with XACK, so each event is handled once per group.",
    "The redirect should only enqueue a click event and return, never wait for analytics to be written."
   ],
   "steps": [
    "Add a getLink(code) function: Redis GET, on miss query Postgres, SET with EX and a small random jitter.",
    "Cache a not-found marker for 30 seconds and test that the second miss does not query Postgres.",
    "Add single-flight so 50 concurrent misses for one code cause one database query; test with Promise.all.",
    "In the redirect handler, XADD a click event (code, timestamp, ip hash, user agent) without awaiting analytics work.",
    "Write a consumer using XGROUP CREATE and XREADGROUP that batches events into a clicks table and XACKs them.",
    "Test: kill the consumer mid-batch, restart it, and confirm the pending events are processed."
   ],
   "end": "Done when 50 concurrent misses cause one database query and click counts reach Postgres even after a consumer restart."
  },
  "2": {
   "pts": [
    "Pattern: graph problems under time pressure. Decide first: shortest path (BFS or Dijkstra), ordering with dependencies (topological sort), grouping (union-find), or reachability (DFS).",
    "LC 207: Kahn's algorithm, O(V+E). LC 200: DFS or BFS flood fill, O(rows*cols). LC 743: Dijkstra with a min-heap, O(E log V).",
    "For the unseen graph medium, spend the first 5 minutes naming the pattern and writing the node and edge definition before any code.",
    "Common mistake: starting to code before deciding what is a node and what is an edge."
   ],
   "steps": [
    "Set a 75-minute timer; blank files, no editorial.",
    "Solve 207, 200 and 743 in that order, aiming for about 12-15 minutes each.",
    "Spend the rest on the unseen graph medium, writing the pattern and complexity before coding.",
    "Log time and mistakes for each problem in NOTES.md.",
    "Put anything slower than 25 minutes on the redo list."
   ],
   "end": "Done when all four were attempted under the timer and the times are logged."
  },
  "3": {
   "pts": [
    "Patterns: cache-aside (app manages the cache), read-through (cache loads from the database itself), write-through (write to cache and database together), write-behind (write to cache, flush to the database later; fast but can lose data).",
    "Invalidation: delete the key after a write, or use short TTLs. Add random jitter to TTLs so keys do not all expire at the same moment.",
    "Hot key: one key gets most of the traffic and overloads one Redis node; mitigate with a local in-process cache or by copying the key under several names.",
    "Caching hierarchy: browser cache, then CDN, then app cache (Redis), then database. Cache-Control headers control the first two."
   ],
   "tryIt": "Write the three-line rule for when you would pick cache-aside versus write-through for a product catalogue.",
   "end": "Done when a one-page caching decision guide is saved listing each pattern, its failure mode and when to use it."
  }
 },
 "50": {
  "0": {
   "pts": [
    "MST (minimum spanning tree) connects all nodes with the least total edge weight and no cycles. Kruskal sorts edges and adds each one that joins two different groups using union-find; Prim grows a tree from one node using a heap.",
    "LC 1584 Min Cost to Connect All Points: edges are Manhattan distances between every pair. Prim with an array is O(n^2) time and O(n) space; Kruskal with all edges sorted is O(n^2 log n).",
    "LC 332 Reconstruct Itinerary: this is an Eulerian path (use every edge exactly once). Sort each airport's destinations, DFS taking edges one at a time, add airports to the answer after finishing them, then reverse.",
    "Redo 743 cold in 15 minutes.",
    "Common mistake in 332: removing from a sorted array front with shift in a loop and getting O(n^2); keep destinations sorted in reverse and pop from the end."
   ],
   "steps": [
    "Solve 1584 with Prim (array version), then rewrite it with Kruskal and your union-find class.",
    "Read the Eulerian path idea (post-order then reverse) before coding 332.",
    "Solve 332 and test it on the three examples in the problem.",
    "Redo 743 cold without looking.",
    "Add MST to your graph cheat sheet."
   ],
   "end": "Done when 1584 passes in both forms, 332 is accepted and 743 is redone."
  },
  "1": {
   "pts": [
    "Leader-follower replication: all writes go to the leader, which streams changes to followers that serve reads. Synchronous waits for the follower (safer, slower); asynchronous does not (fast, may lose recent writes on failover).",
    "Replication lag means a follower is behind. A user may write then read a stale value; fix with read-your-writes (route that user's reads to the leader for a short time after writing).",
    "Partitioning splits data across nodes. Range partitioning keeps neighbours together (good for scans, risks hot spots); hash partitioning spreads load evenly (range queries become hard).",
    "Consistent hashing places nodes and keys on a ring; a key belongs to the next node clockwise, so adding or removing a node moves only a small share of keys. Virtual nodes smooth the load."
   ],
   "tryIt": "Implement a hash ring of 3 nodes with 50 virtual nodes each, place 1000 keys, then add a 4th node and count how many keys moved.",
   "end": "Done when the JS ring moves roughly a quarter of the keys (not most of them) when the 4th node is added."
  }
 },
 "51": {
  "0": {
   "pts": [
    "Dynamic programming (DP): break a problem into overlapping subproblems and store their answers. Four questions: what is the state, what is the transition, what are the base cases, and in what order do you fill it.",
    "LC 70 Climbing Stairs: ways(n) = ways(n-1) + ways(n-2). LC 746: cost(i) = cost[i] + min of the previous two. Both O(n) time, O(1) space with two variables.",
    "LC 198 House Robber: best(i) = max(best(i-1), best(i-2) + nums[i]). O(n) time, O(1) space.",
    "LC 213 House Robber II: houses form a circle, so run the 198 logic on nums[0..n-2] and on nums[1..n-1] and take the max; handle n = 1 separately.",
    "Common mistake: skipping the base cases (n = 1, n = 2) or defining the state vaguely."
   ],
   "steps": [
    "For each problem, write the four DP answers (state, transition, base, order) as comments before coding.",
    "Solve 70 recursively, add memoization, then convert to a loop.",
    "Solve 746 and 198 using the same loop shape.",
    "Solve 213 by calling a helper from 198 twice.",
    "Reduce each to O(1) space."
   ],
   "end": "Done when all four pass and each has its four-part DP note written."
  },
  "1": {
   "pts": [
    "Rate limiting caps how many requests a client may make in a time window; over the limit the server returns 429 Too Many Requests, usually with a Retry-After header.",
    "Token bucket: a bucket refills at a steady rate up to a maximum; each request takes a token, so short bursts are allowed. Leaky bucket: requests flow out at a fixed rate, so output is smooth.",
    "Fixed window counts requests per clock minute (simple, but a burst across the boundary can allow double). Sliding window log stores every timestamp (exact, more memory); sliding window counter blends two windows (cheap approximation).",
    "In a multi-server setup the counters must live in a shared store such as Redis, and the check-and-increment must be atomic, which is why a Lua script is planned."
   ],
   "tryIt": "Write a token bucket class taking capacity and refill rate with an injectable clock, and show that 5 requests pass, the 6th fails, then one passes after 1 second.",
   "end": "Done when two limiters (for example token bucket and sliding window log) pass tests using a fake clock and you have written the Redis Lua plan in 5 bullets."
  }
 },
 "52": {
  "0": {
   "pts": [
    "Pattern: palindromes and string DP. Expanding around each center needs no table: for each of 2n-1 centers, grow outward while characters match.",
    "LC 5 Longest Palindromic Substring: expand around centers, track best start and length. O(n^2) time, O(1) space. LC 647 Palindromic Substrings: same expansion, count every successful expansion. O(n^2).",
    "LC 91 Decode Ways: dp[i] = ways to decode the first i characters; add dp[i-1] if the single digit is 1-9, add dp[i-2] if the two digits are 10-26. O(n) time. Watch for zeros.",
    "LC 322 Coin Change: dp[a] = min coins for amount a = 1 + min(dp[a - coin]); unreachable stays Infinity, return -1. O(amount * coins).",
    "Common mistake: in 5 and 647, only expanding odd-length centers and missing even-length ones."
   ],
   "steps": [
    "Solve 5 with two expansions per index (odd and even) and return the substring.",
    "Reuse the expansion for 647 to count.",
    "Solve 91 with a dp array, then compress to two variables; test '06' and '10'.",
    "Solve 322 bottom-up; test amount 0 and an impossible case.",
    "Write the four-part DP note for 91 and 322."
   ],
   "end": "Done when all four are accepted and you have tested the edge cases '06', amount 0 and even-length palindromes."
  },
  "1": {
   "pts": [
    "CAP: during a network partition a system must choose consistency (refuse some requests) or availability (answer, possibly stale). PACELC adds that even without a partition there is a trade-off between latency and consistency.",
    "Consistency models: strong (everyone sees the latest write), causal (effects follow their causes), eventual (replicas converge if writes stop). Weaker models are faster and more available.",
    "Quorum: with N replicas, write to W and read from R; if R + W > N the read set overlaps the write set, so a read sees the latest write (example N=3, W=2, R=2).",
    "Idempotency (repeating a request has the same effect as doing it once), retries with exponential backoff plus jitter, and timeouts on every network call protect against the 'fallacies of distributed computing', for example 'the network is reliable' and 'latency is zero'."
   ],
   "tryIt": "For N=5, list three (R, W) pairs that satisfy R + W > N and say which favours fast reads and which favours fast writes.",
   "end": "Done when you can explain CAP in 3 sentences and name five of the eight fallacies from memory."
  }
 },
 "53": {
  "0": {
   "pts": [
    "Pattern: DP over a sequence, where the answer at i depends on earlier positions. Ask what 'ending at i' or 'first i items' should store.",
    "LC 152 Max Product Subarray: keep both the max and min product ending at i, since a negative number turns the min into the max. O(n) time, O(1) space.",
    "LC 139 Word Break: dp[i] is true if some j < i has dp[j] true and s[j..i) is in the word set. O(n^2) lookups with a set (times word length for hashing).",
    "LC 300 Longest Increasing Subsequence: dp[i] = 1 + max dp[j] for j < i with nums[j] < nums[i], O(n^2). A faster version keeps a sorted 'tails' array and binary searches it, O(n log n).",
    "Common mistake in 152: tracking only the max and getting wrong answers on negatives and zeros."
   ],
   "steps": [
    "Solve 152 with max and min variables; test [-2, 3, -4] and a zero in the middle.",
    "Solve 139 with a Set and a dp array; test a string that cannot be segmented.",
    "Solve 300 with the O(n^2) dp first.",
    "Rewrite 300 with the tails array and binary search (note the tails array is not itself a valid subsequence).",
    "Write the four-part DP note for each."
   ],
   "end": "Done when all three pass and 300 exists in both O(n^2) and O(n log n) forms."
  },
  "1": {
   "pts": [
    "Consensus (Raft overview): nodes agree on a log of commands. One leader is elected for a term, replicates entries to followers, and an entry is committed once a majority has stored it. Majority voting is why clusters use 3 or 5 nodes.",
    "Leader election: if followers stop hearing from the leader, one becomes a candidate and asks for votes; a majority wins. Each term has at most one leader.",
    "Clocks: physical clocks drift, so systems use logical clocks (Lamport: a counter that increases on events and messages) and vector clocks (one counter per node) to tell whether events are ordered or concurrent.",
    "Distributed locks can fail when a process pauses and its lock expires; fencing tokens help. Redlock is debated because it relies on timing assumptions. 2PC blocks if the coordinator dies; sagas use local transactions plus compensating actions. Exactly-once delivery is really at-least-once plus idempotent handling."
   ],
   "tryIt": "Write down what happens in a 3-node Raft cluster when the leader dies: who notices, who becomes leader and why one node cannot win alone.",
   "end": "Done when you can describe a saga for 'book flight then hotel' including the compensation step if the hotel fails."
  }
 },
 "54": {
  "0": {
   "pts": [
    "Pattern: 0/1 knapsack-style DP (take or skip each item) and grid or two-string DP. Define dp over (items so far, target) or (i, j).",
    "LC 416 Partition Equal Subset Sum: if the total is odd return false; otherwise find a subset summing to total/2 with a boolean dp array, iterating the sum downward so each number is used once. O(n * sum).",
    "LC 62 Unique Paths: dp[r][c] = dp[r-1][c] + dp[r][c-1], O(m*n) time, O(n) space with one row.",
    "LC 1143 Longest Common Subsequence: dp[i][j] = dp[i-1][j-1] + 1 if the characters match, else max(dp[i-1][j], dp[i][j-1]). O(m*n).",
    "Common mistake in 416: iterating the sum upward, which reuses the same number several times."
   ],
   "steps": [
    "Solve 62 with a 2D table, then compress to one row.",
    "Solve 1143 with a 2D table; print the table for 'abcde' and 'ace' to see the pattern.",
    "Solve 416 with a 1D boolean array and a downward loop.",
    "Write down why the downward loop in 416 gives 0/1 behaviour.",
    "Add these to the DP cheat sheet."
   ],
   "end": "Done when 416, 62 and 1143 are accepted and the 416 loop direction is explained in your notes."
  },
  "1": {
   "pts": [
    "Queue versus log: in a queue (RabbitMQ, SQS) a message is removed once consumed. In a log (Kafka) messages stay for a retention period and consumers track their own position (offset), so many consumers can replay.",
    "Kafka: a topic is split into partitions; ordering is guaranteed only within a partition (same key goes to the same partition). A consumer group shares the partitions, with each partition read by one consumer in the group.",
    "Delivery: at-most-once (may lose), at-least-once (may duplicate; most common), so consumers must be idempotent. A DLQ (dead-letter queue) holds messages that keep failing.",
    "BullMQ is a Redis-based job queue for Node: supports delayed jobs, retries with backoff, repeatable (cron) jobs and concurrency. Remember it is at-least-once, so handlers must be safe to run twice."
   ],
   "tryIt": "Draw an order-placed event fanning out to email, inventory and analytics, marking which consumers need their own group or queue.",
   "end": "Done when your diagram shows the fan-out with a DLQ and you can state where duplicates can occur and how consumers handle them."
  }
 },
 "55": {
  "0": {
   "pts": [
    "Load testing sends many concurrent requests and records latency. Run autocannon -c 50 -d 30 URL or a k6 script with virtual users and thresholds. Always warm up first and test against a production-like setup.",
    "Percentiles: p95 means 95% of requests were faster than that value. Averages hide slow outliers, so judge by p95 and p99 (tail latency).",
    "Little's Law: concurrent requests in the system = arrival rate x average time in the system (L = lambda x W). 100 req/s at 0.2 s each means about 20 in flight.",
    "Connection pools limit database connections; PgBouncer sits in front of Postgres and shares a small number of server connections among many clients. N+1 queries and missing caches are the most common causes of slow endpoints."
   ],
   "tryIt": "Run autocannon against GET /health and then against a database-backed list endpoint, and note how p99 differs from the average for each.",
   "end": "Done when a baseline table for three P3 endpoints (requests per second, p50, p95, p99) is saved in PERF.md."
  },
  "1": {
   "pts": [
    "Pattern: DP with a state machine or a target sum. Write out the states (for example holding, sold, resting) and which can move to which.",
    "LC 309 Buy/Sell with Cooldown: track hold, sold and rest states per day; hold = max(hold, rest - price), sold = hold + price, rest = max(rest, previous sold). O(n) time, O(1) space.",
    "LC 518 Coin Change II: count combinations with dp[a] += dp[a - coin], looping coins on the outside and amounts inside, so each combination is counted once (not once per order). LC 494 Target Sum: reduce to a subset sum count, or use a map of sum to ways; O(n * sum).",
    "Redo 1143 from a blank file as a check.",
    "Common mistake in 518: swapping the loops, which counts permutations instead of combinations."
   ],
   "steps": [
    "Draw the state diagram for 309 before coding; solve it with three variables.",
    "Solve 518 with a 1D dp and coins outer.",
    "Swap the loops in 518 on purpose, run it, and note how the answer changes.",
    "Solve 494 with the dp-over-sums approach; test [1], target 1 and an unreachable target.",
    "Redo 1143 cold."
   ],
   "end": "Done when 309, 518 and 494 are accepted, 1143 is redone and you can explain why the loop order matters in 518."
  },
  "2": {
   "pts": [
    "A sliding window limiter counts requests in the last N seconds. In Redis, a sorted set per key holds request timestamps as scores: remove old entries with ZREMRANGEBYSCORE, count with ZCARD, add with ZADD.",
    "A Lua script runs atomically in Redis, so the remove, count and add cannot interleave between two app instances. Without atomicity two instances can both see 'one slot left' and both allow.",
    "Quotas apply per IP for anonymous callers and per API key for known ones; the key decides which limit applies.",
    "Respond with 429 and a Retry-After header (seconds until a slot frees up); RateLimit-Remaining headers are a helpful extra."
   ],
   "steps": [
    "Write slidingWindow.lua taking KEYS[1], ARGV (now, windowMs, limit, uniqueId) and returning {allowed, retryAfterMs}.",
    "Load it with redis.defineCommand or EVALSHA from a rateLimiter.js module.",
    "Write Express or Fastify middleware that picks the key (API key header, else IP) and the limit, calls the script and sets headers.",
    "Return 429 with Retry-After when blocked; add a PEXPIRE inside the script so idle keys vanish.",
    "Write a test that starts two app instances on different ports, sends 12 requests with a limit of 10 across both, and expects exactly 10 successes.",
    "Add a test using a fake time argument to show a request is allowed again after the window passes."
   ],
   "end": "Done when the two-instance test shows exactly the limit succeeding and the rest receiving 429 with Retry-After."
  }
 },
 "56": {
  "0": {
   "pts": [
    "A load test before and after a change is the only honest proof that a change helped. Keep the test script, data and machine the same between runs.",
    "EXPLAIN ANALYZE shows the real plan and timings; a sequential scan on a large table filtered by one column usually calls for an index. Re-run the load test after adding it.",
    "PERF.md should state: setup, command, results before, change made, results after, and the remaining bottleneck.",
    "A one-page design doc covers requirements, estimates (QPS, storage), API, schema and a scaling plan (cache, replicas, partitioning)."
   ],
   "steps": [
    "Write k6/redirect.js with a ramping scenario and thresholds on p95 and error rate.",
    "Run it with the cache disabled, save results, then with the cache enabled and save again.",
    "Find the bottleneck (CPU, database, Redis) from metrics or pg_stat_statements; run EXPLAIN ANALYZE on the slowest query and add an index.",
    "Re-run and log all runs in PERF.md in a before and after table.",
    "Write docs/design.md (one page) with requirements, estimates, API, schema and scaling plan.",
    "Tag v1.0."
   ],
   "end": "Done when PERF.md shows the before and after numbers, design.md exists and tag v1.0 is pushed."
  },
  "2": {
   "pts": [
    "Pattern: choose DP when a brute-force recursion repeats the same subproblems. Sequence problems use dp[i]; two-sequence problems use dp[i][j]; target problems loop items outside and amounts inside.",
    "LC 322: dp[a] = 1 + min(dp[a - coin]), O(amount * coins). LC 300: O(n^2) dp or O(n log n) tails array with binary search. LC 1143: 2D table, O(m*n).",
    "For the unseen DP medium, spend 5 minutes writing state, transition, base and order before coding.",
    "Common mistake: coding before writing the state definition."
   ],
   "steps": [
    "Set a 75-minute timer; blank files only.",
    "Solve 322, 300 and 1143, about 12-15 minutes each.",
    "Spend the remaining time on the unseen DP medium, writing the four DP answers first.",
    "Log time, mistakes and which hints you needed in NOTES.md.",
    "Put anything over 25 minutes on the redo list."
   ],
   "end": "Done when all four are attempted under the timer and logged."
  },
  "3": {
   "pts": [
    "Estimation turns a vague product into numbers. QPS = daily actions / 86,400 (round to 100,000 seconds a day). Peak is usually 2x to 5x average. Storage per year = items per day x size x 365.",
    "Bandwidth = QPS x average response size. Cache size: cache the hot 20% of daily reads. Read:write ratio drives design (a URL shortener might be 100:1).",
    "Latency numbers to memorise (rough): memory read 100 ns, SSD read about 100 microseconds, same-datacenter round trip 0.5 ms, disk seek 10 ms, cross-continent round trip about 150 ms.",
    "State assumptions out loud and keep arithmetic simple; the goal is the right order of magnitude."
   ],
   "tryIt": "Estimate QPS and yearly storage for 300M daily active users each posting 0.5 times a day with 300 bytes per post.",
   "end": "Done when you have written estimates for Twitter, WhatsApp and YouTube (QPS, storage per year, bandwidth) and the Phase 4 retro is in NOTES.md."
  }
 },
 "57": {
  "0": {
   "pts": [
    "Pattern: 2D DP on two strings: dp[i][j] is the answer for the first i characters of one and the first j of the other. Fill from small prefixes to large.",
    "LC 72 Edit Distance: if the characters match, dp[i][j] = dp[i-1][j-1]; else 1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1]). O(m*n).",
    "LC 97 Interleaving String: first check len(s1) + len(s2) = len(s3); dp[i][j] is true if s3's first i+j characters can be formed from s1's first i and s2's first j. O(m*n).",
    "LC 115 Distinct Subsequences: dp[i][j] = ways s's first i characters contain t's first j as a subsequence; add dp[i-1][j] (skip), plus dp[i-1][j-1] if characters match. O(m*n). Base: dp[i][0] = 1.",
    "Common mistake: wrong base row and column (empty prefixes), which is usually where the bug is."
   ],
   "steps": [
    "For each problem, draw the 3x3 table for a tiny example and fill the first row and column by hand.",
    "Solve 72 first; confirm with 'horse' to 'ros' = 3.",
    "Solve 97 with the length check, then the table.",
    "Solve 115 and check the base column.",
    "Write the table shape and base cases in your DP notes."
   ],
   "end": "Done when 72, 97 and 115 are accepted and each has a hand-filled table in your notes."
  },
  "1": {
   "pts": [
    "Encapsulation: hide state behind methods so rules (for example a negative quantity is invalid) live in one place. Composition over inheritance: give a class collaborators it uses rather than a parent it extends.",
    "SRP (single responsibility): a class has one reason to change. OCP (open/closed): add behaviour by adding code, not editing old code. LSP (Liskov): a subtype must work wherever its parent is expected. ISP: many small interfaces beat one large one. DIP: depend on interfaces, not concrete classes.",
    "Bad to good example: an OrderService that validates, saves, charges and emails becomes OrderService depending on interfaces PaymentGateway, OrderRepository and Notifier injected in the constructor.",
    "In TypeScript, interfaces cost nothing at runtime and make fakes easy in tests."
   ],
   "tryIt": "Take a function with an if/else chain on payment type and rewrite it with a PaymentMethod interface and two classes, without editing the chain's callers.",
   "end": "Done when the god OrderService is split into at least 4 small classes with injected interfaces and the original tests still pass."
  }
 },
 "58": {
  "0": {
   "pts": [
    "Hard DP is often interval or regex DP. Expect to need the editorial; the goal is to understand, then re-implement from memory a day later.",
    "LC 10 Regular Expression Matching: dp[i][j] = does s's first i characters match p's first j. For '*', either use it zero times (dp[i][j-2]) or, if the previous pattern character matches s[i-1], use it once more (dp[i-1][j]). O(m*n).",
    "LC 312 Burst Balloons: think of the last balloon to burst in a range (i, j), not the first. dp[i][j] = max over k of dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j], with 1 padded at both ends. O(n^3).",
    "Common mistake: thinking of the first balloon to burst, which makes subproblems depend on each other."
   ],
   "steps": [
    "Give each problem 25 minutes of honest attempt and write what you tried.",
    "Read the editorial and write the state and transition in your own words.",
    "Close the editorial and re-implement 10, then 312, from a blank file.",
    "Test 10 on 'aab' with 'c*a*b' and 312 on [3,1,5,8] (answer 167).",
    "Add both to the redo list for a cold attempt in two weeks."
   ],
   "end": "Done when both problems are accepted from your own re-implementation and have the state and transition written in notes."
  },
  "1": {
   "pts": [
    "Factory: a function or class decides which concrete object to create, so callers never use 'new' with a concrete class. Abstract Factory returns a family of related objects (for example a dark theme set of widgets).",
    "Builder assembles a complex object step by step with chained methods and validates at build(); useful when there are many optional fields. Prototype copies an existing object (structuredClone or Object.create in JS).",
    "Singleton: one shared instance. In Node, a module is evaluated once and cached, so exporting one instance is already a singleton; beware that it hides global state and complicates tests.",
    "JS-idiomatic alternatives: factory function with a closure instead of a class, options objects instead of Builder, and dependency injection instead of Singleton."
   ],
   "tryIt": "Write createNotifier('email' | 'sms') returning objects with the same send method, then add a 'push' type without changing existing code beyond one registry entry.",
   "end": "Done when Factory, Builder and one more pattern are implemented with tests and each has a one-line JS alternative in your notes."
  }
 },
 "59": {
  "0": {
   "pts": [
    "Pattern: backtracking builds a solution step by step, undoing each choice when it fails (choose, explore, un-choose). Prune early to avoid exploring dead branches.",
    "Redo cold: LC 79 Word Search (DFS on a grid, mark visited and unmark on return), LC 131 Palindrome Partitioning (try each palindromic prefix, recurse on the rest), LC 51 N-Queens (place one queen per row, track used columns and diagonals).",
    "Word Break II style: recurse on a start index and memoize the list of sentences from that index in a Map, so repeated suffixes are not recomputed.",
    "Common mistake: forgetting to un-choose (pop or unmark) after the recursive call, or pushing a reference to the same array instead of a copy."
   ],
   "steps": [
    "Set 15 minutes each and redo 79, 131 and 51 from blank files.",
    "Write for each: the choice, the constraint and the base case.",
    "Write wordBreakII(s, dict) with a memo Map from start index to array of sentences.",
    "Test it on 'catsanddog' with ['cat','cats','and','sand','dog'].",
    "Note how memoization changes the worst case."
   ],
   "end": "Done when 79, 131 and 51 are redone and Word Break II returns both sentences for the sample."
  },
  "1": {
   "pts": [
    "Adapter wraps an incompatible interface so it fits the one you expect (for example wrap a third-party payment SDK behind your PaymentGateway interface). Facade offers one simple entry point over several subsystems.",
    "Decorator wraps an object with the same interface and adds behaviour (logging, retries, timing) before or after delegating. Proxy also wraps with the same interface but controls access (caching, lazy loading, permissions).",
    "Composite treats a single item and a group the same (a file and a folder both have size()). The tree recursion lives in the group.",
    "Express middleware is a chain of decorators around a handler; a function wrapper such as withLogging(fn) is the idiomatic JS decorator."
   ],
   "tryIt": "Write withLogging(fn) that logs the arguments, result and duration of any async function, then wrap a fake getUser call.",
   "end": "Done when a logging decorator, caching proxy (with a hit counter test) and payment adapter are implemented with tests and a short note compares them with middleware."
  }
 },
 "60": {
  "0": {
   "pts": [
    "Bit tricks: XOR (^) of equal numbers is 0 and x ^ 0 = x; n & (n - 1) clears the lowest set bit; x >> 1 halves a number; x & 1 reads the last bit.",
    "LC 136 Single Number: XOR everything; pairs cancel. O(n), O(1). LC 268 Missing Number: XOR indexes 0..n with all values, or use n(n+1)/2 minus the sum. LC 191: loop n &= n - 1 and count steps, O(number of set bits).",
    "LC 338 Counting Bits: dp[i] = dp[i >> 1] + (i & 1), O(n). LC 190 Reverse Bits: loop 32 times, shift result left and add the last bit of n; in JS use >>> 0 for an unsigned result.",
    "LC 371 Sum of Two Integers: a XOR b is the sum without carry, (a & b) << 1 is the carry; repeat until the carry is 0. JS bit operators work on 32-bit signed integers, so results fit that range.",
    "Common mistake: using >> (sign-extending) instead of >>> when the input may be treated as unsigned."
   ],
   "steps": [
    "Solve 136 and 268 with XOR.",
    "Solve 191 with n &= n - 1, then 338 using the dp formula.",
    "Solve 190 with a 32-iteration loop and >>> 0.",
    "Solve 371 with the carry loop; trace 5 + 3 on paper in binary.",
    "Write a small 'bit tricks' list in your cheat sheet."
   ],
   "end": "Done when all six are accepted and you can explain n & (n - 1) and why XOR cancels pairs."
  },
  "1": {
   "pts": [
    "Strategy: put interchangeable algorithms behind one interface and choose one at runtime (for example a pricing rule). Observer: subscribers register and get notified when something changes (EventEmitter).",
    "State: an object's behaviour depends on its current state, with each state allowed to move only to certain other states (Order: created, paid, shipped, delivered, cancelled). Illegal transitions are rejected in one place.",
    "Command wraps an action as an object with execute() and undo(); keep a history stack for undo and a redo stack. Chain of Responsibility passes a request along handlers until one handles it (like middleware).",
    "Template Method fixes the order of steps in a base class with overridable steps; Iterator exposes sequential access, which JS provides through Symbol.iterator and generators."
   ],
   "tryIt": "Write a transition table object for an Order ({created: ['paid','cancelled'], ...}) and a transition(next) method that throws on illegal moves.",
   "end": "Done when an Order state machine rejects illegal transitions in tests and a command-based editor supports undo and redo (a new action clears the redo stack)."
  }
 },
 "61": {
  "0": {
   "pts": [
    "Pattern: math and matrix problems are index bookkeeping. Look for an in-place trick (transpose, boundary pointers, reusing the first row as storage) and write the invariant before coding.",
    "48 Rotate Image: transpose the matrix (swap [i][j] with [j][i]), then reverse each row. O(n^2) time, O(1) extra space.",
    "54 Spiral Matrix: keep top, bottom, left, right boundaries. Walk each edge, shrink that boundary, and re-check bounds before the bottom and left walks. O(m*n) time.",
    "73 Set Matrix Zeroes: use the first row and first column as marker storage, with two booleans remembering if they themselves must be zeroed. O(m*n) time, O(1) space.",
    "202 Happy Number: repeat the sum of squared digits; a hash set of seen values (or slow/fast pointers) detects a cycle. 66 Plus One: carry from the end; all 9s gives [1,0,...,0]. 50 Pow(x,n): square the base and halve n, O(log n); handle negative n by inverting x.",
    "Common mistake: in 73, zeroing the first row or column too early destroys the markers. Process the inner cells first."
   ],
   "steps": [
    "Solve 66 and 202 first (10 minutes each at most) to warm up.",
    "Solve 50 Pow(x,n) with the recursive halving version, then test n = 0, negative n and odd n.",
    "Solve 48 on paper with a 3x3 grid before coding; write the transpose-then-reverse rule in a comment.",
    "Solve 54 and 73; draw the boundaries or the marker row on paper first.",
    "Write one line per problem in NOTES.md (the trick). Re-solve 73 and 54 cold in 3 days."
   ],
   "end": "done when all six are accepted and you can explain the O(1)-space trick in 73 without notes."
  },
  "1": {
   "pts": [
    "An LLD (low-level design) interview asks for classes and code, not servers. Use the same order every time: requirements, entities, relationships, APIs, patterns, then concurrency and extension.",
    "Clarify first: what is in scope, who are the actors, what are the rules (for Parking Lot: vehicle types, spot sizes, pricing, entry/exit gates). Write 5 to 8 requirements.",
    "Entities are the nouns (ParkingLot, Level, Spot, Vehicle, Ticket); relationships are has-a or is-a. Add a pattern only when a real variation exists, such as a Strategy for pricing.",
    "Mermaid classDiagram shows structure; sequenceDiagram shows one flow (park a car, exit and pay). Draw both for Parking Lot.",
    "Common mistake: jumping to code before agreeing on the API, or adding patterns nobody asked for."
   ],
   "tryIt": "Write 6 requirements and a Mermaid classDiagram with 5 classes for Parking Lot in 10 minutes, without code.",
   "steps": [
    "Write requirements and out-of-scope items in a docs file (10 minutes).",
    "List entities and draw the classDiagram in Mermaid; check each class has one reason to change.",
    "Define the public API: parkVehicle(vehicle) returns Ticket, unparkVehicle(ticketId) returns Fee.",
    "Implement in JS or TS: Spot allocation by vehicle type, ticket creation, fee calculation behind a PricingStrategy.",
    "Write 3 tests: park until full, unpark frees the spot, wrong ticket throws.",
    "Draw the sequenceDiagram for park and exit; note one extension (EV spots) and one concurrency risk (two cars taking the same spot)."
   ],
   "end": "done when the Parking Lot runs with passing tests and both Mermaid diagrams render."
  }
 },
 "62": {
  "0": {
   "pts": [
    "WebSocket starts as a normal HTTP request with 'Upgrade: websocket'. The server answers 101 Switching Protocols and the same TCP connection becomes a two-way channel. Messages travel as small frames.",
    "Ping/pong frames check the connection is alive. Without them, dead connections (a phone going into a tunnel) stay open for a long time on the server.",
    "ws is a thin library for raw WebSockets. socket.io adds rooms, acknowledgements, fallbacks and automatic reconnect, but uses its own protocol, so a plain WebSocket client cannot talk to it.",
    "SSE (Server-Sent Events) is one-way server to browser over plain HTTP with built-in reconnect. Long-polling holds a request open until data arrives. Pick SSE when the client only listens.",
    "Reconnect with exponential backoff plus random jitter so thousands of clients do not reconnect at once. Backpressure: if ws.bufferedAmount keeps growing, a slow client is not keeping up, so pause or drop it."
   ],
   "tryIt": "Open DevTools Network, filter WS, connect your echo client, and read the 101 response headers and the frames.",
   "steps": [
    "npm i ws. Create server.js with a WebSocketServer on port 8080 that echoes each message.",
    "Add broadcast: on message, loop over wss.clients and send to every client whose readyState is OPEN.",
    "Add a heartbeat: every 30 seconds ping all clients and terminate any that did not answer the previous ping.",
    "Write client.html with new WebSocket('ws://localhost:8080'), an input box and a message list.",
    "Add client reconnect with backoff (1s, 2s, 4s up to 30s, plus random jitter).",
    "Open two browser tabs, confirm broadcast, then kill the server and watch the client reconnect."
   ],
   "end": "done when two tabs see each other's messages and a restarted server is reconnected automatically."
  },
  "1": {
   "pts": [
    "Elevator: entities are Elevator, Request, Controller. The core design question is the scheduling policy (nearest car or SCAN, which keeps moving in one direction until no requests remain). Put it behind a Strategy interface.",
    "Elevator state machine: IDLE, MOVING_UP, MOVING_DOWN, DOORS_OPEN. Write down the legal transitions and throw on illegal ones.",
    "Vending Machine: classic State pattern with states Idle, HasMoney, Dispensing, OutOfStock. Each state decides what insertCoin, selectItem and refund do.",
    "Money is the trap. Use integer cents, never floats, and make refund and change calculation testable on their own.",
    "Common mistake: one giant class with if/else on state. Compare against a reference after your own attempt, not before."
   ],
   "tryIt": "Write the state transition table for the Vending Machine on paper: rows are states, columns are actions.",
   "steps": [
    "Elevator (30 min): write requirements, classDiagram, then code Elevator, Request and a Scheduler strategy.",
    "Test the Elevator: a request at the current floor, two requests in the same direction, and a request while moving the other way.",
    "Vending Machine (30 min): define the state interface, implement 3 states, Inventory and a change-making function.",
    "Test the Vending Machine: insufficient money, exact money, change returned, sold-out item, refund.",
    "Add a Mermaid stateDiagram or classDiagram to each kata.",
    "Open a reference solution and write 3 differences in NOTES.md."
   ],
   "end": "done when both katas have passing tests, a diagram each, and a written comparison with a reference."
  },
  "2": {
   "pts": [
    "Pattern: deliberate practice on your weak spots. Failing a problem tells you more than solving an easy one.",
    "Pick 4 problems you failed or needed hints for, covering at least 3 different patterns.",
    "Spend about 20 minutes each: 3 minutes to name the pattern, 12 to code, 5 to test and state complexity.",
    "After a problem, close the editor and re-solve it from a blank file at the end of the session.",
    "Common mistake: re-reading your old accepted code, which feels like progress but tests recognition, not recall."
   ],
   "steps": [
    "Pick the 4 problems from your weak list and write the pattern you expect next to each before starting.",
    "Solve each with a 20-minute timer; if you need a hint, read only the topic tag, not the solution.",
    "For each, write the complexity and one edge case that nearly broke it.",
    "In the last 30 minutes re-solve the two hardest from a blank file.",
    "Update your weak list: remove what you solved cold, add what you did not."
   ],
   "end": "done when 4 problems are solved and 2 were re-solved from a blank file."
  },
  "3": {
   "pts": [
    "Pulse is a real-time chat service. Use the WebSocket server from the learn task: authenticate once in the handshake, then trust the connection.",
    "JWT on handshake: read the token from a query string or the first message, verify it, and close with a policy code if invalid. Never let unauthenticated sockets join rooms.",
    "Rooms are a Map from roomId to a Set of sockets. Presence is a set of online user ids with a 'last seen' time. Typing is a short-lived event that is never stored.",
    "Message ack: the client sends a client-generated id, the server stores the message and replies 'ack' with the server id and timestamp. This is the basis for retry without duplicates.",
    "Persistence: save messages in Postgres, with an index on (room_id, created_at) for the history API with cursor pagination."
   ],
   "steps": [
    "Create the repo structure (src/ws, src/http, migrations). Add tables users, rooms, messages (id, room_id, user_id, client_id, body, created_at) with a unique (user_id, client_id).",
    "Write verifyToken(token) and call it in the upgrade handler; reject with 401 before accepting.",
    "Implement join, leave, message events and a rooms Map; broadcast only inside the room.",
    "Add presence (online list per room) and a typing event with a 3-second client-side expiry.",
    "Write message handling: insert into Postgres, then broadcast, then send ack with the server id.",
    "Add GET /rooms/:id/messages?before=<id>&limit=50 and write 2 tests: bad token is rejected, history returns messages newest first."
   ],
   "end": "done when two authenticated clients chat in a room, messages survive a server restart, and the history endpoint pages correctly."
  }
 },
 "63": {
  "0": {
   "pts": [
    "Problem: one server holds a client's socket in memory, so a message sent to instance A will not reach a client connected to instance B. A shared pub/sub fixes this.",
    "Redis pub/sub: every instance subscribes to a channel per room and publishes incoming messages. Each instance then sends to its local sockets. Pub/sub does not store messages, so a missed one is lost.",
    "Sticky sessions pin a client to one instance (needed for socket.io long-polling fallback); stateless means any instance can serve any request. Prefer stateless plus shared state.",
    "Nginx needs the upgrade headers (Upgrade and Connection) and an upstream block listing both instances. Copy the config from the Nginx docs; you will study Nginx properly in Week 11.",
    "Reconnect with last-event-id: the client sends the last message id it saw and the server replays newer ones from Postgres. Per-room ordering comes from a monotonically increasing sequence per room."
   ],
   "steps": [
    "Run two instances on ports 3001 and 3002 from the same code (PORT env var).",
    "Add Redis: on a room message, PUBLISH to channel room:<id>; each instance SUBSCRIBEs and delivers to its local sockets.",
    "Add an Nginx upstream with both instances and the WebSocket upgrade headers; run it with docker-compose.",
    "Add a per-room sequence number assigned inside the insert transaction and store it on each message.",
    "On reconnect the client sends lastSeq; the server queries messages with seq greater than that and replays them before going live.",
    "Demo: client A on instance 1, client B on instance 2, send messages both ways, kill one instance and show reconnect plus replay."
   ],
   "end": "done when two clients connected to different instances exchange messages in order, and a reconnect replays missed messages."
  },
  "2": {
   "pts": [
    "Pattern: 2D or 1D dynamic programming, where the answer for a prefix is built from smaller prefixes. Reach for it when the problem asks for count, min or feasibility and choices overlap.",
    "72 Edit Distance: dp[i][j] is the cost to convert the first i letters of one word to the first j of the other; insert, delete or replace map to three neighbouring cells. O(m*n) time.",
    "91 Decode Ways: dp[i] adds dp[i-1] if the single digit is 1-9 and dp[i-2] if the two digits are 10-26. Zeros are the trap. O(n) time, O(1) space with two variables.",
    "139 Word Break: dp[i] is true if some j has dp[j] true and s[j..i) is in the word set. Use a Set for words; about O(n^2) substring checks.",
    "Common mistake: forgetting base cases (empty string) and off-by-one on dp indexes. Write dp[0] meaning first."
   ],
   "steps": [
    "Set a 75-minute timer for the whole set. Do not open solutions.",
    "For each problem write: what dp[i] means, the base case, the transition. Only then code.",
    "Spend the last 20 minutes on one unseen medium of your choice, using the same three-line plan.",
    "Record the time per problem and the first bug you hit.",
    "Re-solve any problem you did not finish cold in 2 days."
   ],
   "end": "done when 72, 91 and 139 plus one unseen medium were attempted in 75 minutes and times are logged."
  },
  "3": {
   "pts": [
    "Splitwise: entities are User, Group, Expense, Split (equal, exact, percent). Use a Strategy per split type and store each balance as net amount owed between two users, in integer cents.",
    "Simplifying debts is optional: keep a balance map and, if time allows, match largest creditor with largest debtor.",
    "ATM: State pattern (Idle, CardInserted, PinVerified, Dispensing) plus cash dispenser as a chain of responsibility over note denominations (100, 50, 20).",
    "Class-design write-up of your Day 17 LRU Cache: a hash map plus doubly linked list, and why get and put are O(1). Explain which class owns what.",
    "Concurrency: in JS one thread runs code, but two requests can interleave at an await. A read-check-write across an await is a race, so make the check and update happen with no await between them, or use a lock or a DB transaction."
   ],
   "steps": [
    "Splitwise (35 min): requirements, class diagram, code expenses with equal and exact splits, and a getBalances(user) method; test that balances sum to zero.",
    "ATM (25 min): code the state machine and the denomination dispenser; test a withdrawal that cannot be made exactly.",
    "Write a half-page on your LRU Cache: classes, invariants, complexity, and what happens on capacity overflow.",
    "Write a small demo where two async withdraw calls on the same account interleave at an await and overdraw it.",
    "Fix it by removing the await between the balance check and update, or serialising per account with a simple promise queue. Note the fix in NOTES.md."
   ],
   "end": "done when both katas pass tests and you reproduced and fixed one await race."
  }
 },
 "64": {
  "0": {
   "pts": [
    "Pattern: consolidation. Revisit patterns where you lose time, here graphs (BFS, DFS, topological sort, union-find) and DP (state definition, transition, base case).",
    "Pick 4 problems from your weak list, 2 graph and 2 DP. Do not add new problems.",
    "Graphs: say what the nodes and edges are, and whether you need BFS (shortest unweighted path) or DFS (explore or detect). Track visited to avoid infinite loops.",
    "DP: write what dp[i] (or dp[i][j]) means in one sentence before the transition.",
    "Common mistake: starting to code before defining the state or the node/edge model."
   ],
   "steps": [
    "Pick 2 graph and 2 DP problems from your list.",
    "For each, write the pattern, state definition and expected complexity in a comment first.",
    "Solve cold with a 15-minute limit each; if stuck, read only the topic tag.",
    "Check the complexity matches what you wrote.",
    "Update the weak list with what you removed or kept."
   ],
   "end": "done when all 4 were solved cold or the exact missing idea is noted for each."
  },
  "1": {
   "pts": [
    "HLD (high-level design) is a repeatable method: requirements (functional and non-functional), estimation, API, data model, high-level diagram, deep dive, bottlenecks and trade-offs. Say the steps aloud at the start of every design.",
    "Estimation is rough math: 10M daily users and 10 requests each is about 100M requests a day, roughly 1,200 per second on average. Write peak as 2 to 3 times that.",
    "L4 load balancer routes by IP and port (fast, no HTTP knowledge); L7 reads HTTP (route by path or header, terminate TLS). A reverse proxy sits in front of servers and forwards requests.",
    "An API gateway is a reverse proxy plus cross-cutting features: auth, rate limiting, routing to services. Service discovery lets services find healthy instances of each other without hardcoded addresses.",
    "Common mistake: drawing boxes before agreeing on requirements and scale."
   ],
   "tryIt": "Take 'design a pastebin' and write only the requirements and a one-line estimate of writes per second, in 10 minutes.",
   "steps": [
    "Write the 7-step framework on one page and keep it visible.",
    "Practise the estimation: 3 quick problems (requests per second, storage per year, bandwidth) with round numbers.",
    "Write one-paragraph definitions in your own words for L4 vs L7, reverse proxy, API gateway and service discovery.",
    "Draw a generic diagram: client, DNS, load balancer, app servers, database, cache.",
    "Add 3 questions you will ask in every interview (scale, read/write ratio, consistency needs)."
   ],
   "end": "done when you can recite the 7 steps and explain L4 vs L7 in 30 seconds."
  }
 },
 "65": {
  "0": {
   "pts": [
    "Pattern: hard linked-list and heap problems combine small techniques: dummy head nodes, pointer re-linking, min-heap by value, and binary search on partitions. Draw the pointers before coding.",
    "4 Median of Two Sorted Arrays: binary search a partition on the shorter array so the left halves hold half the elements and every left value is at most every right value. O(log(min(m,n))).",
    "25 Reverse Nodes in k-Group: check k nodes exist, reverse that segment in place, reconnect with the previous group's tail, repeat. O(n) time, O(1) space.",
    "23 Merge k Sorted Lists: push each list head in a min-heap, pop the smallest and push its next. O(N log k). Merging pairs repeatedly also works.",
    "Common mistake: in 25, losing the link to the next group before reversing; in 4, mishandling empty halves, so use negative and positive infinity sentinels."
   ],
   "steps": [
    "Redo 4 first on paper: write the partition conditions (maxLeftA <= minRightB and maxLeftB <= minRightA) before coding.",
    "Solve 25 with a dummy head; draw a 5-node list with k = 2 and trace prev, curr, next.",
    "Solve 23 with a heap (write or reuse a small MinHeap class).",
    "Test: empty lists, one list, lists of length 1, k larger than the list.",
    "Re-solve 4 cold in 3 days."
   ],
   "end": "done when all three are accepted with the stated complexity and 4 is explained without notes."
  },
  "1": {
   "pts": [
    "DNS maps a name to an IP; answers are cached at the browser, OS and resolver for a TTL. Low TTL means faster changes but more lookups. A CDN caches static content on edge servers close to users, cutting latency and origin load.",
    "Caching tiers: browser, CDN, app-level (Redis), database. Each tier has a different invalidation story; short TTLs or versioned URLs are the simplest.",
    "Object storage (S3-style) holds large blobs cheaply and durably. Store the file in object storage and its metadata (owner, size, name) in a database: blob/metadata split.",
    "URL shortener core: generate a unique short code (base62 of a counter or random with a collision check), a key-value lookup, a 301 or 302 redirect. Reads far outnumber writes.",
    "Pastebin: same as the shortener, but content goes to object storage with an expiry, and metadata in a database. Common mistake: ignoring expiry, abuse and how codes are generated."
   ],
   "tryIt": "Compute storage for 1M new pastes a day at 10 KB each for 5 years and say what is stored where.",
   "steps": [
    "Design the URL shortener on paper in 20 minutes: requirements, estimate, API, data model, diagram.",
    "Design Pastebin in 20 minutes the same way, adding object storage and an expiry job.",
    "Open your P4 build and list what it has: schema, cache, rate limit, analytics.",
    "Write a table of what your paper design has that P4 lacks and the reverse.",
    "Add 3 items to a 'to consider next time' list in NOTES.md."
   ],
   "end": "done when both designs are on paper with an estimate and a written gap list against P4."
  }
 },
 "66": {
  "0": {
   "pts": [
    "Pattern: two heaps and merge-by-time. Use two heaps when you need the median or another middle element of a stream; use a heap to merge sorted sources.",
    "295 Find Median from Data Stream: a max-heap holds the smaller half, a min-heap the larger half; keep sizes within one. addNum is O(log n), findMedian is O(1).",
    "355 Design Twitter: store each user's tweets with a global timestamp and a follow set. For the feed, take each followed user's latest tweets and merge with a heap to get the top 10. Cost about O(f log f) for f followed users.",
    "23 Merge k Sorted Lists: min-heap of list heads, O(N log k).",
    "Common mistake: in 295, forgetting to rebalance after pushing to the other heap; in 355, forgetting a user sees their own tweets."
   ],
   "steps": [
    "Redo 295: write the invariants (every max-heap value <= every min-heap value, sizes differ by at most 1) as comments.",
    "Test 295 with 1, 2, 3 numbers and with duplicates.",
    "Redo 355 and list the four methods and the data each needs.",
    "Redo 23 and compare with your earlier attempt.",
    "Re-solve 295 cold in 3 days."
   ],
   "end": "done when all three are accepted cold and you can state the 295 invariants without looking."
  },
  "1": {
   "pts": [
    "Fan-out on write: when a user posts, push the post id into each follower's timeline list in Redis. Reads are fast, writes cost one append per follower.",
    "Fan-out on read: build the timeline at read time by fetching recent posts from everyone you follow. Writes are cheap, reads are slow when you follow many accounts.",
    "Celebrity problem: pushing one post to 50 million followers is too expensive. Hybrid: push for normal users, and at read time merge in recent posts from celebrities you follow.",
    "Timeline cache: a Redis list or sorted set of post ids per user, capped at say 800 entries; post bodies are fetched from a post cache or store. Ranking can be a hook that reorders candidates.",
    "Common mistake: ignoring storage and bottlenecks. Estimate posts per day times size, and say what breaks first (hot keys, the celebrity fan-out queue)."
   ],
   "tryIt": "Estimate Redis memory for 100M users with 800 post ids of 8 bytes each in their timelines.",
   "steps": [
    "Write requirements: post, follow, home timeline, scale (for example 300M users, 100M daily active).",
    "Estimate writes and reads per second and storage per year.",
    "Define the API: POST /tweets, GET /timeline?cursor=, POST /follow.",
    "Draw the diagram with a post service, fan-out workers via a queue, timeline cache and post store.",
    "Add the hybrid for celebrities and write 3 bottlenecks with mitigations.",
    "Compare with a reference design and note one thing you missed."
   ],
   "end": "done when the diagram, estimate and a three-item bottleneck list are written down."
  }
 },
 "67": {
  "0": {
   "pts": [
    "Pattern: monotonic stack or deque. Keep a stack whose values stay sorted so the top is always the next candidate; reach for it on 'next greater', 'largest rectangle' and 'window max' problems.",
    "84 Largest Rectangle in Histogram: keep a stack of increasing bar indices. On a lower bar, pop and compute width from the new stack top to the current index. O(n).",
    "42 Trapping Rain Water: two pointers with leftMax and rightMax; move the pointer with the smaller max and add max minus height. O(n) time, O(1) space.",
    "239 Sliding Window Maximum: a deque of indices with decreasing values; pop from the back while smaller, pop from the front when out of the window. O(n).",
    "Common mistake: in 84, forgetting a sentinel bar of height 0 at the end, which leaves the stack unprocessed."
   ],
   "steps": [
    "Set a 60-minute timer for the three problems; do not open solutions.",
    "For each, write what the stack or deque holds and when you pop, then code.",
    "Test: all equal heights, strictly increasing, strictly decreasing, window of size 1.",
    "Note time per problem and any hint used.",
    "Re-solve the slowest one in 3 days."
   ],
   "end": "done when all three pass in 60 minutes or the missing idea is written down."
  },
  "1": {
   "pts": [
    "Transport: WebSocket is two-way, best for chat. SSE is one-way server to client over HTTP, good for notifications. Long-polling is a fallback. Mobile apps in the background cannot hold sockets, so they use push (APNs on iOS, FCM on Android).",
    "Message flow: client sends to a chat server, which stores the message (a wide-column or key-value store keyed by conversation and time), then delivers it if the recipient is online or queues push if offline.",
    "Delivery receipts: sent (server stored it), delivered (device got it), read. Each is a small event with the message id, sent back through the same channel.",
    "Presence: a heartbeat updates a Redis key with a short TTL; no heartbeat means offline. Do not fan presence out to everyone; send it only to open conversations.",
    "Group fan-out: store one copy of the message and deliver to each member's connection; for big groups use a queue per recipient server. Common mistake: forgetting ordering (use a per-conversation sequence) and offline sync."
   ],
   "tryIt": "Draw the message sequence for a 1:1 chat when the recipient is offline, with the receipts.",
   "steps": [
    "Write requirements: 1:1 and group chat, receipts, presence, offline delivery, scale of 500M users.",
    "Estimate messages per second and storage per day.",
    "Define the API or event list: send, ack, deliver, read, typing.",
    "Draw the diagram: gateway servers holding sockets, a session map in Redis, message store, push service.",
    "Walk the offline path and the group fan-out path and list 3 bottlenecks."
   ],
   "end": "done when you can narrate online delivery, offline delivery and group fan-out from your diagram."
  }
 },
 "68": {
  "0": {
   "pts": [
    "Pattern: tree recursion that returns one value to the parent while a global tracks the answer, plus tries for multi-word search.",
    "124 Binary Tree Maximum Path Sum: post-order DFS returns the best downward path from a node, using max(0, child) to drop negative branches. The best path through the node is left + node + right; update a global. O(n).",
    "297 Serialize and Deserialize Binary Tree: serialize in preorder with a marker for null, then rebuild by consuming tokens in the same order. O(n).",
    "212 Word Search II: insert all words into a trie, then DFS from every cell, following only trie branches that exist and marking cells visited during the path. Prune finished words. Much faster than searching each word separately.",
    "Common mistake: in 124, returning the through-node path to the parent instead of a single branch; in 212, not restoring the visited mark when backtracking."
   ],
   "steps": [
    "Solve 124: write what the function returns versus what the global stores.",
    "Solve 297: write the exact format (for example '1,2,#,#,3') and test an empty tree.",
    "Solve 212: build the trie first and test it alone, then add the DFS.",
    "Test with negative values for 124 and a board with a repeated word for 212.",
    "Re-solve 212 cold in 3 days."
   ],
   "end": "done when all three are accepted cold and you can explain the 124 return-versus-global split."
  },
  "1": {
   "pts": [
    "Rate limiter: token bucket (refill N tokens per second, up to a cap) or sliding window counter. Store counters in Redis with an atomic Lua script or INCR plus expiry so many app servers share one view. Return 429 with a Retry-After header.",
    "Snowflake ID: a 64-bit number made of timestamp, machine id and a per-millisecond sequence. IDs are unique without coordination and roughly time-ordered. Clock going backwards is the main risk.",
    "Dynamo-style key-value store: consistent hashing places keys on a ring, each key is replicated to N nodes, reads and writes need R and W acknowledgements, and R + W > N gives strong-enough consistency. Conflicts use versions or last-write-wins.",
    "Google Drive: split files into chunks, hash each chunk to dedupe, upload chunks to object storage, keep metadata in a database, and sync clients by a change log with versions.",
    "Common mistake in the mock: spending 30 minutes on one component. Keep to the 7-step framework and timebox."
   ],
   "steps": [
    "Rate limiter (10 min): choose the algorithm, where counters live, what happens when Redis is down.",
    "Snowflake (10 min): write the bit layout and the sequence overflow case.",
    "Key-value store (10 min): draw the ring, replication, and the quorum R, W, N rule.",
    "Google Drive (10 min): chunking, dedupe by hash, metadata store, sync flow.",
    "Mock (45 min, timer on): pick one of the four and design it on paper from requirements to bottlenecks.",
    "Score yourself against the 7 steps and note the weakest one."
   ],
   "end": "done when four short designs and one 45-minute paper mock are complete with a self-score."
  }
 },
 "69": {
  "0": {
   "pts": [
    "Outbox pattern: write your data and an event row in the same database transaction, then a relay process publishes the outbox rows to the queue. This avoids 'saved to DB but event lost'. CDC (change data capture, for example Debezium) reads the database log and does the relay for you.",
    "Saga: a long business flow across services done as local transactions with compensating actions on failure. Orchestration has a central coordinator; choreography has services react to each other's events.",
    "CQRS splits write models from read models. Event sourcing stores the list of events as the source of truth instead of current state. Both add complexity; use them only when needed.",
    "Consumers must be idempotent (safe to process twice), because queues deliver at least once. Use a processed-message id table or a unique constraint.",
    "Resilience: a circuit breaker stops calling a failing service for a while; a bulkhead limits resources per dependency; a retry budget caps retries so they do not multiply load. Start with a modular monolith; split into microservices only when teams or scaling demand it."
   ],
   "tryIt": "Write the failure story for 'DB commit succeeded but publish failed' and show how the outbox fixes it, in 8 lines.",
   "steps": [
    "Write a one-page note per topic: outbox, saga, CQRS, event sourcing, idempotent consumer.",
    "Draw the order flow as an orchestrated saga (reserve stock, charge, ship) and add compensations.",
    "Redraw the same flow as choreography and list one drawback of each.",
    "Write when you would pick a monolith, modular monolith or microservices, with 2 reasons each.",
    "Describe circuit breaker, bulkhead and retry budget with one example each."
   ],
   "end": "done when you can explain outbox and idempotent consumer on a whiteboard and justify a modular monolith."
  },
  "1": {
   "pts": [
    "Pattern: a timed contest trains speed under pressure. Four problems in 90 minutes means about 20 minutes each, and the last one is often skippable.",
    "Read all four first (5 minutes) and solve in order of confidence, not order of appearance.",
    "If a problem is not solved in its time slot, stop, move on, and come back with leftover time.",
    "After the contest, upsolve: finish what you missed, then read the editorial or discussion for a better approach.",
    "Common mistake: submitting without testing edge cases; wrong attempts cost time and score."
   ],
   "steps": [
    "Pick a recent past Weekly Contest and open it in virtual mode with a 90-minute timer.",
    "Skim all four problems and rank them by confidence.",
    "Solve without hints; test edge cases before submitting.",
    "After the timer, upsolve each unsolved problem and compare against the top solutions.",
    "Write in NOTES.md: problems solved, time per problem, and the pattern you missed."
   ],
   "end": "done when the 90 minutes are used, results logged, and every unsolved problem has an upsolve note."
  },
  "2": {
   "pts": [
    "Queue and workers: the API puts a job on a BullMQ queue (Redis-backed) or a Kafka topic and returns quickly; workers process it. This keeps slow sends out of the request path.",
    "Retry with backoff: on failure, retry after 1s, 2s, 4s and so on, up to a max attempts. After that move the job to a DLQ (dead-letter queue) so one bad message does not block others.",
    "Idempotency key per user and notification: a unique key (for example userId plus eventId) so sending twice does nothing the second time. Enforce with a unique index in Postgres.",
    "Delivery status table: notifications(id, user_id, channel, status, attempts, last_error, created_at). Statuses: queued, sent, failed, dead.",
    "Replay endpoint: an admin route that moves selected DLQ jobs back to the main queue. Protect it with an admin check."
   ],
   "steps": [
    "Create the notifications table with a unique index on the idempotency key.",
    "Write POST /notify: validate, insert the row (ignore on duplicate key), enqueue a job with the row id.",
    "Write the worker: load the row, call a fake sender that fails 30 percent of the time, update status.",
    "Configure attempts: 5 with exponential backoff; on final failure set status to dead and add to a DLQ queue.",
    "Add POST /admin/dlq/replay that re-enqueues dead jobs and resets their status to queued.",
    "Write 2 tests: duplicate request creates one job; a job failing every time ends in the DLQ and replays."
   ],
   "end": "done when duplicates are ignored, failures retry with backoff, and a dead job can be replayed."
  }
 },
 "70": {
  "0": {
   "pts": [
    "Outbox in this project: in one transaction insert the message row and an outbox row (id, topic, payload, published_at null). A relay worker polls unpublished rows, publishes them to the queue, then marks them published.",
    "Poll safely with SELECT ... FOR UPDATE SKIP LOCKED so two relay workers do not take the same rows. Delivery is at least once, so consumers must be idempotent.",
    "docker-compose must start app, relay, worker, Postgres and Redis with one command. Give each service a healthcheck and depends_on condition.",
    "HLD doc: requirements, diagram (Mermaid or Excalidraw), capacity math (messages per second, storage), and failure modes (Redis down, relay crash, duplicate delivery) with the behaviour for each.",
    "Tag v1.0 only after docker-compose up works from a clean clone."
   ],
   "steps": [
    "Add an outbox table and change the send-message code to insert both rows in one transaction.",
    "Write the relay: loop, select unpublished rows with SKIP LOCKED, publish, mark published, sleep 500 ms if empty.",
    "Write a test that kills the relay after the DB commit and shows the message still gets published after restart.",
    "Complete docker-compose.yml with every service and healthchecks; test from a fresh clone.",
    "Write docs/HLD.md with a diagram, capacity math and a failure-mode table.",
    "Update the README with run steps and git tag v1.0."
   ],
   "end": "done when docker-compose up runs the whole system, the outbox test passes, and v1.0 is tagged."
  },
  "2": {
   "pts": [
    "Pattern: a cold timed set across three families checks pattern recognition: graphs (BFS, DFS, topological sort), DP, and heap or greedy.",
    "Spend 5 minutes naming the pattern and brute force, 15 coding, 5 testing, per problem.",
    "State the complexity out loud before you submit.",
    "If you are over 25 minutes on one, write what you would try next, then move on.",
    "Common mistake: choosing a problem you already know, so choose unseen ones."
   ],
   "steps": [
    "Pick one unseen medium each from graphs, DP and heap or greedy.",
    "Start a 75-minute timer total.",
    "For each: pattern, brute force, optimal, complexity, then code.",
    "Test with your own edge cases before submitting.",
    "After the timer, log the time and failure reason for each problem in NOTES.md."
   ],
   "end": "done when 3 mediums were attempted in 75 minutes with times and failure reasons logged."
  },
  "3": {
   "pts": [
    "Design Instagram core: upload photo, follow, home feed, view profile. Keep scope tight by asking which of these matter.",
    "Upload path: client gets a pre-signed URL and uploads directly to object storage, a worker makes thumbnails, metadata lands in a database, and a CDN serves the images.",
    "Feed: reuse the hybrid fan-out from the Twitter design (push for normal users, pull for celebrities) with a cached timeline.",
    "Data model: users, follows, posts (id, user_id, media_key, created_at), likes. Shard by user or post id; say which and why.",
    "Common mistake: no estimation or trade-offs. Say aloud what you chose and what you gave up."
   ],
   "steps": [
    "Start a 45-minute timer and record audio or video.",
    "Spend 5 minutes on requirements, 5 on estimation, 5 on API and data model.",
    "Spend 15 minutes on the diagram and deep dive (upload and feed).",
    "Spend 10 minutes on bottlenecks and trade-offs.",
    "Score yourself 0-3 on each rubric item: requirements, estimation, API, data model, scale, trade-offs.",
    "Write the Phase 5 retro in NOTES.md: 3 strengths, 3 gaps, and what to practise next."
   ],
   "end": "done when the 45-minute recording exists, the rubric is scored, and the retro is written."
  }
 },
 "71": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "A process is a running program with a PID. 'kill PID' sends SIGTERM (a polite stop request, catchable); SIGKILL (9) cannot be caught. Node should handle SIGTERM to shut down cleanly.",
    "Permissions: rwx for owner, group, others. chmod 600 for private keys, chmod +x for scripts. Run apps as a normal user, not root.",
    "systemd runs your app as a service: a unit file sets ExecStart, User, Restart=on-failure and Environment. 'systemctl start|status|enable' and 'journalctl -u name -f' show logs.",
    "SSH keys: ssh-keygen makes a key pair; the public key goes in ~/.ssh/authorized_keys on the server. Disable password login once keys work.",
    "Toolbelt: grep (search), awk and sed (transform text), jq (JSON), ss -tlnp (listening ports), dig (DNS), cron (schedules). Common mistake: editing a unit file without 'systemctl daemon-reload'."
   ],
   "tryIt": "Run `ss -tlnp` and `ps aux | grep node` locally and say which process owns which port.",
   "steps": [
    "Create a VPS or local VM; add your public key and test ssh login.",
    "Create a non-root user, disable root and password SSH login, and enable a basic firewall (ufw allow 22,80,443).",
    "Install Node, copy your app to /opt/app, and run it manually on port 3000.",
    "Write /etc/systemd/system/app.service with ExecStart, User, Restart=on-failure and an EnvironmentFile; run daemon-reload, enable and start.",
    "Kill the process and confirm systemd restarts it; read logs with journalctl -u app -f.",
    "Practise one pipeline: journalctl output piped through grep and awk, and a jq filter on a JSON response from curl."
   ],
   "end": "done when your app runs as a systemd service as a non-root user and survives a kill and a reboot."
  }
 },
 "72": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "An image is a stack of layers; each Dockerfile instruction makes one. Docker caches a layer if the instruction and its inputs are unchanged, so put rarely changing steps (copy package.json, npm ci) before frequently changing ones (copy source).",
    "Multi-stage build: compile in a 'build' stage with dev tools, then COPY only the output into a small final stage. Use a slim or alpine base and 'npm ci --omit=dev'.",
    "Run as non-root (USER node), and add a .dockerignore (node_modules, .git, .env) so secrets and junk stay out of the image.",
    "HEALTHCHECK lets Docker mark a container healthy or not. Networks let containers reach each other by service name; volumes keep data after a container is removed. Compose profiles start optional services only when asked.",
    "Common mistake: COPY . . before installing dependencies, which invalidates the cache on every code change."
   ],
   "tryIt": "Change one source file, rebuild, and check which layers say CACHED in the build output.",
   "steps": [
    "Build a naive Dockerfile (FROM node, COPY ., npm install) and note the size with 'docker images'.",
    "Add .dockerignore and reorder: copy package files, npm ci, then copy source.",
    "Convert to multi-stage with a node:alpine or slim final stage and npm ci --omit=dev.",
    "Add USER node and a HEALTHCHECK that calls your /health endpoint.",
    "Add a compose file with app and Postgres, a named volume and a 'debug' profile for an admin tool.",
    "Record before and after sizes in NOTES.md, aiming below 200 MB."
   ],
   "end": "done when the final image is under 200 MB, runs as non-root, and reports healthy."
  }
 },
 "73": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "CI (continuous integration) runs checks on every change; CD (delivery or deployment) ships it. Trunk-based development means short-lived branches merged to main often, protected by required checks.",
    "GitHub Actions: a workflow file in .github/workflows has jobs made of steps. A matrix runs the same job across versions (Node 20 and 22). actions/cache or setup-node's cache speeds up installs.",
    "Secrets are stored in repo settings and read as ${{ secrets.NAME }}; environments add protection rules such as required approval. Never echo secrets or commit them.",
    "Build and push images to GHCR (GitHub Container Registry) with the built-in GITHUB_TOKEN. Tag with the git SHA and a semantic version (MAJOR.MINOR.PATCH: breaking, feature, fix).",
    "Deploy strategies: rolling replaces instances gradually; blue/green runs two full environments and switches traffic; canary sends a small percentage first. Common mistake: only tagging 'latest', which hides which version is running."
   ],
   "tryIt": "Add a Node matrix (20 and 22) to a workflow and watch both jobs run in the Actions tab.",
   "steps": [
    "Create .github/workflows/ci.yml triggered on pull_request and push to main.",
    "Add steps: checkout, setup-node with npm cache, npm ci, lint, test.",
    "Add a Node version matrix and confirm both jobs pass.",
    "Add a build job that logs in to GHCR and pushes an image tagged with the SHA, only on main.",
    "Turn on branch protection requiring the CI check.",
    "Write a short note comparing rolling, blue/green and canary: cost, rollback speed and risk."
   ],
   "end": "done when a pull request is blocked until CI passes and a merge to main pushes a tagged image to GHCR."
  }
 },
 "74": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "A reverse proxy accepts client requests and forwards them to your app. Nginx also terminates TLS, serves static files, compresses, and balances load across an upstream block of servers.",
    "TLS encrypts traffic. Let's Encrypt issues free certificates and certbot automates issue and renewal. The domain must point at your server first (a DNS A record).",
    "WebSocket proxying needs proxy_http_version 1.1 and the Upgrade and Connection headers, plus a long proxy_read_timeout.",
    "Rate limiting uses limit_req_zone and limit_req. Add gzip, a cache for static assets, and security headers such as Strict-Transport-Security, X-Content-Type-Options and Content-Security-Policy.",
    "Common mistake: forgetting to pass X-Forwarded-For and X-Forwarded-Proto, so the app sees only the proxy's address and thinks it is on HTTP."
   ],
   "tryIt": "Run `nginx -t` after a deliberate typo in the config and read the error it gives.",
   "steps": [
    "Install Nginx on the VPS and point a domain's A record at it.",
    "Create a server block with proxy_pass to your app on 127.0.0.1:3000 and the X-Forwarded headers; test with nginx -t and reload.",
    "Run certbot --nginx for your domain and confirm HTTPS plus the automatic renewal timer.",
    "Add a location for the WebSocket path with the upgrade headers and test it with your echo client.",
    "Add limit_req on the login route, gzip on, and the security headers; check them with curl -I.",
    "Close the app's own port in the firewall so traffic must go through Nginx."
   ],
   "end": "done when your app is reachable only over HTTPS through Nginx and curl -I shows the security headers."
  }
 },
 "75": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "Kubernetes runs containers across machines. A Pod is one or more containers; a Deployment keeps N identical pods running and does rolling updates; a Service gives them a stable address; an Ingress routes outside HTTP traffic to Services.",
    "ConfigMap holds non-secret settings; Secret holds sensitive values (base64 encoded, not encrypted by default). Namespaces separate environments or teams.",
    "Probes: readiness decides if a pod receives traffic; liveness restarts a stuck container. Wrongly strict liveness probes cause restart loops.",
    "Resource requests are what the scheduler reserves; limits are the cap. Over the memory limit the container is killed (OOMKilled). HPA (Horizontal Pod Autoscaler) adds pods when CPU use passes a target.",
    "Common mistake: using the latest tag or no readiness probe, so traffic hits a pod that is not ready."
   ],
   "tryIt": "Run `kubectl delete pod <name>` on one pod of your Deployment and watch it get recreated.",
   "steps": [
    "Install kind or minikube and kubectl; create a cluster.",
    "Load your image into the cluster (kind load docker-image) and write deployment.yaml with 2 replicas, a readiness probe on /health, and requests and limits.",
    "Write service.yaml (ClusterIP) and access it with kubectl port-forward.",
    "Add a ConfigMap for an env var and a Secret for a fake key, and mount both into the pod.",
    "Break the readiness endpoint and watch kubectl get pods show the pod not ready; then do a rolling update by changing the image tag.",
    "Run kubectl describe and kubectl logs on a pod to practise debugging."
   ],
   "end": "done when 2 replicas run behind a Service, the readiness probe gates traffic, and a rolling update completes."
  }
 },
 "76": {
  "0": {
   "pts": [
    "Region is a geographic area; an Availability Zone (AZ) is an isolated data center inside it. Spread across at least 2 AZs so one failure does not take you down.",
    "IAM controls who can do what. Use roles for services (not long-lived keys) and give the least permission needed. A VPC is your private network with subnets; public subnets have an internet route, private ones do not.",
    "Compute and storage: EC2 (virtual machines), ECS/Fargate (containers without managing servers), Lambda (functions per event), S3 (object storage), RDS (managed Postgres), ECR (image registry), ALB (HTTP load balancer), CloudWatch (logs and metrics).",
    "Rule of thumb: containers on Fargate for long-running APIs and workers, Lambda for spiky or event-driven small jobs. Cost: watch data transfer, NAT gateways and idle databases.",
    "Common mistake: putting the database in a public subnet. Keep it private and allow only the app's security group."
   ],
   "tryIt": "Write one sentence for each of EC2, Fargate, Lambda saying when you would choose it for your P5 worker.",
   "steps": [
    "Draw your P5 architecture: clients, Nginx or ALB, app instances, worker, Postgres, Redis.",
    "Map each box to an AWS service (ALB, ECS Fargate, RDS Postgres, ElastiCache Redis, S3, ECR, CloudWatch).",
    "Draw the VPC: 2 AZs, public subnets for the ALB, private subnets for app and database, security group rules.",
    "List the IAM roles needed (task role to read S3, execution role to pull from ECR).",
    "Estimate a rough monthly cost for each service and mark the biggest.",
    "Write what you would not use for a first version and why."
   ],
   "end": "done when a one-page diagram maps every P5 component to an AWS service with subnets and a cost note."
  },
  "1": {
   "pts": [
    "Pattern: a sampler tests whether you recognise each pattern in 20 minutes. One problem each: sliding window, binary search, tree, graph, DP.",
    "Sliding window: a moving range over an array or string with two pointers; shrink or expand based on a condition. Usually O(n).",
    "Binary search: use it on sorted data or on an answer range with a true/false check. O(log n).",
    "Tree and graph: DFS or BFS with a visited set for graphs. DP: define the state first.",
    "Common mistake: spending 40 minutes on the first problem. Stop at 20 and note what pattern you missed."
   ],
   "steps": [
    "Choose 5 unseen mediums, one per pattern; hide the topic tag if you can.",
    "For each, set a 20-minute timer and write the pattern before coding.",
    "State the complexity and test 2 edge cases.",
    "If unsolved at 20 minutes, write the next idea you would try and move on.",
    "Log which patterns you identified correctly and which you failed to recognise."
   ],
   "end": "done when 5 problems were attempted in 20 minutes each and recognition results are logged."
  },
  "2": {
   "pts": [
    "Multi-stage Dockerfile per service: a build stage compiles and installs everything, the final stage copies only the output and production dependencies. Reuse the layer-ordering rule from Day 72.",
    "Run as non-root with USER node and add a HEALTHCHECK per service (HTTP /health for the API; for the worker, a small status file or port).",
    "docker-compose for the full stack: app, worker, Postgres and Redis, each with a healthcheck, and depends_on with condition: service_healthy so services wait for the database.",
    "Config comes from environment variables, with a .env.example committed and the real .env ignored. Use named volumes for Postgres data.",
    "Measure with 'docker images' and 'docker history'; record sizes before and after."
   ],
   "steps": [
    "Write apps or services Dockerfiles as multi-stage builds with a .dockerignore each.",
    "Add USER node and a HEALTHCHECK to each Dockerfile.",
    "Write docker-compose.yml with app, worker, postgres:16 and redis:7, healthchecks, a volume and depends_on conditions.",
    "Add .env.example and a Makefile target 'make up'.",
    "Run docker compose up --build from scratch and hit the API.",
    "Record image sizes in the README in a small table."
   ],
   "end": "done when one command starts the whole stack healthy and each image size is recorded."
  }
 },
 "77": {
  "0": {
   "pts": [
    "Pipeline order: lint, test, build image, push to GHCR, deploy. Each stage gates the next, so a failed test never produces an image.",
    "Deploy via SSH: the workflow uses a stored SSH key secret, connects to the VPS, pulls the new image tag and restarts the service (docker compose pull and up -d).",
    "Rollback means deploying the previous image tag. Tag images by git SHA so you always know which tag to return to. Practise one rollback.",
    "Nginx plus HTTPS from Day 74 sits in front; the deployed app should only listen on localhost.",
    "Common mistake: deploying 'latest' only, which makes rollback guesswork. Also never print secrets in logs."
   ],
   "steps": [
    "Extend ci.yml into stages: lint, test (with services if needed), build-and-push, deploy.",
    "Add secrets: SSH_HOST, SSH_USER, SSH_KEY. Use an environment named production.",
    "In deploy, SSH in, set IMAGE_TAG to the commit SHA, run docker compose pull and up -d, then curl the /health URL.",
    "Add a smoke-test step that fails the job if /health does not return 200 within 30 seconds.",
    "Perform one rollback by redeploying an older SHA tag (a manual workflow_dispatch input is enough).",
    "Tag v1.0 and write the pipeline steps in the README."
   ],
   "end": "done when a push to main deploys automatically over HTTPS and a rollback to an older tag works."
  },
  "2": {
   "pts": [
    "Pattern: a cold timed pair on your weakest topic. Choose the topic from your own log of failures, not from comfort.",
    "Per problem allow 30 minutes: 5 to name the pattern and plan, 20 to code, 5 to test.",
    "State the complexity before submitting and test 2 edge cases.",
    "If you finish early, redo the harder one with a cleaner or faster solution.",
    "Common mistake: picking easy 'mediums' because they feel good."
   ],
   "steps": [
    "Look at your weak list and choose your weakest topic.",
    "Pick 2 unseen mediums in it.",
    "Start a 60-minute timer; no hints.",
    "Write the plan before coding each.",
    "After the timer, log time and mistakes in NOTES.md and add any failed idea to the weak list."
   ],
   "end": "done when 2 mediums were attempted in 60 minutes and the result is logged."
  },
  "3": {
   "pts": [
    "RED method for services: Rate (requests per second), Errors (failed requests), Duration (latency). USE method for resources: Utilization, Saturation, Errors (CPU, memory, disk).",
    "Prometheus pulls (scrapes) metrics from /metrics. In Node use prom-client: Counter (only goes up), Gauge (up and down), Histogram (latency buckets). Grafana draws dashboards from Prometheus.",
    "Three signals: metrics (numbers over time), logs (events, Loki stores them) and traces (one request across services, OpenTelemetry with Tempo or Jaeger).",
    "SLI is a measured quantity (percent of requests under 300 ms); SLO is the target (99 percent over 30 days); the error budget is the allowed failures that remain.",
    "Alert on symptoms users feel (error rate, latency), not on every CPU spike. Common mistake: high-cardinality labels such as user id on metrics, which explode memory."
   ],
   "tryIt": "Hit /metrics in your browser and find the request counter increase after you call the API three times.",
   "steps": [
    "npm i prom-client; call collectDefaultMetrics and expose GET /metrics.",
    "Add middleware: a Histogram http_request_duration_seconds with method, route and status labels, and a Counter for requests.",
    "Add Prometheus and Grafana to docker-compose and scrape /metrics every 15 seconds.",
    "Build a Grafana dashboard with request rate, error percentage and p95 latency.",
    "Define one SLO (for example 99 percent of requests succeed over 30 days) and write the alert rule for it.",
    "Generate load with a loop of curl calls and watch the panels move."
   ],
   "end": "done when the dashboard shows rate, errors and p95 under load and one alert rule is written."
  }
 },
 "78": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "A token is a chunk of text (a word piece) that the model reads; roughly 4 characters of English. The context window is the maximum tokens (input plus output) the model can see at once. Cost and latency scale with tokens.",
    "A transformer predicts the next token using attention, which lets each token weigh the other tokens in the context. Output is a probability for every possible next token.",
    "Sampling: temperature scales randomness (low is more predictable, high is more varied); top-p picks from the smallest set of tokens covering probability p. Use low temperature for extraction, higher for brainstorming.",
    "Pre-training learns language from huge text; fine-tuning adapts on narrower data; RLHF (reinforcement learning from human feedback) tunes the model toward answers people prefer. Hallucination is confident wrong output, since the model predicts plausible text, not truth.",
    "Prompting patterns: clear instructions, examples (few-shot), asking for step-by-step reasoning, and structured output (JSON with a schema) which you validate in code."
   ],
   "tryIt": "Count tokens for a 200-word paragraph using a tokenizer page and compare it to your guess.",
   "steps": [
    "Watch Karpathy's intro to LLMs and write 10 bullet notes.",
    "Use a tokenizer tool to see how words, numbers and code split into tokens.",
    "Ask the same question at low and high temperature several times and note the difference.",
    "Write a prompt that extracts name, date and amount from text as JSON, and list what could go wrong when parsing it.",
    "Write a one-paragraph explanation of why the model can hallucinate and two ways to reduce it (provide source text, ask it to say 'unknown')."
   ],
   "end": "done when you can explain tokens, context window, temperature and hallucination in plain words."
  }
 },
 "79": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "Messages API: you send a list of messages (user and assistant turns) and a system prompt that sets behaviour; the model returns the next assistant message. The model is stateless, so you resend the history each call.",
    "Streaming sends the answer as small events as it is generated. Over SSE to a browser you forward each text delta, so users see output instantly. Handle abort on client disconnect.",
    "Tool (function) calling: you describe tools with a name and JSON schema; the model replies with a tool call; your code runs it and sends the result back; the model writes the final answer. Always validate the model's arguments.",
    "Production basics: retry 429 and 5xx errors with exponential backoff, set timeouts, and log token usage per call to track cost. Prompt caching reuses a large unchanged prefix (system prompt, documents) at lower cost.",
    "Common mistake: putting API keys in browser code; call the model from your server only."
   ],
   "tryIt": "Print the usage object (input and output tokens) after one call and compute its cost from the price page.",
   "steps": [
    "Create a project, install the official SDK for your provider, and put the key in an environment variable.",
    "Write a CLI loop with readline that keeps a messages array and a system prompt.",
    "Stream the response, printing each text delta as it arrives.",
    "Add one tool, for example get_time or a calculator, with a JSON schema; handle the tool call round trip.",
    "Add retry with backoff for rate limit errors and log tokens used per turn.",
    "Optionally add a tiny Express /chat endpoint that streams the output with SSE to a basic HTML page."
   ],
   "end": "done when the CLI streams answers, calls your tool correctly, and prints token usage per turn."
  }
 },
 "80": {
  "0": {
   "pts": [
    "Pattern: today is retrieval practice. Pick problems you failed or needed hints for, so you rebuild the idea from memory instead of recognising it.",
    "Spend 15 minutes per problem. In the first 3 minutes name the pattern (two pointers, sliding window, BFS, DP, heap) and say the brute-force complexity out loud.",
    "Write the target time and space complexity before coding, then check your code meets it.",
    "Common mistake: reading the old solution after 5 minutes. If stuck at 15 minutes, read only the first hint, then close it and finish."
   ],
   "steps": [
    "Open your weak list and pick 2 problems from different topics.",
    "Start a 15-minute timer for the first one. Write the pattern and brute force in a comment.",
    "Code it, run your own 3 test cases (normal, empty or minimum, large), then stop at the timer.",
    "Repeat for the second problem.",
    "Write one line per problem in NOTES.md: the trick you missed and the next re-solve date."
   ],
   "end": "done when both problems are solved or have a written one-line reason you got stuck, and re-solve dates are noted."
  },
  "1": {
   "pts": [
    "An embedding turns text into a vector of numbers so that similar meaning is close together. Similarity: cosine (angle, the usual default), dot product (same as cosine when vectors are normalised), L2 (straight-line distance). Use the metric your model recommends.",
    "Dimensionality is the vector length (for example 768 or 1536). More dimensions cost more storage and search time. Always embed queries and documents with the same model.",
    "Chunking: split documents into pieces that fit the model and hold one idea. Fixed size is simple; recursive splitting respects paragraphs and sentences; semantic splitting breaks where meaning shifts. Add overlap so context is not cut.",
    "ANN (approximate nearest neighbour) indexes trade a little recall for speed: HNSW is a layered graph (fast, more memory); IVF clusters vectors and searches the nearest clusters. pgvector keeps vectors in Postgres with metadata filters and SQL joins; Qdrant, Pinecone and Weaviate are dedicated vector databases.",
    "Full-text search (tsvector) matches words and is great for exact terms; vectors match meaning. Hybrid use of both is common. Common mistake: tiny or huge chunks, and filtering by metadata after retrieval instead of in the query."
   ],
   "tryIt": "Embed three sentences and show that two similar ones have a higher cosine score than the unrelated one.",
   "steps": [
    "Run Postgres with pgvector (a docker image) and execute CREATE EXTENSION vector.",
    "Create docs(id, source, content, embedding vector(N)) using your embedding model's dimension.",
    "Load 100 documents: extract text from a PDF and read Markdown files, split into about 500-token chunks with overlap, embed, and insert.",
    "Query by embedding the question and running ORDER BY embedding <=> $1 LIMIT 5; add a metadata WHERE filter.",
    "Create an HNSW index and compare query results and time with and without it.",
    "Add a tsvector column with a GIN index and compare full-text results to vector results on 5 queries; write which won for exact terms and which for meaning."
   ],
   "end": "done when 100 chunks are queryable by vector and by full-text and you have a short written comparison."
  }
 },
 "81": {
  "0": {
   "pts": [
    "Mixed timed practice trains pattern recognition: read the problem, name the pattern (hash map, two pointers, sliding window, BFS/DFS, binary search, heap) before coding.",
    "Pick one easy-medium array/string problem and one medium from a topic you have not touched this week; 15 minutes each.",
    "If no idea after 5 minutes, write the brute force and its complexity, then look for the repeated work to remove.",
    "Common mistake: coding before testing the idea on a small example, then burning time debugging the wrong approach."
   ],
   "steps": [
    "Set a 30-minute timer; pick two unseen problems from different topics.",
    "Spend the first 3 minutes per problem on examples, edge cases (empty, one element, duplicates) and the brute force.",
    "Code the best approach, dry-run one example by hand, then submit.",
    "Write one line per problem in your mistakes log: the pattern and what you missed."
   ],
   "end": "done when both problems are attempted within time and each has a one-line pattern note in your log."
  },
  "1": {
   "pts": [
    "RAG (retrieval-augmented generation) = look up relevant text first, then give it to the LLM so it answers from your data. Pipeline: ingest, chunk, embed (turn text into a vector), index, retrieve, rerank, generate.",
    "Hybrid search runs BM25 (keyword ranking) and vector search, then merges with RRF (reciprocal rank fusion): score = sum of 1/(60 + rank) across lists. It needs no score normalisation.",
    "Follow-up questions like 'and the price?' need query rewriting using recent turns. Memory is last-k turns or a rolling summary. HyDE embeds a model-written hypothetical answer instead of the raw question.",
    "Context has limits: models use the start and end of long prompts better than the middle (lost-in-the-middle). Send fewer, better chunks and ask for citations (chunk ids).",
    "Failure modes: chunks cut mid-thought, answer split across chunks, stale index, retrieval fine but model ignores context. Debug retrieval first, generation second."
   ],
   "tryIt": "Draw the pipeline on paper, then for the question 'what is our refund window?' write which stage fails if the answer sits in two separate chunks.",
   "end": "done when you can explain each stage and RRF out loud in two minutes without notes."
  }
 },
 "82": {
  "0": {
   "pts": [
    "Mixed timed practice trains pattern recognition: read the problem, name the pattern (hash map, two pointers, sliding window, BFS/DFS, binary search, heap) before coding.",
    "Pick one easy-medium array/string problem and one medium from a topic you have not touched this week; 15 minutes each.",
    "If no idea after 5 minutes, write the brute force and its complexity, then look for the repeated work to remove.",
    "Common mistake: coding before testing the idea on a small example, then burning time debugging the wrong approach."
   ],
   "steps": [
    "Set a 30-minute timer; pick two unseen problems from different topics.",
    "Spend the first 3 minutes per problem on examples, edge cases (empty, one element, duplicates) and the brute force.",
    "Code the best approach, dry-run one example by hand, then submit.",
    "Write one line per problem in your mistakes log: the pattern and what you missed."
   ],
   "end": "done when both problems are attempted within time and each has a one-line pattern note in your log."
  },
  "1": {
   "pts": [
    "Supervised learning learns from labelled examples (predict price, spam or not); unsupervised finds structure without labels (clustering). Split data into train (fit), validation (tune), test (final score, touched once).",
    "Overfitting = great on training data, poor on new data. Check the train vs validation gap. Precision = of predicted positives, how many are right; recall = of real positives, how many found; F1 balances both.",
    "scikit-learn pattern: fit on train, predict on test, score. Wrap preprocessing and model in a Pipeline so the same steps run in training and serving.",
    "ML pipeline: data -> train -> evaluate -> registry (versioned models, MLflow) -> serve. DVC versions datasets. A feature store shares features between training and serving.",
    "Batch inference scores many rows on a schedule; online inference answers per request. Drift = live data or label relationship changes, so accuracy decays; monitor inputs and outputs."
   ],
   "tryIt": "Run scikit-learn on the iris dataset: train_test_split, fit LogisticRegression, print classification_report, and say what precision and recall mean for one class.",
   "end": "done when a scikit-learn script prints a classification report you can interpret."
  }
 },
 "83": {
  "0": {
   "pts": [
    "A golden set is a fixed list of questions with known right answers or source chunks. Retrieval metrics: recall@k = was the right chunk in the top k; MRR = average of 1/rank of the first right chunk.",
    "LLM-as-judge: a second model grades faithfulness (is every claim supported by the context). Calibrate it by hand-checking 10 grades; judges can be biased and inconsistent.",
    "Tracing records each step (retrieval, prompt, tool call, tokens, latency) in Langfuse, LangSmith or MLflow so you can find why one answer was bad.",
    "Prompt injection: retrieved or user text tells the model to ignore its rules. Defences: treat retrieved text as data, least-privilege tools, output checks, never let the model hold secrets.",
    "Agent loop: plan, act (call a tool), observe, repeat until done or a step cap. Good tools have narrow purpose, clear schemas and useful errors. MCP is a standard protocol for exposing tools to models. Set cost and latency budgets."
   ],
   "tryIt": "Write 5 golden questions for a document you know and mark by hand which chunk should be retrieved for each.",
   "end": "done when you can define recall@k, MRR and faithfulness and name two injection defences."
  },
  "1": {
   "pts": [
    "Pattern sampler: you choose your five weakest topics from your mistakes log, one problem each, 20 minutes per problem.",
    "Pick problems you failed or skipped, not ones you remember solving. Cold means no notes and no hints.",
    "Stuck at 15 minutes: write the brute force and one idea that could improve it, then stop at 20 and read the solution.",
    "Common mistake: choosing comfortable topics, which feels good but finds no gaps."
   ],
   "steps": [
    "List your five weakest topics from the log and pick one unseen problem for each.",
    "For each: timer 20 min, restate the problem, brute force, optimise, code, dry-run.",
    "After the timer, read the best solution even if you solved it, and compare complexity.",
    "Record per problem: pattern, the exact point you got stuck, and a re-solve date in 3 days."
   ],
   "end": "done when five problems are attempted and each has a stuck-point and re-solve date logged."
  },
  "2": {
   "pts": [
    "Ingestion pipeline: load file, extract text, chunk, embed, store. A recursive chunker splits by paragraphs, then sentences, then characters until each piece fits the size limit; overlap (for example 10-15%) keeps ideas that cross a boundary.",
    "pgvector adds a vector column type to Postgres. An HNSW index gives fast approximate nearest-neighbour search; pick cosine distance and use the matching operator class (vector_cosine_ops).",
    "A queue worker does ingestion off the request path so uploads return fast and failures retry. Make jobs idempotent: hash the content (SHA-256) and skip or replace if that hash already exists.",
    "Store per chunk: document id, ordinal, text, embedding, page or heading metadata, so citations can point back to the source."
   ],
   "steps": [
    "Create the schema: documents(id, content_hash unique, title, status) and chunks(id, document_id, ordinal, text, embedding vector(N), metadata jsonb); add an HNSW index on embedding.",
    "Write loaders for Markdown (read text, keep headings) and PDF (use a library like pdf-parse), both returning plain text plus page info.",
    "Write chunk(text, size, overlap) with recursive separators and unit-test it: no chunk over size, overlap present, no empty chunks.",
    "Write embed(texts[]) in batches behind an interface so tests can use a fake embedder.",
    "Create an ingestion queue and worker: hash the file, skip if the hash exists, otherwise load, chunk, embed, insert in one transaction, mark status ready.",
    "Test idempotency: ingest the same file twice and assert the chunk count did not change; commit."
   ],
   "end": "done when a Markdown and a PDF can be ingested through the queue and re-ingesting the same file creates no duplicate chunks."
  }
 },
 "84": {
  "0": {
   "pts": [
    "Retrieval: run vector search (nearest embeddings) and Postgres full-text search (to_tsvector/ts_rank) separately, then merge with RRF: score = sum of 1/(60 + rank). Optionally rerank the top 20-50 with a cross-encoder or LLM.",
    "Streaming answer: send tokens over SSE (server-sent events) as they arrive; send the citations as a final event so the UI can link chunk ids to sources.",
    "Follow-up rewrite: before retrieval, ask the model to turn the last question plus recent turns into a standalone query. Keep this call cheap and low temperature.",
    "Eval script: for each of 30 questions record the expected chunk or document, compute recall@k, and have a judge model score faithfulness. Save the numbers so you can compare changes."
   ],
   "steps": [
    "Write search(query, k) returning vector hits and FTS hits as two ranked lists; test each alone.",
    "Write rrfMerge(lists, k=60) as a pure function and unit-test it with two hand-made rankings.",
    "Add an optional rerank step behind a flag and a fake reranker for tests.",
    "Build POST /chat as SSE: rewrite query, retrieve, build prompt with numbered chunks, stream tokens, then emit a citations event.",
    "Write eval/questions.json (30 items with expected source) and eval/run.ts printing recall@5 and mean faithfulness.",
    "Save the baseline numbers in the README, fix the worst failure, re-run, then tag v1.0."
   ],
   "end": "done when npm run eval prints recall@k and faithfulness, /chat streams with citations, and v1.0 is tagged."
  },
  "2": {
   "pts": [
    "Pattern: timed and cold means no hints, no notes, and a fixed 30 minutes per problem.",
    "Choose two mediums from different topics you rate 3 out of 5 or lower.",
    "Spend the first 5 minutes on understanding and a brute force; submit only after dry-running one case plus one edge case.",
    "Common mistake: spending 40 minutes on one problem; at the limit, write what you would do next and move on."
   ],
   "steps": [
    "Pick two unseen mediums from different topics and start a 60-minute timer.",
    "Per problem: examples, brute force, target complexity, code, dry-run.",
    "At 30 minutes stop and switch regardless of state.",
    "Afterwards read the best solution and log pattern, mistake and re-solve date."
   ],
   "end": "done when both problems are submitted or fully analysed and logged."
  },
  "3": {
   "pts": [
    "ETL transforms data before loading it; ELT loads raw data into the warehouse first and transforms there (dbt does SQL transforms in the warehouse). Warehouse = structured, query-optimised; lake = raw files cheaply stored.",
    "Batch processes chunks on a schedule; stream processes events as they arrive. Choose by freshness need, not fashion.",
    "Idempotent and replayable pipelines can be re-run safely: key writes by content hash or id, keep raw inputs, and make each stage overwrite not append.",
    "Orchestrators (Airflow, Prefect, Temporal) run steps as a dependency graph with retries and schedules. Scaling DocChat to 10M documents: partition the queue, batch embeddings, shard or partition the vector table, track status per document."
   ],
   "tryIt": "Write a one-page sketch of DocChat ingestion at 10M documents: queue, workers, embedding rate limit, storage size estimate (chunks x vector bytes) and failure handling.",
   "end": "done when the sketch has a size estimate and an answer to what happens when embedding the API is down."
  }
 },
 "85": {
  "0": {
   "pts": [
    "Pattern: a segment tree or Fenwick tree (binary indexed tree) answers range-sum queries and point updates both in O(log n), where a prefix-sum array makes updates O(n). Use when queries and updates interleave.",
    "LC 307 with a Fenwick tree: tree array of size n+1; update(i, delta) walks i += i & -i; prefix(i) walks i -= i & -i; range sum = prefix(r) - prefix(l-1). Store delta = newValue - oldValue. Build O(n log n) or O(n).",
    "LC 307 with a segment tree: node covers a range and stores its sum; update goes down to the leaf and recomputes parents; query combines nodes that fit inside the range. O(log n) each, O(n) space (about 2n to 4n).",
    "Common mistake: forgetting Fenwick is 1-indexed, or adding the new value instead of the difference on update."
   ],
   "steps": [
    "Implement the Fenwick tree first for LC 307: constructor, update(index, val), sumRange(l, r).",
    "Test by hand on [1,3,5]: sumRange(0,2)=9, update(1,2), sumRange(0,2)=8.",
    "Implement the segment tree version (iterative or recursive) and run the same tests.",
    "Pick one problem from your weak list and re-solve it cold in 20 minutes.",
    "Log: when to prefer Fenwick (simpler, sums) vs segment tree (min/max, flexible merges)."
   ],
   "end": "done when LC 307 passes with both structures and you re-solved one weak-list problem."
  },
  "1": {
   "pts": [
    "Multi-tenancy models: pool (all tenants share tables, tenant_id column), silo (own database or deployment per tenant), bridge (schema per tenant). Pool is cheapest and scales to many tenants; silo gives strongest isolation and costs most.",
    "Row-level security (RLS): ALTER TABLE t ENABLE ROW LEVEL SECURITY; CREATE POLICY p ON t USING (tenant_id = current_setting('app.tenant_id')::uuid) WITH CHECK (same). USING filters reads, WITH CHECK validates writes.",
    "Set the tenant per request inside a transaction: BEGIN; SET LOCAL app.tenant_id = '...'; queries; COMMIT. SET LOCAL resets at commit, so pooled connections never leak a tenant. A plain SET would stick to the connection.",
    "Superusers and table owners bypass RLS unless you run ALTER TABLE t FORCE ROW LEVEL SECURITY, and superusers always bypass. Connect the app as a plain role with only needed grants.",
    "Gotcha: if the setting is unset, current_setting errors; use current_setting('app.tenant_id', true) so it returns NULL and matches no rows (safe default)."
   ],
   "tryIt": "Create tenants A and B, insert one row each, then as a non-owner role set app.tenant_id to A and SELECT; confirm only A rows appear and inserting a B row fails.",
   "end": "done when a 3-table, two-tenant demo shows each tenant seeing only its rows and a cross-tenant insert is rejected."
  }
 },
 "86": {
  "0": {
   "pts": [
    "Pattern: string matching without re-scanning. KMP builds a prefix function (lps[i] = length of the longest proper prefix of s[0..i] that is also a suffix) so a mismatch jumps back instead of restarting. O(n+m). Rolling hash compares windows by hash in O(1) per shift.",
    "LC 28: build lps for the needle, scan the haystack, on mismatch fall back to lps[j-1]; return start index or -1. O(n+m) time, O(m) space.",
    "LC 187: slide a window of length 10 over the string, keep a set of seen windows and a set of repeats; hash with 2 bits per letter (A,C,G,T) or just use the substring. O(n) time.",
    "LC 1392: the longest happy prefix equals the last value of the prefix function of the whole string, so return s[0:lps[n-1]]. O(n).",
    "Common mistake: in KMP, when j > 0 on mismatch you must keep falling back in a loop, not reset j to 0."
   ],
   "steps": [
    "Write the lps (prefix function) routine and test it by hand on 'aabaaab'.",
    "Solve LC 28 with it; then add edge cases: empty needle, needle longer than haystack.",
    "Solve LC 1392 by returning the substring of length lps[n-1] (a few lines).",
    "Solve LC 187 with a sliding window and sets; then try the bitmask version if time remains.",
    "Log the lps loop pattern and one mistake."
   ],
   "end": "done when LC 28, 187 and 1392 all pass and you can explain the prefix function without notes."
  },
  "1": {
   "pts": [
    "RBAC (role-based) grants permissions through roles; ABAC (attribute-based) decides from attributes of user, resource and context; ReBAC (relationship-based, as in Google's Zanzibar) decides from relations such as 'user is editor of folder, folder contains doc'.",
    "Keep a permission registry (a fixed list like ticket:assign) in code and let tenants build custom roles from it. Check permissions in one can(user, action, resource) function, deny by default, and add resource-level rules (own ticket only).",
    "Cache a user's permissions per tenant with a short TTL or a version number; invalidate when roles or memberships change. A stale cache is a security bug, so keep it short.",
    "Return 404 instead of 403 when revealing that a resource exists would leak information (another tenant's id); use 403 when the user knows it exists.",
    "Audit log: append-only table with actor, action, target, tenant, time, before and after JSON. Never update or delete; enforce with DB privileges."
   ],
   "tryIt": "Sketch tables roles, permissions, role_permissions, memberships and audit_log for a support desk, then list which role can ticket:assign.",
   "end": "done when the sketch has the five tables with keys and you can state the deny-by-default rule in one sentence."
  }
 },
 "87": {
  "0": {
   "pts": [
    "Pattern: graph ordering and all-pairs shortest paths. Topological sort orders nodes so each edge goes forward (Kahn: repeatedly remove nodes with indegree 0); Floyd-Warshall tries every middle node k to improve dist[i][j].",
    "LC 269: compare each adjacent word pair, the first differing letters give an edge a->b. If a longer word comes before its own prefix, return empty. Run Kahn; if not all letters are output there is a cycle, return empty. O(total characters).",
    "LC 1334: set dist from edge weights, run Floyd-Warshall (three loops, k outermost), count cities within the threshold per city, return the city with fewest, ties to the greatest index. O(n^3).",
    "LC 332: Hierholzer's algorithm: DFS using the smallest unused destination first, append the airport after exploring, reverse at the end. Re-solve cold in 25 minutes.",
    "Common mistake: putting the k loop innermost in Floyd-Warshall."
   ],
   "steps": [
    "Solve LC 269: build edges, indegrees (include letters with no edges), Kahn's queue.",
    "Test the prefix case ['abc','ab'] returns an empty string.",
    "Solve LC 1334 with Floyd-Warshall and test the tie rule.",
    "Re-solve LC 332 cold with a timer of 25 minutes; compare to your notes only after.",
    "Log the cycle-detection and tie-break mistakes."
   ],
   "end": "done when LC 269 and 1334 pass and LC 332 was re-solved without hints."
  },
  "1": {
   "pts": [
    "Idempotency key: client sends a unique Idempotency-Key header on a POST; server stores key + request hash + response, and a retry returns the saved response instead of repeating the charge. Reject the same key with a different body.",
    "Optimistic concurrency: return an ETag (version or hash); client sends If-Match on update; if it differs return 412 Precondition Failed so two editors do not silently overwrite each other.",
    "RFC 9457 problem+json is a standard error body with type, title, status, detail and instance, served as application/problem+json.",
    "API keys: show the secret once, store only a hash, keep a visible prefix to look it up, attach scopes, support rotation with overlap. Webhooks: sign the body with HMAC and a timestamp; guard outgoing calls against SSRF (server-side request forgery) by blocking private IPs.",
    "OpenAPI-first means writing the spec first and generating validation or clients from it. Version in the URL or header and publish a deprecation date with a Sunset header."
   ],
   "tryIt": "Write the pseudo-code for POST /payments with an Idempotency-Key: what you store, what happens on a duplicate, and on a duplicate with a different body.",
   "end": "done when you can list the three outcomes of an idempotent retry and the headers for ETag concurrency."
  }
 },
 "88": {
  "0": {
   "pts": [
    "Pattern: hard DP built from a sort plus a smaller subproblem. Attempt for 30 minutes, then read the editorial and re-code it from memory.",
    "LC 1235: sort jobs by end time; dp[i] = max(dp[i-1], profit[i] + dp[j]) where j is the last job ending at or before start[i], found by binary search. O(n log n).",
    "LC 354: sort by width ascending and height descending for equal widths, then find the longest strictly increasing subsequence on heights using binary search tails. O(n log n).",
    "LC 1140: dp[i][M] = best stones the current player can take from pile i with limit M; try x in 1..2M and take suffixSum[i] - dp[i+x][max(M,x)]. About O(n^3) for n up to 100.",
    "Common mistake: for LC 354 sorting heights ascending on ties, which lets equal widths nest."
   ],
   "steps": [
    "Spend 15 minutes on LC 1235: write the sort, the dp meaning in words, and the binary search.",
    "Spend 15 minutes on LC 354: sort rule first, then LIS.",
    "Spend 15 minutes on LC 1140 trying to define the state; if stuck read the editorial.",
    "Re-code any problem you read from scratch without looking.",
    "Log each dp state definition in one sentence."
   ],
   "end": "done when each of the three has a written dp state definition and at least one was re-coded from memory."
  },
  "1": {
   "pts": [
    "Delayed and repeatable jobs: queues like BullMQ support a delay and cron-style repeat. Cron on a server runs once per machine and misses runs when down; queue schedulers store schedules in Redis so any worker runs them once.",
    "Retries use exponential backoff with jitter; after N failures move the job to a DLQ (dead-letter queue) so a human can inspect and replay it.",
    "Transactional outbox: write the business row and an outbox event in the same DB transaction; a relay reads pending rows with SELECT ... FOR UPDATE SKIP LOCKED (each relay locks different rows, no double work) and publishes them.",
    "Delivery is at-least-once, so consumers must be idempotent: record processed event ids in a table and skip repeats. Per-tenant fairness: separate queues or rate limits so one tenant cannot starve the others.",
    "Choose BullMQ for simple Node jobs on Redis, SQS for managed queues with no ordering, Kafka for replayable high-volume event logs."
   ],
   "tryIt": "Write the SQL a relay runs to claim 10 pending outbox rows safely, and say what happens if two relays run at once.",
   "end": "done when you can explain why outbox plus idempotent consumer gives effectively-once processing."
  }
 },
 "89": {
  "0": {
   "pts": [
    "Pattern: combine a hash map with an array or linked list to make every operation O(1).",
    "LC 380: array of values plus a map value->index. Remove by swapping the target with the last element, pop, and update the moved element's index. getRandom picks a random array index. All O(1).",
    "LC 460: map key->node and a map frequency->doubly linked list (LRU order within a frequency), plus minFreq. On access move the node to freq+1; on eviction drop the least recently used node of minFreq. O(1) per op.",
    "LC 432 (attempt): doubly linked list of count buckets, each holding a set of keys, plus a key->bucket map; inc/dec moves a key to the neighbouring bucket, min and max are the list ends. O(1).",
    "Common mistake: in LFU, forgetting to update minFreq when the bucket of minFreq becomes empty."
   ],
   "steps": [
    "Solve LC 380 and test removing the last element and the only element.",
    "Design LC 460 on paper: write the two maps and minFreq before any code.",
    "Code LC 460 with a doubly linked list or ordered map, then test put on a full cache.",
    "Attempt LC 432 for the remaining time; draw the bucket list first.",
    "Log invariants that must hold after every operation."
   ],
   "end": "done when LC 380 and 460 pass and LC 432 has a written design."
  },
  "1": {
   "pts": [
    "Layered architecture: controller -> service -> repository. Hexagonal (ports and adapters) puts business logic in the centre, defines interfaces (ports) for what it needs, and plugs in implementations (adapters) for DB, HTTP, email. Dependencies point inward.",
    "Modular monolith: one deployable split into modules with explicit public interfaces and no reaching into another module's tables. It can later become services.",
    "DDD basics: entity has identity; value object is immutable and compared by value (Money); aggregate is a cluster changed through one root so rules stay consistent; domain event records something that happened.",
    "Dependency injection passes dependencies in rather than creating them, so tests can swap fakes. NestJS modules, providers and injected classes map onto these ideas.",
    "Gotcha: an interface per class with one implementation adds noise; add ports where you really swap or fake."
   ],
   "tryIt": "Take one TaskBoard handler and mark which lines are HTTP, business rules and database calls.",
   "end": "done when one TaskBoard module has a controller, service and repository interface with a fake repository test."
  }
 },
 "90": {
  "0": {
   "pts": [
    "IANA time zones (America/New_York) carry DST rules; fixed offsets (+05:30) do not. Store instants in UTC and keep the zone name for display and for rules like 'daily at 9:00 local'.",
    "DST pitfalls: a local time may not exist (spring forward) or occur twice (fall back), and a day can have 23 or 25 hours. Adding 24 hours is not 'tomorrow'. Use a date library (Luxon, date-fns-tz, Temporal).",
    "Injectable clock: pass now() as a dependency so tests control time. Business-hours arithmetic: walk day by day, skip non-working days and holidays, consume minutes from each working window.",
    "Rule trees (json-logic style): conditions as nested JSON like {and:[{'==':[var,x]}]}, evaluated by a small interpreter; prevent loops with a depth limit or a 'fired already' marker on the event."
   ],
   "steps": [
    "Define Calendar: zone, weekly working windows, holidays.",
    "Write addBusinessMinutes(start, minutes, calendar) that converts start into the zone, then loops windows consuming minutes.",
    "Test: start Friday 16:30 with 60 minutes and a 9-17 calendar returns Monday 09:30.",
    "Test across the US spring-forward Sunday and the fall-back Sunday and assert real elapsed behaviour.",
    "Test minutes=0, start outside hours, and a holiday.",
    "Pass the clock in so no test calls real Date.now."
   ],
   "end": "done when tests pass for a weekend, both DST changes and a holiday."
  },
  "1": {
   "pts": [
    "Pattern: timed mixed set, 75 minutes. Three problems you have seen (LC 307, 187, 269) cold, then one unseen medium.",
    "LC 307: Fenwick or segment tree, O(log n) per op. LC 187: sliding window of 10 chars with sets, O(n). LC 269: edges from adjacent words, Kahn's topological sort, detect cycle and prefix case.",
    "Budget about 12 minutes for each re-solve and 30 for the unseen medium; recall of patterns is the test.",
    "Common mistake: re-solving from memory of code instead of the idea; if you fail, note which idea you forgot."
   ],
   "steps": [
    "Start a 75-minute timer; solve LC 307 first without notes.",
    "Solve LC 187, then LC 269.",
    "Use the remaining time on an unseen medium; brute force first.",
    "Compare each to your earlier solutions and log what you forgot."
   ],
   "end": "done when all four are attempted and each forgotten idea is in your log."
  },
  "2": {
   "pts": [
    "Goal: TenantLab Lab A proves tenant isolation is enforced by the database, not just by application code.",
    "A non-superuser app role (no BYPASSRLS, not table owner or with FORCE RLS) is what the API connects as; migrations run as a separate owner role.",
    "withTenant(tenantId, fn) opens a transaction, runs SET LOCAL app.tenant_id, calls fn(client), commits. All queries must go through it.",
    "can(role, action) uses a registry; a table-driven test enumerates 4 roles x 6 actions so changes show up as a diff.",
    "The audit log is protected by privileges: grant INSERT and SELECT only, revoke UPDATE and DELETE from the app role."
   ],
   "steps": [
    "Write migrations for tenants, users/memberships, and tickets (3 tables with tenant_id), enable and FORCE RLS, add USING and WITH CHECK policies.",
    "Create the app role with LOGIN and minimal grants; connect the API with it.",
    "Implement withTenant using a pooled client and SET LOCAL; write a test that uses a plain query (no tenant) and gets zero rows.",
    "Create the permission registry and can(); write the 4x6 matrix test with expected booleans.",
    "Create audit_log with insert-only privileges; test that UPDATE and DELETE are denied.",
    "Write the cross-tenant test (tenant A cannot read or write B); drop a policy and watch it fail, then restore it."
   ],
   "end": "done when the cross-tenant test passes and fails when a policy is deleted."
  }
 },
 "91": {
  "0": {
   "pts": [
    "Goal: Lab B makes events reliable. Outbox table: id, type, payload, created_at, published_at, attempts, next_attempt_at, written in the same transaction as the business change.",
    "Relay worker: SELECT ... WHERE published_at IS NULL AND next_attempt_at <= now() ORDER BY id LIMIT n FOR UPDATE SKIP LOCKED, publish, mark published. Two relays run without double-claiming.",
    "Consumers insert the event id into processed_events (primary key) in the same transaction as their effect; a duplicate hits a unique violation and is skipped.",
    "Failures: retry with exponential backoff by updating next_attempt_at; after max attempts move to a dead_letters table; a replay command moves them back."
   ],
   "steps": [
    "Create outbox, processed_events and dead_letters tables via migration.",
    "Write the code that inserts a business row and an outbox row in one transaction; test rollback leaves neither.",
    "Write the relay loop with SKIP LOCKED; start two relays and assert each event is published once.",
    "Write the consumer with processed_events dedupe; deliver the same event twice and assert one effect.",
    "Add backoff and a max-attempts DLQ move, then a replay CLI script.",
    "Write README notes: what to reuse in Beacon (outbox, dedupe, replay)."
   ],
   "end": "done when two relays run with no duplicates, a poison event lands in the DLQ, and replay works."
  },
  "2": {
   "pts": [
    "Pattern: timed cold set, 60 minutes, three design problems seen before: LC 460, 380 and 1235.",
    "LC 380: array plus map, swap-remove, O(1). LC 460: key map plus frequency lists plus minFreq, O(1). LC 1235: sort by end time, dp with binary search, O(n log n).",
    "About 20 minutes each; write the invariant or dp meaning first.",
    "Common mistake: LFU minFreq not updated after eviction or promotion."
   ],
   "steps": [
    "Start a 60-minute timer; solve LC 380 first as a warm-up.",
    "Solve LC 460 next, tests on capacity 1 and ties.",
    "Solve LC 1235 last.",
    "Log what you forgot and re-solve it in 3 days."
   ],
   "end": "done when all three pass within 60 minutes or the gaps are logged."
  },
  "3": {
   "pts": [
    "Timeouts: every outbound call gets one, shorter than the caller's own timeout. A retry budget limits retries (for example 10% of requests) so retries cannot cause a retry storm.",
    "Circuit breaker (opossum): closed passes calls; after too many failures it opens and fails fast; after a wait it goes half-open and tests one call.",
    "Bulkhead isolates resources (separate pools or queues per dependency). Load shedding rejects excess work early (429/503). Backpressure tells producers to slow down.",
    "Health endpoint says process is alive; readiness says it can take traffic (DB reachable). Graceful degradation returns partial or cached results when a dependency fails."
   ],
   "tryIt": "List what each of timeout, breaker and bulkhead protects against for a payment-provider call.",
   "end": "done when an outbound call in Lab B has a timeout and a breaker and a test shows the breaker opening."
  }
 },
 "92": {
  "0": {
   "pts": [
    "Pattern: spaced re-solve. Pick three problems from your weak list that you failed or needed hints for.",
    "Cold means no notes; 20 minutes each, restate the pattern first.",
    "After each, compare with your earlier attempt: is the mistake the same?",
    "Common mistake: re-solving what you remember well; choose by failure, not familiarity."
   ],
   "steps": [
    "Choose three weak-list problems from different topics.",
    "Solve each with a 20-minute timer.",
    "Write the pattern name and the key insight on one line each.",
    "Remove solved ones from the weak list only if you solved them cleanly."
   ],
   "end": "done when three problems are re-solved and the weak list is updated."
  },
  "1": {
   "pts": [
    "Structured logs are JSON lines with fields like level, msg, requestId and tenantId, so you can filter by tenant or request. Generate the id at the edge and pass it everywhere.",
    "RED metrics for services: Rate, Errors, Duration. USE metrics for resources: Utilization, Saturation, Errors.",
    "Distributed tracing with OpenTelemetry: a trace is made of spans; context travels in the traceparent header and must also be put into queue payloads so the worker's span links to the request.",
    "SLO is a target like 99.5% of requests succeed over 30 days. Burn-rate alerts fire when you spend error budget too quickly (page on fast burn, ticket on slow). Sentry captures errors with stack traces."
   ],
   "tryIt": "Pick an SLO for the Lab B publish path and write the one-line alert condition.",
   "end": "done when one request produces logs and a trace you can follow from API to worker."
  }
 },
 "93": {
  "0": {
   "pts": [
    "Pattern: timed practice, one graph and one DP, 25 minutes each.",
    "For graphs decide BFS (shortest path unweighted), DFS (components, cycles) or topological sort; for DP write the state meaning and recurrence before coding.",
    "If a problem is unfamiliar, write brute force first and ask what repeats.",
    "Common mistake: no visited set in graphs, or a dp state that does not capture everything needed."
   ],
   "steps": [
    "Pick one unseen medium graph and one unseen medium DP problem.",
    "25-minute timer each: examples, approach, complexity, code, dry-run.",
    "Compare with the best solution afterwards.",
    "Log each mistake with the category (state, base case, traversal, edge case)."
   ],
   "end": "done when both problems are attempted and mistakes are logged."
  },
  "1": {
   "pts": [
    "Postgres full-text search: tsvector is the processed document, tsquery the query; a GIN index on the tsvector makes matching fast; ts_rank orders results. Store the vector in a generated column.",
    "Trigram search (pg_trgm) compares 3-letter chunks, giving typo-tolerant and partial matching with a GIN or GiST index.",
    "OpenSearch/Elasticsearch is justified for heavy relevance tuning, facets, huge volumes or many languages; otherwise Postgres is enough and avoids a second system to sync.",
    "A CQRS-style read model is a separate shape of data built for queries (denormalised projection), updated from events; the price is lag and cache invalidation.",
    "Tenant scope: always include tenant_id in the query, and RLS still applies."
   ],
   "tryIt": "Create a tsvector column with a GIN index on tickets, search for 'refund' and compare the plan with and without the index.",
   "end": "done when Lab A has a tenant-scoped search endpoint that returns ranked results and never shows another tenant's rows."
  }
 },
 "94": {
  "0": {
   "pts": [
    "Pattern: mini contest, 75 minutes, three problems from your weakest topics.",
    "Read all three first (5 minutes), then solve in order of confidence.",
    "Submit partial brute-force solutions when time is short; a correct slow solution beats nothing.",
    "Common mistake: spending the whole contest on the hardest problem."
   ],
   "steps": [
    "Choose three unseen problems from your weakest topics (easy-medium-medium).",
    "Read all three, rank by confidence, start the 75-minute timer.",
    "Leave 5 minutes at the end to re-check edge cases.",
    "Log what you got wrong and which topic needs more reps."
   ],
   "end": "done when the contest is finished and each miss has a topic tag."
  },
  "1": {
   "pts": [
    "A one-page plan has scope split into Must, Should, Could, so you cut Could items first when time slips.",
    "List the top risks (RLS complexity, AWS cost, scope creep) with a mitigation each.",
    "A routine (for example 4 hours build, 1 hour DSA, daily commit) protects consistency over 40 days.",
    "Tooling to install: Docker (containers), pnpm (packages), k6 (load tests), Terraform (infrastructure as code), AWS CLI. Verify each with its version command."
   ],
   "tryIt": "Write the Must list in five bullets and check each could be demoed in under a minute.",
   "end": "done when the plan is committed, the five tools print versions and the repo and board exist."
  }
 },
 "95": {
  "0": {
   "pts": [
    "Patterns to review: two pointers, sliding window, binary search on answer, BFS/DFS, topological sort, heap, DP (1D, 2D, knapsack), backtracking, union-find, monotonic stack, intervals.",
    "For each pattern the cheat sheet needs: trigger words, template steps, complexity, one example problem.",
    "A strong cold solve names the pattern within 2 minutes, states complexity before coding and tests an edge case.",
    "Common mistake: re-reading solutions instead of solving."
   ],
   "steps": [
    "Spend 30 minutes reviewing your cheat sheet; mark any pattern you cannot explain.",
    "Pick three unseen mediums of different patterns.",
    "Solve 10 minutes each, cold; state the pattern first.",
    "Add any missed trigger or template to the cheat sheet."
   ],
   "end": "done when the cheat sheet is updated and three mediums are attempted."
  },
  "1": {
   "pts": [
    "Rehearse out loud: closures (function plus its remembered scope; classic loop var bug), event loop (call stack, microtasks before macrotasks, process.nextTick first), prototypes (lookup chain, class is sugar).",
    "Promises: states, chaining, Promise.all vs allSettled vs race; async/await errors need try/catch; unhandled rejections can crash Node.",
    "Streams: backpressure, pipeline(), readable/writable/transform. libuv: thread pool (default 4) handles fs, dns lookup, crypto; network IO uses the OS. Clustering: one process per core, shared port, no shared memory.",
    "A strong answer is definition, tiny example, gotcha, in 30 to 45 seconds. Gaps go to a one-page cheat sheet.",
    "ADR #1 for the capstone: context, two options, decision, consequences; 15 lines."
   ],
   "tryIt": "Record yourself answering 'what prints?' for setTimeout, promise.then and process.nextTick in one script.",
   "end": "done when 20 questions were answered aloud, gaps are on a one-page sheet and ADR #1 is written."
  }
 },
 "96": {
  "0": {
   "pts": [
    "Pattern: one timed hard in 30 minutes, then learn from it. A hard is mostly two mediums combined; look for the decomposition.",
    "Read the editorial after the timer and re-code from memory the next day.",
    "Spend the other 30 minutes re-solving a past failure cold; the goal is to find why it failed (pattern, edge case, implementation).",
    "Common mistake: reading the editorial too early; give 30 honest minutes first."
   ],
   "steps": [
    "Pick an unseen hard; 30-minute timer, notes on paper only.",
    "Read the editorial, write the key insight in one sentence.",
    "Choose one past failed problem and re-solve it in 25 minutes.",
    "Update the weak list with a new re-solve date."
   ],
   "end": "done when the hard has a one-sentence insight and the past failure was re-solved or re-diagnosed."
  },
  "1": {
   "pts": [
    "Query practice: 15 challenges mixing window functions (ROW_NUMBER, RANK, LAG, running sums), CTEs, joins (inner, left, anti-join with NOT EXISTS) and group by.",
    "Explain aloud: isolation levels (read committed, repeatable read, serializable) and the anomalies each prevents; MVCC keeps row versions so readers do not block writers.",
    "Index choice: match the WHERE and ORDER BY, leftmost column first in composites, use EXPLAIN to confirm. Normalisation removes redundancy; denormalise deliberately for reads.",
    "Replication copies changes to replicas (lag means stale reads). CAP: under a network partition choose consistency or availability.",
    "ADR #2: pick a decision from your project (for example Postgres over Mongo), list options and consequences."
   ],
   "tryIt": "Explain to an imaginary interviewer, in 60 seconds, why a long-running transaction can cause table bloat under MVCC.",
   "end": "done when 15 queries are solved, each concept explained aloud and ADR #2 is written."
  }
 },
 "97": {
  "0": {
   "pts": [
    "Pattern: three mediums cold, 20 minutes each, tracked.",
    "Order: read, example, brute force, pattern, complexity, code, dry-run.",
    "A strong submission passes the second example without edits.",
    "Common mistake: off-by-one at boundaries; test the smallest and largest input."
   ],
   "steps": [
    "Pick three unseen mediums across different topics.",
    "20-minute timer each; stop at the bell.",
    "Review each solution against the best one.",
    "Log the mistake type (idea, edge case, implementation)."
   ],
   "end": "done when three problems are attempted and each mistake is classified."
  },
  "1": {
   "pts": [
    "This is a full LLD round: pick an unseen problem such as Meeting Room Booker and finish in 60 minutes.",
    "Time plan: 5 min requirements and assumptions, 10 min entities and class diagram, 30 min code core flow, 10 min tests, 5 min self-review.",
    "Use patterns only where they fit (strategy for pricing or selection, state for status, observer for notifications).",
    "Self-review vs SOLID: single responsibility per class, open for extension via interfaces, no giant switch statements, dependencies injected."
   ],
   "steps": [
    "Pick one unseen problem (not one you already built) and set a 60-minute timer.",
    "Write 5 requirements and 3 assumptions, then list nouns as classes and verbs as methods.",
    "Draw a class diagram (text or Mermaid) with relationships.",
    "Implement the main flow (for example book a room, detect conflict, cancel) with in-memory storage.",
    "Write 4 tests: happy path, conflict, cancel, invalid input.",
    "Self-review against each SOLID letter and note two improvements."
   ],
   "end": "done when code, diagram and tests exist and the SOLID review has two noted improvements."
  }
 },
 "98": {
  "0": {
   "pts": [
    "Pattern: simulated contest, two mediums and one hard, cold.",
    "Do mediums first (about 15 minutes each), then give the hard the rest; write brute force for it if stuck.",
    "State the complexity of every solution before submitting.",
    "Common mistake: skipping a final edge-case check on the mediums because the hard looks tempting."
   ],
   "steps": [
    "Pick two unseen mediums and one unseen hard.",
    "Run a 60-minute timer; mediums first.",
    "Submit brute-force for the hard if nothing better arrives.",
    "Read solutions, log mistakes by category, update the weak list."
   ],
   "end": "done when all three attempts are logged with categories."
  },
  "1": {
   "pts": [
    "A strong answer has: requirements (upload, stream, search; scale numbers), estimation (users, daily views, storage per video, bandwidth), high-level design, deep dive, trade-offs.",
    "Upload path: client uploads to object storage (multipart or resumable), a queue triggers transcoding workers that make several resolutions and bitrates, chunked into HLS or DASH segments; metadata goes in a database.",
    "Playback: CDN serves segments from edge caches, the player adapts bitrate to bandwidth. Popular content cached at the edge; origin shielded.",
    "Time-box: 5 min requirements, 5 estimation, 10 architecture, 15 deep dive, 5 trade-offs, 5 wrap-up.",
    "Score yourself 1 to 5 on each section and rework the weakest in 10 minutes."
   ],
   "steps": [
    "Set a 45-minute timer and speak aloud or write.",
    "Minutes 0-10: functional and non-functional requirements and estimation (storage per day, egress).",
    "Minutes 10-20: boxes and arrows for upload, transcode queue, storage, CDN, metadata DB.",
    "Minutes 20-40: deep dive on storage, transcoding and CDN with failure cases.",
    "Minutes 40-45: bottlenecks and trade-offs; then self-score and redo the weakest part."
   ],
   "end": "done when a scored sheet names your weakest section and a rewritten version exists."
  }
 },
 "99": {
  "0": {
   "pts": [
    "Pattern: a final timed mixed set, then a review of your whole weak list.",
    "Solve three unseen problems, 15-20 minutes each, easy to medium; state the pattern first.",
    "For the weak list, sort by topic and pick the 3 topics that recur; those are your last-mile focus.",
    "Common mistake: adding new problems instead of closing old gaps."
   ],
   "steps": [
    "Run a 3-problem timed set (about 50 minutes).",
    "Log pattern, mistake and time for each.",
    "Spend 10 minutes grouping the weak list by topic.",
    "Write a 3-line plan for the next DSA practice after Day 100."
   ],
   "end": "done when the set is logged and the weak list is grouped with a plan."
  }
 },
 "100": {
  "3": {
   "pts": [
    "Run it like a real round: 5 minutes clarifying questions, 10 brute force and complexity, 20 optimal code, 5 dry-run and test, 5 follow-ups.",
    "Interviewer signals: you ask about input size and edge cases, say your plan before coding, and narrate trade-offs.",
    "Feedback to request: communication, correctness, speed, and where you hesitated.",
    "Common mistake: silent coding; talk through every decision."
   ],
   "steps": [
    "Book the peer, Pramp or interviewing.io slot; pick the platform and shared editor in advance.",
    "Read the problem aloud, ask 3 clarifying questions and give a worked example.",
    "State brute force with complexity, then the better approach, then code it.",
    "Dry-run one example and one edge case aloud.",
    "Take 10 minutes of feedback and write 3 action items in NOTES.md."
   ],
   "end": "done when the mock happened and three feedback action items are in NOTES.md."
  },
  "4": {
   "pts": [
    "Structure: requirements and scale, API and data model, high-level design, deep dive on one component, bottlenecks and trade-offs.",
    "Do back-of-envelope numbers early (requests per second, storage), and let them drive decisions like caching and sharding.",
    "Say what you would not build and why; every choice has a cost you should name.",
    "Common mistake: drawing boxes without explaining why each exists or what fails."
   ],
   "steps": [
    "Choose a prompt (for example a URL shortener or news feed) and set a 45-minute timer.",
    "Spend 5 minutes on requirements and 5 on estimation.",
    "Draw the architecture, then deep dive one part (database or cache) with failure handling.",
    "Use the last 5 minutes for bottlenecks.",
    "Collect 15 minutes of feedback and write the top 3 gaps in NOTES.md."
   ],
   "end": "done when the mock is done and the top 3 gaps are written down."
  }
 }
};

if (typeof module !== "undefined") module.exports = STUDY_DETAIL;
if (typeof window !== "undefined") window.STUDY_DETAIL = STUDY_DETAIL;
