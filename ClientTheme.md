Client Admin App UI Theme Specification
This theme defines the visual identity and experience for the Client (Admin) Web Dashboard. It is designed to convey authority, precision, and trust, enabling clients to manage operations efficiently. The theme must be applied consistently across all admin screens – from financial reports to live maps and complaint handling.

1. Design Philosophy
Data Clarity – tables, charts, and metrics must be readable at a glance, with clear hierarchies.

Efficiency – frequent actions (approve, reject, filter) are prominent; navigation is intuitive.

Professional & Trustworthy – muted backgrounds, subtle shadows, and restrained colours inspire confidence.

Consistency – the same color, spacing, and typography rules as the Rider App, adapted for desktop density.

2. Color Palette
Role	Hex Code	Usage
Primary (Brand)	#0A84FF	Main buttons, active tabs, links, primary actions, selected states
Primary Dark	#0066CC	Hover/pressed states for primary elements
Accent (Success)	#30D158	Approved status, successful actions, profit/positive values
Warning	#FF9F0A	Pending approvals, approaching deadlines, warnings
Danger	#FF453A	Rejected status, critical errors, destructive actions
Neutral Background	#F2F2F7	Main page background (light grey)
Surface / Card	#FFFFFF	Cards, modals, tables, list items
Text Primary	#1C1C1E	Main content text – high contrast
Text Secondary	#6E6E73	Descriptions, hints, less important info, table borders
Border / Divider	#D1D1D6	Card borders, input outlines, table cell borders
Dark Mode (optional): Invert background to dark greys, keep brand colors vibrant.

3. Typography
Font Family: System default (San Francisco on macOS, Segoe UI on Windows, Roboto on Android) for native rendering speed.

Sizes & Weights:

Usage	Size	Weight
Page title (e.g., “Financial Reports”)	24px	Bold (700)
Section / card header	17px	Semibold (600)
Body text, table content	14px	Regular (400)
Secondary info, labels, captions	12px	Regular (400)
Large data / KPI numbers	28px	Bold (700)
Button text	14px	Medium (500)
Line height: 1.5 for body, 1.3 for headings.

4. Spacing & Layout
Padding / Margin scale: 4px, 8px, 12px, 16px, 24px, 32px.

Card internal padding: 20px (desktop), 16px (tablet).

Button height: 40px for standard, 48px for primary CTAs.

Sidebar width: 240px (collapsible to 64px).

Main content max‑width: 1200px, centered.

Responsive breakpoints:

Tablet: ≥768px – sidebar collapses to icons; content stacks.

Desktop: ≥1024px – full sidebar with text, multi‑column layouts.

5. Iconography & Embellishments
Icons: Use Material Icons (or Font Awesome) with consistent 24px size and 2px stroke weight.

Status indicators (besides text):

🟢 / #30D158 circle for Approved/Completed

🟡 / #FF9F0A circle for Pending/Warning

🔴 / #FF453A circle for Rejected/Error

Badges: Rounded pill shape for counts (e.g., “2 new messages”).

6. Component Styles
6.1 Buttons
Primary (CTA): Background #0A84FF, white text, border‑radius 8px, subtle shadow. Hover: #0066CC. Disabled: #E5E5EA background, #6E6E73 text.

Secondary: Transparent background, 1.5px solid #0A84FF border, #0A84FF text. Hover: #F0F6FF background.

Destructive: Transparent background, 1.5px solid #FF453A border, #FF453A text. Hover: #FFF0F0 background.

Success: Background #30D158, white text (used for approve/confirm actions).

Text / Link: #0A84FF with underline on hover.

6.2 Cards
Background #FFFFFF, border‑radius 12px, box‑shadow: 0px 2px 8px rgba(0,0,0,0.06), border: 1px solid #D1D1D6.

Padding: 20px.

6.3 Tables
Header background: #F2F2F7, text #1C1C1E, font‑weight 600, size 12px.

Row height: 48px, hover background #F9F9FB.

Cell padding: 12px horizontal, vertical centering.

Border: bottom only, 1px solid #D1D1D6.

Alternating row colours: none (clean), or subtle #FAFAFC on hover.

Empty state: centered message in #6E6E73.

6.4 Forms
Input fields: height 44px, border 1px solid #D1D1D6, border‑radius 8px, padding horizontal 12px. Focus: border #0A84FF, ring 2px #0A84FF/20.

Labels: #1C1C1E, size 13px, weight 500, margin‑bottom 4px.

Error messages: #FF453A, size 12px, icon + text below field.

Select dropdowns: same styling as inputs, custom chevron.

6.5 Modals
Background: #FFFFFF, border‑radius 16px, shadow 0px 10px 25px rgba(0,0,0,0.15), max‑width 500px.

Header: bold #1C1C1E, size 18px.

Overlay: rgba(0,0,0,0.5).

6.6 Navigation
Sidebar: Dark background? Or white with shadow? Given the overall light theme, a white sidebar with subtle border on the right, identical to Rider header style. Active item: #F0F6FF background, #0A84FF text, left border 3px #0A84FF.

Top Header: 56px height, white background, bottom border, similar to Rider.

6.7 Charts & Maps
Use brand colors for data series (blue, green, amber, red).

Maps: Google Maps with custom markers; style same as Rider map (clean, minimal).

Live map sidebar: same card style.

6.8 Status & Feedback System
Status	Colour	Example
Approved / Completed	#30D158	“Rider Approved”, “Order Delivered”
Pending / Warning	#FF9F0A	“Pending Approval”, “Deadline approaching”
Rejected / Error	#FF453A	“Rejected”, “Cash limit exceeded”
Info / Neutral	#0A84FF	“In Progress”
Use these colours for badges, text, and icons consistently.

7. Mood & Microcopy
Tone: Professional, concise, and supportive. Use “You” when addressing the client. Actions are clear: “Approve”, “Reject”, “View Details”.

Examples:

“Total unpaid profit shares: Rs. 185,000”

“3 riders are awaiting approval.”

“Price update request from Ahmed Khan – expires in 2 minutes.”

8. Layout Principles
Dashboard: Modular cards with KPIs, recent activity, quick actions.

List Views: Filter bar at top, data table below, pagination at bottom.

Detail Views: Two‑column layout on desktop – left for primary info, right for actions/meta.

Responsive: On tablet, the sidebar collapses to icons; cards stack vertically; tables become cards.

9. Accessibility
Minimum contrast ratio 4.5:1 for text.

All interactive elements have visible focus rings (2px #0A84FF).

Form fields have associated labels.

Modals trap focus.

10. Application to Key Screens
The following screens must use the theme consistently (as per the client screen transition diagram):

Dashboard: KPI cards, recent orders, pending approvals summary.

LiveMap: Map + rider list sidebar, animate order replay, intervention modal.

Orders & Messages: Filterable table, message indicators, order detail view with financial breakdown.

Complaints: Active/processed filters, deadline indicators, resolution modal.

Price Update Approvals: Urgent timer countdown, approve/reject buttons, financial impact display.

Financial Reports: Sidebar report selector, filter bar, data tables/charts, export buttons.

Base‑Wise Stats: Base comparison table, drill‑down into trips.

App Treasure: Deposit/withdraw forms, transaction history table.

Budgets & Plans: Profit sharing list, budget/plan creation forms, approval voting.

Discount Events: Event list with status, create/edit modal, approve/reject inline.

Legal Agreements: Version list, upload form, view modal.

System Configuration: Read‑only config view, propose change button, approval flow.

Shops & Bases, Products & Inventory: Management tables, create/edit modals, delivery fee config.

All screens must use the defined colour palette, typography, spacing, and component styles.

11. Developer Handoff
Provide alongside this theme:

A Tailwind config extending the default theme with the custom colours, spacing, font sizes, and breakpoints.

A shared Angular component library (buttons, inputs, cards, tables, modals, status badges) that encapsulates the theme.

A screen flow reference (the client screen transition diagram) to ensure correct usage of components.