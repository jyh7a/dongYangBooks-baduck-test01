// 내가클릭한곳 알아야함(테이블과 data 일치 시켜야함)
// 클릭한곳을 data를 검은색(2) 으로 바꾸고
// makeBaduckPan실행

tr.on('click', function (e) {
	if (clickFlag) {

		// 전역변수 배열 초기화
		(function () {
			// 검은돌클릭시 왼쪽 위 오른쪽 아래 흰돌 배열
			leftWhiteArry = [];
			topWhiteArry = [];
			rightWhiteArry = [];
			bottomWhiteArry = [];
			// 위쪽 흰돌 배열의 좌,상,우,하 돌면서 빈칸 배열 위치저장
			leftWhiteArry_blank = [];
			topWhiteArry_blank = [];
			rightWhiteArry_blank = [];
			bottomWhiteArry_blank = [];

			// ------------------- 흰돌 놓을때 -----------------
			// 흰돌클릭시 왼쪽 위 오른쪽 아래 흰돌 배열
			leftBlackArry = [];
			topBlackArry = [];
			rightBlackArry = [];
			bottomBlackArry = [];
			// 위쪽 검은돌 배열의 좌,상,우,하 돌면서 빈칸 배열 위치저장
			leftBlackArry_blank = [];
			topBlackArry_blank = [];
			rightBlackArry_blank = [];
			bottomBlackArry_blank = [];
			
		})();


		dataIsCahnge = true;

		var row = e.currentTarget; // 행
		var col = e.target; // 열
		var rowIndex = $.inArray(row, tr); // 내가클릭한 행
		var colIndex = $.inArray(col, td) % 10; // 내가클릭한 열

		// 흰돌 눌렀을때 오답 2번 뜨는것 방지 및 빈자리를 검은돌로
		isDataChange = dataChange(rowIndex, colIndex);

		if (turn == 'black') { // 검은돌 클릭
			// 클래그 토글
			$white.toggleClass('on');
			$black.removeClass('on');

			// 검은돌 클릭시 좌 상 우 하		
			// leftWhiteArry, topWhiteArry, rightWhiteArry, bottomWhiteArry
			// 배열에 흰색 좌표 저장
			black_search_allWthie(rowIndex, colIndex);

			// leftWhiteArry, topWhiteArry, rightWhiteArry, bottomWhiteArry
			// 배열이 존재 할때 그 배열의 주변 빈칸 length 구함
			// length 가 0일대 그 배열 삭제
			whiteDelete();

			// 자기자신 죽는지 체크 - 검돌
			checkBlackSelf(rowIndex, colIndex);
			blackSelfKill();
			if (selfKill) {
				dataList_copy[dataIndex][rowIndex][colIndex] = 2;
				draw();
			}

		} else { // 흰돌 클릭
			// 클래그 토글
			$white.removeClass('on');
			$black.toggleClass('on');

			white_search_allBlack(rowIndex, colIndex);
			blackDelete();

			
			// 자기자신 죽는지 체크 - 흰돌
			checkWhiteSelf(rowIndex, colIndex);
			whiteSelfKill();
			if(selfKill){
				dataList_copy[dataIndex][rowIndex][colIndex] = 1;
				draw();
			}
		}



		// 바둑판 그리기
		if (selfKill) {
			selfKill = false;
			dataList_copy[dataIndex][rowIndex][colIndex] = 0;
			setTimeout(function () {
				makeBaduckPan();
			}, 200)
		} else {
			makeBaduckPan();
		}

		// 턴초기화
		turn == 'black' ? turn = 'white' : turn = 'black';
	}
}); // tr click