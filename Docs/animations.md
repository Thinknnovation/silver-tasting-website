# Silver Tasting — Animation Guidelines

# Animation Philosophy

Animations should enhance elegance and immersion.

Motion must feel:
- cinematic
- smooth
- luxurious
- subtle

Avoid:
- aggressive effects
- flashy transitions
- excessive movement

---

# Animation Stack

## Libraries

- GSAP
- ScrollTrigger
- CSS transitions

---

# Recommended Animations

## Hero Section

Use:
- fade in
- slow upward reveal
- subtle background movement
- parallax effect

---

# Scroll Reveal

Each section should animate on entry.

Recommended:
- opacity fade
- translateY
- stagger animations

---

# Buttons

Buttons should have:
- hover glow
- smooth transition
- soft elevation

Duration:
- 0.3s to 0.5s

---

# Cards

Cards should:
- slightly lift on hover
- scale subtly
- add soft shadows

---

# Navbar

On scroll:
- background blur
- transparency transition
- reduced padding

---

# Gallery

Images should:
- scale slightly on hover
- reveal smoothly
- maintain cinematic feel

---

# Page Loading

Recommended:
- luxury loader
- logo reveal
- fade transition

Avoid:
- long loading screens

---

# GSAP Examples

## Fade Up

```javascript
gsap.from('.fade-up', {
  opacity: 0,
  y: 60,
  duration: 1,
  stagger: 0.2
});