export function appendNode(parent: T, element: T, fn: ((el: HTMLElementTagNameMap[T]) => void) | undefined = undefined) {
    const el = document.createElement(element);
    parent.appendChild(el);
    if (fn) fn(el);
    return el;
}
