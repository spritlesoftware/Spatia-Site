---
title: Your Robot Can Find the Part. It Still Can't Do the Job
description: Pose estimation can tell a robot exactly where a part is - but
  locating it is only the first inch of the job. This post breaks down why the
  final inch of contact, insertion, and alignment is where most robotic
  manipulation deployments actually fail, and what a platform needs
  architecturally to close that gap
category: Spatia robotics
blogType: tech
readTime: 6 min read
imageAlt: The Last Inch Problem in Robotic Manipulation
date: 2026-09-01
featured: false
seoTitle: The Last Inch Problem in Robotic Manipulation
seoDescription: Why pose estimation alone can't finish an assembly task - and
  what closes the gap between locating a part and actually placing it correctly.
keywords: robotics,industrial-automation, manufacturing, pose-estimation,
  robotic-manipulation, computer-vision, automotive-manufacturing robot-arms,
  assembly-automation
imageUpload: /media/Hero image — the last inch.png
---
### Part 1 of 2

Ask most people what the hard part of robotic automation is, and they'll say "finding the object." Get a camera to see the part, figure out where it is in 3D space, and the robot can just... grab it. Done.

It isn't done. Finding the part is the first inch of a job that might be twelve inches long, and the last inch is where most industrial deployments actually live or die.

## Pose estimation solves a real problem - just not the whole problem

Zero-shot 6D pose estimation from CAD is a genuine unlock. Upload a model, and a robot can locate that part in a bin, on a conveyor, or in a fixture without a single labeled image or a week of retraining. That eliminates a huge amount of the changeover cost that used to make robotic automation impractical for anything but high-volume, unchanging production.

But locating a part is a perception problem. Manufacturing is not a perception problem - it's a *manipulation* problem wearing a perception problem's clothes. Once the robot knows where the part is, it still has to:

- Insert it into a fixture with sub-millimeter alignment
- Apply a fastener at the correct torque and angle
- Seat a connector that only mates one way
- Correct for the part shifting slightly the instant the gripper makes contact

None of that is "finding." All of it is what happens in the last inch of travel, after the pose is already known.

## Why the last inch is disproportionately hard

Tolerances tighten as the robot gets closer to the target. A pose estimate that's accurate to a couple of millimeters is more than good enough to *approach* a part. It is not good enough to *seat* that part into a fixture with a 0.2mm clearance. The margin for error shrinks exactly when the consequences of error grow - a bad approach just means a retry; a bad insertion can damage the part, the fixture, or the end effector.

![](</media/margin for error shrinkin.png>)

Contact changes the physics. The moment the gripper touches the part, you've left the world of pure vision and entered a world of forces, compliance, and small unplanned movements. A part that looked perfectly positioned a second ago can shift the instant it's grasped or pressed into place. Pose estimation, on its own, has nothing to say about that - it's a snapshot, not a feedback loop for contact.

It's where automation quietly fails today. A huge share of "robot picks the part but can't reliably place it" problems in real deployments aren't perception failures - they're last-inch failures. The part was found correctly. It just wasn't *finished* correctly.

## Solving the last inch is an architecture problem, not a bigger model

The instinct is often to reach for a fancier perception model. That's the wrong axis. The last inch needs:

**Force-aware execution**, not just visual accuracy - the ability to sense resistance during insertion and adjust in real time, rather than executing a single blind trajectory computed before contact. This is a big enough topic on its own that it gets the full follow-up post - see Part 2 below.

**Verification, not assumption** - confirming an action actually succeeded (the fastener seated, the part is flush, the connector clicked) instead of trusting that a planned motion produced the intended outcome.

**A retract-and-complete path with the same rigor as the approach path** - the motion planning discipline applied to *getting to* the part has to be applied equally to *placing* it, including collision-aware retraction that doesn't clip the bin, the fixture, or a neighboring part on the way out.

**Failure attribution** - when something does go wrong in that last inch, the system needs to say *why*: was it a calibration drift, an occluded view, a grasp offset, or an unexpected part shift on contact? A system that can only say "it failed" without saying where forces every failure to be debugged as a mystery instead of a known category.

![](</media/Failure-mode diagram.png>)

This is why "the last inch" belongs on the list of things a serious industrial automation platform has to own, not outsource to hope. Finding an object is a necessary condition for automation. It was never a sufficient one.

## The real measure of a manipulation platform

The honest test of a pick-and-place, fastening, dispensing, or bin-picking system isn't "can it locate the part." Every credible vendor can do that today. The test is: what happens in the half-second after the gripper makes contact? Does the system have any awareness of what actually happened, or is it just trusting a trajectory that was planned before it knew what the world would do?

![](/media/last.png)

Perception gets the robot to the doorway. What happens in the last inch decides whether it actually walks through - and the single biggest factor in that last inch is whether the robot can *feel* what it's doing. That's the subject of Part 2: force control, and why it varies so much from one robot platform to the next.