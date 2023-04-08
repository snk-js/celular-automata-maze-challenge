this repository is a nodejs 16+ javascript implementation of a solution of a celular automata maze traversal to reach the last square as goal. this was Brazilian code contest ocurried within domain of sigmageek.com sponsored by Stone.

it contains several complex implementation of efficient algorithms such like GBFS (greedy best-first search) I tried to implement, but in counterpart those are delivering wrong answers, in other words, something or a group of somethings are incorrect in the implemention.
<hr/>
## A challenge for curious visitors:
- you are free to try to debug this application you will sound a badass developer I couldn't yet.

### motivation:
- if someone solve using the same architecture could unlock a ready-to-research super efficient algorithm for this kind of problem (sure, using a little of memory) but with the priviledge of ES6 semantic abstraction used in this solution, making it with a higher composability and usability.
 
- I was actually curious if I could do a search using a enchanced greedy dfs on already constructed 300 iterations of the maze within possibility of archieving the maximum speed on find the result, which is the path runned by the observer considering the infinitely many possibilities of possible paths among the lived automata cells

### wth is going on?
- I first transformed the greed nature of the problem (which should be represented by ```column[][]``` "rows of columns") to a list "identifcally to a adjacency list in graph", because I could do a linear search by building an adjacency list data structure holding the lived, dead neighbors, the state of the cell and it's characteristics (optional for frontend visualization) so that the application could read and write it at constant time, making the algorithm linear or even faster because heuristics implemented within a dfs.

- the problem is that every was built without types, this is a bizarre problem, probably making all js to ts could help to solve the critical issue.

### running:
You run the application with ```node .``` this includes a frontend which you can move the agent using key arrows and a simple server serving the html content on the 5500 port of the browser.

in order for you to run the solution and output the file this is the command: ```node solution.js```.

<img src="gif.gif" alt="gif of the agent traversing a little bit the maze">
<img src="print.PNG" width="400" height: "250" alt="img of the maze set up">


