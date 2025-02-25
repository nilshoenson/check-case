# Check case

## Assignment

At Check, we have a workforce on the street that consists of **Swappers**, **Fixers** and **Mechanics**. These employees have scheduled shifts in which they perform specific tasks for our vehicles. **Swappers** replace the batteries of mopeds, **Fixers** do small fixes on mopeds and **Mechanics** do the bigger repairs. We would like to know how many minutes it would take a group containing a **Swapper**, a **Fixer** and a **Mechanic** to finish a predetermined route. You will be given two arrays of data: 1) The first array is a list of mopeds. Each moped consists of a string of characters: `S`, `F` or `M`. Each character represents a task that needs to be performed for that vehicle: `S` for swapping a battery, `F` for a small fix, `M` for a big repair. 2) The second array is a list of distances in minutes between the mopeds. So, `distance[0]` is the distance between `mopeds[0]` and `mopeds[1]`, `distance[1]` is the distance between `mopeds[1]` and `mopeds[2]`, and so on. It's a given that a **swap** takes _1 minute_, a **small fix** takes _5 minutes_ and a **big repair** takes _8 minutes_. Each employee needs to follow the route in the given order. However, they don't always need to perform a task at every moped. An employee shouldn't continue his route if there are no tasks left for him to do. Write a piece of code that takes the input below and determines how many minutes it would take a group containing a **Swapper**, a **Fixer** and a **Mechanic** to finish the given route. --- Input: `mopeds = ["S", "F", "SF", "FF"], distance = [2, 4, 3]` Answer: `37` Input: `mopeds = ["MMM", "SMF", "FMS"], distance = [3, 10]` Answer: `91` Input: `mopeds = ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"], distance = [4, 17, 3, 6, 9, 11]` Answer: `198`

## Solution

The solution calculates the total time needed for a team of workers (Swapper, Fixer, and Mechanic) to complete all tasks along a predetermined route. Here's how it works:

### Key Concepts

1. **Worker Independence**: Each worker (Swapper, Fixer, Mechanic) operates independently and in parallel.
2. **Task Times**:
   - Battery Swap (S): 1 minute
   - Small Fix (F): 5 minutes
   - Big Repair (M): 8 minutes

### Algorithm Overview

1. **Worker Tracking**: The solution tracks each worker's:

   - Total time spent (including travel and tasks)
   - Current position in the route

2. **Time Calculation**:

   - Travel time: Sum of distances between current position and target moped
   - Task time: Number of tasks × time per task
   - Workers only travel to mopeds where they have tasks to perform

3. **Final Time**: The total shift time is determined by the worker who takes the longest to complete their tasks, since they work in parallel.
