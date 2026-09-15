---
title: "Force Control: The Feature That Actually Solves the Last Inch"
description: Pose estimation gets a robot to the part - force control is what
  lets it feel what happens next. This post breaks down how Flexiv, Franka
  Emika, KUKA, Universal Robots, and ABB/Doosan each implement force sensing,
  and why that sensing is the missing half of the last-inch problem.
category: Spatia robotics
blogType: tech
readTime: "~5 min read "
imageAlt: spatia spatial intelligence  Robot-Agnostic Perception
date: 2026-09-15
featured: false
seoTitle: "Force Control in Robotics: Flexiv vs. UR vs. KUKA"
seoDescription: How Flexiv, Franka Emika, KUKA, Universal Robots, and ABB
  implement force control - and why it's the key to contact-rich robotic
  manipulation.
keywords: force control robotics, robot force torque sensor, Flexiv force
  sensing, compliant robotic manipulation, contact-rich manipulation, robot
  joint torque sensing, Universal Robots force control, industrial robot
  insertion tasks
imageUpload: /media/fc-Hero image.png
---
### Part 2 of 2 - continued from "The Last Inch Problem"

In Part 1, we made the case that pose estimation gets a robot *to* a part but has nothing to say about what happens once contact begins - and that this gap, the last inch, is where most real-world manipulation failures actually happen. This post is about the feature that closes that gap: force control, and why it looks so different from one robot platform to the next.

![](</media/fc-Hero image.png>)

## What force control actually means

A robot with force control isn't just executing a pre-planned trajectory and hoping it works. It's continuously sensing resistance - through torque sensors in the joints, a force/torque sensor at the wrist, or both - and adjusting its motion in response. That lets it do things pure position control can't:

- Stop or back off the instant it senses unexpected resistance, instead of grinding a part or fixture
- "Feel" its way into a tight-tolerance insertion, making small corrective moves as it goes rather than trusting a single computed path
- Apply a controlled amount of force (for pressing, fastening, or polishing) instead of just moving to a coordinate and hoping the contact force is safe
- Detect a collision with something unplanned and react before it becomes a hard impact

This is the difference between a robot that *executes blind* and one that *executes with feedback* - exactly the gap identified in Part 1 between "approach" and "seat."

## How it shows up across robot platforms

**Flexiv** builds force sensing directly into the arm - every joint carries integrated torque sensing, so the whole arm behaves like a distributed force sensor rather than relying on a single external sensor at the wrist. That's part of why it's a natural fit for contact-rich, adaptive tasks: the sensing isn't bolted on, it's structural to the robot.

![](</media/fc-Comparison visual.png>)

**Franka Emika** (the Panda / FR3 line) pioneered a similar approach in the research and light-industrial space - torque sensors in every joint, designed from the ground up for compliant, force-aware manipulation rather than adapted from a rigid pick-and-place platform.

**KUKA's LBR iiwa** ("sensitive robot") is the industrial-scale version of the same idea - joint torque sensing throughout the arm, originally built for safe human-robot collaboration, which turns out to be the same sensing foundation contact-rich manipulation needs.

**Universal Robots** takes a different approach: rather than torque sensing in every joint, the e-Series adds a force/torque sensor at the tool flange (the wrist), giving force feedback at the point of contact without redesigning the whole arm. It's a lighter-weight way to get much of the same benefit.

**ABB and Doosan** both offer force control as an add-on package or built-in option on select lines - usually a wrist-mounted force/torque sensor paired with software for force-controlled assembly, deburring, or polishing tasks.

The common thread: the robots that handle contact-rich work well are the ones where force sensing is either structural (every joint) or deliberately placed at the point of contact (the wrist) - not an afterthought.

## Closing the loop with Part 1

Go back to the four things Part 1 said the last inch needs: force-aware execution, verification, a rigorous retract-and-complete path, and failure attribution. Force control is the sensing layer that makes the first two possible at all - you can't verify contact-based success, and you can't adjust to resistance in real time, without a robot that can feel what it's touching. The other two (retract path rigor, failure attribution) are software discipline built on top of that sensing.

![](</media/fc-human-adjacent collaborative arm.png>)

Which is really the point of splitting this into two posts: pose estimation and force control are solving two different halves of the same problem - where the object is, and what to do once you're touching it - and a platform only really "finishes the job" when it treats both as first-class, not one as the headline feature and the other as an afterthought.