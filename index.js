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

const getProducts = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

async function getData() {
  const jewelryData = await getProducts(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const electronicData = await getProducts(
    "https://fakestoreapi.com/products/category/electronics"
  );
  console.log("jewelryData", jewelryData);
  console.log("electronicData", electronicData);
}
getData();
