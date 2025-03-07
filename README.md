# RTK Query Infinite Scroll 示例

這個項目展示了如何使用 Redux Toolkit Query (RTK Query) 的 `infiniteQuery` 功能實現無限滾動。

## 技術棧

- React.js
- Next.js
- Redux Toolkit
- RTK Query
- Styled Components

## 功能

- 使用 RTK Query 的 infiniteQuery 功能
- 使用 Intersection Observer API 實現無限滾動
- 響應式卡片佈局
- 動態加載動畫
- 模擬 API 延遲

## 開始使用

1. 安裝依賴：

   ```
   npm install
   ```

2. 運行開發服務器：

   ```
   npm run dev
   ```

3. 打開瀏覽器，訪問 http://localhost:3000

## 注意事項

- 這個示例使用了 RTK Query 2.6.0+ 版本，這是支持 infiniteQuery 功能的最低版本
- 示例包含模擬 API 端點，位於 `/pages/api/` 目錄下
- 無限滾動邏輯可在 `components/AnimeCardList.js` 中找到
