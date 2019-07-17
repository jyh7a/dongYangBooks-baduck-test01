$('.button').on('click', function (e) {

	dataIsCahnge = false;

	if (e.target.textContent == 'next') {
		if (dataList[dataIndex + 1]) {
			dataIndex++;
			dataInit();	// 데이터 초기화후 그려줌
		} else {
			alert('마지막 문제입니다 ㅠㅅㅠ;;');
		}
	} else if (e.target.textContent == 'prev') {
		if (dataList[dataIndex - 1]) {
			dataIndex--;
			dataInit();	// 데이터 초기화후 그려줌
		} else {
			alert('맨 앞입니다...;;');
		}
	}
}); // 버튼 들릭시