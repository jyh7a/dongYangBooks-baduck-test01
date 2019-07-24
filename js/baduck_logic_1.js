// 전역변수 셋팅

// 이미 dataList 는 전역변수	

// tr, td 변수 선언
var tr = $('#table_1 tr');
var td = tr.children();

var rowLength = dataList[dataIndex].length;
var colLength = dataList[dataIndex][0].length;

// 데이터가 바꼈는지 체크하는 전역변수
var dataIsCahnge = false;

// 오답후 클릭 못하게
var clickFlag = true;

// 검은돌클릭시 왼쪽 위 오른쪽 아래 흰돌 배열
var leftWhiteArry = [];
var topWhiteArry = [];
var rightWhiteArry = [];
var bottomWhiteArry = [];



// 흰색누르면 오답두개뜨는것 방지
var isDataChange;

// 전역변수 셋팅 END -----------------------------------------------


// 시작시 makeBaduckPan 실행
makeBaduckPan();


// 바둑판을 그려주는 함수
function makeBaduckPan(re) {
	if (re) {
		for (var i = 0; i < rowLength; i += 1) { // tr
			for (var j = 0; j < colLength; j += 1) { // td
				if (dataList_copy[dataIndex][i][j] == 3) {
					dataList_copy[dataIndex][i][j] = 1;
				}
			}
		}
		return;
	}

	// data1 의 행의갯수 와 열의갯수 dataList[dataIndex]
	for (var i = 0; i < rowLength; i += 1) { // tr
		for (var j = 0; j < colLength; j += 1) { // td
			// 판 초기화
			tr[i].children[j].className = '';

			if (dataIsCahnge) {
				if (dataList_copy[dataIndex][i][j] == 1 ||
					dataList_copy[dataIndex][i][j] == 3) {
					tr[i].children[j].classList.add('white');
				} else if (dataList_copy[dataIndex][i][j] == 2) {
					tr[i].children[j].classList.add('black');
				}
			} else {
				if (dataList_copy[dataIndex][i][j] == 1 ||
					dataList_copy[dataIndex][i][j] == 3) {
					tr[i].children[j].classList.add('white');
				} else if (dataList[dataIndex][i][j] == 2) {
					tr[i].children[j].classList.add('black');
				}
			}
		}
	}
} // makeBaduckPan()


// 데이터를 바꿔주는 함수 -> 빈자리를 검은돌로
function dataChange(rowIndex, colIndex) {
	if (dataList_copy[dataIndex][rowIndex][colIndex] != 0) {
		whiteCheckFail();
		return -1;
	}

	// 내가클릭한 곳이 공백(0) 이면
	// 데이터를 2(검은돌) 로 바꿔줌
	if (dataList_copy[dataIndex][rowIndex][colIndex] == 0) {
		dataList_copy[dataIndex][rowIndex][colIndex] = 2;
	}
} // dataChange()


// 데이터를 초기화 해주는 함수 -> 초기화후 그리기까지 같이
function dataInit() {
	// copy데이터에 orgin 데이터 삽입
	for (var i = 0; i < rowLength; i += 1) { // tr
		for (var j = 0; j < colLength; j += 1) { // td
			dataList_copy[dataIndex][i][j] = dataList[dataIndex][i][j];
		}
	}
	makeBaduckPan();
}

// 실패시 오답처리 및 데이터 초기화
function whiteCheckFail() {
	clickFlag = false;
	setTimeout(function () {
		dataInit();
		alert('땡! 오답입니다');
		clickFlag = true;
	}, 0);
}


// 검은돌 클릭시 좌 상 우 하
function black_search_allWthie(rowIndex, colIndex) {
	// 여기서 4개로 나눠짐
	// 1. 왼쪽 흰돌있으면 흰돌배열 전체 가져오기
	if (dataList_copy[dataIndex][rowIndex][colIndex - 1] == 1) {
		// 배열 초기화
		leftWhiteArry = [];
		// 내가클릭한 왼쪽 흰돌 위치 저장
		leftWhiteArry.push([rowIndex, colIndex - 1]);
		dataList_copy[dataIndex][rowIndex][colIndex - 1] = 3;
		// 내가클릭한 돌 왼쪽 기준으로 탐색 시작(데이터를 탐색)
		searchFunction(rowIndex, colIndex - 1);
		
		function searchFunction(r, c) {
			// r, c 좌표 영역 지정 
			// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
			if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
				// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
				// 좌
				if (dataList_copy[dataIndex][r][c - 1] == 1) {
					leftWhiteArry.push([r, c - 1]);
					dataList_copy[dataIndex][r][c - 1] = 3;
				}
				// 상
				if (dataList_copy[dataIndex][r - 1][c] == 1) {
					leftWhiteArry.push([r - 1, c]);
					dataList_copy[dataIndex][r - 1][c] = 3;
				}
				// 우
				if (dataList_copy[dataIndex][r][c + 1] == 1) {
					leftWhiteArry.push([r, c + 1]);
					dataList_copy[dataIndex][r][c + 1] = 3;
				}
				// 하
				if (dataList_copy[dataIndex][r + 1][c] == 1) {
					leftWhiteArry.push([r + 1, c]);
					dataList_copy[dataIndex][r + 1][c] = 3;
				}
			} // r, c 0,0 ~ 9,9까지 제한 
		}// searchFunction

		// 클릭된 죽을지도모르는흰돌(3) 배열을 다시 상하 좌우로 돌면서 
		// leftWhiteArry 배열에 담음
		clickSearchedArray();
		function clickSearchedArray(){

		}


		console.log(leftWhiteArry);
	}// 왼쪽에 흰돌있으면
}