// 전역변수 셋팅

// 이미 dataList 는 전역변수	

// tr, td 변수 선언
var tr = $('tr');
var td = tr.children();

var rowLength = dataList[dataIndex].length;
var colLength = dataList[dataIndex][0].length;

// 데이터가 바꼈는지 체크하는 전역변수
var dataIsCahnge = false;

// 오답후 클릭 못하게
var clickFlag = true;

// spaceWhiteCheck total 변수
var totalCorrectNum = 0;
var willWhiteDeath = [];
var willWhiteDeath_Top = [];
var willWhiteDeath_Bottom = [];
var willWhiteDeath_Left = [];
var willWhiteDeath_Right = [];
var willWhiteDeathTostring = [];
var whitewhiteTotalCorrectNum = 0;
var whiteFirstClick = true;
var whiteFirstTopClick = true;
var whiteFirstTopClickV = 0;
var whiteFirstBottomClick = true;
var whiteFirstLeftClick = true;
var whiteFirstRightClick = true;



// 흰색누르면 오답두개뜨는것 방지
var isDataChange;

//------------------------------------------------------------


// 시작시 makeBaduckPan 실행
makeBaduckPan();


// 바둑판을 그려주는 함수
function makeBaduckPan(re) {
	if(re){
		for (var i = 0; i < rowLength; i += 1) { // tr
			for (var j = 0; j < colLength; j += 1) { // td
				if(dataList_copy[dataIndex][i][j] == 3){
					dataList_copy[dataIndex][i][j] = 1;
				}
			}
		}
		return ;
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
	if( dataList_copy[dataIndex][rowIndex][colIndex] != 0 ){
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