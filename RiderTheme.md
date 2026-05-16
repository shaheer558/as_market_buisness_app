Rider App UI Theme Specification
This theme defines the visual identity and experience for the Rider Mobile App. It is designed to be clear, motivating, and calming—so riders feel confident, focused, and rewarded every time they open the app. The theme should be applied consistently across all screens: from login and registration to active trip navigation and wallet.

1. Design Philosophy
Clarity first – information must be scannable at a glance while riding or in bright sunlight.

Motivation through visibility – prominent profit display, clear success states, and encouraging but honest status messages.

Calm and trustworthy – soft backgrounds, no harsh reds unless urgent, gentle transitions.

Efficiency – one‑handed operation on mobile, large tap targets, minimal scrolling for critical actions.

2. Color Palette
Role	Hex Code	Usage
Primary (Brand)	#0A84FF	Main buttons, active tabs, links, selected states, header accents
Primary Dark	#0066CC	Pressed button state, header backgrounds on some screens
Accent (Profit)	#30D158	Profit display, savings, positive amounts, success indicators
Warning	#FF9F0A	Pending actions, frozen amounts, approaching deadlines, medium alerts
Danger	#FF453A	Critical errors, cash limit exceeded, overdue, rejected status
Neutral / Background	#F2F2F7	Main screen background (light grey)
Surface / Card	#FFFFFF	Cards, list items, input fields
Text Primary	#1C1C1E	Main content text – high contrast for readability
Text Secondary	#6E6E73	Descriptions, hints, less important info
Border / Divider	#D1D1D6	Separators, outlines on inputs
Dark Mode (optional, later iteration): same colors but darker backgrounds and adjusted text.

3. Typography
Font Family: System default (San Francisco on iOS, Roboto on Android) for native feel and fast rendering.

Sizes & Weights:

Usage	Size	Weight
Large screen title (e.g., “AVAILABLE ORDERS”)	22px	Bold (700)
Section header	17px	Semibold (600)
Body text, card content	15px	Regular (400)
Secondary info, distances, cash	13px	Regular (400)
Profit amount (large)	28px	Bold (700)
Status badges, button text	15px	Medium (500)
Line height: 1.4 for body, 1.2 for headings.

4. Spacing & Layout
Padding / Margin scale: 4px, 8px, 12px, 16px, 24px.

Card internal padding: 16px.

List item spacing: 12px between cards, 8px within a card.

Button height: 48px for primary actions, 44px for secondary.

Tap targets: minimum 44x44 points (WCAG).

Grid: Single column on mobile, two‑column on tablet (≥768px). The component library should support these breakpoints.

5. Iconography & Embellishments
Icons: Use SF Symbols on iOS, Material Icons on Android – consistent line weight 2.

Emoji in prototypes are replaced by icons:

📍 → map-pin (location)

🟢/🟡/🔴 → small colored dot indicators (see status section)

⏰ → clock icon

☑/☐ → custom checkbox (filled when checked)

⚠ → alert-triangle (warning)

← → back arrow chevron-left

Badges: Rounded pill shape for status and counts (e.g., “2 items”, “Escalated”).

6. Component Styles
6.1 Buttons
Primary (CTA): Background Primary, white text, rounded corners 12px, subtle shadow. Hover: Darker Primary. Disabled: light grey background, grey text.

Secondary (Cancel, Back): Transparent background, Primary border (1.5px), Primary text.

Destructive (Not Received, Close Account): Danger border and text, white background.

Text (Link): Primary color, underline only on hover.

6.2 Cards / List Items
Background White, border-radius 12px, shadow: 0px 2px 8px rgba(0,0,0,0.06).

Padding 16px.

Selected card: light Primary border (2px) and subtle Primary background tint (e.g., #F0F6FF).

For the order list, each card shows product size (small/medium), item count, shop name, region, distance, and an “Escalated” badge if applicable.

6.3 Input Fields
Height 48px, border 1px solid Border, radius 8px, padding horizontal 12px.

Focus: border changes to Primary with a light ring.

Error: border Danger, icon and hint below.

6.4 Navigation & Header
Top bar: 56px height, white background, shadow. Back arrow left, screen title centered, optional right action icon.

Bottom tab bar (future): icons only, but current flow is screen‑by‑screen; thus a simple header suffices.

6.5 Profit Display
Large green Accent number with a small ₹ symbol (if displaying local currency). Use bold, size 28px. Can be accompanied by a brief phrase “You’ll earn”.

In trip preview, show profit right below the header.

6.6 Cash Limit Indicator
Small horizontal bar: green up to 70%, turns to Warning after 70%, Danger after 90%. Display as “Rs. 2,500 / 10,000”.

6.7 Map Area (ActiveTripMap)
Full‑width map integrated via Google Maps, with custom markers for rider (blue dot), shops (orange pin), customers (green pin). The info panel at the bottom uses the same card style with border‑radius top 20px.

7. Status & Feedback System
Status	Color	Icon	Example
Success / Approved	Accent (#30D158)	checkmark circle	“Delivered”, “Payment confirmed”
Warning / Pending	Warning (#FF9F0A)	exclamation triangle	“Awaiting approval”, “Proof pending”
Error / Critical	Danger (#FF453A)	x‑circle	“Cash limit exceeded”, “Account locked”
Info / Neutral	Primary (#0A84FF)	info circle	“Rider is on the way”
Use these consistently for order status, deviation states, price update requests, etc.

8. Mood & Microcopy
Tone: Friendly but direct. Use “You” for the rider. Celebrate wins: “Nice! You earned Rs. 1,850 on this trip.” Warn gently: “Almost there! Add a reason to submit the proof.”

Microcopy examples:

“Select orders to preview earnings”

“Hold tight, we’re finding the best route…”

“Your account is under review. We’ll email you once approved.”

9. Motion & Transitions (Optional)
Subtle fade‑in for screens, slide‑up for bottom sheets.

Map pan snaps to next stop.

List re‑ordering should animate smoothly.

10. Accessibility
Minimum contrast ratio 4.5:1 for text (except large text 3:1).

All interactive elements have accessible labels.

Haptic feedback on successful actions (accept trip, mark processed) if the device supports it.

11. Application to Key Screens
The following screens must use the theme consistently:

SplashLogin: Minimalist, logo centered, input fields with subtle border, primary button.

HomeAvailableOrders: Cards with product size, shop, region, distance, and checkbox. Cash limit bar at top. Preview button fixed at bottom.

OrderPreview: Large profit number, route summary with step numbers, “Accept Trip” primary button.

ActiveTripMap: Full map, info card at bottom with next stop, profit, and action buttons.

ShopStop: Checklist with checkboxes, expected bill amount, product action buttons.

CustomerStop: Delivery details, “Mark as Processed” primary, “Not Received” secondary.

IncidentReport: Three clear card‑like options with icons.

RiderWallet: Balance cards with colored frozen amounts, transaction list.

DeviationProofScreen: Timer countdown, upload area.

All screen prototypes from the previous ASCII designs should be translated to this visual theme, replacing placeholders with proper colors, fonts, and spacing.

12. Developer Handoff
To ensure accurate implementation by another AI or developer, this theme should be provided alongside:

A shared Tailwind config (colors, spacing, font sizes, border radii).

A component library (UI kit) with the defined button, input, card, and status components.

A screen flow reference (the screen transition diagram) to know which states use which components.

