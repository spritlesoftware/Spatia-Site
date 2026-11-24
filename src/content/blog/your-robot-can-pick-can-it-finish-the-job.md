---
title: "Your robot can pick. Can it finish the job?"
description: "Picking a part is only one step. What a robot must get right before and after the pick, 11 types of pick-and-place work, and what to ask before you buy."
category: "Deep Dive"
blogType: "tech"
readTime: "6 min read"
imageUpload: "/media/pick-place-hero.jpg"
imageAlt: "A watercolor painting of a robot cell: a bin of parts, a camera above it, a robot arm and a fixture."
date: "2026-11-24"
featured: true
draft: false
articleLayout: "watercolor"
author: "Balaji D Loganathan"
seoTitle: "Your Robot Can Pick. Can It Finish the Job?"
seoDescription: "Picking is only one step. What a robot must get right before and after the pick, 11 types of pick-and-place work, and what to ask before you buy."
keywords: "bin picking, pick and place, 3D vision, robot vision, machine tending, kitting, CAD-based picking, eye-in-hand, eye-to-hand"
---

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<defs>
<filter id="wc" x="-25%" y="-25%" width="150%" height="150%">
<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="7" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G" result="d"/>
<feGaussianBlur in="d" stdDeviation="1.4" result="b"/>
<feComposite in="d" in2="b" operator="arithmetic" k1="0" k2="1.5" k3="-0.5" k4="0"/>
</filter>
<filter id="wc2" x="-25%" y="-25%" width="150%" height="150%">
<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="21" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
<feGaussianBlur in="d" stdDeviation=".8"/>
</filter>
<filter id="bru" x="-10%" y="-30%" width="120%" height="160%">
<feTurbulence type="fractalNoise" baseFrequency="0.09 0.02" numOctaves="2" seed="3" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<g id="cast"><path d="M-14 -6 L-6 -14 L8 -13 L15 -3 L12 10 L0 15 L-12 9 Z" fill="#C98A3A"/><circle cx="1" cy="0" r="4.5" fill="#8a5a20" opacity=".55"/></g>
</defs>
</svg>

<div class="wide">
<figure class="sheet fig-anim" style="margin-top:22px" aria-label="A casting travels from a bin, is turned, loaded into a machine, checked and placed in a tray">
<svg viewBox="0 0 1000 340" role="img">
<g filter="url(#wc)">
<ellipse class="bloom" style="--o:.35;--d:0s" cx="260" cy="170" rx="250" ry="120" fill="#B7C5C3"/>
<ellipse class="bloom" style="--o:.22;--d:.3s" cx="720" cy="190" rx="290" ry="110" fill="#01AC95"/>
</g>
<path class="brush" pathLength="1" filter="url(#bru)" d="M95 235 C 170 120, 240 125, 300 205 S 440 265, 500 200 S 640 130, 700 205 S 860 255, 920 205" fill="none" stroke="#0F4A46" stroke-width="5" stroke-linecap="round" opacity=".55" style="--d:.4s"/>
<g filter="url(#wc)">
<path class="bloom" style="--d:.6s" d="M38 175 L152 175 L137 255 L53 255 Z" fill="#7f9895"/>
<circle class="bloom" style="--d:.9s" cx="72" cy="190" r="13" fill="#C98A3A"/><circle class="bloom" style="--d:1s" cx="99" cy="183" r="12" fill="#b07a30"/><circle class="bloom" style="--d:1.1s" cx="124" cy="192" r="13" fill="#C98A3A"/><circle class="bloom" style="--d:1.2s" cx="88" cy="203" r="11" fill="#d9a35a"/>
<path class="bloom" style="--d:1.2s" d="M270 140 a32 32 0 1 1 6 30" fill="none" stroke="#01AC95" stroke-width="11" stroke-linecap="round"/>
<path class="bloom" style="--d:1.3s" d="M262 160 L276 176 L290 160 Z" fill="#01AC95"/>
<rect class="bloom" style="--d:1.6s;--o:.8" x="440" y="88" width="122" height="112" rx="10" fill="#0F4A46"/>
<rect class="bloom" style="--d:1.9s" x="463" y="106" width="76" height="48" rx="5" fill="#B7C5C3"/>
<circle class="bloom" style="--d:2s" cx="545" cy="182" r="7" fill="#01AC95"/>
<circle class="bloom" style="--d:2.1s;--o:.55" cx="700" cy="148" r="38" fill="#01AC95"/>
<circle class="bloom" style="--d:2.3s;--o:.7" cx="700" cy="148" r="15" fill="#0E1114"/>
<rect class="bloom" style="--d:2.5s" x="862" y="122" width="114" height="72" rx="8" fill="#9fb3b0"/>
</g>
<g filter="url(#wc2)">
<rect class="bloom" style="--d:2.7s" x="874" y="132" width="26" height="22" rx="3" fill="#e9eeec"/><rect class="bloom" style="--d:2.7s" x="906" y="132" width="26" height="22" rx="3" fill="#e9eeec"/><rect class="bloom" style="--d:2.7s" x="938" y="132" width="26" height="22" rx="3" fill="#e9eeec"/>
<rect class="bloom" style="--d:2.8s" x="874" y="162" width="26" height="22" rx="3" fill="#e9eeec"/><rect class="bloom" style="--d:2.8s" x="906" y="162" width="26" height="22" rx="3" fill="#e9eeec"/><rect class="bloom" style="--d:2.8s" x="938" y="162" width="26" height="22" rx="3" fill="#e9eeec"/>
<circle class="bloom" style="--d:3s" cx="887" cy="143" r="8" fill="#C98A3A"/><circle class="bloom" style="--d:3.1s" cx="919" cy="143" r="8" fill="#C98A3A"/><circle class="bloom" style="--d:3.2s" cx="951" cy="143" r="8" fill="#C98A3A"/><circle class="bloom" style="--d:3.3s" cx="887" cy="173" r="8" fill="#C98A3A"/>
</g>
<g class="mover" filter="url(#wc2)"><use href="#cast"/>
<animateMotion dur="11s" repeatCount="indefinite" begin="3s" path="M95 235 C 170 120, 240 125, 300 205 S 440 265, 500 200 S 640 130, 700 205 S 860 255, 920 205"/></g>
<g class="lbl hero-lbl" font-size="34" text-anchor="middle">
<text x="95" y="300">In the bin</text><text x="296" y="300">Turn it</text><text x="501" y="300">Load the machine</text><text x="700" y="300">Check it</text><text x="919" y="300">Into the tray</text>
</g>
</svg>
<ol class="steps"><li>In the bin</li><li>Turn it</li><li>Load the machine</li><li>Check it</li><li>Into the tray</li></ol>
</figure>
<p class="cap">Same movement at every stop. Different decision at every stop. (Concept drawing, not a customer line.)</p>
</div>

<div class="wrap">
<div class="tldr">
<h2>In one minute</h2>
<ul>
<li>Picking is one step. The job is done only when the part is placed right and the next step can start.</li>
<li>How the part arrives (tray, bin, fixture) changes the problem.</li>
<li>Five things must work together: see, AI, plan, grip, control.</li>
<li>Check the place as carefully as the pick.</li>
<li>Before you buy a cell, ask about the full shift, not the best minute.</li>
</ul>
</div>
<ul class="toc" aria-label="Sections">
<li><a href="#stops">One part, five stops</a></li><li><a href="#arrives">How the part arrives</a></li><li><a href="#five">Five things</a></li><li><a href="#place">The place</a></li><li><a href="#types">11 types</a></li><li><a href="#ask">Before you buy</a></li><li><a href="#who">Who is solving this</a></li><li><a href="#spatia">Where Spatia fits</a></li>
</ul>
<p style="margin-top:28px">We see many pick-and-place demos.</p>
<p>The arm goes down. The gripper closes. The part comes up.</p>
<p>It looks done. It is not.</p>
<p>Picking is only one step. The job is complete only when the right part is in the right place, facing the right way. And the next machine can start.</p>

<h2 id="stops">One part, five stops</h2>
<p>Take a casting. (This is an example. Not a customer line.)</p>
<p>It comes in a bin. The robot picks it. It turns it the right way. It loads it into a machine. The part is checked. Then it goes into a tray.</p>
<p>The movement is the same every time. Pick, move, place.</p>
<p>But at every stop, the robot has to decide something new.</p>
<p>Before it moves, the robot must know:</p>
<ul>
<li>Which part is this?</li>
<li>Where is it? Which way is it facing?</li>
<li>Can the gripper hold it?</li>
<li>Can the arm go in and come out safely?</li>
<li>Is the machine ready?</li>
</ul>
<p>Most demos answer the first two. A real factory needs all five.</p>

<h2 id="arrives">How the part arrives changes everything</h2>
<p>Same part. Three situations. Three different problems.</p>
</div>

<div class="wide">
<div class="three">
<figure class="sheet fig-anim">
<svg viewBox="0 0 300 210" role="img" aria-label="A tray with one empty pocket and one pocket with two parts">
<g filter="url(#wc)"><rect class="bloom" style="--o:.75" x="22" y="48" width="256" height="128" rx="10" fill="#9fb3b0"/></g>
<g filter="url(#wc2)">
<g fill="#e9eeec"><rect x="36" y="60" width="52" height="46" rx="5"/><rect x="96" y="60" width="52" height="46" rx="5"/><rect x="156" y="60" width="52" height="46" rx="5"/><rect x="216" y="60" width="52" height="46" rx="5"/><rect x="36" y="118" width="52" height="46" rx="5"/><rect x="96" y="118" width="52" height="46" rx="5"/><rect x="156" y="118" width="52" height="46" rx="5"/><rect x="216" y="118" width="52" height="46" rx="5"/></g>
<g fill="#C98A3A"><circle class="bloom" style="--d:.3s" cx="62" cy="83" r="14"/><circle class="bloom" style="--d:.4s" cx="122" cy="83" r="14"/><circle class="bloom" style="--d:.5s" cx="242" cy="83" r="14"/><circle class="bloom" style="--d:.6s" cx="62" cy="141" r="14"/><circle class="bloom" style="--d:.7s" cx="176" cy="137" r="13"/><circle class="bloom" style="--d:.8s" cx="190" cy="146" r="13" fill="#b07a30"/><circle class="bloom" style="--d:.9s" cx="242" cy="141" r="14"/><circle class="bloom" style="--d:1s" cx="122" cy="141" r="14"/></g>
</g>
<circle cx="182" cy="83" r="15" fill="none" stroke="#0F4A46" stroke-width="2.5" stroke-dasharray="4 5" class="bob" style="--y:-4px"/>
<g class="lbl" font-size="24"><text x="150" y="36">empty?</text><text x="160" y="200">double?</text></g>
</svg>
<h3>Neat tray</h3>
<p>The robot knows the pocket. But is it empty? Are there two parts in it?</p>
</figure>
<figure class="sheet fig-anim">
<svg viewBox="0 0 300 210" role="img" aria-label="A gripper reaching into a pile of overlapping parts in a bin">
<g filter="url(#wc)"><path class="bloom" style="--o:.7" d="M30 95 L270 95 L248 196 L52 196 Z" fill="#7f9895"/></g>
<g filter="url(#wc2)">
<circle class="bloom" style="--d:.2s" cx="90" cy="150" r="20" fill="#C98A3A"/><circle class="bloom" style="--d:.3s" cx="122" cy="138" r="19" fill="#b07a30"/><circle class="bloom" style="--d:.4s" cx="155" cy="152" r="21" fill="#d9a35a"/><circle class="bloom" style="--d:.5s" cx="190" cy="137" r="19" fill="#C98A3A"/><circle class="bloom" style="--d:.6s" cx="215" cy="160" r="18" fill="#b07a30"/><circle class="bloom" style="--d:.7s" cx="108" cy="172" r="17" fill="#d9a35a"/><circle class="bloom" style="--d:.8s" cx="172" cy="176" r="17" fill="#C98A3A"/>
</g>
<g class="bob" style="--y:30px" filter="url(#wc2)">
<rect x="146" y="0" width="12" height="62" fill="#0F4A46"/><rect x="128" y="58" width="48" height="12" rx="3" fill="#0F4A46"/><rect x="128" y="66" width="8" height="26" fill="#0F4A46"/><rect x="168" y="66" width="8" height="26" fill="#0F4A46"/>
</g>
<text class="lbl" font-size="24" x="196" y="40">which one?</text>
</svg>
<h3>Loose bin</h3>
<p>Parts overlap. Shiny parts confuse the camera. A full bin and an almost empty bin behave differently.</p>
</figure>
<figure class="sheet fig-anim">
<svg viewBox="0 0 300 210" role="img" aria-label="A part lowering into a precise fixture">
<g filter="url(#wc)"><path class="bloom" style="--o:.8" d="M40 150 L120 150 L135 170 L165 170 L180 150 L260 150 L260 196 L40 196 Z" fill="#0F4A46"/></g>
<g class="bob" style="--y:38px" filter="url(#wc2)"><use href="#cast" transform="translate(150 98) scale(1.4)"/></g>
<path d="M118 146 L136 166 M182 146 L164 166" stroke="#01AC95" stroke-width="3" stroke-linecap="round" opacity=".9"/>
<text class="lbl" font-size="24" x="190" y="60">seated?</text>
</svg>
<h3>Precise fixture</h3>
<p>The part must sit exactly right. Lifting it is easy. Seating it correctly is the hard part.</p>
</figure>
</div>
</div>

<div class="wrap">
<p style="margin-top:28px">Sometimes a better fixture solves the problem. Not every problem needs more AI. I tell customers this also.</p>

<h2 id="five">Five things must work together</h2>
<p>People say "vision-guided robot" like it is one thing. It is actually five.</p>
</div>

<div class="wide">
<div class="five">
<figure class="sheet fig-anim"><svg viewBox="0 0 120 70" role="img" aria-label="Sensing"><g filter="url(#wc)"><ellipse class="bloom" style="--o:.45" cx="60" cy="36" rx="52" ry="28" fill="#01AC95"/><circle class="bloom" style="--d:.3s" cx="60" cy="36" r="13" fill="#0E1114"/></g></svg><h3>See</h3><p>The camera finds the part. 2D works for flat, simple layouts. 3D is needed when height and piles matter.</p></figure>
<figure class="sheet fig-anim"><svg viewBox="0 0 120 70" role="img" aria-label="AI"><g filter="url(#wc)"><ellipse class="bloom" style="--o:.4;--d:.4s" cx="60" cy="36" rx="52" ry="28" fill="#B7C5C3"/><circle class="bloom" style="--d:.6s" cx="40" cy="30" r="8" fill="#0F4A46"/><circle class="bloom" style="--d:.7s" cx="66" cy="46" r="8" fill="#01AC95"/><circle class="bloom" style="--d:.8s" cx="84" cy="24" r="8" fill="#0F4A46"/></g></svg><h3>AI</h3><p>Helps to recognise the part and its position. It cannot see a part that is hidden.</p></figure>
<figure class="sheet fig-anim"><svg viewBox="0 0 120 70" role="img" aria-label="Planning"><g filter="url(#wc)"><ellipse class="bloom" style="--o:.45;--d:.8s" cx="60" cy="36" rx="52" ry="28" fill="#01AC95"/></g><path class="brush" pathLength="1" filter="url(#bru)" style="--d:1s" d="M18 52 C 40 10, 70 60, 100 20" fill="none" stroke="#0F4A46" stroke-width="4" stroke-linecap="round"/></svg><h3>Plan</h3><p>Picks a grip point. Plans a safe path in and out.</p></figure>
<figure class="sheet fig-anim"><svg viewBox="0 0 120 70" role="img" aria-label="Gripping"><g filter="url(#wc)"><ellipse class="bloom" style="--o:.4;--d:1.2s" cx="60" cy="36" rx="52" ry="28" fill="#B7C5C3"/></g><g filter="url(#wc2)" class="bob" style="--y:5px"><rect x="54" y="4" width="12" height="24" fill="#0F4A46"/><rect x="38" y="26" width="44" height="9" rx="2" fill="#0F4A46"/><rect x="38" y="33" width="7" height="22" fill="#0F4A46"/><rect x="75" y="33" width="7" height="22" fill="#0F4A46"/></g><use href="#cast" transform="translate(60 50) scale(.75)"/></svg><h3>Grip</h3><p>Holds the part firmly. Does not cover the face needed for the next step.</p></figure>
<figure class="sheet fig-anim"><svg viewBox="0 0 120 70" role="img" aria-label="Control"><g filter="url(#wc)"><ellipse class="bloom" style="--o:.45;--d:1.6s" cx="60" cy="36" rx="52" ry="28" fill="#01AC95"/><rect class="bloom" style="--d:1.8s" x="36" y="18" width="48" height="36" rx="5" fill="#0F4A46"/><circle class="bloom" style="--d:2s" cx="50" cy="36" r="5" fill="#B7C5C3"/><circle class="bloom" style="--d:2.1s" cx="70" cy="36" r="5" fill="#C98A3A"/></g></svg><h3>Control</h3><p>Talks to the machine. Ready, busy, clamped, done.</p></figure>
</div>
</div>

<div class="wrap">
<p>If one is weak, the cell fails. Good vision alone is not enough.</p>

<h2 id="place">The place is as important as the pick</h2>
<p>Most people talk about the pick. In my view, many jobs fail at the place.</p>
<p>When the part reaches the tray or the machine, check five things.</p>
</div>

<div class="wide" style="max-width:860px">
<div class="sheet fig-anim dest">
<svg viewBox="0 0 420 250" role="img" aria-label="A part dropping into the last empty pocket of a tray">
<g filter="url(#wc)"><ellipse class="bloom" style="--o:.25" cx="210" cy="150" rx="200" ry="95" fill="#01AC95"/><rect class="bloom" style="--o:.8;--d:.2s" x="60" y="110" width="300" height="120" rx="12" fill="#9fb3b0"/></g>
<g filter="url(#wc2)" fill="#e9eeec"><rect x="78" y="124" width="80" height="42" rx="6"/><rect x="170" y="124" width="80" height="42" rx="6"/><rect x="262" y="124" width="80" height="42" rx="6"/><rect x="78" y="176" width="80" height="42" rx="6"/><rect x="170" y="176" width="80" height="42" rx="6"/><rect x="262" y="176" width="80" height="42" rx="6"/></g>
<g filter="url(#wc2)"><use href="#cast" transform="translate(118 145) scale(1.15)"/><use href="#cast" transform="translate(210 145) scale(1.15)"/><use href="#cast" transform="translate(302 145) scale(1.15)"/><use href="#cast" transform="translate(118 197) scale(1.15)"/><use href="#cast" transform="translate(210 197) scale(1.15)"/></g>
<g class="drop" filter="url(#wc2)"><use href="#cast" transform="translate(302 197) scale(1.15)"/></g>
<text class="lbl" font-size="26" x="70" y="60">sixth part, last pocket</text>
</svg>
<ul class="checks">
<li><svg viewBox="0 0 30 30"><path class="brush" pathLength="1" filter="url(#bru)" style="--d:.6s" d="M5 16 L12 23 L26 6" fill="none" stroke="#01AC95" stroke-width="4" stroke-linecap="round"/></svg>Right part</li>
<li><svg viewBox="0 0 30 30"><path class="brush" pathLength="1" filter="url(#bru)" style="--d:1.1s" d="M5 16 L12 23 L26 6" fill="none" stroke="#01AC95" stroke-width="4" stroke-linecap="round"/></svg>Right way up</li>
<li><svg viewBox="0 0 30 30"><path class="brush" pathLength="1" filter="url(#bru)" style="--d:1.6s" d="M5 16 L12 23 L26 6" fill="none" stroke="#01AC95" stroke-width="4" stroke-linecap="round"/></svg>Fully seated</li>
<li><svg viewBox="0 0 30 30"><path class="brush" pathLength="1" filter="url(#bru)" style="--d:2.1s" d="M5 16 L12 23 L26 6" fill="none" stroke="#01AC95" stroke-width="4" stroke-linecap="round"/></svg>Right count</li>
<li><svg viewBox="0 0 30 30"><path class="brush" pathLength="1" filter="url(#bru)" style="--d:2.6s" d="M5 16 L12 23 L26 6" fill="none" stroke="#01AC95" stroke-width="4" stroke-linecap="round"/></svg>Right sequence</li>
</ul>
</div>
</div>

<div class="wrap">
<p style="margin-top:28px">Take kitting. The robot picks brackets, seals and bolts for one order.</p>
<p>Every pick can be right. The kit can still be wrong. One look-alike bracket is enough.</p>

<h2 id="types">11 types of pick-and-place work</h2>
<p>Pick-and-place is not one job. These are the common types. Many of them overlap.</p>
</div>

<div class="wide">
<div class="fam">
<div><b>Machine loading</b><span>Put a blank into a CNC chuck. The machine must confirm it is clamped.</span></div>
<div><b>Conveyor picking</b><span>Parts keep moving while the robot decides. Timing is everything.</span></div>
<div><b>Random bin picking</b><span>Parts overlap and hide each other. Every pick changes the pile.</span></div>
<div><b>Tray and rack handling</b><span>A pocket can be empty, double or damaged.</span></div>
<div><b>Feeding and flipping</b><span>The easy grip may block the place. Sometimes a regrip is needed.</span></div>
<div><b>Kitting</b><span>Every pick can be right and the kit still wrong.</span></div>
<div><b>Assembly placement</b><span>Small errors add up. A camera cannot confirm the part is fully pressed in.</span></div>
<div><b>Sorting after inspection</b><span>The OK or NG result must stay with the right part.</span></div>
<div><b>Packing</b><span>Cartons change shape. A bad place can hide inside the box.</span></div>
<div><b>Palletizing</b><span>A neat stack is not always a stable stack.</span></div>
<div><b>Station-to-station handoff</b><span>After a stop, a blind retry can load a fixture twice.</span></div>
</div>
</div>

<div class="wrap">
<h2 id="ask">What to ask before you buy a picking cell</h2>
<p>Do not ask only "how fast is it?" Ask about the full job. Take these four questions to your next vendor meeting.</p>
<div class="ask">
<ul id="asklist">
<li>How many good parts per hour, over a full shift? Not the best minute.</li>
<li>How often did a person have to step in?</li>
<li>Was it tested with a full bin and an almost empty bin?</li>
<li>What happens after a jam or a stop?</li>
</ul>
<button type="button" id="copyask" aria-live="polite">Copy these questions</button>
</div>
<p>Simple maths. 1,000 picks at 99% success is still 10 misses in a shift.</p>
<p>Some misses the robot can recover. Some need a person. Ask which ones.</p>
<p class="pull">A demo shows the robot can do the move. A factory also needs to know when it should stop, and how it restarts.</p>

<h2 id="who">Who is solving this today</h2>
<p>3D vision for bin picking has moved fast in the last two years. Two companies I follow closely.</p>
</div>

<div class="wide">
<div class="three">
<figure class="sheet fig-anim">
<svg viewBox="0 0 300 150" role="img" aria-label="A fixed 3D camera above a bin of parts">
<g filter="url(#wc)"><ellipse class="bloom" style="--o:.3" cx="150" cy="85" rx="135" ry="60" fill="#B7C5C3"/><path class="bloom" style="--o:.7;--d:.3s" d="M70 95 L230 95 L215 145 L85 145 Z" fill="#7f9895"/><rect class="bloom" style="--d:.5s" x="125" y="8" width="50" height="24" rx="5" fill="#0F4A46"/></g>
<path class="bloom" style="--o:.35;--d:.8s" d="M135 32 L85 95 L215 95 L165 32 Z" fill="#01AC95" filter="url(#wc2)"/>
<g filter="url(#wc2)"><circle class="bloom" style="--d:1s" cx="120" cy="115" r="13" fill="#C98A3A"/><circle class="bloom" style="--d:1.1s" cx="150" cy="110" r="13" fill="#b07a30"/><circle class="bloom" style="--d:1.2s" cx="178" cy="118" r="13" fill="#d9a35a"/></g>
</svg>
<h3>Eureka Robotics</h3>
<p>Launched StereoPick in October 2026. Upload the CAD of the part and gripper. The software trains itself on images made from the CAD. No coding. Runs on site. They report over 30 million picks, at Pratt &amp; Whitney, Subaru and Coherent.</p>
</figure>
<figure class="sheet fig-anim">
<svg viewBox="0 0 300 150" role="img" aria-label="A 3D camera mounted on the robot arm checks the part in the gripper">
<g filter="url(#wc)"><ellipse class="bloom" style="--o:.3" cx="150" cy="85" rx="135" ry="60" fill="#01AC95"/></g>
<g class="bob" style="--y:-10px" filter="url(#wc2)"><rect x="144" y="0" width="12" height="70" fill="#0F4A46"/><rect x="158" y="34" width="34" height="18" rx="4" fill="#0E1114"/><rect x="126" y="66" width="48" height="11" rx="3" fill="#0F4A46"/><rect x="126" y="74" width="8" height="24" fill="#0F4A46"/><rect x="166" y="74" width="8" height="24" fill="#0F4A46"/><use href="#cast" transform="translate(150 98)"/></g>
<path class="bloom" style="--o:.4;--d:.6s" d="M180 52 L150 100 L200 104 Z" fill="#01AC95" filter="url(#wc2)"/>
<text class="lbl" font-size="22" x="200" y="40">sees it in hand</text>
</svg>
<h3>Inbolt</h3>
<p>Puts the 3D camera on the robot arm. After the pick, it checks the part in the gripper and corrects the place. They report under 1 second per pick and up to 95% success in production. Stellantis, Toyota and Ford use them.</p>
</figure>
<figure class="sheet fig-anim">
<svg viewBox="0 0 300 150" role="img" aria-label="Any robot arm connected to a station checklist">
<g filter="url(#wc)"><ellipse class="bloom" style="--o:.35" cx="150" cy="85" rx="135" ry="60" fill="#B7C5C3"/><rect class="bloom" style="--d:.4s;--o:.8" x="46" y="40" width="80" height="96" rx="8" fill="#F6F3EA"/></g>
<g filter="url(#bru)" stroke="#0F4A46" stroke-width="4" stroke-linecap="round" fill="none"><path class="brush" pathLength="1" style="--d:.6s" d="M60 62 L112 62"/><path class="brush" pathLength="1" style="--d:.8s" d="M60 84 L104 84"/><path class="brush" pathLength="1" style="--d:1s" d="M60 106 L110 106"/></g>
<g filter="url(#wc2)" fill="#0F4A46"><rect class="bloom" style="--d:1.1s" x="190" y="112" width="60" height="22" rx="6"/><rect class="bloom" style="--d:1.2s" x="212" y="56" width="14" height="60"/><rect class="bloom" style="--d:1.3s" x="212" y="52" width="60" height="13" rx="4" transform="rotate(-25 219 58)"/></g>
<path class="brush" pathLength="1" filter="url(#bru)" style="--d:1.5s" d="M130 88 C 160 70, 180 70, 205 80" fill="none" stroke="#01AC95" stroke-width="4" stroke-linecap="round"/>
<text class="lbl" font-size="22" x="56" y="30">CAD + station SOP</text>
</svg>
<h3>Spatia</h3>
<p>CAD-based zero-shot learning. No images to label. A 3D depth camera, either on the arm (eye-in-hand) or above the cell (eye-to-hand). Works with any robot on ROS 2. And we check the full job, from pick to place, against the station SOP.</p>
</figure>
</div>
</div>

<div class="wrap">
<p style="margin-top:28px">Both Eureka and Inbolt are strong. Eureka makes setup for a new part fast. Inbolt handles bins and lines that move. Both show bin picking is no longer only a lab problem. That is good for everyone in this space.</p>

<h2 id="spatia">Where Spatia fits</h2>
<p>Most bin picking software starts in a lab. We started on the shop floor.</p>
<p>Through Seewise.AI, our vision AI already runs on real assembly lines. A major car manufacturer uses it. So do a global electronics brand, a tier-1 auto parts supplier and a leading two-wheeler maker.</p>
<p>We have spoken to more than 3,500 manufacturers. We know where lines break. Shiny parts. Bad lighting. Operators who skip a step. Bins that are never full.</p>
<p>Spatia brings this experience to the robot.</p>
<p>Our software uses CAD-based zero-shot learning. Give it the CAD of the part. No need to collect and label images. It works with a 3D depth camera, either on the robot arm (eye-in-hand) or fixed above the cell (eye-to-hand).</p>
<p>It is built for any robot on ROS 2. We call it BYOR, bring your own robot. Today it is validated on UR and Flexiv.</p>
<p>Our biggest difference is the SOP. We know the station. Which part. Which order. Which face to protect. What to do when something goes wrong. We use this to check the full job, not only the pick.</p>
<p>Our approach is simple. Watch the station when people run it. Agree what "correct" means. Then hand one task to the robot, only after it passes testing.</p>
<p>You can see it running at our Experience Center in Chennai, India.</p>
<p>OEMs build the arm. Spatia teaches it the job.</p>
<div class="cta">
<h2>Bring your part. We will show you.</h2>
<p>Send us the CAD. Visit our Experience Center in Chennai, India. We will run your part on the robot with you.</p>
<p>Write to <a href="mailto:spatia@spritle.com"><b>spatia@spritle.com</b></a>.</p>
</div>
<div class="who"><div class="av" aria-hidden="true">B</div><p style="margin:0">Balaji D Loganathan is the founder of Spatia and Seewise.AI. He has spent the last few years on shop floors with manufacturers, putting vision AI on real assembly lines.</p></div>

<section class="refs">
<p class="note">Illustrations are concept drawings. They do not show a customer line. Figures for Eureka Robotics and Inbolt are their own published claims, checked on 24 Nov 2026. Links below.</p>
<h3 style="font-family:Fraunces,Georgia,serif;font-weight:500;color:var(--head);font-size:19px;margin:22px 0 8px">References</h3>
<ol class="sources">
<li><a href="https://www.zivid.com/applications/bin-picking" target="_blank" rel="noopener noreferrer">Zivid: bin picking</a></li>
<li><a href="https://www.cognex.com/en/applications/guidance-and-alignment/vision-guided-robotics-for-industrial-automation" target="_blank" rel="noopener noreferrer">Cognex: vision-guided robotics</a></li>
<li><a href="https://www.cognex.com/en/applications/guidance-and-alignment/vision-guided-robotic-palletizing" target="_blank" rel="noopener noreferrer">Cognex: palletizing and depalletizing</a></li>
<li><a href="https://www.universal-robots.com/applications/machine-tending/" target="_blank" rel="noopener noreferrer">Universal Robots: machine tending</a></li>
<li><a href="https://www.universal-robots.com/developer/integrating-end-of-arm-tools/" target="_blank" rel="noopener noreferrer">Universal Robots: integrating end-of-arm tools</a></li>
<li><a href="https://www.universal-robots.com/articles/ur/safety/safety-faq/" target="_blank" rel="noopener noreferrer">Universal Robots: safety FAQ</a></li>
<li><a href="https://docs.cognex.com/isvs_2610/web/EN/InSight_Sheet/Content/Topics/HowTo/VGR/VGR-guide-pick-and-place.htm" target="_blank" rel="noopener noreferrer">Cognex documentation: guided pick-and-place</a></li>
<li><a href="https://eurekarobotics.com/resources/eureka-robotics-launches-stereopick" target="_blank" rel="noopener noreferrer">Eureka Robotics: StereoPick launch (22 Oct 2026)</a></li>
<li><a href="https://eurekarobotics.com/eureka-3d-vision-software" target="_blank" rel="noopener noreferrer">Eureka Robotics: 3D vision software</a></li>
<li><a href="https://www.automate.org/news/inbolt-unveils-human-like-bin-picking-solution-powered-by-on-arm-ai-vision/aph" target="_blank" rel="noopener noreferrer">Inbolt: bin picking with on-arm AI vision (Dec 2025)</a></li>
<li><a href="https://www.universal-robots.com/ja/plus/products/inbolt/guidenow/" target="_blank" rel="noopener noreferrer">Inbolt on Universal Robots+</a></li>
</ol>
</section>
</div>
