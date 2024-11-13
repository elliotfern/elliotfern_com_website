<?php
header("Content-Type: application/xml; charset=utf-8");
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <?php
    $languages = ['en', 'es', 'fr', 'it', 'ca'];
    foreach ($languages as $lang) {
        echo "<sitemap><loc>https://elliotfern.com/sitemap-$lang.xml</loc><lastmod>" . date('Y-m-d') . "</lastmod></sitemap>";
    }
    ?>
</sitemapindex>