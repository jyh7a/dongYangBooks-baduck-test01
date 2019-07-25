$('.button').on('click', function (e) {

	$white.removeClass('on');
	$black.addClass('on');

	dataIsCahnge = false;

	if (e.target.textContent == 'next') {
		if (dataList[dataIndex + 1]) {
			dataIndex++;			
		} else {
			alert('마지막 문제입니다 ㅠㅅㅠ;;');
		}
	} else if (e.target.textContent == 'prev') {
		if (dataList[dataIndex - 1]) {
			dataIndex--;		
		} else {
			alert('맨 앞입니다...;;');
		}
	}

	dataInit(); // 데이터 초기화후 그려줌

	// 턴초기화
	turn = 'black';
}); // 버튼 들릭시