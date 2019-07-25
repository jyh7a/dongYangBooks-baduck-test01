// 내가클릭한곳 알아야함(테이블과 data 일치 시켜야함)
// 클릭한곳을 data를 검은색(2) 으로 바꾸고
// makeBaduckPan실행

tr.on('click', function (e) {
	if (clickFlag) {

		dataIsCahnge = true;

		var row = e.currentTarget; // 행
		var col = e.target; // 열
		var rowIndex = $.inArray(row, tr); // 내가클릭한 행
		var colIndex = $.inArray(col, td) % 10; // 내가클릭한 열

		// 흰돌 눌렀을때 오답 2번 뜨는것 방지 및 빈자리를 검은돌로
		isDataChange = dataChange(rowIndex, colIndex);

		// 검은돌 클릭시 좌 상 우 하		
		// leftWhiteArry, topWhiteArry, rightWhiteArry, bottomWhiteArry
		// 배열에 흰색 좌표 저장
		black_search_allWthie(rowIndex, colIndex);
		

		// leftWhiteArry, topWhiteArry, rightWhiteArry, bottomWhiteArry
		// 배열이 존재 할때 그 배열의 주변 빈칸 length 구함
		// length 가 0일대 그 배열 삭제
		whiteDelete();		


		// 바둑판 그리기
		makeBaduckPan();

	}
}); // tr click