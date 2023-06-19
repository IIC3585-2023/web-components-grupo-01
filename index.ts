import "./styles.css"

// import "./web-components/index"
import "./lit-components/index"

import type { TreeItem } from "./web-components/treeElement";
import type { SellItem } from "./lit-components/index";

const treeItems: TreeItem[] = []
const sellItems: SellItem[] = []

type HTMLElementKey = keyof HTMLElementTagNameMap;

function appendNode<T extends HTMLElementKey>(parent: HTMLElement, element: T, fn: ((el: HTMLElementTagNameMap[T]) => void) | undefined) {
  const el = document.createElement(element);
  parent.appendChild(el);
  if (fn) fn(el);
  return el;
}

function addItemToTree(tree: HTMLElement, item: any, types: string = "") {
  if (!tree) return;

  appendNode(tree, "tree-item", (el) => {

    el.textContent = item.name;
    treeItems.push(el);
    // console.log(treeItems);
    types += item.name + ";";
    // console.log(types);
    if (item.children) {
      item.children.map((child) => addItemToTree(el, child, types));
    } else if (item.products) {
      item.products.map((product) => addProductToMenu(product, types));
    }
  })
}

function addProductToMenu(product: any, types: string) {
  const menu: HTMLElement | null = document.querySelector("#menu");
  if (!menu) return;
  appendNode(menu, "sell-item", (el) => {
    el.classList.add("grid-item");
    el.title = product.title;
    el.imgSrc = product.imgSrc;
    el.price = product.price;
    el.discount = product.discount;
    el.rating = product.rating;
    el.types = types;
    sellItems.push(el);
  })
}

function showProductsByTypes(currentType: string) {
  sellItems.forEach((product) => {
    const types = product.types!.split(";");
    if (
      types.includes(currentType)
    ) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("data.json");
  const json = await response.json();
  const tree: HTMLDivElement = document.querySelector("#tree")!;
  if (response.ok) {
    addItemToTree(tree, json)
  } else {
    console.log("error :(");
  }

  // que wea BV
  await import("./web-components/index");

  treeItems.forEach((treeItem) => {
    treeItem.handleClick = showProductsByTypes;
  });
  return [];
});
