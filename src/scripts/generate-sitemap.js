import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";
import axios from "axios";

// (Blacklist)
const EXCLUDED_SLUGS = ["viet-nam", "phim-18"];

const staticLinks = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/phim-moi", changefreq: "daily", priority: 0.8 },
  { url: "/phim-le", changefreq: "daily", priority: 0.8 },
];

async function generateSitemap() {
  try {
    const [resTheLoai, resQuocGia] = await Promise.all([
      axios.get("https://phimapi.com/the-loai"),
      axios.get("https://phimapi.com/quoc-gia"),
    ]);

    const theLoaiLinks = resTheLoai.data
      .filter(item => !EXCLUDED_SLUGS.includes(item.slug))
      .map(item => ({
        url: `/the-loai/${item.slug}`,
        changefreq: "weekly",
        priority: 0.7,
      }));

    const quocGiaLinks = resQuocGia.data
      .filter(item => !EXCLUDED_SLUGS.includes(item.slug))
      .map(item => ({
        url: `/quoc-gia/${item.slug}`,
        changefreq: "weekly",
        priority: 0.7,
      }));

    const allLinks = [...staticLinks, ...theLoaiLinks, ...quocGiaLinks];

    const stream = new SitemapStream({ hostname: "https://paophim.app" });
    const data = await streamToPromise(Readable.from(allLinks).pipe(stream));

    if (!fs.existsSync("./public")) {
      fs.mkdirSync("./public");
    }

    fs.writeFileSync("./public/sitemap.xml", data.toString());
    console.log(`✅ Sitemap updated! Total links: ${allLinks.length}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

generateSitemap();
