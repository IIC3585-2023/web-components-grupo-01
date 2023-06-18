import TreeItem from "./web-componets/treeElement";
import SellItem from "./lit-componets/sellItem";

const treeItems: TreeItem[] = []
const sellItems: SellItem[] = []

/**
 * @template {HTMLElementKey} T
 * @param {HTMLElement} parent
 * @param {T} element
 * @param {((el: HTMLElementTagNameMap[T]) => void) | undefined} fn
 **/
function appendNode(parent: HTMLElement, element, fn) {
  const el = document.createElement(element);
  parent.appendChild(el);
  if (fn) fn(el);
  return el;
}

function addItemToTree(tree: TreeItem | null, item: any, types: string = "") {
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
  // console.log(currentType);
  const products = sellItems;
  products.forEach((product) => {
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

async function getInfo() {
  const response = await fetch("public/data.json");
  const json = await response.json();
  const tree: TreeItem | null = document.querySelector("#tree");
  if (response.ok) {
    addItemToTree(tree, json)
  } else {
    console.log("error");
  }
  treeItems.forEach((treeItem) => {
    treeItem.handleClick = showProductsByTypes;
  });
  return [];
}

getInfo();
