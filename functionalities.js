
// let cart = [];
// let total = 0;

// const loadTrees = () => {
//     fetch("https://openapi.programming-hero.com/api/categories")
//         .then(res => res.json())
//         .then((json) => displayTrees(json.categories));
// };

// const manageSpinner = (isLoading) => {
//     if (isLoading === true) {
//         document.getElementById("spinner").classList.remove("hidden");
//         document.getElementById("tree-card-container").classList.add("hidden");
//     }
//     else {
//         document.getElementById("spinner").classList.add("hidden");
//         document.getElementById("tree-card-container").classList.remove("hidden");
//     }
// };

// const removeActiveClass = () => {
//     const categoriesButtons = document.querySelectorAll(".categories-button");
//     categoriesButtons.forEach((button) => button.classList.remove("active"));
// };

// const loadTreeCategories = (id) => {
//     manageSpinner(true);
//     const url = `https://openapi.programming-hero.com/api/category/${id}`;
//     fetch(url)
//         .then(res => res.json())
//         .then((json) => {
//             removeActiveClass();
//             const categoriesBtn = document.getElementById(`categoriesBtn-${id}`);
//             categoriesBtn.classList.add("active");
//             displayTreeCategories(json.plants);
//         });
// };

// const loadCardDetails = async (id) => {
//     const url = `https://openapi.programming-hero.com/api/plant/${id}`;
//     const res = await fetch(url);
//     const details = await res.json();
//     displayCardDetails(details.plants);
// };

// const displayCardDetails = (card) => {
//     const cardDetails = document.getElementById("card-details");
//     cardDetails.innerHTML = `
//          <div><img class="w-full h-68 mb-2 object-cover rounded-md" src="${card.image}" alt=""></div>
//          <h4><span class="font-bold">Category:</span> ${card.category}</h4>
//          <p><span class="font-bold">Price: ৳</span> ${card.price}</p>
//          <p class="text-[14px]"><span class="font-bold">Description:</span> ${card.description}</p>
//     `;
//     document.getElementById("my_modal_5").showModal();
// };

// const displayTreeCategories = (cards) => {
//     const treeCardContainer = document.getElementById("tree-card-container");
//     treeCardContainer.innerHTML = "";

//     cards.forEach((card) => {
//         const cardDiv = document.createElement("div");
//         cardDiv.innerHTML = `
//             <div class="h-[420px] p-5 bg-white shadow-lg rounded-lg flex flex-col">
//                 <img class="w-full h-48 md:h-40 mb-2 object-cover rounded-md" src="${card.image}" alt="">
//                 <h4 onclick="loadCardDetails('${card.id}')" class="cursor-pointer text-[14px] text-justify font-semibold mb-2">${card.name}</h4>
//                 <p class="text-[12px] text-gray-500 text-justify flex-1 overflow-hidden">${card.description}</p>
//                 <div class="flex justify-between items-center my-2">
//                     <button class="mt-auto text-[14px] p-2 bg-[#DCFCE7] text-[#15803D] rounded-full">${card.category}</button>
//                     <span class="text-[14px] text-gray-500">৳ ${card.price}</span>
//                 </div>
//                 <button class="btn mt-auto rounded-full w-full text-white bg-[#15803D] hover:bg-[#CFF0DC] hover:text-[#15803D]"
//                     onclick="addToCart('${card.id}','${card.name}',${card.price})">
//                     Add to Cart
//                 </button>
//             </div>`;
//         treeCardContainer.appendChild(cardDiv);
//     });
// };
// ////CARD FUCTION START
// const addToCart = (id, name, price) => {
//     cart.push({ id, name, price });
//     total += price;
//     updateCartUI();
//     alert(`Added to cart:\n${name} - ৳${price}`);
// };

// const removeFromCart = (index) => {
//     total -= cart[index].price;
//     cart.splice(index, 1);
//     updateCartUI();
// };
// const updateCartUI = () => {
//     const cartList = document.getElementById("cart-list");
//     const cartTotal = document.getElementById("cart-total");

//     cartList.innerHTML = "";
//     cart.forEach((item, index) => {
//         const li = document.createElement("li");
//         li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
//         li.innerHTML = `
//             <div>
//                 <p class="font-semibold">${item.name}</p>
//                 <p class="text-sm text-gray-600">৳ ${item.price}</p>
//             </div>
//             <button class="text-red-500" onclick="removeFromCart(${index})">❌</button>
//         `;
//         cartList.appendChild(li);
//     });

//     cartTotal.textContent = total;
// };
// //CARD FUNCTION END
// const displayTrees = (trees) => {
//     const categoriesList = document.getElementById("categories-list");
//     categoriesList.innerHTML = "";
//     for (const tree of trees) {
//         const categoriesLi = document.createElement("li");
//         categoriesLi.innerHTML = `
//         <a href="#" id="categoriesBtn-${tree.id}" 
//            onClick="loadTreeCategories('${tree.id}')"
//            class="categories-button block px-4 py-2 hover:bg-[#15803d] hover:text-white rounded">
//            ${tree.category_name}
//         </a>`;
//         categoriesList.appendChild(categoriesLi);
//     }
//     manageSpinner(false);
// };

// loadTrees();





let cart = [];
let total = 0;

// Show or hide spinner
const manageSpinner = (isLoading) => {
    const spinner = document.getElementById("spinner");
    const treeCardContainer = document.getElementById("tree-card-container");
    if (isLoading) {
        spinner.classList.remove("hidden");
        treeCardContainer.classList.add("hidden");
    } else {
        spinner.classList.add("hidden");
        treeCardContainer.classList.remove("hidden");
    }
};

// Load all categories
const loadTrees = () => {
    manageSpinner(true);
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => displayTrees(json.categories))
        .catch(() => {
            alert("Failed to load categories!");
            manageSpinner(false);
        });
};

// Remove active class from category buttons
const removeActiveClass = () => {
    document.querySelectorAll(".categories-button").forEach(btn => btn.classList.remove("active"));
};

// Load plants for a category
const loadTreeCategories = (id) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(json => {
            removeActiveClass();
            const categoriesBtn = document.getElementById(`categoriesBtn-${id}`);
            categoriesBtn.classList.add("active");
            displayTreeCategories(json.plants);
            manageSpinner(false); // Hide spinner after data loads
        })
        .catch(() => {
            alert("Failed to load category data!");
            manageSpinner(false);
        });
};

// Load details for a single plant
const loadCardDetails = async (id) => {
    manageSpinner(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
        const details = await res.json();
        displayCardDetails(details.plants);
    } catch (error) {
        alert("Failed to load plant details!");
    } finally {
        manageSpinner(false);
    }
};

// Display plant details in modal
const displayCardDetails = (card) => {
    const cardDetails = document.getElementById("card-details");
    cardDetails.innerHTML = `
        <div><img class="w-full h-68 mb-2 object-cover rounded-md" src="${card.image}" alt=""></div>
        <h4><span class="font-bold">Category:</span> ${card.category}</h4>
        <p><span class="font-bold">Price: ৳</span> ${card.price}</p>
        <p class="text-[14px]"><span class="font-bold">Description:</span> ${card.description}</p>
    `;
    document.getElementById("my_modal_5").showModal();
};

// Display all plants in category
const displayTreeCategories = (cards) => {
    const treeCardContainer = document.getElementById("tree-card-container");
    treeCardContainer.innerHTML = "";

    cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
            <div class="h-[420px] p-5 bg-white shadow-lg rounded-lg flex flex-col">
                <img class="w-full h-48 md:h-40 mb-2 object-cover rounded-md" src="${card.image}" alt="">
                <h4 onclick="loadCardDetails('${card.id}')" class="cursor-pointer text-[14px] text-justify font-semibold mb-2">${card.name}</h4>
                <p class="text-[12px] text-gray-500 text-justify flex-1 overflow-hidden">${card.description}</p>
                <div class="flex justify-between items-center my-2">
                    <button class="mt-auto text-[14px] p-2 bg-[#DCFCE7] text-[#15803D] rounded-full">${card.category}</button>
                    <span class="text-[14px] text-gray-500">৳ ${card.price}</span>
                </div>
                <button class="btn mt-auto rounded-full w-full text-white bg-[#15803D] hover:bg-[#CFF0DC] hover:text-[#15803D]"
                    onclick="addToCart('${card.id}','${card.name}',${card.price})">
                    Add to Cart
                </button>
            </div>`;
        treeCardContainer.appendChild(cardDiv);
    });
};

// Cart functions
const addToCart = (id, name, price) => {
    cart.push({ id, name, price });
    total += price;
    updateCartUI();
    alert(`Added to cart:\n${name} - ৳${price}`);
};

const removeFromCart = (index) => {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
};

const updateCartUI = () => {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
        li.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-600">৳ ${item.price}</p>
            </div>
            <button class="text-red-500" onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total;
};

// Display all categories
const displayTrees = (trees) => {
    const categoriesList = document.getElementById("categories-list");
    categoriesList.innerHTML = "";
    trees.forEach(tree => {
        const categoriesLi = document.createElement("li");
        categoriesLi.innerHTML = `
            <a href="#" id="categoriesBtn-${tree.id}" 
               onClick="loadTreeCategories('${tree.id}')"
               class="categories-button block px-4 py-2 hover:bg-[#15803d] hover:text-white rounded">
               ${tree.category_name}
            </a>`;
        categoriesList.appendChild(categoriesLi);
    });
    manageSpinner(false);
};

// Initial load
loadTrees();
