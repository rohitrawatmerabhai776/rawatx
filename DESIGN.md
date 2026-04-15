# Design Brief

## Direction
RawatX — Mobile-first short video reels platform for students with integrated coin earning system. Modern, energetic, accessible.

## Tone
Playful yet focused — bright cyan accents cut through dark backgrounds to signal action and trust, appealing to students without feeling patronizing or cluttered.

## Differentiation
Vibrant cyan/teal accent reserved exclusively for earning and interaction CTAs (watch ads, boost, earn coins) creates clear visual hierarchy and directs attention to monetization workflows.

## Color Palette

| Token          | OKLCH           | Role                                  |
| -------------- | --------------- | ------------------------------------- |
| background     | 0.14 0.012 240  | Dark charcoal, full-screen video fill |
| foreground     | 0.95 0.008 240  | Text on dark backgrounds              |
| card           | 0.18 0.015 240  | Elevated containers (wallet, profile) |
| primary        | 0.72 0.2 200    | Secondary accents, UI chrome          |
| accent         | 0.75 0.24 195   | CTA buttons (watch, earn, boost)      |
| muted          | 0.22 0.015 240  | Disabled, secondary UI                |
| destructive    | 0.65 0.19 22    | Report, block, warning actions        |

## Typography

- Display: Space Grotesk — sharp, modern, tech-forward headlines and section titles
- Body: DM Sans — clean, friendly, highly readable at small mobile sizes
- Scale: hero `text-4xl md:text-5xl font-bold tracking-tight`, h2 `text-2xl font-bold`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Minimal shadow — cards use subtle 1px borders and background shifts to create depth. Focus on content hierarchy via color and typography, not depth effects.

## Structural Zones

| Zone       | Background              | Border                | Notes                              |
| ---------- | ----------------------- | --------------------- | ---------------------------------- |
| Video Hero | bg-background (full)    | —                     | Fills entire viewport, no chrome   |
| Header     | transparent             | —                     | Overlays video, minimal UI         |
| Footer/Nav | bg-card with border-t   | border-border         | Fixed bottom tab navigation        |
| Modals     | bg-card with border     | border-border (1px)   | Wallet, profile, settings          |

## Spacing & Rhythm

Compact spacing on mobile (`p-3`, `gap-2`) with rhythmic section gaps (`mb-4`, `my-6`). Video content dominates; UI chrome minimal. Tab navigation sticky and always visible.

## Component Patterns

- Buttons: `btn-accent` for earn/watch/boost (cyan, full width or pill), `btn-primary` for secondary actions, destructive red for risky actions
- Cards: Rounded corners (`rounded-lg`), subtle bg-card with border, no shadow
- Badges: Coin count via pill badges with accent background, small white text

## Motion

- Entrance: Fade-in on modal open (150ms), slide-up on bottom sheet reveal (200ms)
- Hover: Button text darkens, subtle scale (1.02) on interactive elements
- Decorative: None — motion reserved for functional feedback

## Constraints

- Mobile-first: all layouts designed for portrait orientation, then scale responsively
- Video hero is sacred: never break or clutter the viewport
- Accent color (cyan) used ONLY for earning/boost CTAs to preserve visual weight
- No gradients, full-page effects, or decorative animation — clarity and speed prioritized

## Signature Detail

Cyan/teal accent reserved exclusively for earning actions (watch ads, earn coins, boost reel) — this creates a visual path through monetization and signals opportunity to the student audience without distraction.
