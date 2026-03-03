import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";

// Danh sách các URL trong website của bạn
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/phim-moi", changefreq: "daily", priority: 0.8 },
  { url: "/the-loai", changefreq: "weekly", priority: 0.7 },
  // Thêm các route khác tại đây
];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: "https://paophim.app" });
  const data = await streamToPromise(Readable.from(links).pipe(stream));

  // Ghi tệp vào thư mục public để có thể truy cập qua domain.com/sitemap.xml
  fs.writeFileSync("./public/sitemap.xml", data.toString());
}

generateSitemap();
