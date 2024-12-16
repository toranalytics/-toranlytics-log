const { withSitemap } = require('next-sitemap');

module.exports = withSitemap({
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  sitemap: {
    siteUrl: 'https://toranalytics.vercel.app/', // 자신의 사이트 URL로 변경하세요.
    generateRobotsTxt: true, // robots.txt 파일 생성
  },
});
