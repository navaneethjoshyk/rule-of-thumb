import FittsDemo from '../demos/Fitts'
import HicksDemo from '../demos/Hicks'
import MillerDemo from '../demos/Miller'
import JakobsDemo from '../demos/Jakobs'
import DohertyDemo from '../demos/Doherty'
import VonRestorffDemo from '../demos/VonRestorff'
import ProximityDemo from '../demos/Proximity'
import HierarchyDemo from '../demos/Hierarchy'
import LineLengthDemo from '../demos/LineLength'
import ContrastDemo from '../demos/Contrast'
import ColorAloneDemo from '../demos/ColorAlone'
import TargetSizeDemo from '../demos/TargetSize'
import FocusVisibleDemo from '../demos/FocusVisible'
import SystemStatusDemo from '../demos/SystemStatus'
import ErrorRecoveryDemo from '../demos/ErrorRecovery'
import LabelsDemo from '../demos/Labels'

export const categories = [
  { id: 'laws', name: 'Laws of UX', blurb: 'How people perceive, decide and remember. These come from psychology research, not taste.' },
  { id: 'visual', name: 'Visual design', blurb: 'Spacing, size and type decide what people see first and whether they can read it.' },
  { id: 'a11y', name: 'Accessibility', blurb: 'Rules from WCAG that make interfaces work for people with different eyes, hands and devices.' },
  { id: 'feedback', name: 'Feedback and forms', blurb: 'Keep people informed, let them fix mistakes and never make them guess what a field is for.' },
]

export const lessons = [
  {
    slug: 'fitts-law',
    category: 'laws',
    title: 'Fitts’s law',
    summary: 'The time it takes to hit a target depends on how big it is and how far away it is.',
    instruction: 'Press Start, then click the circle as fast as you can. Do it about ten times and compare the two averages.',
    Demo: FittsDemo,
    why: [
      'In 1954, psychologist Paul Fitts showed that pointing at something is a predictable aiming task: the further away and the smaller the target, the longer it takes and the more often people miss.',
      'Every click and tap in an interface is one of these tasks. That’s why primary buttons are large, why context menus open right at the cursor, and why the edges of a screen are prime real estate: the pointer can’t overshoot them.',
    ],
    dos: [
      'Make primary actions large and easy to reach.',
      'Put actions close to where attention already is, like a Save button right under the form.',
      'Give small icons generous padding so the clickable area is bigger than the icon.',
    ],
    donts: [
      'Hide a tiny close button in the far corner of a large dialog.',
      'Pack important links so tightly that people hit the wrong one.',
      'Use hover menus that need precise steering to reach a submenu.',
    ],
    quiz: {
      q: 'Save and Delete sit side by side and are the same small size. What does Fitts’s law suggest?',
      options: [
        'Make Save larger and move Delete further away from it.',
        'Make both buttons smaller so neither one dominates.',
        'Move both to the top corner of the screen.',
      ],
      answer: 0,
      explain: 'Make the common action easy to hit, and put distance between it and the dangerous one so a slip doesn’t delete anything.',
    },
    sources: [
      { label: 'Fitts’s law, Laws of UX', url: 'https://lawsofux.com/fittss-law/' },
      { label: 'Fitts’s law and its applications in UX, Nielsen Norman Group', url: 'https://www.nngroup.com/articles/fitts-law/' },
    ],
  },
  {
    slug: 'hicks-law',
    category: 'laws',
    title: 'Hick’s law',
    summary: 'The more choices you show at once, the longer it takes to make one.',
    instruction: 'Choose how many options to show, press Start, then find the city named in the prompt. Try all three sizes.',
    Demo: HicksDemo,
    why: [
      'William Hick and Ray Hyman found in the early 1950s that decision time grows with the number of choices. It grows slowly, roughly with the logarithm of the count, but it grows.',
      'Long menus, crowded settings pages and pricing tables with too many plans all slow people down. Hick’s law doesn’t mean “always show fewer options”. A long alphabetical list of countries is fine because people search it rather than weigh each option. It matters most when every option needs thought.',
    ],
    dos: [
      'Highlight a recommended option when people tend to get stuck.',
      'Split complex tasks into smaller steps with fewer choices each.',
      'Group long lists into a few clearly named categories.',
    ],
    donts: [
      'Show every feature in the main navigation.',
      'Ask people to pick between options that look nearly identical.',
    ],
    quiz: {
      q: 'Which change applies Hick’s law best to a settings page with 40 options?',
      options: [
        'Put all 40 in one long alphabetical list.',
        'Group them into a few clearly named sections.',
        'Hide most of them behind unlabelled icons.',
      ],
      answer: 1,
      explain: 'Grouping turns one big decision into two small ones: pick a section, then pick a setting.',
    },
    sources: [{ label: 'Hick’s law, Laws of UX', url: 'https://lawsofux.com/hicks-law/' }],
  },
  {
    slug: 'millers-law',
    category: 'laws',
    title: 'Miller’s law and chunking',
    summary: 'Working memory holds only a handful of things, so break information into chunks.',
    instruction: 'Pick a format, press Show number, memorise it for 3 seconds, then type it back. Try both formats.',
    Demo: MillerDemo,
    why: [
      'George Miller’s 1956 paper “The magical number seven, plus or minus two” is famous, and often misused. Later research suggests the real limit is closer to four chunks. Either way, the useful lesson isn’t a magic number.',
      'The useful lesson is chunking. People remember 416 555 0198 far more easily than 4165550198 because three chunks fit in memory and ten loose digits don’t. The same goes for card numbers, codes and long forms.',
    ],
    dos: [
      'Group long numbers and codes into short chunks.',
      'Break long forms into short, named sections.',
      'Show people what they need instead of making them remember it from a previous screen.',
    ],
    donts: [
      'Treat “seven items max” as a strict rule for menus.',
      'Show a verification code as one long unbroken string.',
    ],
    quiz: {
      q: 'What is the most practical takeaway from Miller’s law?',
      options: [
        'Navigation menus must have exactly seven items.',
        'People can’t read more than seven words at a time.',
        'Chunk information so it’s easier to scan and remember.',
      ],
      answer: 2,
      explain: 'The number is debated. Chunking is what reliably helps.',
    },
    sources: [{ label: 'Miller’s law, Laws of UX', url: 'https://lawsofux.com/millers-law/' }],
  },
  {
    slug: 'jakobs-law',
    category: 'laws',
    title: 'Jakob’s law',
    summary: 'People spend most of their time on other sites, so they expect yours to work the same way.',
    instruction: 'Press Start and click the shopping cart. Do it in the familiar layout, then in the unusual one.',
    Demo: JakobsDemo,
    why: [
      'Jakob Nielsen pointed out that what people know about your product mostly comes from everyone else’s. They learned that the logo goes home, the cart lives top right and a magnifying glass means search.',
      'When you break those conventions, people have to stop and relearn. Save originality for the parts of your product that make it different, and keep the basics boringly familiar.',
    ],
    dos: [
      'Follow platform conventions for navigation, icons and forms.',
      'When you change a familiar pattern, change it gradually and explain it.',
      'Spend your creativity on what makes your product unique.',
    ],
    donts: [
      'Invent a new icon for something that already has a well-known one.',
      'Move core navigation somewhere unexpected just to look different.',
    ],
    quiz: {
      q: 'You’re redesigning a checkout. Where should Jakob’s law make you most careful about being creative?',
      options: [
        'The illustration on the confirmation screen.',
        'The order of the fields and where the Pay button sits.',
        'The wording of the thank-you message.',
      ],
      answer: 1,
      explain: 'Field order and button placement are conventions people rely on. The illustration and thank-you copy are safe places to show personality.',
    },
    sources: [{ label: 'Jakob’s law, Laws of UX', url: 'https://lawsofux.com/jakobs-law/' }],
  },
  {
    slug: 'doherty-threshold',
    category: 'laws',
    title: 'The Doherty threshold',
    summary: 'Responses under about 400 milliseconds feel instant and keep people in flow.',
    instruction: 'Set a response time, then press Search flights. Try a slow time with and without the loading skeleton.',
    Demo: DohertyDemo,
    why: [
      'In 1982, IBM researchers Walter Doherty and Ahrvind Thadani found that productivity jumps when a system responds in under 400 ms. Below that, people stay focused. Above it, attention starts to wander.',
      'You can’t always be that fast, but you can always respond that fast. Acknowledge the action immediately, then show progress, a skeleton of the result, or an optimistic update while the real work finishes.',
    ],
    dos: [
      'Acknowledge every tap or click immediately, even if the work takes longer.',
      'Use skeleton screens or progress bars for waits longer than about a second.',
      'Update the screen optimistically for actions that almost always succeed, like a like or a star.',
    ],
    donts: [
      'Leave a button looking untouched while something happens in the background.',
      'Flash a spinner for actions that are actually instant.',
    ],
    quiz: {
      q: 'A search takes 2 seconds on the server. What helps most?',
      options: [
        'Show a skeleton of the results the moment someone searches.',
        'Show nothing until the results arrive.',
        'Cover the page with a full-screen overlay until it’s done.',
      ],
      answer: 0,
      explain: 'The skeleton responds instantly, shows the shape of what’s coming and makes the wait feel shorter.',
    },
    sources: [{ label: 'Doherty threshold, Laws of UX', url: 'https://lawsofux.com/doherty-threshold/' }],
  },
  {
    slug: 'von-restorff-effect',
    category: 'laws',
    title: 'The Von Restorff effect',
    summary: 'When several similar things appear together, the one that’s different gets noticed and remembered.',
    instruction: 'Glance at the dialog. Which button did your eye go to? Now turn on the switch and look again.',
    Demo: VonRestorffDemo,
    why: [
      'Psychologist Hedwig von Restorff showed in 1933 that the odd one out in a list is the one people remember. It’s also called the isolation effect.',
      'In interfaces, it’s how you point at the next step. A single filled button among quiet ones tells people where to go without them reading every label. It only works if you use it sparingly: when everything is highlighted, nothing is.',
    ],
    dos: [
      'Give each screen one clearly distinct primary action.',
      'Make it different in more than color: size, weight or fill as well.',
      'Keep highlights rare so they keep their meaning.',
    ],
    donts: [
      'Style every button as a primary button.',
      'Make ads or promotions look like the main action.',
    ],
    quiz: {
      q: 'A pricing page gives all three plans a badge and a bright border. What’s the problem?',
      options: [
        'Badges are an outdated pattern.',
        'Three plans is too many choices.',
        'When everything stands out, nothing does.',
      ],
      answer: 2,
      explain: 'Distinctiveness is relative. Highlight the one plan you recommend and keep the others quiet.',
    },
    sources: [{ label: 'Von Restorff effect, Laws of UX', url: 'https://lawsofux.com/von-restorff-effect/' }],
  },
  {
    slug: 'law-of-proximity',
    category: 'visual',
    title: 'The law of proximity',
    summary: 'Things that are close together look like they belong together.',
    instruction: 'Drag the slider to add space between each label and its field. Watch for the point where the labels seem to belong to the wrong box.',
    Demo: ProximityDemo,
    why: [
      'Proximity is one of the Gestalt principles of perception: our brains group nearby objects before we read a single word. Spacing is information.',
      'In forms, each label should sit clearly closer to its own field than to the field above it. In layouts, use small gaps inside a group and bigger gaps between groups. Often that’s all the structure you need, with no boxes or divider lines.',
    ],
    dos: [
      'Keep each label closer to its field than to anything else.',
      'Use more space between groups than within them.',
      'Group related controls, like filters, with spacing first.',
    ],
    donts: [
      'Use the same spacing everywhere.',
      'Add borders and dividers to fix grouping that spacing could fix.',
    ],
    quiz: {
      q: 'In a form, the gap between a label and its field is 16 px, and the gap between fields is also 16 px. What happens?',
      options: [
        'Labels look equally related to the field above and below.',
        'Nothing. Consistent spacing is always good.',
        'The form looks shorter, which helps completion.',
      ],
      answer: 0,
      explain: 'Equal gaps remove the grouping signal. Tighten the label gap or increase the gap between fields.',
    },
    sources: [{ label: 'Law of proximity, Laws of UX', url: 'https://lawsofux.com/law-of-proximity/' }],
  },
  {
    slug: 'visual-hierarchy',
    category: 'visual',
    title: 'Visual hierarchy',
    summary: 'Size, weight, color and position tell people what to read first.',
    instruction: 'Switch between Flat and Clear hierarchy. Then turn on the squint test. What can you still make out?',
    Demo: HierarchyDemo,
    why: [
      'People scan before they read. Visual hierarchy is how you decide what they find during that scan: the title, then the key detail, then the action.',
      'The squint test is a quick check. Blur your eyes (or the screen) and see what still stands out. If the answer is “everything equally” or “the wrong thing”, the hierarchy needs work.',
    ],
    dos: [
      'Make the most important thing the largest or boldest.',
      'Stick to two or three levels of emphasis.',
      'Check layouts with the squint test.',
    ],
    donts: [
      'Make everything bold, big or colorful.',
      'Use color as the only signal of importance.',
    ],
    quiz: {
      q: 'You squint at a product page and the most visible thing is the cookie banner. What does that tell you?',
      options: [
        'The page has good contrast.',
        'The hierarchy is pointing people at the wrong thing.',
        'The product photo is too small to matter.',
      ],
      answer: 1,
      explain: 'The squint test shows what wins attention. If it isn’t the product and the Buy button, rebalance size and contrast.',
    },
    sources: [{ label: 'Visual hierarchy in UX, Nielsen Norman Group', url: 'https://www.nngroup.com/articles/visual-hierarchy-ux-definition/' }],
  },
  {
    slug: 'line-length',
    category: 'visual',
    title: 'Line length',
    summary: 'Lines of about 45–80 characters are the easiest to read.',
    instruction: 'Drag the slider to change how many characters fit on a line. Read a couple of lines at each end.',
    Demo: LineLengthDemo,
    why: [
      'At the end of every line, your eyes sweep back to find the start of the next one. Long lines make that trip long and error-prone. Short lines make you sweep so often the rhythm breaks.',
      'Typographers have used roughly 45–75 characters for centuries, and WCAG’s visual presentation guidance recommends no more than 80. In CSS, a max-width in ch units, like 65ch, does this neatly.',
    ],
    dos: [
      'Set a max-width on text blocks, something like 60–70ch.',
      'Give longer lines slightly more line height.',
    ],
    donts: [
      'Let body text stretch the full width of a wide screen.',
      'Squeeze body text into narrow columns to fit more on the page.',
    ],
    quiz: {
      q: 'Which CSS rule is a good starting point for readable article text?',
      options: [
        'p { width: 100%; }',
        'p { max-width: 65ch; }',
        'p { max-width: 25ch; }',
      ],
      answer: 1,
      explain: '65ch is right in the comfortable range and adapts to the font size automatically.',
    },
    sources: [
      { label: 'Understanding SC 1.4.8: Visual presentation, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html' },
      { label: 'Readability: the optimal line length, Baymard Institute', url: 'https://baymard.com/blog/line-length-readability' },
    ],
  },
  {
    slug: 'color-contrast',
    category: 'a11y',
    title: 'Color contrast',
    summary: 'Text needs enough contrast with its background for everyone to read it.',
    instruction: 'Pick a text and background color, or try a preset. The ratio and the WCAG checks update as you go.',
    Demo: ContrastDemo,
    why: [
      'Low contrast hurts people with low vision, older eyes, cheap screens and anyone reading outside in the sun. WCAG 2.1 level AA asks for a ratio of at least 4.5:1 for normal text and 3:1 for large text (about 24 px, or 19 px bold).',
      'Buttons, input borders and meaningful icons need at least 3:1 against what’s around them. Light grey placeholder text and pale borders are the most common failures.',
    ],
    dos: [
      'Check every text and background pair, including hover and disabled states.',
      'Aim higher than the minimum for long-form body text.',
      'Check input borders and icons against 3:1 too.',
    ],
    donts: [
      'Use light grey text for anything people actually need to read.',
      'Put white text on yellow, light green or bright orange.',
    ],
    quiz: {
      q: 'Your body text is #767676 on white, a ratio of 4.54:1. Does it pass WCAG AA?',
      options: [
        'Yes, it just meets the 4.5:1 minimum.',
        'No, body text needs 7:1.',
        'Only if the text is bold.',
      ],
      answer: 0,
      explain: '#767676 is famously the lightest grey that passes AA on white. 7:1 is the stricter AAA level.',
    },
    sources: [
      { label: 'Understanding SC 1.4.3: Contrast (minimum), W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html' },
      { label: 'Understanding SC 1.4.11: Non-text contrast, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html' },
      { label: 'Contrast checker, WebAIM', url: 'https://webaim.org/resources/contrastchecker/' },
    ],
  },
  {
    slug: 'not-color-alone',
    category: 'a11y',
    title: 'Don’t rely on color alone',
    summary: 'Pair color with text, icons or patterns so the meaning survives without it.',
    instruction: 'Turn on “See it without color”. Can you still tell which field has a problem? Then add an icon and message.',
    Demo: ColorAloneDemo,
    why: [
      'Around 1 in 12 men and 1 in 200 women have some form of color vision deficiency. Red and green, the classic error and success colors, are the pair most often confused.',
      'WCAG 1.4.1 says color can’t be the only way you convey information. A red border is fine as long as there’s also an icon and a message that says what’s wrong.',
    ],
    dos: [
      'Add an icon and a written message to every error state.',
      'Use labels or patterns in charts, not just colored lines.',
      'Underline links in body text.',
    ],
    donts: [
      'Mark required or invalid fields with color only.',
      'Use red and green as the only difference between two states.',
    ],
    quiz: {
      q: 'A chart shows profit in green and loss in red, with no other labels. What’s the simplest fix?',
      options: [
        'Make the green and red brighter.',
        'Label the values and add + and − signs.',
        'Switch to blue and orange.',
      ],
      answer: 1,
      explain: 'Better colors help, but text labels work for everyone, including people printing in black and white.',
    },
    sources: [{ label: 'Understanding SC 1.4.1: Use of color, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html' }],
  },
  {
    slug: 'target-size',
    category: 'a11y',
    title: 'Touch target size',
    summary: 'Make tap targets big enough to hit, with room around them.',
    instruction: 'Tap the highlighted icon. Like a real thumb, your tap lands a little off each time. Shrink and grow the buttons and watch the misses.',
    Demo: TargetSizeDemo,
    why: [
      'Fingers are imprecise, and people tap while walking, riding transit or holding a coffee. People with tremors or limited dexterity find small targets harder still.',
      'WCAG 2.2 sets a minimum of 24 × 24 CSS pixels (level AA) and recommends 44 × 44 (level AAA). Apple suggests 44 points and Material Design 48 dp. The icon can stay small. Make the tappable area big.',
    ],
    dos: [
      'Make the tappable area at least 44 × 44 px for important actions.',
      'Leave space between adjacent targets.',
      'Pad small icons so the hit area is larger than the icon.',
    ],
    donts: [
      'Place small icon buttons right next to each other.',
      'Make text links the only way to do something important on mobile.',
    ],
    quiz: {
      q: 'Your icon is 16 px and looks great. How do you meet target size guidance without making it bigger?',
      options: [
        'You can’t. The icon has to be 44 px.',
        'Add padding so the button’s clickable area is at least 44 px.',
        'Add a tooltip.',
      ],
      answer: 1,
      explain: 'Target size is about the hit area, not the drawing. Padding gets you there.',
    },
    sources: [
      { label: 'Understanding SC 2.5.8: Target size (minimum), W3C', url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' },
      { label: 'Understanding SC 2.5.5: Target size (enhanced), W3C', url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html' },
    ],
  },
  {
    slug: 'visible-focus',
    category: 'a11y',
    title: 'Visible focus',
    summary: 'Keyboard users need to see where they are on the page at all times.',
    instruction: 'Click “Start here”, then press Tab to move through the controls. Turn on “Hide the focus ring” and try again.',
    Demo: FocusVisibleDemo,
    why: [
      'Plenty of people never touch a mouse: screen reader users, people with motor impairments and power users who move faster with a keyboard. The focus indicator is their cursor.',
      'Removing outlines with outline: none is one of the most common accessibility bugs. WCAG 2.4.7 requires a visible focus indicator. Use :focus-visible to show a strong ring for keyboard users without showing it on every mouse click.',
    ],
    dos: [
      'Style :focus-visible with a clear, high-contrast ring.',
      'Test every page by tabbing through it with no mouse.',
      'Keep the focus order the same as the visual order.',
    ],
    donts: [
      'Write outline: none without a replacement.',
      'Rely on a subtle color shift as the only focus indicator.',
    ],
    quiz: {
      q: 'A designer says the focus ring looks ugly on mouse clicks. What’s the best fix?',
      options: [
        'Remove the outline entirely.',
        'Use :focus-visible so the ring shows for keyboard users only.',
        'Make the outline the same color as the background.',
      ],
      answer: 1,
      explain: 'Browsers show :focus-visible styles when the keyboard is in use, so both groups get what they need.',
    },
    sources: [{ label: 'Understanding SC 2.4.7: Focus visible, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html' }],
  },
  {
    slug: 'system-status',
    category: 'feedback',
    title: 'Visibility of system status',
    summary: 'Always tell people what’s going on, with feedback at the right time.',
    instruction: 'With feedback off, press Upload and wait. Did you click again? Then turn feedback on and compare.',
    Demo: SystemStatusDemo,
    why: [
      'This is the first of Jakob Nielsen’s ten usability heuristics. When an interface goes quiet, people assume it’s broken. They click again, refresh or leave.',
      'Good feedback answers three questions: did it hear me, is it working, and is it done? A pressed state, a progress bar and a confirmation message cover all three.',
    ],
    dos: [
      'Change a button’s state the instant it’s pressed.',
      'Show progress for anything longer than a second or two.',
      'Confirm when something finishes, in words.',
    ],
    donts: [
      'Let a page sit still while it works in the background.',
      'Show a spinner with no idea of how long it will take for long tasks.',
    ],
    quiz: {
      q: 'People keep submitting a payment form twice. What’s the most likely UX cause?',
      options: [
        'The form has too many fields.',
        'There’s no immediate feedback after pressing Pay.',
        'The Pay button is the wrong color.',
      ],
      answer: 1,
      explain: 'Without a pressed state and progress, people assume the first click didn’t work.',
    },
    sources: [
      { label: '10 usability heuristics, Nielsen Norman Group', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
      { label: 'Visibility of system status, Nielsen Norman Group', url: 'https://www.nngroup.com/articles/visibility-system-status/' },
    ],
  },
  {
    slug: 'undo',
    category: 'feedback',
    title: 'Let people undo',
    summary: 'Make mistakes easy to reverse instead of asking “Are you sure?” every time.',
    instruction: 'Delete a message, then try to get it back. Switch to “With undo” and try again.',
    Demo: ErrorRecoveryDemo,
    why: [
      'Nielsen’s third heuristic, user control and freedom, says people need a clearly marked emergency exit. Everyone clicks the wrong thing sometimes.',
      'Confirmation dialogs feel safe, but people click through them on autopilot. An Undo option after the action is faster for the common case and actually catches mistakes. Keep confirmation for things that truly can’t be reversed.',
    ],
    dos: [
      'Offer Undo right after destructive actions like delete or archive.',
      'Keep deleted items recoverable for a while, like a trash folder.',
      'Save confirmation dialogs for actions that really can’t be undone.',
    ],
    donts: [
      'Show an “Are you sure?” dialog for every small action.',
      'Delete things permanently the moment someone clicks.',
    ],
    quiz: {
      q: 'Why is Undo often better than a confirmation dialog?',
      options: [
        'Dialogs are hard to build.',
        'People click through confirmations by habit, while Undo catches the mistake afterwards.',
        'Undo buttons look nicer.',
      ],
      answer: 1,
      explain: 'Confirmations interrupt every action and get ignored. Undo costs nothing until it’s needed.',
    },
    sources: [{ label: 'User control and freedom, Nielsen Norman Group', url: 'https://www.nngroup.com/articles/user-control-and-freedom/' }],
  },
  {
    slug: 'labels-not-placeholders',
    category: 'feedback',
    title: 'Labels, not placeholders',
    summary: 'Keep labels visible. Placeholder text vanishes the moment someone starts typing.',
    instruction: 'With placeholders only, fill in two fields, then try to check what each one was asking for. Switch to visible labels and compare.',
    Demo: LabelsDemo,
    why: [
      'Placeholder-only fields look clean in a mockup, but the hint disappears on the first keystroke. People forget what a field was for, can’t check their answers and sometimes mistake grey placeholder text for a value that’s already filled in.',
      'Placeholder text is also usually low contrast. WCAG 3.3.2 asks for labels or instructions when input is needed. A visible label above the field, plus hint text below it, works for everyone.',
    ],
    dos: [
      'Put a visible label above every field.',
      'Put format hints and examples below the field as helper text.',
      'Connect labels with for and id so clicking the label focuses the field.',
    ],
    donts: [
      'Use placeholder text as the only label.',
      'Put important instructions inside the placeholder.',
    ],
    quiz: {
      q: 'Where should the hint “For example, M5V 2T6” go?',
      options: [
        'As the placeholder, so it disappears once typing starts.',
        'As helper text under the field, so it stays visible.',
        'In a tooltip on a small info icon.',
      ],
      answer: 1,
      explain: 'Helper text stays visible while people type, and it can be linked to the field with aria-describedby.',
    },
    sources: [
      { label: 'Placeholders in form fields are harmful, Nielsen Norman Group', url: 'https://www.nngroup.com/articles/form-design-placeholders/' },
      { label: 'Understanding SC 3.3.2: Labels or instructions, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html' },
    ],
  },
]

export const lessonBySlug = Object.fromEntries(lessons.map((l) => [l.slug, l]))
