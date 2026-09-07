---
title: Why We Didn’t Build on a VLA  (And When You Actually Should)
description: In Physical AI, the best architecture isn't always the most
  sophisticated one. This article explains why Spatia chose a modular approach
  for industrial robotics instead of building around a VLA, and when a VLA
  architecture can actually be the better choice.
category: Deep Dive
blogType: tech
readTime: 6 min read
imageUpload: /media/ChatGPT Image Sep 7, 2026, 05_50_18 PM 2.png
imageAlt: Spatia
date: 2026-09-07
featured: true
seoTitle: Why We Didn’t Build on a VLA ( And When You Actually Should )
seoDescription: Why Spatia chose a modular robotics architecture over a VLA, and
  when Vision-Language-Action models make sense for Physical AI and industrial
  robotics.
keywords: VLA, Vision-Language-Action, Physical AI, industrial robotics,
  robotics AI, robot perception, spatial AI, modular robotics, robotic
  automation, robot control, edge AI, 3D vision, robot intelligence
---
  
**In Physical AI, the best architecture isn't necessarily the most sophisticated one. It's the one that fits the problem.**

If you've been anywhere near robotics or Physical AI recently, you've probably heard the acronym VLA  Vision-Language-Action. The idea is compelling: a model takes visual and language inputs and learns to translate them into actions. Instead of building separate systems for perception, reasoning, planning, and action, a VLA attempts to learn the relationship between what a robot sees, what it is asked to do, and how it should respond.

The promise is even bigger: **generalization**. Instead of programming a robot for every individual object, environment, and task, a single model could potentially handle new situations with far less task-specific engineering. It's a beautiful concept.

But there's a question that matters more than whether VLAs are the future: **what problem are you actually trying to solve?**

In cricket, you don't play T20 the way you play a Test match. It's the same sport, but the format changes the pace, risk tolerance, strategy, and decisions you make. You optimize for the game you're actually playing.

Physical AI is similar.

When we were architecting Spatia for industrial robotics, we deliberately chose not to build around a VLA. Not because we think VLAs are wrong, but because we were solving a different problem.

## **Industrial Robotics Has Different Constraints**

Spatia is focused on manufacturing automation - applications such as bin picking, visual inspection, screw insertion, glue application, and precision assembly. In these environments, the objective isn't simply to produce a plausible action. The robot needs to operate around real machines, real parts, real tolerances, and real production requirements.

That means the system needs to understand where a part is, what it is, how it is positioned, what has changed in the environment, and what information the robot needs before it acts.

This led us to a fundamental architectural decision: **we wanted Spatia to focus on understanding the physical environment rather than making one model responsible for everything.**

![](</media/ChatGPT Image Sep 7, 2026, 05_50_18 PM 3.png>)

### **1. Understanding Before Action**

A VLA attempts to learn the mapping from perception and language toward action. That is powerful because the model can learn relationships that would otherwise require significant engineering.

But industrial systems often benefit from being able to inspect what is happening between perception and execution. Imagine a vision system rejects a manufactured component during inspection. The engineering team may need to understand what was detected, where the defect was identified, and why the decision was made.

Or imagine a robot changes its trajectory because the perceived position of a component has shifted. Being able to inspect the perception output separately from the control decision can make the system easier to debug.

This is one reason we chose a modular approach. A perception system can focus on perception. A reasoning layer can interpret the scene. A motion planner can plan the trajectory. A controller can execute it. Each component can be measured, debugged, and improved independently.

For industrial robotics, that observability is an important engineering property.

### **2. The Edge Changes the Equation**

The second consideration is computation. Industrial robots often operate close to the process they are controlling. The system may need to run on an industrial PC, edge GPU, smart camera, or on-premise gateway rather than relying entirely on the cloud.

That makes latency, compute requirements, network reliability, and deployment cost part of the architecture. A large multimodal model may be perfectly reasonable in a research environment with substantial GPU resources, but deploying any model in production means asking a simple question: **can it meet the requirements of the application on the hardware available?**

This is where specialized models can make sense. Instead of asking one model to understand everything, different models can focus on specific problems such as detection, segmentation, pose estimation, tracking, defect detection, or scene understanding. Each can then be optimized for its particular task and deployment environment.

This doesn't mean VLAs cannot run at the edge. That space is evolving quickly. The point is simply that **computers are part of the architecture**. You don't choose the model first and worry about deployment later. The deployment environment should influence the model you choose.

### **3. Precision Changes the Problem**

General-purpose manipulation and industrial manipulation don't always have the same requirements. A robot being asked to pick up an object and place it in a box may have considerable freedom in how it completes the task. A robot inserting a component, applying adhesive along a defined path, or performing a precision inspection may have much less room for variation.

In these applications, predictable perception and controlled execution matter.

That's why we don't see perception and control as problems that necessarily need to be solved by the same model. Specialized perception can provide spatial information. Motion planning can determine a feasible trajectory. Control systems can handle physical execution. Additional sensing can help the robot respond when reality differs from the plan.

The closer the system gets to physical interaction, the more important predictable and measurable behaviour becomes.

### **4. The Data You Already Have Matters**

There is another practical question: **what data does your industry actually produce?**

General-purpose robotic models benefit from broad datasets covering different objects, environments, tasks, and interactions. Manufacturing often has a different kind of data. There may already be detailed CAD models, 3D scans, inspection images, defect examples, process specifications, and robot trajectories.

That information can be extremely valuable for building specialized perception and understanding systems.

A CAD model can provide geometry. 3D perception can provide spatial information. Vision models can provide semantic understanding. Existing robot controllers can provide reliable execution.

The opportunity is to connect these capabilities rather than asking one model to learn everything.

## **So When Should You Actually Use a VLA?**

![](</media/ChatGPT Image Sep 7, 2026, 05_50_18 PM.png>)

This isn't an argument against VLAs. In fact, there are robotics problems where a VLA is a very compelling approach.

If you're building a general-purpose robot that needs to interact with many different objects, operate in unstructured environments, and respond to changing natural-language instructions, generalization becomes the primary challenge.

Imagine telling a robot, "Pick up the red cup and put it on the table." Then, "Move the box next to the chair." Then, "Clear everything from this shelf."

This is where the ability to connect vision, language, and action becomes extremely valuable. A VLA can also make sense when the cost of manually programming every new task is higher than the cost of accepting some uncertainty from a learned policy.

The more variable the environment and the broader the task space, the more attractive generalization becomes.

## **VLA vs. Modular Isn't Really the Question**

The interesting future may not be VLA versus modular robotics. It may be both.

A VLA could operate at a higher level, interpreting an instruction and deciding what the robot should accomplish. A specialized perception system could provide precise spatial information. A motion planner could determine how to reach the target. A force controller could manage physical contact. A verification system could determine whether the task succeeded.

The VLA doesn't necessarily need to control every motor. It can provide high-level intelligence while specialized systems handle the parts of the problem where precision and predictability matter most.

That gives us a more useful question:

**Where should learned intelligence live inside the robotics stack?**

## **That's Why We Built Spatia Differently**

Spatia sits primarily on the understanding side of that equation.

We're building 3D vision and environment-understanding capabilities that allow industrial robots to understand the physical world around them where the parts are, what they are, how they are positioned, and what has changed.

The downstream control system can then use that information to execute the physical task.

As robotics evolves, that architecture can evolve with it. If a VLA becomes useful for a particular layer, there is no reason it cannot become part of the stack. If a better specialized model becomes available for perception, that component can be replaced.

That's the advantage of not forcing every capability into one model.

## **The Architecture Should Follow the Task**

The mistake would be to choose architecture because it is currently the most exciting technology.

If generalization is your biggest problem, build for generalization. If precision, latency, and predictable execution are your biggest problems, build for those. If you need both, build a system that combines them.

We didn't build Spatia on a VLA because we're building for a particular game: **industrial robotics**.

Different constraints require different strategies.

And as Physical AI evolves, the winning systems may not be the ones with the biggest model. They may be the ones that know **where intelligence belongs**.

**The goal isn't to build the most impressive model. The goal is to build a system that actually works.**

++[Learn more about Spatia → spatia.sg](http://spatia.sg)++