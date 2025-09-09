
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

const loadAllTrees = () => {
    manageSpinner(true);
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const allBtn = document.getElementById("categoriesBtn-all");
            if(allBtn) allBtn.classList.add("active");
            displayTreeCategories(data.plants);
            manageSpinner(false);
        });
};

const loadTrees = () => {
    manageSpinner(true);
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => {
            displayTrees(json.categories);
            manageSpinner(false); 
        });
};


// Remove active class from category buttons
const removeActiveClass = () => {
    document.querySelectorAll(".categories-button").forEach(btn => btn.classList.remove("active"));
};

// // Load plants for a category
const loadTreeCategories = (id) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(json => {
            removeActiveClass();
            const categoriesBtn = document.getElementById(`categoriesBtn-${id}`);
            categoriesBtn.classList.add("active");
            displayTreeCategories(json.plants);
            manageSpinner(false); 
        });
};

// Load plant details
const loadCardDetails = (id) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            displayCardDetails(data.plants); 
            manageSpinner(false);            
        });
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
                    <span class="text-[14px] font-bold">৳ ${card.price}</span>
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
    alert(`Added to cart:\n${name} - ৳${price}\nIF YOU BUY THIS TREE PLEASE CONFIRM `);
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
        li.className = "flex justify-between items-center bg-[#F0FDF4] p-2 rounded";
        li.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-500">৳ ${item.price} x 1</p>
            </div>
            <button class="text-gray-500" onclick="removeFromCart(${index})"><i class="fa-solid fa-xmark"></i></button>
        `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total;
};

// Display all categories
const displayTrees = (trees) => {
    const categoriesList = document.getElementById("categories-list");
    categoriesList.innerHTML = "";
const allTreesLi = document.createElement("li");
allTreesLi.innerHTML = `
    <a href="#" id="categoriesBtn-all" 
       onClick="loadAllTrees()"
       class="categories-button block px-4 py-2 hover:bg-[#15803d] hover:text-white rounded">
       All Trees
    </a>`;
categoriesList.appendChild(allTreesLi);
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


loadTrees();
loadAllTrees();





