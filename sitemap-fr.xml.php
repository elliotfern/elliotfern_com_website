<?php
header("Content-Type: application/xml; charset=utf-8");

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

$lang = "fr";

// 1. URLs estáticas
$staticPages = [
    ['loc' => 'homepage', 'lastmod' => '2024-11-13'],
    ['loc' => 'about-author', 'lastmod' => '2024-11-13'],
    ['loc' => 'books', 'lastmod' => '2024-11-13'],
    ['loc' => 'authors', 'lastmod' => '2024-11-13'],
    ['loc' => 'history-archives', 'lastmod' => '2024-11-13'],
    ['loc' => 'blog', 'lastmod' => '2024-11-13'],
    ['loc' => 'links', 'lastmod' => '2024-11-13'],
    ['loc' => 'privacy-policy', 'lastmod' => '2024-11-13'],
    ['loc' => 'commitment-responsibility', 'lastmod' => '2024-11-13'],
    ['loc' => 'contact', 'lastmod' => '2024-11-13'],
];

foreach ($staticPages as $page) {
    echo "<url>";
    echo "<loc>https://elliotfern.com/{$lang}/{$page['loc']}</loc>";
    echo "<lastmod>{$page['lastmod']}</lastmod>";
    echo "<changefreq>monthly</changefreq>";
    echo "<priority>0.7</priority>";
    echo "</url>";
}

// 2. Llamada a la API 1 (por ejemplo, para obtener artículos de noticias)
$apiUrl1 = "https://api.elliotfern.com/sitemap.php?type=sitemapArticlesHistoria&lang={$lang}"; // URL de la API para artículos de noticias
$dynamicPages1 = json_decode(file_get_contents($apiUrl1), true);

if ($dynamicPages1 && is_array($dynamicPages1)) {
    foreach ($dynamicPages1 as $page) {
        echo "<url>";
        echo "<loc>https://elliotfern.com/{$lang}/article/{$page['loc']}</loc>";
        echo "<lastmod>{$page['lastmod']}</lastmod>";
        echo "<changefreq>weekly</changefreq>";
        echo "<priority>0.9</priority>";
        echo "</url>";
    }
}

// 3. Llamada a la API 2 (por ejemplo, para obtener productos o eventos)
$apiUrl2 = "https://api.elliotfern.com/sitemap.php?type=sitemapCursosHistoria&lang={$lang}"; // URL de la API para productos
$dynamicPages2 = json_decode(file_get_contents($apiUrl2), true);

if ($dynamicPages2 && is_array($dynamicPages2)) {
    foreach ($dynamicPages2 as $page) {
        echo "<url>";
        echo "<loc>https://elliotfern.com/{$lang}/course/{$page['loc']}</loc>";
        echo "<lastmod>{$page['lastmod']}</lastmod>";
        echo "<changefreq>monthly</changefreq>";
        echo "<priority>0.6</priority>";
        echo "</url>";
    }
}

echo '</urlset>';
?>