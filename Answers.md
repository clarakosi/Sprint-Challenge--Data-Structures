## Questions
1. What are the order of insertions/removals for the following data structures?
   - **Stacks** exhibit a Last One in First Out (LIFO) method for the insertions/removals of data.
   - **Queue** uses a First One in First One Out method for the insertions/removals of data.
2. What is the retreival time complexity for the following data structures?
   - **Linked List** follows O(n) time complexity since the size of the list determines how long it takes to find a node. 
   - **Hash Table** retreival time complexity is O(1) because the index would direct to the correct bucket. In the worse case scenario that involves collisions Hash Tables can exhibit a O(n) time complexity. 
   - **Binary Search Trees** follows O(log(n)) time complexity since half a tree can be dismissed just by comparing the search value with the initial node.
3. What are some advantages to using a Hash Tables over an array in JavaScript?
   - **Arrays** are linearly structured thus to find a value in an array one would have to iterate through the array creating an O(n) time complexity. Meanwhile, **Hash Tables** use a function to transform a key into the correct index that holds the search value.