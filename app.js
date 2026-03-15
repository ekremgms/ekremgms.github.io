/**
 * Oyun Motoru Seçici - app.js
 * Dinamik filtreleme ve render mantığı
 */

// 1. Oyun Motoru Veritabanı
const engines = [
    {
        name: "Unity",
        description: "Dünyanın en popüler çok platformlu oyun motoru. Geniş topluluk ve asset mağazası ile her seviyeye uygun.",
        platforms: ["PC", "Mobil", "Web", "Konsol", "Cross Platform"],
        languages: ["C#"],
        graphics: ["2D + 3D"],
        license: "Royalty",
        learning: "Orta",
        asset_store: "Var (Çok Geniş)",
        community: "Çok Büyük",
        example_games: ["Hollow Knight", "Cuphead", "Genshin Impact"],
        website: "https://unity.com",
        learning_resources: "Unity Learn, YouTube (Brackeys), Udemy",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg"
    },
    {
        name: "Unreal Engine",
        description: "Yüksek grafik kalitesi ve AAA oyunlar için endüstri standardı. Güçlü görsel programlama (Blueprints) sunar.",
        platforms: ["PC", "Mobil", "Konsol", "Cross Platform"],
        languages: ["C++", "Visual Scripting"],
        graphics: ["3D"],
        license: "Royalty",
        learning: "İleri",
        asset_store: "Var (Kaliteli)",
        community: "Büyük",
        example_games: ["Fortnite", "Final Fantasy VII Remake", "The Witcher 4 (Geliştiriliyor)"],
        website: "https://unrealengine.com",
        learning_resources: "Unreal Online Learning, Quixel Tutorials",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Unreal_Engine_Logo.svg"
    },
    {
        name: "Godot",
        description: "Hafif, ücretsiz ve tamamen açık kaynaklı. 2D ve 3D projeler için hızla büyüyen bir alternatif.",
        platforms: ["PC", "Mobil", "Web", "Konsol", "Cross Platform"],
        languages: ["C#", "GDScript", "C++"],
        graphics: ["2D + 3D"],
        license: "Açık Kaynak",
        learning: "Başlangıç",
        asset_store: "Var (Gelişmekte)",
        community: "Orta / Hızlı Büyüyor",
        example_games: ["Cassette Beasts", "Cruelty Squad", "Dome Keeper"],
        website: "https://godotengine.org",
        learning_resources: "Godot Docs, GDQuest, YouTube",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg"
    },
    {
        name: "GameMaker",
        description: "Özellikle 2D oyunlar için optimize edilmiş, profesyonel bir motor.",
        platforms: ["PC", "Mobil", "Web", "Konsol"],
        languages: ["Visual Scripting", "GML"],
        graphics: ["2D"],
        license: "Ücretsiz (Ticari Olmayan)",
        learning: "Başlangıç",
        asset_store: "Var",
        community: "Orta",
        example_games: ["Undertale", "Katana ZERO", "Hotline Miami"],
        website: "https://gamemaker.io",
        learning_resources: "GameMaker Tutorials, YouTube",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/GameMaker_Studio_2_Logo.svg"
    },
    {
        name: "GDevelop",
        description: "Olay tabanlı, sürükle-bırak mantığına dayalı açık kaynaklı (MIT) motor.",
        platforms: ["PC", "Mobil", "Web"],
        languages: ["Visual Scripting", "JavaScript"],
        graphics: ["2D", "3D"],
        license: "Açık Kaynak",
        learning: "Başlangıç",
        asset_store: "Var",
        community: "Orta",
        example_games: ["Bullet Bunny", "Spent Shells", "Hyperspace Deck Command"],
        website: "https://gdevelop.io",
        learning_resources: "GDevelop Wiki, YouTube",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/GDevelop_logo.svg"
    },
    {
        name: "Defold",
        description: "Performans odaklı, ücretsiz ve açık kaynaklı, Lua tabanlı 2D/3D motor.",
        platforms: ["PC", "Mobil", "Web", "Konsol"],
        languages: ["Lua", "C++"],
        graphics: ["2D"],
        license: "Açık Kaynak (Apache 2.0 varyantı)",
        learning: "Orta",
        asset_store: "Var",
        community: "Küçük / Aktif",
        example_games: ["Family Island", "Void Scrappers", "Fates of Ort"],
        website: "https://defold.com",
        learning_resources: "Defold Docs, Community Forum",
        logo: "https://defold.com/static/logo.svg"
    },
    {
        name: "CryEngine",
        description: "Fotorealistik görseller ve devasa dünyalar için tasarlanmış (5% Royalty) motor.",
        platforms: ["PC", "Konsol"],
        languages: ["C++", "C#"],
        graphics: ["3D"],
        license: "Royalty",
        learning: "İleri",
        asset_store: "Var",
        community: "Orta",
        example_games: ["Crysis", "Hunt: Showdown", "Kingdom Come: Deliverance"],
        website: "https://cryengine.com",
        learning_resources: "CryEngine Documentation",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/CryEngine_Logo.svg"
    },
    {
        name: "O3DE",
        description: "Amazon Lumberyard'ın açık kaynaklı (Apache 2.0) halefi, modüler 3D oyun motoru.",
        platforms: ["PC", "Mobil", "Konsol"],
        languages: ["C++", "Visual Scripting"],
        graphics: ["3D"],
        license: "Açık Kaynak",
        learning: "İleri",
        asset_store: "Yok",
        community: "Küçük",
        example_games: ["New World (Lumberyard)", "State of Matter", "MadWorld"],
        website: "https://o3de.org",
        learning_resources: "O3DE Documentation, YouTube",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Open_3D_Engine.svg"
    },
    {
        name: "RPG Maker",
        description: "JRPG türü oyunlar yapmak için özelleşmiş en bilindik araç serisi.",
        platforms: ["PC", "Mobil", "Web", "Konsol"],
        languages: ["JavaScript", "Ruby"],
        graphics: ["2D"],
        license: "Ticari Lisans",
        learning: "Başlangıç",
        asset_store: "Var (Çok Sayıda)",
        community: "Büyük",
        example_games: ["To the Moon", "Omori", "Lisa: The Painful"],
        website: "https://rpgmakerweb.com",
        learning_resources: "RPG Maker Forums",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/RPG_Maker_MV_Logo.svg"
    },
    {
        name: "Phaser",
        description: "Web tarayıcıları için (MIT lisanslı) en popüler 2D oyun kütüphanesi.",
        platforms: ["Web", "Mobil"],
        languages: ["JavaScript", "TypeScript"],
        graphics: ["2D"],
        license: "Açık Kaynak",
        learning: "Orta",
        asset_store: "Yok",
        community: "Büyük",
        example_games: ["Vampire Survivors (Orijinal)", "Exhibit of Sorrows", "Frauki's Adventure"],
        website: "https://phaser.io",
        learning_resources: "Phaser Labs, Examples",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Phaser_Logo.svg"
    },
    {
        name: "Construct 3",
        description: "Görsel programlama (Event Sheets) ile etkili web tabanlı HTML5 motoru.",
        platforms: ["Web", "Mobil", "PC"],
        languages: ["Visual Scripting", "JavaScript"],
        graphics: ["2D"],
        license: "Abonelik",
        learning: "Başlangıç",
        asset_store: "Var",
        community: "Orta",
        example_games: ["The Next Penelope", "Airscape", "Iconoclasts (C2)"],
        website: "https://construct.net",
        learning_resources: "Construct 3 Academy",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Construct_3_Logo.svg"
    },
    {
        name: "Cocos Creator",
        description: "Mobil ve HTML5 oyunlar için optimize edilmiş, TypeScript/C++ destekli motor.",
        platforms: ["PC", "Mobil", "Web"],
        languages: ["JavaScript", "C++"],
        graphics: ["2D + 3D"],
        license: "Açık Kaynak",
        learning: "Orta",
        asset_store: "Var",
        community: "Büyük",
        example_games: ["CropHero", "Paper Wedding Dress 4", "King of Salted Fish"],
        website: "https://cocos.com",
        learning_resources: "Cocos Creator Docs",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Cocos_Logo.svg"
    },
    {
        name: "Stride",
        description: ".NET ve C# odaklı, açık kaynaklı (MIT) modern bir 3D oyun motoru.",
        platforms: ["PC", "Mobil", "Konsol"],
        languages: ["C#"],
        graphics: ["3D"],
        license: "Açık Kaynak",
        learning: "Orta",
        asset_store: "Yok",
        community: "Küçük",
        example_games: ["Virtual Desktop", "Daggerfall Unity", "Starbreach"],
        website: "https://stride3d.net",
        learning_resources: "Stride Docs",
        logo: "https://www.stride3d.net/images/stride-logo.svg"
    },
    {
        name: "MonoGame",
        description: "C# ile derinlemesine kontrol sunan (Ms-PL lisanslı) cross-platform framework.",
        platforms: ["PC", "Mobil", "Konsol"],
        languages: ["C#"],
        graphics: ["2D + 3D"],
        license: "Açık Kaynak",
        learning: "İleri",
        asset_store: "Yok",
        community: "Büyük",
        example_games: ["Stardew Valley", "Celeste", "Carrion"],
        website: "https://monogame.net",
        learning_resources: "MonoGame Documentation",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/MonoGame_Logo.svg"
    }
];

// 2. DOM Elemanları
const engineGrid = document.getElementById('engineGrid');
const resultCountText = document.getElementById('resultCount');
const noResultsDiv = document.getElementById('noResults');
const resetBtn = document.getElementById('resetFilters');
const filterPanel = document.getElementById('filterPanel');
const detailModal = document.getElementById('detailModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// 3. Filtreleme Fonksiyonları
function getActiveFilters() {
    const filters = {
        platform: [],
        graphics: [],
        language: [],
        license: [],
        learning: []
    };

    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        filters[checkbox.name].push(checkbox.value);
    });

    return filters;
}

function filterEngines() {
    const activeFilters = getActiveFilters();
    
    const filtered = engines.filter(engine => {
        // Platform filtresi (En az bir eşleşme)
        if (activeFilters.platform.length > 0) {
            if (!activeFilters.platform.some(p => engine.platforms.includes(p))) return false;
        }

        // Grafik filtresi
        if (activeFilters.graphics.length > 0) {
            if (!activeFilters.graphics.some(g => engine.graphics.includes(g))) return false;
        }

        // Dil filtresi
        if (activeFilters.language.length > 0) {
            if (!activeFilters.language.some(l => engine.languages.includes(l))) return false;
        }

        // Lisans filtresi
        if (activeFilters.license.length > 0) {
            if (!activeFilters.license.some(li => engine.license.includes(li))) return false;
        }

        // Öğrenme filtresi
        if (activeFilters.learning.length > 0) {
            if (!activeFilters.learning.includes(engine.learning)) return false;
        }

        return true;
    });

    renderEngines(filtered);
}

// 4. Render Fonksiyonları
function renderEngines(engineList) {
    engineGrid.innerHTML = '';
    resultCountText.innerText = `${engineList.length} oyun motoru bulundu.`;

    if (engineList.length === 0) {
        noResultsDiv.classList.remove('hidden');
    } else {
        noResultsDiv.classList.add('hidden');
        
        engineList.forEach((engine, index) => {
            const card = document.createElement('div');
            card.className = 'engine-card';
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.innerHTML = `
                <div class="card-top">
                    <div class="logo-wrapper">
                        <img src="${engine.logo}" alt="${engine.name}" class="engine-logo" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="logo-fallback" style="display:none">${engine.name.substring(0, 2).toUpperCase()}</div>
                    </div>
                    <h2 class="engine-name">${engine.name}</h2>
                </div>
                <p class="engine-desc">${engine.description}</p>
                <div class="card-meta">
                    ${engine.languages.map(lang => `<span class="tag tag-language">${lang}</span>`).join('')}
                    <span class="tag tag-license">${engine.license}</span>
                    <span class="tag">${engine.learning}</span>
                </div>
                <div class="example-games">
                    <h4 class="example-games-title">Popüler Oyunlar</h4>
                    <ul class="game-list">
                        ${engine.example_games.map(game => `<li>${game}</li>`).join('')}
                    </ul>
                </div>
                <button class="card-btn">Motor Detayları</button>
            `;
            
            // Attach event listener properly instead of inline HTML onclick
            const btn = card.querySelector('.card-btn');
            btn.addEventListener('click', () => showDetails(engine.name));

            engineGrid.appendChild(card);
        });
    }
}

// 5. Modal Fonksiyonları
function showDetails(engineName) {
    const engine = engines.find(e => e.name === engineName);
    if (!engine) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="logo-wrapper modal-logo-wrapper">
                <img src="${engine.logo}" alt="${engine.name}" class="modal-logo" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="logo-fallback modal-logo-fallback" style="display:none">${engine.name.substring(0, 2).toUpperCase()}</div>
            </div>
            <div class="modal-title">
                <h2>${engine.name}</h2>
                <div class="card-meta">
                    <span class="tag tag-license">${engine.license}</span>
                    <span class="tag tag-language">${engine.learning} Kolaylığı</span>
                </div>
            </div>
        </div>
        <p>${engine.description} ${engine.name}, ${engine.platforms.join(', ')} platformlarını destekler.</p>
        
        <div class="detail-section">
            <div class="detail-item">
                <label>Web Sitesi</label>
                <a href="${engine.website}" target="_blank">${engine.website.replace('https://', '')}</a>
            </div>
            <div class="detail-item">
                <label>Topluluk Büyüklüğü</label>
                <p>${engine.community}</p>
            </div>
            <div class="detail-item">
                <label>Asset Store</label>
                <p>${engine.asset_store}</p>
            </div>
            <div class="detail-item">
                <label>Eğitim Kaynakları</label>
                <p>${engine.learning_resources}</p>
            </div>
        </div>

        <div class="example-games">
            <h4 class="example-games-title">Tüm Desteklenen Platformlar</h4>
            <div class="card-meta">
                ${engine.platforms.map(p => `<span class="tag">${p}</span>`).join('')}
            </div>
        </div>
    `;

    detailModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Scroll kilidi
};

function hideDetails() {
    detailModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 6. Başlatma ve Event Listenerlar
function init() {
    // İlk render
    renderEngines(engines);

    // Filtre değişikliği takibi
    filterPanel.addEventListener('change', () => {
        filterEngines();
    });

    // Filtre sıfırlama
    resetBtn.addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        filterEngines();
    });

    // Modal kapatma
    closeModal.addEventListener('click', hideDetails);
    window.addEventListener('click', (e) => {
        if (e.target === detailModal) hideDetails();
    });
}

// Uygulamayı çalıştır
document.addEventListener('DOMContentLoaded', init);
