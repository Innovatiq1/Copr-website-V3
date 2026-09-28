// Lets a foreground modal (e.g. course registration) tell the global
// LeadPopup to defer showing itself instead of popping up on top of it.
// Counter-based so multiple/nested modals are handled safely.
const ATTR = 'data-blocking-modal-open';

export function markModalOpen() {
  if (typeof document === 'undefined') return;
  const count = Number(document.body.getAttribute(ATTR) || '0') + 1;
  document.body.setAttribute(ATTR, String(count));
}

export function markModalClosed() {
  if (typeof document === 'undefined') return;
  const count = Math.max(0, Number(document.body.getAttribute(ATTR) || '0') - 1);
  if (count === 0) document.body.removeAttribute(ATTR);
  else document.body.setAttribute(ATTR, String(count));
}

export function isBlockingModalOpen() {
  return typeof document !== 'undefined' && document.body.hasAttribute(ATTR);
}
