import ButtonsExample from '../examples/Buttons'
import TextFieldExample from '../examples/TextField'
import ChoiceControlsExample from '../examples/ChoiceControls'
import ToggleSwitchExample from '../examples/ToggleSwitch'
import AccordionExample from '../examples/Accordion'
import TabsExample from '../examples/Tabs'
import TooltipExample from '../examples/Tooltip'
import MenuButtonExample from '../examples/MenuButton'
import DialogExample from '../examples/Dialog'
import ToastExample from '../examples/Toast'
import BreadcrumbsExample from '../examples/Breadcrumbs'
import PaginationExample from '../examples/Pagination'

const APG = 'https://www.w3.org/WAI/ARIA/apg/patterns/'
const GOVUK = 'https://design-system.service.gov.uk/components/'

export const componentGroups = [
  { id: 'actions', name: 'Actions', blurb: 'Things people press to make something happen.' },
  { id: 'forms', name: 'Form inputs', blurb: 'Ways to collect information, and to tell people when something is wrong.' },
  { id: 'disclosure', name: 'Show and hide', blurb: 'Components that reveal content on demand, so pages stay scannable.' },
  { id: 'overlays', name: 'Overlays and feedback', blurb: 'Content that appears on top of the page or announces a result.' },
  { id: 'navigation', name: 'Navigation', blurb: 'Help people understand where they are and move through content.' },
]

export const components = [
  {
    slug: 'buttons',
    group: 'actions',
    name: 'Buttons',
    summary: 'A button does something on the current page. A link goes somewhere else.',
    instruction: 'Press Save changes to see a loading state. Try Publish with the name empty, then with a name. Tab to every button.',
    Example: ButtonsExample,
    anatomy: [
      ['Label', 'A verb that says exactly what happens: “Save changes”, not “Submit” or “OK”.'],
      ['Container', 'The visible shape. At least 44 px tall so it’s easy to tap.'],
      ['Icon (optional)', 'Supports the label. An icon-only button still needs an accessible name.'],
      ['States', 'Default, hover, focus, pressed, loading and unavailable, each visibly different.'],
    ],
    useWhen: [
      'The action happens on this page: save, submit, open a dialog, add to cart.',
      'You need a clear primary action for the screen.',
    ],
    avoidWhen: [
      'It takes people to another page. Use a link, even if you style it like a button.',
      'There are many equal actions in a row. Consider a menu or links instead.',
    ],
    keyboard: [
      ['Tab', 'Moves focus to the button'],
      ['Enter', 'Activates the button'],
      ['Space', 'Activates the button'],
    ],
    aria: [
      ['<button>', 'Use the native element. It is focusable and handles Enter and Space for free.'],
      ['aria-label', 'Gives an icon-only button its name, like “Settings”.'],
      ['aria-disabled="true"', 'Marks a button unavailable but keeps it focusable, so you can explain why on press.'],
      ['type="button"', 'Stops a button inside a form from submitting it by accident.'],
    ],
    dos: [
      'Use one primary button per screen or section.',
      'Show a loading state and keep the button’s width steady while work happens.',
      'Explain why an action is unavailable instead of silently greying it out.',
    ],
    donts: [
      'Use a <div> with a click handler as a button.',
      'Write vague labels like “Click here” or “OK”.',
      'Make destructive buttons look the same as safe ones.',
    ],
    mistakes: [
      'Using the disabled attribute everywhere: disabled buttons can’t be focused, so keyboard and screen reader users never learn why.',
      'Icon-only buttons with no accessible name, announced as just “button”.',
      'Links styled as buttons that perform actions, or buttons that navigate, which break expectations for middle-click and the back button.',
    ],
    markup: `<button type="button" class="btn btn-primary">Save changes</button>

<!-- Icon-only: give it a name -->
<button type="button" class="btn" aria-label="Settings">
  <svg aria-hidden="true">…</svg>
</button>

<!-- Unavailable but still focusable, so you can explain why -->
<button type="button" class="btn" aria-disabled="true">Publish</button>`,
    sources: [
      { label: 'Button pattern, WAI-ARIA Authoring Practices', url: `${APG}button/` },
      { label: 'Button, GOV.UK Design System', url: `${GOVUK}button/` },
    ],
  },
  {
    slug: 'toggle-switch',
    group: 'actions',
    name: 'Toggle switch',
    summary: 'A switch turns a setting on or off immediately, like a light switch.',
    instruction: 'Turn on Do not disturb and watch the preview change straight away. Use Tab and Space too.',
    Example: ToggleSwitchExample,
    anatomy: [
      ['Label', 'Names the setting, not the action: “Do not disturb”, not “Turn on do not disturb”.'],
      ['Description (optional)', 'One line explaining what the setting does.'],
      ['Track and thumb', 'The thumb slides to show the state, and the track changes colour.'],
      ['State text (optional)', '“On” or “Off” beside it, so state isn’t shown by colour alone.'],
    ],
    useWhen: [
      'The change takes effect immediately, with no Save button.',
      'It’s a single on/off setting, like notifications or dark mode.',
    ],
    avoidWhen: [
      'The choice is only applied when a form is submitted. Use a checkbox.',
      'There are more than two options. Use radio buttons or a select.',
    ],
    keyboard: [
      ['Tab', 'Moves focus to the switch'],
      ['Space', 'Toggles on and off'],
      ['Enter', 'Also toggles when the switch is a <button>'],
    ],
    aria: [
      ['role="switch"', 'Tells screen readers this is an on/off switch.'],
      ['aria-checked', '"true" when on, "false" when off.'],
      ['aria-labelledby', 'Points to the visible label.'],
      ['aria-describedby', 'Points to the description line.'],
    ],
    dos: [
      'Apply the change the moment the switch is flipped.',
      'Keep the label the same in both states.',
      'Show the state with position and text, not only colour.',
    ],
    donts: [
      'Put switches in a form that needs a Save button.',
      'Change the label text when the state changes, like “Enable” and “Disable”.',
    ],
    mistakes: [
      'Using a switch where a checkbox belongs, so people expect an instant effect that doesn’t happen.',
      'Labels that read like questions with unclear answers: is “Hide email” on hidden or shown?',
      'A thumb so small it fails the 24 px target size minimum.',
    ],
    markup: `<span id="dnd-label">Do not disturb</span>
<span id="dnd-desc">Silence notifications until you turn this off.</span>

<button type="button" role="switch" aria-checked="false"
        aria-labelledby="dnd-label" aria-describedby="dnd-desc">
  <span class="track" aria-hidden="true"><span class="thumb"></span></span>
</button>`,
    sources: [
      { label: 'Switch pattern, WAI-ARIA Authoring Practices', url: `${APG}switch/` },
    ],
  },
  {
    slug: 'text-field',
    group: 'forms',
    name: 'Text field and validation',
    summary: 'A visible label, a hint where it helps, and an error message that says how to fix the problem.',
    instruction: 'Press Create account with the fields empty. Then type a bad email and move to the next field. Notice where focus goes.',
    Example: TextFieldExample,
    anatomy: [
      ['Label', 'Always visible, above the field. Never only a placeholder.'],
      ['Hint (optional)', 'Format help or a reason for asking, between the label and the field.'],
      ['Input', 'At least 44 px tall, with a border of 3:1 contrast or more.'],
      ['Error message', 'Appears above the input, with an icon, saying what went wrong and how to fix it.'],
    ],
    useWhen: [
      'People need to type free text: names, emails, addresses, messages.',
    ],
    avoidWhen: [
      'There are only a few known options. Use radio buttons or a select.',
      'You need a date or a number in a strict format, unless you accept many formats.',
    ],
    keyboard: [
      ['Tab', 'Moves between fields'],
      ['Enter', 'Submits the form from a single-line field'],
    ],
    aria: [
      ['<label for>', 'Connects the label to the input, so clicking the label focuses the field.'],
      ['aria-describedby', 'Links the hint and the error, so they’re read after the label.'],
      ['aria-invalid="true"', 'Marks a field that currently has an error.'],
      ['autocomplete', 'Lets browsers fill in name, email and address, which helps everyone and is required by WCAG 1.3.5.'],
    ],
    dos: [
      'Validate when people leave a field or submit, not on every keystroke.',
      'Move focus to the first field with an error after submit.',
      'Write errors as instructions: “Enter an email address in the right format, like sam@example.com”.',
    ],
    donts: [
      'Show errors before someone has had a chance to type.',
      'Use red text alone to show an error.',
      'Clear what people typed when there’s an error.',
    ],
    mistakes: [
      'Error messages that blame (“Invalid input”) instead of explaining the fix.',
      'Errors that aren’t linked to the field, so screen readers never announce them.',
      'Disabling the submit button until the form is valid, which hides what’s wrong.',
    ],
    markup: `<label for="email">Email address</label>
<p id="email-hint">We’ll only use this to send your receipt.</p>
<p id="email-error" class="error">
  <span class="sr-only">Error:</span> Enter an email address in the right format, like sam@example.com
</p>
<input id="email" type="email" autocomplete="email"
       aria-invalid="true" aria-describedby="email-hint email-error">`,
    sources: [
      { label: 'Forms tutorial, W3C Web Accessibility Initiative', url: 'https://www.w3.org/WAI/tutorials/forms/' },
      { label: 'Text input, GOV.UK Design System', url: `${GOVUK}text-input/` },
      { label: 'Error message, GOV.UK Design System', url: `${GOVUK}error-message/` },
    ],
  },
  {
    slug: 'checkbox-radio',
    group: 'forms',
    name: 'Checkboxes and radio buttons',
    summary: 'Radio buttons pick one option. Checkboxes pick any number, including none.',
    instruction: 'Use the arrow keys inside the delivery options. Try Select all toppings after ticking just one.',
    Example: ChoiceControlsExample,
    anatomy: [
      ['Group label (legend)', 'The question being asked, like “Delivery speed”.'],
      ['Control', 'A circle for radios, a square for checkboxes. Both at least 24 px including padding.'],
      ['Option label', 'Clickable, so the whole row is the target.'],
      ['Hint (optional)', 'Extra detail for an option, like price or timing.'],
    ],
    useWhen: [
      'Radios: people must choose exactly one of 2–6 visible options.',
      'Checkboxes: people can choose several, or a single checkbox for agree/opt-in.',
    ],
    avoidWhen: [
      'There are many options (roughly more than 7). Use a select or a searchable list.',
      'The setting applies immediately. Use a toggle switch.',
    ],
    keyboard: [
      ['Tab', 'Moves into a radio group (to the selected option) or to the next checkbox'],
      ['Arrow keys', 'Move between radio options and select them'],
      ['Space', 'Toggles a checkbox, or selects the focused radio'],
    ],
    aria: [
      ['<fieldset> + <legend>', 'Groups the options and gives the group its question.'],
      ['<input type="radio" name>', 'A shared name makes the browser handle arrow keys and single selection.'],
      ['indeterminate', 'The “Select all” checkbox is set to mixed when only some items are ticked.'],
      ['aria-describedby', 'Links an option’s hint text.'],
    ],
    dos: [
      'Make the whole label clickable.',
      'Pre-select a sensible radio option when there’s a safe default.',
      'List options in a logical order: by price, size, frequency or alphabetically.',
    ],
    donts: [
      'Use checkboxes when only one answer is allowed.',
      'Rebuild them from <div>s; the native inputs already work with keyboards and screen readers.',
    ],
    mistakes: [
      'Missing fieldset and legend, so screen readers announce “Express” with no idea what question it answers.',
      'Tiny custom controls where only the 12 px box is clickable.',
      'A “Select all” that doesn’t show a mixed state when only some items are selected.',
    ],
    markup: `<fieldset>
  <legend>Delivery speed</legend>
  <label><input type="radio" name="speed" value="standard" checked> Standard</label>
  <label><input type="radio" name="speed" value="express"> Express</label>
</fieldset>

<fieldset>
  <legend>Pizza toppings</legend>
  <label><input type="checkbox" name="toppings" value="basil"> Basil</label>
  <label><input type="checkbox" name="toppings" value="olives"> Olives</label>
</fieldset>`,
    sources: [
      { label: 'Checkbox pattern, WAI-ARIA Authoring Practices', url: `${APG}checkbox/` },
      { label: 'Radio group pattern, WAI-ARIA Authoring Practices', url: `${APG}radio/` },
      { label: 'Checkboxes, GOV.UK Design System', url: `${GOVUK}checkboxes/` },
      { label: 'Radios, GOV.UK Design System', url: `${GOVUK}radios/` },
    ],
  },
  {
    slug: 'accordion',
    group: 'disclosure',
    name: 'Accordion',
    summary: 'A stack of headings that each show or hide a section, so people can scan first and open what they need.',
    instruction: 'Open and close the questions. Tab to a heading, then try the up and down arrows, Home and End. Switch to One at a time.',
    Example: AccordionExample,
    anatomy: [
      ['Heading', 'Each item’s title is a real heading (h2, h3…) so it appears in heading navigation.'],
      ['Trigger button', 'The whole heading row is a button that toggles its panel.'],
      ['Icon', 'A chevron that rotates to show open or closed.'],
      ['Panel', 'The content, hidden when closed.'],
    ],
    useWhen: [
      'People only need some sections of a long page, like FAQs or settings groups.',
      'Space is tight, such as on mobile.',
    ],
    avoidWhen: [
      'Most people need most of the content. Just show it.',
      'People need to compare sections side by side.',
      'There’s only one short section. Use a simple show/hide (disclosure).',
    ],
    keyboard: [
      ['Tab', 'Moves between accordion headers and into open panels'],
      ['Enter or Space', 'Opens or closes the focused section'],
      ['Down / Up arrow', 'Optional: moves to the next or previous header'],
      ['Home / End', 'Optional: moves to the first or last header'],
    ],
    aria: [
      ['<button> inside <h3>', 'Keeps the heading for navigation and makes it operable.'],
      ['aria-expanded', '"true" when the panel is open, "false" when closed.'],
      ['aria-controls', 'Points from the button to its panel’s id.'],
      ['role="region" + aria-labelledby', 'Optional: makes each open panel a landmark named by its heading. Best for 6 panels or fewer.'],
      ['hidden', 'Removes a closed panel from view and from screen readers.'],
    ],
    dos: [
      'Make the whole header row clickable, not just the icon.',
      'Write headings that let people predict what’s inside.',
      'Let several sections stay open unless there’s a strong reason not to.',
    ],
    donts: [
      'Hide content most people need behind accordions.',
      'Nest accordions inside accordions.',
      'Use a div with a click handler as the trigger.',
    ],
    mistakes: [
      'Forgetting aria-expanded, so screen reader users don’t know if a section is open.',
      'Closed panels hidden with opacity or height only, so their links are still reachable by Tab.',
      'Auto-closing other sections, which loses people’s place when they want to compare.',
    ],
    markup: `<h3>
  <button type="button" aria-expanded="false" aria-controls="faq-1" id="faq-1-btn">
    How long does delivery take?
  </button>
</h3>
<div id="faq-1" role="region" aria-labelledby="faq-1-btn" hidden>
  <p>Standard delivery takes 5–7 business days.</p>
</div>`,
    sources: [
      { label: 'Accordion pattern, WAI-ARIA Authoring Practices', url: `${APG}accordion/` },
      { label: 'Accordion, GOV.UK Design System', url: `${GOVUK}accordion/` },
    ],
  },
  {
    slug: 'tabs',
    group: 'disclosure',
    name: 'Tabs',
    summary: 'Tabs switch between related views of the same thing, showing one panel at a time.',
    instruction: 'Click a tab, or Tab to the tab list and use the left and right arrows, Home and End. Press Tab again to move into the panel.',
    Example: TabsExample,
    anatomy: [
      ['Tab list', 'A row of tabs with one selected.'],
      ['Tab', 'A short, one- or two-word label for each view.'],
      ['Selected indicator', 'A thick underline or fill, plus a weight change, not only colour.'],
      ['Tab panel', 'The content for the selected tab.'],
    ],
    useWhen: [
      'Content splits into a few peer views that people switch between, like Overview, Pricing, Reviews.',
      'People rarely need two views at the same time.',
    ],
    avoidWhen: [
      'The steps happen in order. Use a stepper or a multi-page form.',
      'People need to compare content across tabs.',
      'You need site navigation. Use links.',
    ],
    keyboard: [
      ['Tab', 'Moves focus to the selected tab, then into the panel'],
      ['Left / Right arrow', 'Moves to the previous or next tab and shows it (wraps around)'],
      ['Home / End', 'Moves to the first or last tab'],
    ],
    aria: [
      ['role="tablist"', 'Wraps the tabs, with aria-label to name the set.'],
      ['role="tab" + aria-selected', 'Each tab; only the selected one is "true".'],
      ['tabindex="0" / "-1"', 'Roving tabindex: only the selected tab is in the Tab order.'],
      ['role="tabpanel" + aria-labelledby', 'Each panel, named by its tab.'],
      ['aria-controls', 'Points from each tab to its panel.'],
    ],
    dos: [
      'Keep labels short and parallel.',
      'Make the selected tab obvious without relying on colour.',
      'Keep the tab list visible above its panel.',
    ],
    donts: [
      'Use tabs for navigation between pages.',
      'Use more tabs than fit on one line on mobile.',
      'Hide important content in a later tab people won’t open.',
    ],
    mistakes: [
      'Every tab in the Tab order, so keyboard users press Tab five times to get past them.',
      'No arrow-key support, so tabs behave unlike every other tab widget.',
      'Tabs that look like buttons or pills with no clear selected state.',
    ],
    markup: `<div role="tablist" aria-label="Team plan details">
  <button role="tab" id="t1" aria-selected="true" aria-controls="p1" tabindex="0">Overview</button>
  <button role="tab" id="t2" aria-selected="false" aria-controls="p2" tabindex="-1">Pricing</button>
</div>
<div role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0">…</div>
<div role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden>…</div>`,
    sources: [
      { label: 'Tabs pattern, WAI-ARIA Authoring Practices', url: `${APG}tabs/` },
      { label: 'Tabs, GOV.UK Design System', url: `${GOVUK}tabs/` },
    ],
  },
  {
    slug: 'tooltip',
    group: 'disclosure',
    name: 'Tooltip',
    summary: 'A short text label that appears on hover and focus. Never the only place important information lives.',
    instruction: 'Hover the toolbar icons, then Tab to them. Press Esc to hide a tooltip. Move your pointer onto a tooltip and it stays.',
    Example: TooltipExample,
    anatomy: [
      ['Trigger', 'The control the tooltip describes, usually an icon button.'],
      ['Tooltip', 'One short line of plain text, no links or buttons inside.'],
      ['Pointer (optional)', 'A small arrow pointing at the trigger.'],
    ],
    useWhen: [
      'An icon-only button needs a visible name on hover and focus.',
      'A keyboard shortcut or small extra detail helps, but isn’t essential.',
    ],
    avoidWhen: [
      'The information is essential. Put it on the page.',
      'The content has links, buttons or formatting. Use a popover or dialog.',
      'People are on touch screens, where hover doesn’t exist.',
    ],
    keyboard: [
      ['Tab', 'Focusing the trigger shows the tooltip'],
      ['Esc', 'Hides the tooltip without moving focus'],
    ],
    aria: [
      ['role="tooltip"', 'Identifies the tooltip element.'],
      ['aria-labelledby', 'Use when the tooltip is the button’s only name (icon buttons).'],
      ['aria-describedby', 'Use when the tooltip adds a description to an already-labelled control.'],
    ],
    dos: [
      'Show on both hover and keyboard focus.',
      'Let people dismiss it with Esc, and keep it open while the pointer is over it (WCAG 1.4.13).',
      'Keep it to a few words.',
    ],
    donts: [
      'Put interactive content inside a tooltip.',
      'Use a tooltip on a disabled button, which can’t receive focus.',
      'Repeat the visible label word for word.',
    ],
    mistakes: [
      'Hover-only tooltips, invisible to keyboard and touch users.',
      'Tooltips that vanish when the pointer moves toward them, so people can’t read or select the text.',
      'Hiding essential instructions, like password rules, in a tooltip.',
    ],
    markup: `<!-- Icon-only button: the tooltip is its name -->
<button type="button" aria-labelledby="tip-bold">
  <svg aria-hidden="true">…</svg>
</button>
<span role="tooltip" id="tip-bold">Bold (Ctrl+B)</span>

<!-- Labelled button: the tooltip adds a description -->
<button type="button" aria-describedby="tip-save">Save preference</button>
<span role="tooltip" id="tip-save">Applies to every device you sign in on.</span>`,
    sources: [
      { label: 'Tooltip pattern, WAI-ARIA Authoring Practices', url: `${APG}tooltip/` },
      { label: 'Understanding SC 1.4.13: Content on hover or focus, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html' },
    ],
  },
  {
    slug: 'dropdown-menu',
    group: 'disclosure',
    name: 'Dropdown menu',
    summary: 'A button that opens a short list of actions. For choosing a value, use a select instead.',
    instruction: 'Open Actions with a click or with Enter, Space or the down arrow. Move with the arrows, jump with Home, End or a letter, close with Esc.',
    Example: MenuButtonExample,
    anatomy: [
      ['Menu button', 'A labelled button with a chevron showing it opens a menu.'],
      ['Menu', 'A short list that appears below the button.'],
      ['Menu item', 'An action, written as a verb. Destructive items sit last and look different.'],
    ],
    useWhen: [
      'There are several secondary actions for one object, like Edit, Duplicate, Archive, Delete.',
      'Space is limited and the actions aren’t needed all the time.',
    ],
    avoidWhen: [
      'People are choosing a value for a form field. Use <select> or radio buttons.',
      'It’s your site’s main navigation. Use a list of links, with a simple disclosure button on mobile.',
      'There are only one or two actions. Show them as buttons.',
    ],
    keyboard: [
      ['Enter, Space or Down arrow', 'Opens the menu and focuses the first item'],
      ['Up arrow (on the button)', 'Opens the menu and focuses the last item'],
      ['Down / Up arrow', 'Moves between items (wraps around)'],
      ['Home / End', 'Jumps to the first or last item'],
      ['A letter key', 'Jumps to the next item starting with that letter'],
      ['Enter or Space', 'Chooses the focused item and closes the menu'],
      ['Esc', 'Closes the menu and returns focus to the button'],
    ],
    aria: [
      ['aria-haspopup="menu"', 'Tells screen readers the button opens a menu.'],
      ['aria-expanded', '"true" while the menu is open.'],
      ['role="menu"', 'The list, named by the button with aria-labelledby.'],
      ['role="menuitem" + tabindex="-1"', 'Each item; focus moves with arrow keys, not Tab.'],
    ],
    dos: [
      'Return focus to the menu button when the menu closes.',
      'Close the menu when people click outside it or press Tab.',
      'Keep the list short, about 7 items at most.',
    ],
    donts: [
      'Use role="menu" for site navigation links.',
      'Open menus on hover only.',
      'Hide the only way to do a common task inside a menu.',
    ],
    mistakes: [
      'Menus that trap focus or can’t be closed with Esc.',
      'Using ARIA menu roles without the arrow-key behaviour they promise.',
      'Focus lost to the top of the page after choosing an item.',
    ],
    markup: `<button type="button" id="actions-btn" aria-haspopup="menu"
        aria-expanded="false" aria-controls="actions-menu">Actions</button>

<ul role="menu" id="actions-menu" aria-labelledby="actions-btn" hidden>
  <li role="menuitem" tabindex="-1">Edit</li>
  <li role="menuitem" tabindex="-1">Duplicate</li>
  <li role="menuitem" tabindex="-1">Delete</li>
</ul>`,
    sources: [
      { label: 'Menu button pattern, WAI-ARIA Authoring Practices', url: `${APG}menu-button/` },
    ],
  },
  {
    slug: 'modal-dialog',
    group: 'overlays',
    name: 'Modal dialog',
    summary: 'A window on top of the page that needs an answer before people can continue.',
    instruction: 'Open the dialog, then press Tab repeatedly: focus stays inside. Close it with Esc, Cancel or a click on the dimmed area, and watch focus return.',
    Example: DialogExample,
    anatomy: [
      ['Backdrop', 'Dims the page behind and blocks interaction with it.'],
      ['Dialog box', 'A focused window, centred, with a clear title.'],
      ['Title', 'States the question or task: “Delete ‘Q4 plan’?”.'],
      ['Body', 'Consequences in one or two sentences.'],
      ['Actions', 'The specific action (“Delete project”) and a way out (“Cancel”).'],
    ],
    useWhen: [
      'A destructive or irreversible action needs confirmation.',
      'A short, focused task must be done before continuing.',
    ],
    avoidWhen: [
      'The action can be undone. Do it and offer Undo instead.',
      'You’re showing information people don’t need to act on. Use an inline message.',
      'The content is long or complex. Use a full page.',
    ],
    keyboard: [
      ['Tab / Shift+Tab', 'Moves between controls inside the dialog only'],
      ['Esc', 'Closes the dialog'],
      ['On close', 'Focus returns to the button that opened it'],
    ],
    aria: [
      ['<dialog> + showModal()', 'The native element makes the rest of the page inert and handles Esc.'],
      ['aria-labelledby', 'Names the dialog with its title.'],
      ['aria-describedby', 'Links the consequences text.'],
      ['Initial focus', 'Moves to the first control, or the least destructive one for dangerous actions.'],
    ],
    dos: [
      'Label the confirm button with the actual action, not “OK” or “Yes”.',
      'Return focus to the trigger when the dialog closes.',
      'Keep it short enough to fit a phone screen without scrolling.',
    ],
    donts: [
      'Open dialogs people didn’t ask for, like newsletter pop-ups on page load.',
      'Stack a dialog on top of another dialog.',
      'Remove every way to close it.',
    ],
    mistakes: [
      'Focus left behind on the page, so keyboard users tab through hidden content.',
      'Esc does nothing.',
      'After closing, focus jumps to the top of the page instead of back to the trigger.',
    ],
    markup: `<button type="button" id="delete-btn">Delete project…</button>

<dialog aria-labelledby="dlg-title" aria-describedby="dlg-desc">
  <h2 id="dlg-title">Delete “Q4 plan”?</h2>
  <p id="dlg-desc">This deletes the project for everyone. You can’t undo this.</p>
  <button type="button" autofocus>Cancel</button>
  <button type="button">Delete project</button>
</dialog>

<script>
  const dlg = document.querySelector('dialog')
  document.getElementById('delete-btn').onclick = () => dlg.showModal()
</script>`,
    sources: [
      { label: 'Dialog (modal) pattern, WAI-ARIA Authoring Practices', url: `${APG}dialog-modal/` },
    ],
  },
  {
    slug: 'toast',
    group: 'overlays',
    name: 'Toast notification',
    summary: 'A brief message about something that just happened, announced without stealing focus.',
    instruction: 'Press Save draft a few times, then hover one toast to pause it. Press Send while offline: errors stay until dismissed.',
    Example: ToastExample,
    anatomy: [
      ['Icon', 'Shows the type: ✓ for success, ! for errors.'],
      ['Message', 'One short sentence in past tense: “Draft saved.”'],
      ['Action (optional)', 'One quick follow-up like “Undo” or “Try again”.'],
      ['Dismiss button', 'Always available, with an accessible name.'],
    ],
    useWhen: [
      'Confirming something that just happened: saved, sent, copied, deleted (with Undo).',
    ],
    avoidWhen: [
      'The message is critical or needs a decision. Use an inline error or a dialog.',
      'The message explains a form error. Put it next to the field.',
    ],
    keyboard: [
      ['None required', 'Toasts don’t take focus, so typing isn’t interrupted'],
      ['Tab', 'Reaches the toast’s action and dismiss buttons'],
    ],
    aria: [
      ['role="status"', 'A polite live region for success messages, read when the screen reader is idle.'],
      ['role="alert"', 'An assertive live region for errors, read immediately.'],
      ['Region in the page from the start', 'Live regions only announce changes, so the container must exist before the message is added.'],
      ['aria-label="Dismiss notification"', 'Names the icon-only close button.'],
    ],
    dos: [
      'Pause the timer while the pointer or focus is on the toast.',
      'Keep error toasts until people dismiss them.',
      'Stack several toasts instead of replacing them.',
    ],
    donts: [
      'Put the only copy of important information in a toast.',
      'Auto-dismiss in under about 5 seconds.',
      'Move focus to the toast.',
    ],
    mistakes: [
      'Live region added at the same moment as its message, so nothing is announced.',
      'Toasts that disappear before slow readers can finish, failing WCAG 2.2.1 Timing adjustable.',
      'An Undo button that vanishes before keyboard users can Tab to it.',
    ],
    markup: `<!-- In the page from the start, empty -->
<div role="status" aria-live="polite" class="toasts"></div>
<div role="alert" class="toasts"></div>

<!-- Added when something happens -->
<div class="toast">
  <span aria-hidden="true">✓</span> Draft saved.
  <button type="button" aria-label="Dismiss notification">×</button>
</div>`,
    sources: [
      { label: 'Understanding SC 4.1.3: Status messages, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html' },
      { label: 'Understanding SC 2.2.1: Timing adjustable, W3C', url: 'https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html' },
    ],
  },
  {
    slug: 'breadcrumbs',
    group: 'navigation',
    name: 'Breadcrumbs',
    summary: 'A trail of links showing where the current page sits in the site, so people can step back up.',
    instruction: 'Click an earlier step to move up the hierarchy. The last item is the current page, so it isn’t a link.',
    Example: BreadcrumbsExample,
    anatomy: [
      ['Trail', 'An ordered list from the top level down to the current page.'],
      ['Links', 'Each ancestor page.'],
      ['Separator', 'A chevron or slash, drawn in CSS so screen readers don’t read it.'],
      ['Current page', 'The last item, plain text, marked as current.'],
    ],
    useWhen: [
      'The site has three or more levels of hierarchy.',
      'People often land deep in the site from search.',
    ],
    avoidWhen: [
      'The site is flat, with one or two levels.',
      'You want to show a sequence of steps. Use a stepper.',
    ],
    keyboard: [
      ['Tab', 'Moves between the breadcrumb links'],
      ['Enter', 'Follows a link'],
    ],
    aria: [
      ['<nav aria-label="Breadcrumb">', 'A named navigation landmark.'],
      ['<ol>', 'An ordered list, because the order is the hierarchy.'],
      ['aria-current="page"', 'Marks the last item as the current page.'],
    ],
    dos: [
      'Show the real hierarchy, not the visitor’s click history.',
      'Place it at the top of the page, above the title.',
      'On small screens, show only the parent as “Back to …” if space is tight.',
    ],
    donts: [
      'Make the current page a link to itself.',
      'Use breadcrumbs as the only navigation.',
    ],
    mistakes: [
      'Separators typed as text (“>”), which screen readers read out as “greater than”.',
      'No aria-current, so the current page isn’t announced.',
      'Tiny links packed together, failing target size.',
    ],
    markup: `<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/programs">Programs</a></li>
    <li><a href="/programs/web">Web Development</a></li>
    <li><span aria-current="page">Accessibility basics</span></li>
  </ol>
</nav>`,
    sources: [
      { label: 'Breadcrumb pattern, WAI-ARIA Authoring Practices', url: `${APG}breadcrumb/` },
      { label: 'Breadcrumbs, GOV.UK Design System', url: `${GOVUK}breadcrumbs/` },
    ],
  },
  {
    slug: 'pagination',
    group: 'navigation',
    name: 'Pagination',
    summary: 'Splits a long list into numbered pages, with large, clearly marked links to move between them.',
    instruction: 'Move through the pages with Next, Previous and the numbers. Watch the gaps (…) shift and the results count update.',
    Example: PaginationExample,
    anatomy: [
      ['Previous / Next', 'Text links, hidden or inactive at the ends.'],
      ['Page numbers', 'First, last, current and its neighbours.'],
      ['Current page', 'Clearly marked by more than colour, and not clickable.'],
      ['Ellipsis', 'Shows skipped pages; hidden from screen readers.'],
      ['Results count (optional)', '“Showing results 21–30 of 97.”'],
    ],
    useWhen: [
      'People need to find their place again, or share a link to a specific page.',
      'Search results and catalogues where the total is known.',
    ],
    avoidWhen: [
      'People browse casually through a feed. Consider “Load more”.',
      'There are only a handful of items. Show them all.',
    ],
    keyboard: [
      ['Tab', 'Moves between the page links'],
      ['Enter', 'Goes to that page'],
    ],
    aria: [
      ['<nav aria-label>', 'A named landmark, like “Search results pages”.'],
      ['aria-current="page"', 'Marks the current page number.'],
      ['Hidden text', '“Page 3” and “Next page” for screen readers, while the screen shows “3” and “Next”.'],
      ['rel="prev" / rel="next"', 'Describes the relationship between pages.'],
    ],
    dos: [
      'Make each link at least 44 × 44 px.',
      'Keep the first and last page visible.',
      'Move focus or scroll to the top of the results after changing page.',
    ],
    donts: [
      'Show only arrow icons with no text.',
      'Show every page number for long lists.',
    ],
    mistakes: [
      'Numbers announced as just “3, link”, with no hint they’re pages.',
      'A current page shown only by colour.',
      'Tiny number links crammed together on mobile.',
    ],
    markup: `<nav aria-label="Search results pages">
  <ul>
    <li><a href="?page=2" rel="prev">Previous<span class="sr-only"> page</span></a></li>
    <li><a href="?page=1"><span class="sr-only">Page </span>1</a></li>
    <li><a href="?page=3" aria-current="page"><span class="sr-only">Page </span>3</a></li>
    <li aria-hidden="true">…</li>
    <li><a href="?page=10"><span class="sr-only">Page </span>10</a></li>
    <li><a href="?page=4" rel="next">Next<span class="sr-only"> page</span></a></li>
  </ul>
</nav>`,
    sources: [
      { label: 'Pagination, GOV.UK Design System', url: `${GOVUK}pagination/` },
    ],
  },
]

export const componentBySlug = Object.fromEntries(components.map((c) => [c.slug, c]))
