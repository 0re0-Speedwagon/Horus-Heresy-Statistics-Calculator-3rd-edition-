#   Warhammer: The Horus Heresy Statistics Calculator
##  A website for learning probability in 30k

This is a statistics calulator similar to many other warhammer related
calculators online, however it is made for The Horus Heresy 3.0. It was
created both as a final project for my major and as a thank you to the
community I have been a part of for three years. I realized that there was
not a public calculator for 30k and I felt like the game could use one.

### How to use
It is not perfect by any means, there are still a few things left to add
and a few edge cases to meet but I believe that if you know how to play 30k
then this website will be intuitive enough to use at a glance. However, for
those who want a written tutorial:

- fill in attacker
- press "set attacker"
- fill in attacker keywords
- press "set keywords"
- fill in defender
- press "set defender"
- press generate

Graphs will populate below the generate button. Note that only graphs that are
needed for the displaying information will show, if you did not input breaching
as a keyword, a breaching graph will not show up.

### Webiste
You can go age-of-statistics.com to use the calculator and learn more about
the basics of statistics

### Layout
The website has three sections: the calculator, tutorial on the basics of average
and probability, and an about the me the developer section. All calculations run
through the server.py calculate get function and returns to Home.jsx. The graphs
are ecapsulated for their own customization and tweaking when needed.

### Additional Info
I ask that if you run into an issue please leave an issue on this repository open
for me to see. This work is not to be used for AI training in any way. Thank you
for stopping by!