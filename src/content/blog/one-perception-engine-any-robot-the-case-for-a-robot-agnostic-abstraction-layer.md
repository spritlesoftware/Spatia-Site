---
title: "One Perception Engine, Any Robot: The Case for a Robot-Agnostic
  Abstraction Layer"
description: "One Perception Engine, Any Robot: The Case for a Robot-Agnostic
  Abstraction Layer"
category: Spatia robotics
blogType: tech
readTime: 7 minutes read
imageAlt: spatia spatial intelligence  Robot-Agnostic Perception
date: 2026-08-26
featured: false
seoTitle: "Robot-Agnostic Perception: One Engine, Any Robot Arm"
seoDescription: How Spatia built a robot-agnostic perception layer proven on UR
  and Flexiv, so OEMs can deploy across mixed robot fleets without vendor
  lock-in.
keywords: robot-agnostic automation, industrial perception layer, 6D pose
  estimation, zero-shot CAD pose estimation, Universal Robots UR integration,
  Flexiv robot integration, robot vendor lock-in, industrial robot abstraction
  layer, automotive SOP automation, robot execution engine, mixed robot fleet
  deployment, industrial robotics architecture
---
```markdown
If you own robot deployment decisions at an OEM or Tier 1, you already know the question that matters more than any accuracy benchmark: **what happens to this system the day we add a second robot brand?**

Most vision and perception stacks fail that question quietly. Not because the pose estimation is wrong, but because the software was never actually separable from the robot it was first integrated with. This post is about the architectural decision we made to avoid that failure mode, and the evidence that it holds, including where it doesn't yet.

At Spatia, we build the perception and execution stack that teaches industrial robots to handle new parts the moment a CAD file is uploaded, without months of reprogramming or custom fixtures. That system has to work across whichever robot an OEM already has on the floor, which is the whole subject of this post.

## Where lock-in actually lives in the stack

Lock-in rarely announces itself as a limitation. It shows up as a scoping conversation eighteen months in, when a UR based deployment needs to extend to a Flexiv cell, or a Fanuc line, and the vendor tells you it's a new integration project, not a config change.

The reason is usually structural, not intentional. Perception, calibration, and motion planning get built and tested against one robot's SDK from day one, and the assumptions about that specific controller (its coordinate conventions, its timing model, its available telemetry) end up baked into the perception code itself, not isolated at the boundary. Nobody decided to lock you in. The separation just was never designed as a hard boundary, so it drifted.

> **"I can't define a robot, but I know one when I see one."**
> — Joseph Engelberger, widely regarded as the father of industrial robotics

That line is usually quoted for its humor, but there's a real point buried in it. The industry has never agreed on a single definition of "robot" because the hardware keeps changing shape, speed, and control philosophy. Software that assumes a fixed definition of "how a robot talks" is exactly the software that breaks the moment the definition shifts.

## The architectural boundary we designed for

Our pipeline is six layers: Input (CAD ingestion, synthetic view generation), Perception (RGB-D capture, segmentation, 6D pose), Registration (hand-eye calibration, grasp offset, frame transform), Reach & Act (IK, planning, execution, verification), Transit & Complete, and Reliability & Monitoring running alongside all of it.

[IMAGE PLACEHOLDER 2 - This is the natural place for the six-layer architecture diagram (the one already built for the architecture overview doc). Reuse or adapt that SVG here so the reader can see the layers instead of just reading the list. This is probably the single most useful visual in the post for a technical reader.]

The boundary that matters for this post sits between Registration and Reach & Act. Everything upstream of that line, CAD ingestion, pose estimation, the entire perception pipeline, operates in object and camera space. It has no dependency on which robot is executing the action. It never queries a robot SDK, never assumes a control loop timing model, never encodes a specific controller's coordinate conventions. The output of everything upstream is a deterministic 6D pose: a geometric fact, not a robot instruction.

Robot specific logic is confined to the Reach & Act layer and below, a thin execution driver responsible for translating that pose into IK, motion commands, and action execution on a specific robot's interface. That's the only layer that changes when you add a new robot brand. Perception, calibration methodology, and grasp/action definition carry over unmodified.

This is a deliberate constraint on where we're allowed to write robot specific code, not an emergent property we noticed later. It's the reason adding a robot brand is a driver implementation, not a re-architecture.

## The proof point: two robots that don't share a control paradigm

Any team can claim "robot-agnostic" in a deck. What we'd ask you to actually check, if you were evaluating a vendor making that claim, is whether they've been forced to prove the boundary against robots that stress it differently. Same family robots, two UR variants, say, don't test the boundary. They're similar enough that a soft boundary would still hold.

We validated against two robots that are structurally different at the control level:

- **Universal Robots**, communicating over RTDE, a real time data exchange protocol with UR's specific timing and state model.
- **Flexiv**, communicating over RDK, with built in force sensing at the controller level, a materially different control paradigm than UR's, not just a different vendor's version of the same thing.

[IMAGE PLACEHOLDER 3 - A simple two-column comparison graphic or short table graphic showing UR (RTDE) vs Flexiv (RDK, force sensing) side by side, with a shared "Perception Layer" bar spanning across the top of both to visually reinforce that one engine feeds two very different execution paths. This works well as a supporting visual right after this bullet list.]

Getting perception, calibration, and grasp/action definition to carry over unmodified across both, with only the Reach & Act driver changing, is what tells us the boundary is real rather than something that happens to work for one robot family and would need to be reopened for the next.

## What this doesn't prove, and why that matters to you

If you're evaluating this for a deployment decision, the honest boundary of the claim matters more than the pitch. So, specifically:

- **Two ecosystems is evidence the architecture generalizes, not proof it covers your specific robot.** If your fleet includes a controller with a fundamentally different interface than RTDE or RDK, no confirmed compatibility exists until it's been integrated and validated. We won't tell you otherwise.
- **The abstraction layer covers single arm perception and execution.** Multi-arm coordination, shared workspace collision avoidance, synchronized timing between arms, is a separate, harder architectural problem we haven't shipped yet. If your SOP requires two arms coordinating on one station, that's a next phase conversation, not a today capability.
- **Force based, contact rich manipulation is roadmap, not shipped.** Flexiv's force sensing is available at the hardware level in our current integration, but fine grained force feedback control for insertion type tasks isn't part of the core execution layer yet.

If you're doing technical diligence on a perception vendor, these are the questions worth asking any vendor claiming robot-agnosticism, including us: which layer is the robot specific code actually confined to, and what's the evidence it's stayed confined there under a real change of control paradigm, not just a different robot from the same vendor family.

## What this means for a deployment decision

If you're standardizing on a perception layer today, the practical question isn't "does it work on my current robot." It's "what does the migration path look like when the fleet changes," and fleets in automotive change more than people plan for, across regions, across supplier relationships, across which line gets refreshed first.

A perception system with a genuine robot-agnostic boundary means that migration path is a driver level integration against a stack that's already proven itself across a real change in control paradigm, not a renegotiation of the whole system. That's the difference we designed for, and UR to Flexiv is the test case that tells us the design decision was correct, not a marketing claim layered on afterward.

```

