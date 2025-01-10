function getMealInfo() {
    const API_KEY = "12223b6763eb4851acee4c8f03d4dba8";
    const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo";
    const ATPT_OFCDC_SC_CODE = "B10";   //서울 특별시 교육청
    const SD_SCHUL_CODE = "7011569";
    const TYPE = "json";
    const dateData = (document.getElementById("dateInput").value).replace(/-/g, '');
    const api_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${API_KEY}&MLSV_YMD=${dateData}&Type=${TYPE}`;
    console.log(dateData);
  
    fetch(api_url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const breakfastMenuUL = document.getElementById("breakfastMenu");
        const lunchMenuUL = document.getElementById("lunchMenu");
        const dinnerMenuUL = document.getElementById("dinnerMenu");
  
        // 초기화
        breakfastMenu.innerHTML = '';
        lunchMenu.innerHTML = '';
        dinnerMenu.innerHTML = '';
  
        if (!data.mealServiceDietInfo) {
          return;
        }
  
        const menuData = data.mealServiceDietInfo[1].row;
  
        menuData.forEach(menuRow => {
          const { MMEAL_SC_NM, DDISH_NM } = menuRow;
          const menuList = DDISH_NM.replace(/\([^()]*\)/g, '')
                                    .replace(/\./g, '')
                                    .replace(/\*/g, '')
                                    .split('<br/>');
  
          const menuItems = menuList.map(item => `<li>${item}</li>`).join('');
  
          switch (MMEAL_SC_NM) {
            case '조식':
              breakfastMenu.innerHTML += menuItems;
              break;
            case '중식':
              lunchMenu.innerHTML += menuItems;
              break;
            case '석식':
              dinnerMenu.innerHTML += menuItems;
              break;
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // 에러 메시지를 사용자에게 표시하거나 다른 처리를 수행
      });
  }