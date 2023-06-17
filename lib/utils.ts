/** @typedef {keyof HTMLElementTagNameMap} HTMLElementKey */
/**
 * @template {HTMLElementKey} T
 * @param {HTMLElement} parent
 * @param {T} element
 * @param {((el: HTMLElementTagNameMap[T]) => void) | undefined} fn
 **/
export function appendNode(parent: any, element: any, fn: any) {
    const el = document.createElement(element);
    parent.appendChild(el);
    if (fn) fn(el);
    return el;
}
