# Challenge

Welcome to the challenge!

Some packages are already being installed for you below - you can just start reading the below text while that finishes.

## The Introduction

The following script takes you through tasks you should complete as part of your challenge. Some tasks may be tricky, some may be easy. In every case you are encouraged to pose written questions to the task itself, write down questions/observations or reasoning about why you did not find a solution. In most cases though, a working solution will be achievable. In all cases it will be helpful if add notes about your methodology (e.g.: "I did X using Y because of Z, then A happened which I fixed doing B. I should have seen A coming but didn't because of C").

There will be no loop with the reviewer, so nobody is going to answer your notes, questions, musings, ... - their main aim is to showcase your thought process for a fellow developer who will inspect this challenge. For the texts you can write everything from a bullet list to a book, but be aware that in development we usually try to optimize for a combination of dense information + understandability by every team member. We firmly believe that good communication and conceptualization is as important to being a developer as the coding itself.

The challenge tries to be similar to the real-world with the kinds of problems and solutions that would occur in every-day-project-work. There will be no questions asking you to optimize runtime-complexity in O-notation to the max for algorithm Y - these sort of questions do not make any sense in our opinion. Being close to the real-world also means that you may bring in CSS/JS Libraries to help you develop, just make sure that everything still runs in stackblitz.

The tool we use here is called `stackblitz`. It functions as a fully integrated development environment (IDE). You can go through the full challenge here. If you want to use your local environment you can also download the project using the small "cloud icon" at the top left corner of the screen, just right of "Project". _In the end, the challenge code must run in here inside `stackblitz`, so `npm run dev` has to work. If this is not the case, we will not be able to review your challenge!_

## Tech-Stack

You can skip this section and revisit it later, as the right information will be shared with you at the right places and everything should "just work" as we inteded it to work. If you still want to learn more right now, read on!

This is a "fullstack" TypeScript project using nuxt3 + vue3. Fullstack TypeScript means that we use one typescript code base for both the backend API + the frontend webapp. We have defined helper commands for development, testing, running the app in production, linting, ... that are runnable via `npm run X` where X is the command, checkout the `package.json` for more.

For styling we use TailwindCSS, so far the zoo has not added a CSS component framework to use pre-made components, maybe you will? For testing we use `vitest`, for linting `eslint`. For building components that are testable, maintainable and embeddable we use `storybook`.

Storybook is a wonderful tool that sadly does not work in stackblitz (as the vue3 dependencies cannot run for some reason). So, we've disabled it but left the stories for you to study.

This information will also be shared with you where needed as part of the challenge, so there is no need to dive into anything at all for now.

## The Challenge

So, without further ado: Welcome, new IT Director of the Cologne Zoo! As you can see, the zoo dashboard was badly damaged by the recent malware attacks from the Duisburg Zoo. The old IT Director quit after that attack as he just could not take it anymore. The staff is looking to you to fix this mess and bring the zoo dashboard back to its former glory! ???? ???? Sadly the IT-Department has been underfunded for years before the attack - so the application is quite dated.

### Task 1: Take stock of the repository

In a first step you should inspect the health of the project and report on everything you notice while doing so. This will help you determine what repairs are necessary in the coming steps.

Please take stock fo the page using developer tools, your instincts, ... and write down below what you find.

// Your solution
Inspecting the Networks tab in the dev tools shows that multiple fetch requests received a 503 "Service Unavailable" response code.

The terminal and the console tab in the dev tools are showing another code 500 error stating that "ANlMALS" is not defined.

### Task 2: Get the basics running again

Now that we know that is broken, let's try to get things running again, step by step. First we should aim to just get the project to start. Please fix the problem that stops `npm run dev` from working out. Then:

- document the loaded page with a brief description,
- document the problems that needed to be resolved to make it work (so that we can avoid and quicker fix them in the future!)

Zookeepers reported that the error sometimes changes when reloading the page after the initial start.

// Your solution
So after fixing the typo in "animals.get.ts" to export the animal array defined correctly, there was another error

"alert" was not defined. This error was inconsistent as mentioned due to the asynchronous behavior of the function call which I assume happens because the call is made before the DOM fully loads. Using a simple "onMounted" function fixes this issue (or just simply removing the "vandalism").

### Task 3: Start the documentation

You got it to work! Nice, now the basic functionality is back for the zookeepers. This would be a great point to start on documenting the project. As you can see there is not even a readme file! The old IT Director seems to have left this project in bad shape. Please add documentation with basics on the project, how to start, stop, test, ... it and whatever else information you deem important.

Add your solution below, either as an inline text or link to new documentation file(s) you've created.

// Your solution
Fixed the "README.md" file and added some in-code documentation.

### Task 4: Test fixing

There's a failing test that for the age calculation helper. Can you figure out what is broken in the implementation or the test it is and resolve the problem? All zookeepers are really interested in what is going on here.

// Your solution
All the test cases pass except for the one that checks if the "calculateAgeInYears" function in "helpers.ts" does not round any value down to 0. This is expected because of how the function's implementation returns the rounded value without handling the specific zero case. The simplest solution is to make use of JavaScript/TypeScript's truthy and falsey expressions. 

### Task 5: UI Fixing and Improvement

The zookeepers report that the table is incomplete and different than usually. More specifically:

- they are missing the `Name` column that used to be in _third_ place,
- the table is sorted by weight, it used to be sorted by name,
- the age of the animals should show the age in years and not the birthdate
  - a helper for this already exists, made by the previous zookeeper

Please fix the two above problems and outline what was necessarry to do so.

// Your solution
- For the name, I just added new table header and data tags in the third position of each, and used the existing name property 

- I implemented a new helper function "compareByProperty" which acts as a comparator depending on the property passed dowwn as an argument, so I made it so that it is sorted by name initially and changes if a column header is clicked 

- I just used the existing helper function "calculateAgeInYears" while making sure to pass down the correct type

### Task 6: UI Feature 1

The zookeepers want to be able to see all details of an animal. Please create such a view that allows them to do so, outline anything about your process while adding the view below. The zookeepers didn't have time for more information, sorry. They'll surely be glad to criticize the first version intensly though and will want to know why you went for the approach you chose.

// Your solution
For now, the quickest solution would be to just add extra columns for the additional information. Obviously this won't scale very well if we have a lot of data per entry, but until the zookeepers specify a certain requirement, the simple solution will be the best one.

Other approaches would probably have all the additional details show on click or on hover with either row expansion, small dialog, or even navigation to a details page.

### Task 7: Logic Feature

The zookeepers want a new feature: Calculate the food required for the next calendar month. Basically, the zookeepers want to ease their job and buy a month worth of food in advance. In order to do so they want you to calculate and display the food all animals need for the next month.

To calculate the food an animal needs in kilograms in 1 day, the zookeepers use the following formula:

1. Take height + weight and divide it by 250
2. If the animal is:
   - older than 20 years, half the required food,
   - younger than 2 years, double the required food
3. Cherrys have less calories, so if the favourite fruit of the animal are cherries, add 28 kg
4. If the animal is male, add 20 %
5. If the animal is a fish: The required food is 0 kg

// Your solution

I created three more helper functions: "nextMonthFoodSupply", "dailyFoodSupply", and "daysInMonth".
- "nextMonthFoodSupply" more or less multiplies the output of both other functions
- "dailyFoodSupply" uses the rules given above to calculate an animal's daily intake
- "daysInMonth" is actually a function I wrote while problem solving a while ago, just translated the header/prototype to TS

Then I just added yet another table column and called the first function, fixing the return value's precision.

### Task 8: Plan New Feature

After the disastrous specification of the new UI feature in the previous task, the zooplanners now want to sit down with you to plan the next feature better before implementation begins. Together you come up with requirements that you write down from the user-perspective (the zookeepers):

- I want to plan when to feed which animal,
- Per animal I want to be able to plan a day + a fruit that I feed them
- There should be an overview of all upcoming feeding tasks that tells me:
  - the animal name,
  - the food fruit,
  - the required amount of food
- the required amount of food is calculated using the algorithm from the previous task
- Tasks should be grouped by day, so that I have something like a "todo" list for each day
  - so for exmaple a structure like:
    - 24.03.2012
      - Anni, Bananas, 20kg
      - Belfried, Cherries, 10kg
    - 27.03.2012
      - ...
    - ...

Please create a breakdown for this feature. You can focus on aspects like: What tasks do we need to cover, what should their order be, how will the UI/UX be designed, what questions arise from the potentially inconsistent or incomplete staff requirements?

Don't spend more thatn 15-30 minutes here - planning like this can quickly become quite complex and we want to prevent this challenge taking too much of your time!

// Your solution

There are two approaches that come to mind: the first one is creating a new page with a schedule layount with each tile showing an overview of that day's progress, and the second one is to have a to-do list like layout that also allows the user to navigate back and forth to check historical data.

The first approach would suit sparse data; less per day and more over the month, while the second one will pretty much suit any amount of data, as long as the history navigation is designed well.

From here a couple of questions arise: how many entries are expected per day? How far back should the historical data be kept?
What is the zookeepers' preferred layout?

UI/UX concepts would generally support that entries should not only be auto-generated (using the daily food intake calculator), but also the user should be able to add, edit and delete entries. Yes/no checkboxes might not be sufficient, partial completion or a progress indicator for each entry could be better here.

### Task 9: Finish the documentation

Revisit docs from step 3, see if you want to add anything. Also think about bonuses. Add a general comment about anything (inside the universe of the challenge or out of it) if you want to.

// Your solution

So I just played around a bit with Tailwind to get more used to it. I can see a lot of potential here but as a developer it really is much easier to let the designers do their thing and just focus on the implementation