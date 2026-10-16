
const burgerButton = document.getElementById("burgerButton");
const navLinks = document.getElementById("navLinks");

// Membuka dan menutup menu navigasi
if (burgerButton && navLinks) {
    burgerButton.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        burgerButton.setAttribute("aria-expanded", isOpen);
        burgerButton.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu" : "Buka menu"
        );
    });

    navLinks.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            navLinks.classList.remove("open");
            burgerButton.setAttribute("aria-expanded", "false");
            burgerButton.setAttribute("aria-label", "Buka menu");
        }
    });
}

// Data menu GARLIC Restaurant
const products = [
    {
        id: 1,
        nama: "Nasi Goreng",
        harga: 25000,
        stok: 12,
        kategori: "Makanan",
        gambar: "images/nasi goreng.jpg"
    },
    {
        id: 2,
        nama: "Sate Ayam",
        harga: 30000,
        stok: 4,
        kategori: "Makanan",
        gambar: "images/sate ayam.jpg"
    },
    {
        id: 3,
        nama: "Ayam Betutu",
        harga: 40000,
        stok: 0,
        kategori: "Makanan",
        gambar: "images/ayam betutu.jpg"
    },
    {
        id: 4,
        nama: "Es Teh Manis",
        harga: 8000,
        stok: 15,
        kategori: "Minuman",
        gambar: "images/teh manis dingin.jpg"
    },
    {
        id: 5,
        nama: "Es Cendol",
        harga: 15000,
        stok: 8,
        kategori: "Minuman",
        gambar: "images/es cendol.jpg"
    },
    {
        id: 6,
        nama: "Es Jeruk",
        harga: 10000,
        stok: 3,
        kategori: "Minuman",
        gambar: "images/es jeruk.jpg"
    },
    {
        id: 7,
        nama: "Risol",
        harga: 12000,
        stok: 6,
        kategori: "Camilan",
        gambar: "images/risol.jpg"
    },
    {
        id: 8,
        nama: "Pisang Goreng",
        harga: 15000,
        stok: 10,
        kategori: "Camilan",
        gambar: "images/pisang goreng.jpg"
    },
    {
        id: 9,
        nama: "Pisang Bakar",
        harga: 18000,
        stok: 5,
        kategori: "Camilan",
        gambar: "images/pisang bakar.jpg"
    }
];

// Mengubah angka menjadi format rupiah
function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// Menentukan status stok menu
function getStockStatus(stok) {
    if (stok === 0) {
        return {
            teks: "Habis",
            kelas: "empty"
        };
    } else if (stok <= 5) {
        return {
            teks: "Stok Menipis",
            kelas: "low"
        };
    } else {
        return {
            teks: "Tersedia",
            kelas: "available"
        };
    }
}

// Mengambil elemen HTML
const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
const stockCount = document.getElementById("stockCount");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Menampilkan daftar menu
function renderProducts(data) {
    if (!productList) return;

    productList.innerHTML = "";

    if (data.length === 0) {
        productList.innerHTML =
            '<p class="empty-state">Menu tidak ditemukan.</p>';
    }

    data.forEach(function (product) {
        const status = getStockStatus(product.stok);

        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.gambar}" alt="${product.nama}"
                 onerror="this.style.display='none'">
            <h3>${product.nama}</h3>
            <p>Kategori: ${product.kategori}</p>
            <p class="price">${formatRupiah(product.harga)}</p>
            <p>Stok: ${product.stok}</p>
            <p class="stock ${status.kelas}">${status.teks}</p>
        `;

        productList.appendChild(card);
    });

    // Menghitung jumlah menu
    if (productCount) {
        productCount.textContent = data.length;
    }

    // Menghitung total stok menggunakan reduce()
    const totalStok = data.reduce(function (total, product) {
        return total + product.stok;
    }, 0);

    if (stockCount) {
        stockCount.textContent = totalStok;
    }
}

// Mencari menu dan memfilter kategori
function applyFilter() {
    const keyword = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "Semua";

    const filteredProducts = products.filter(function (product) {
        const cocokNama = product.nama
            .toLowerCase()
            .includes(keyword);

        const cocokKategori =
            selectedCategory === "Semua" ||
            product.kategori === selectedCategory;

        return cocokNama && cocokKategori;
    });

    renderProducts(filteredProducts);
}

// Menjalankan pencarian
if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
}

// Menjalankan filter kategori
if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilter);
}


// Contoh penggunaan map() untuk mengambil nama menu
const namaMenu = products.map(function (product) {
    return product.nama;
});

// Contoh penggunaan find() untuk mencari menu berdasarkan ID
const menuPertama = products.find(function (product) {
    return product.id === 1;
});

// Menampilkan seluruh menu saat halaman dibuka
renderProducts(products);


console.log("GARLIC Restaurant berhasil dijalankan!");
console.log("Daftar menu:", products);
console.log("Jumlah menu:", products.length);
