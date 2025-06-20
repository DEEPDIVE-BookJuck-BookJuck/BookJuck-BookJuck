const API_KEY = "API_KEY";
const keyword = "해리포터";

fetch(`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${API_KEY}&Query=${keyword}&QueryType=Title&output=js`)
  .then(res => res.text())
  .then(text => {
    const jsonText = text.trim().replace(/;$/, "");
    const data = JSON.parse(jsonText);
    console.log("📚 검색 결과:", data.item);
  })
  .catch(err => {
    console.error("❌ 검색 API 호출 실패:", err);
  });