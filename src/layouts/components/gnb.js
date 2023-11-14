const gnbList = [
  {
    'name': '영화정보',
    'to': '',
    'children': [
        {
          'name': '상영중 영화',
          'to': '/MovieList',
        },
        {
          'name': '박스오피스',
          'to': '/BoxOffice',
        }        
      ]
  },
  {
    'name': '컴포넌트',
    'to': '',
    'children': [
        {
          'name': '버튼',
          'to': '/cmpButton',
        },
        {
          'name': '타이틀',
          'to': '/cmpTitle',
        },
        {
          'name': '모달',
          'to': '/cmpModal',
        },
        {
          'name': '툴팁',
          'to': '/cmpToolTip',
        },
        {
          'name': '아코디언',
          'to': '/cmpAccordion',
        },
        {
          'name': '탭메뉴',
          'to': '/cmpTab',
        },
        {
          'name': 'SVG맵',
          'to': '/cmpKoreaMap',
        }            
      ]
  },
  {
    'name': '이벤트',
    'to': '',
    'children': [
        {
          'name': 'swiper',
          'to': '',
        },
        {
          'name': '스크롤이벤트',
          'to': '/scrollEvent',
        },
        {
          'name': '동영상 제어',
          'to': '',
        },
        {
          'name': '전국날씨',
          'to': '/cmpKoreaWeather',
        }           
      ]
  },
  {
    'name': '가이드',
    'to': '',
    'children': [
        {
          'name': '개요',
          'to': '/PubSummary',
        },
        { 
          'name': '설계 정책',
          'to': '/PubRoll',
        },
        {
          'name': '퍼블 리스트',
          'to': '/PubList',
        }          
      ]
  }     

]

export default gnbList