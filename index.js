// navbar related code
let backdrop = document.querySelector(".backdrop");
let toggleButton = document.querySelector(".toggle-button");
let mobileNav = document.querySelector(".mobile-nav");

backdrop.addEventListener("click", function () {
  mobileNav.classList.remove("open");
  closeModal();
});

function closeModal() {
  backdrop.classList.remove("open");
}

toggleButton.addEventListener("click", function () {
  mobileNav.classList.add("open");
  backdrop.classList.add("open");
});

// getting data function
const getProducts = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

let allProducts = [];
// getting data from api
async function getData() {
  // const jewelryData = await getProducts(
  //   "https://fakestoreapi.com/products/category/jewelery"
  // );
  // const electronicData = await getProducts(
  //   "https://fakestoreapi.com/products/category/electronics"
  // );
  allProducts = await getProducts("https://fakestoreapi.com/products?limit=16");

  topDeals(allProducts);
  bestSeller(allProducts);
}
getData();

// slider data
const sliderData = [
  {
    id: 7,
    title: "White Gold Plated Princess",
    mrp: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3,
      count: 400,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    mrp: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    mrp: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    mrp: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 250,
    },
  },
];
// slider element code
const sliderElement = document.getElementById("slider");
let sliderIntervalId;
let i = 0;
function autoSlider() {
  sliderElement.innerHTML = "";
  let imageDiv = document.createElement("div");
  let imgElement = document.createElement("img");
  let leftSliderButton = document.createElement("button");
  leftSliderButton.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
  leftSliderButton.addEventListener("click", () => (i = i - 2));
  let rightSliderButton = document.createElement("button");
  rightSliderButton.addEventListener("click", () => ++i);
  rightSliderButton.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
  sliderIntervalId = setInterval(() => {
    if (i >= sliderData.length || i < 0) i = 0;
    imgElement.src = sliderData[i].image;
    imgElement.alt = sliderData[i].title;
    i++;
  }, 3000);
  imageDiv.append(imgElement);
  imageDiv.className = "imageContainer";
  sliderElement.append(leftSliderButton, imageDiv, rightSliderButton);
}
autoSlider();

// top deals
const topDealsItems = document.querySelector(".top-deals__items");
function topDeals(allProducts) {
  allProducts.map((el) => {
    const productElement = document.createElement("div");
    productElement.className = "top-deals__items__item";
    const imageDiv = document.createElement("div");
    const imageElement = document.createElement("img");
    imageElement.src = el.image;
    imageElement.alt = el.category;
    imageDiv.append(imageElement);
    const titleElement = document.createElement("h4");
    titleElement.textContent = `Name : ${el.title.substring(0, 11)}...`;
    let discount = Math.floor(Math.random() * 70) + 10;
    // console.log("discount", discount);
    let discountElement = document.createElement("h2");
    discountElement.className = "top-deals__items__item--discount";
    discountElement.textContent = `-${discount}`;
    const priceElement = document.createElement("h2");
    priceElement.textContent = `${Math.floor(
      el.price - el.price * (discount / 100)
    )}$`;
    const mrpElement = document.createElement("p");
    mrpElement.innerHTML = `M.R.P.: <span>${el.price}$<span>`;
    productElement.append(
      imageDiv,
      discountElement,
      titleElement,
      priceElement,
      mrpElement
    );
    topDealsItems.appendChild(productElement);
  });
}

// best seller
const bestSellerItems = document.querySelector(".slider-items");
function bestSeller(products) {
  products.forEach((el) => {
    const listElement = document.createElement("li");
    listElement.className = "slider-item";
    const imageDivElement = document.createElement("div");
    const imageElement = document.createElement("img");
    imageElement.src = el.image;
    imageElement.alt = el.title;
    imageDivElement.append(imageElement);
    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Best Sellers from ${el.category}`;
    listElement.append(imageDivElement, categoryElement);
    bestSellerItems.append(listElement);
  });
}

// slider code
const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let slideIndex = 0;

function slide(direction) {
  slideIndex += direction;
  const sliderItems = document.querySelectorAll(".slider-item");
  const itemWidth = sliderItems[0].offsetWidth + 20; // 20px for the margin

  if (slideIndex < 0) {
    slideIndex = 0;
  } else if (slideIndex > sliderItems.length - 3) {
    slideIndex = sliderItems.length - 3;
  }

  slider.style.transform = `translateX(-${slideIndex * itemWidth}px)`;
}

prevBtn.addEventListener("click", () => slide(-1));
nextBtn.addEventListener("click", () => slide(1));
