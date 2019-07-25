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

// 위쪽 흰돌 배열의 좌,상,우,하 돌면서 빈칸 배열 위치저장
var leftWhiteArry_blank = [];
var topWhiteArry_blank = [];
var rightWhiteArry_blank = [];
var bottomWhiteArry_blank = [];


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
	// 클릭 할때마다 죽을지모르는 돌(3)을 산돌로 바꿔줌 
	makeBaduckPan(true);

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
		var tempArray = [];

		function searchFunction(r, c) {
			tempArray = [];
			// r, c 좌표 영역 지정 
			// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
			// if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
				// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
				// 좌			
				if (dataList_copy[dataIndex][r][c - 1] == 1) {
					leftWhiteArry.push([r, c - 1]);
					tempArray.push([r, c - 1]);
					dataList_copy[dataIndex][r][c - 1] = 3;
				}
				// 상
				if(r - 1 > -1){
					if (dataList_copy[dataIndex][r - 1][c] == 1) {
						leftWhiteArry.push([r - 1, c]);
						tempArray.push([r - 1, c]);
						dataList_copy[dataIndex][r - 1][c] = 3;
					}
				}
				
				// 우
				if (dataList_copy[dataIndex][r][c + 1] == 1) {
					leftWhiteArry.push([r, c + 1]);
					tempArray.push([r, c + 1]);
					dataList_copy[dataIndex][r][c + 1] = 3;
				}
				// 하
				if(r + 1 < 10){
					if (dataList_copy[dataIndex][r + 1][c] == 1) {
						leftWhiteArry.push([r + 1, c]);
						tempArray.push([r + 1, c]);
						dataList_copy[dataIndex][r + 1][c] = 3;
					}
				}
			//} // r, c 0,0 ~ 9,9까지 제한 
			clickSearchedArray();
		} // searchFunction

		// 클릭된 죽을지도모르는흰돌(3) 배열을 다시 상하 좌우로 돌면서 
		// leftWhiteArry 배열에 담음		
		clickSearchedArray();

		function clickSearchedArray() {
			tempArray.forEach(function (item) {
				searchFunction(item[0], item[1]);
			});
		}

		console.log('leftWhiteArry ', leftWhiteArry);
	} // 왼쪽에 흰돌있으면

	// 2. 위쪽 흰돌있으면 흰돌배열 전체 가져오기
	if (rowIndex - 1 >= 0) {
		// 2. 위쪽 흰돌있으면 흰돌배열 전체 가져오기
		if (dataList_copy[dataIndex][rowIndex - 1][colIndex] == 1) {
			// 배열 초기화
			topWhiteArry = [];
			// 내가클릭한 위쪽 흰돌 위치 저장
			topWhiteArry.push([rowIndex - 1, colIndex]);
			dataList_copy[dataIndex][rowIndex - 1][colIndex] = 3;
			// 내가클릭한 돌 위쪽 기준으로 탐색 시작(데이터를 탐색)
			searchFunction(rowIndex - 1, colIndex);
			var tempArray = [];

			function searchFunction(r, c) {
				tempArray = [];
				// r, c 좌표 영역 지정 
				// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
				// if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
					// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
					// 좌
					if (dataList_copy[dataIndex][r][c - 1] == 1) {
						topWhiteArry.push([r, c - 1]);
						tempArray.push([r, c - 1]);
						dataList_copy[dataIndex][r][c - 1] = 3;
					}
					// 상
					if(r - 1 > -1){
						if (dataList_copy[dataIndex][r - 1][c] == 1) {
							topWhiteArry.push([r - 1, c]);
							tempArray.push([r - 1, c]);
							dataList_copy[dataIndex][r - 1][c] = 3;
						}
					}
					// 우
					if (dataList_copy[dataIndex][r][c + 1] == 1) {
						topWhiteArry.push([r, c + 1]);
						tempArray.push([r, c + 1]);
						dataList_copy[dataIndex][r][c + 1] = 3;
					}
					// 하
					if(r + 1 < 10){
						if (dataList_copy[dataIndex][r + 1][c] == 1) {
							topWhiteArry.push([r + 1, c]);
							tempArray.push([r + 1, c]);
							dataList_copy[dataIndex][r + 1][c] = 3;
						}
					}
				//} // r, c 0,0 ~ 9,9까지 제한 
				clickSearchedArray();
			} // searchFunction

			// 클릭된 죽을지도모르는흰돌(3) 배열을 다시 상하 좌우로 돌면서 
			// topWhiteArry 배열에 담음		
			clickSearchedArray();

			function clickSearchedArray() {
				tempArray.forEach(function (item) {
					searchFunction(item[0], item[1]);
				});
			}

			console.log('topWhiteArry ', topWhiteArry);
		} // 위쪽 흰돌있으면
	}

	// 3. 오른쪽 흰돌있으면 흰돌배열 전체 가져오기	
	if (dataList_copy[dataIndex][rowIndex][colIndex + 1] == 1) {
		// 배열 초기화
		rightWhiteArry = [];
		// 내가클릭한 오른쪽 흰돌 위치 저장
		rightWhiteArry.push([rowIndex, colIndex + 1]);
		dataList_copy[dataIndex][rowIndex][colIndex + 1] = 3;
		// 내가클릭한 돌 오른쪽 기준으로 탐색 시작(데이터를 탐색)
		searchFunction(rowIndex, colIndex + 1);
		var tempArray = [];

		function searchFunction(r, c) {
			tempArray = [];
			// r, c 좌표 영역 지정 
			// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
			// if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
				// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
				// 좌
				if (dataList_copy[dataIndex][r][c - 1] == 1) {
					rightWhiteArry.push([r, c - 1]);
					tempArray.push([r, c - 1]);
					dataList_copy[dataIndex][r][c - 1] = 3;
				}
				// 상
				if(r - 1 > -1){
					if (dataList_copy[dataIndex][r - 1][c] == 1) {
						rightWhiteArry.push([r - 1, c]);
						tempArray.push([r - 1, c]);
						dataList_copy[dataIndex][r - 1][c] = 3;
					}
				}
				// 우
				if (dataList_copy[dataIndex][r][c + 1] == 1) {
					rightWhiteArry.push([r, c + 1]);
					tempArray.push([r, c + 1]);
					dataList_copy[dataIndex][r][c + 1] = 3;
				}
				// 하
				if(r + 1 < 10){
					if (dataList_copy[dataIndex][r + 1][c] == 1) {
						rightWhiteArry.push([r + 1, c]);
						tempArray.push([r + 1, c]);
						dataList_copy[dataIndex][r + 1][c] = 3;
					}
				}
			// } // r, c 0,0 ~ 9,9까지 제한 
			clickSearchedArray();
		} // searchFunction

		// 클릭된 죽을지도모르는흰돌(3) 배열을 다시 상하 좌우로 돌면서 
		// rightWhiteArry 배열에 담음		
		clickSearchedArray();

		function clickSearchedArray() {
			tempArray.forEach(function (item) {
				searchFunction(item[0], item[1]);
			});
		}

		console.log('rightWhiteArry ', rightWhiteArry);
	} // 위쪽 흰돌있으면

	// 4. 아래 흰돌있으면 흰돌배열 전체 가져오기
	if (rowIndex + 1 <= 9) {
		// 4. 아래 흰돌있으면 흰돌배열 전체 가져오기
		if (dataList_copy[dataIndex][rowIndex + 1][colIndex] == 1) {
			// 배열 초기화
			bottomWhiteArry = [];
			// 내가클릭한 아래 흰돌 위치 저장
			bottomWhiteArry.push([rowIndex + 1, colIndex]);
			dataList_copy[dataIndex][rowIndex + 1][colIndex] = 3;
			// 내가클릭한 돌 아래 기준으로 탐색 시작(데이터를 탐색)
			searchFunction(rowIndex + 1, colIndex);
			var tempArray = [];

			function searchFunction(r, c) {
				tempArray = [];
				// r, c 좌표 영역 지정 
				// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
				// if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
					// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
					// 좌
					if (dataList_copy[dataIndex][r][c - 1] == 1) {
						bottomWhiteArry.push([r, c - 1]);
						tempArray.push([r, c - 1]);
						dataList_copy[dataIndex][r][c - 1] = 3;
					}
					// 상
					if(r - 1 > -1){
						if (dataList_copy[dataIndex][r - 1][c] == 1) {
							bottomWhiteArry.push([r - 1, c]);
							tempArray.push([r - 1, c]);
							dataList_copy[dataIndex][r - 1][c] = 3;
						}
					}
					// 우
					if (dataList_copy[dataIndex][r][c + 1] == 1) {
						bottomWhiteArry.push([r, c + 1]);
						tempArray.push([r, c + 1]);
						dataList_copy[dataIndex][r][c + 1] = 3;
					}
					// 하
					if(r + 1 < 10){
						if (dataList_copy[dataIndex][r + 1][c] == 1) {
							bottomWhiteArry.push([r + 1, c]);
							tempArray.push([r + 1, c]);
							dataList_copy[dataIndex][r + 1][c] = 3;
						}
					}
				// } // r, c 0,0 ~ 9,9까지 제한 
				clickSearchedArray();
			} // searchFunction

			// 클릭된 죽을지도모르는흰돌(3) 배열을 다시 상하 좌우로 돌면서 
			// bottomWhiteArry 배열에 담음		
			clickSearchedArray();

			function clickSearchedArray() {
				tempArray.forEach(function (item) {
					searchFunction(item[0], item[1]);
				});
			}

			console.log('bottomWhiteArry ', bottomWhiteArry);
		} // 아래 흰돌있으면
	}
} //black_search_allWthie


// 흰돌배열 존재하면 그주변 빈칸 알아내서 빈칸이 0일때 흰돌 삭제함수
function whiteDelete() {
	// 1.왼쪽 배열이 존재하면 
	if (leftWhiteArry.length > 0) {
		leftWhiteArry.forEach(function (item) {
			searchFunction(item[0], item[1]);
		});
		var tempArray = [];

		function searchFunction(r, c) {
			tempArray = [];
			// r, c 좌표 영역 지정 
			// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
			//if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
			// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
			// 좌
			if (dataList_copy[dataIndex][r][c - 1] == 0) {
				leftWhiteArry_blank.push([r, c - 1]);
				tempArray.push([r, c - 1]);
			}
			// 상
			if (r - 1 >= 0) {
				if (dataList_copy[dataIndex][r - 1][c] == 0) {
					leftWhiteArry_blank.push([r - 1, c]);
					tempArray.push([r - 1, c]);
				}
			}
			// 우
			if (dataList_copy[dataIndex][r][c + 1] == 0) {
				leftWhiteArry_blank.push([r, c + 1]);
				tempArray.push([r, c + 1]);
			}
			// 하
			if (r + 1 <= 9) {
				if (dataList_copy[dataIndex][r + 1][c] == 0) {
					leftWhiteArry_blank.push([r + 1, c]);
					tempArray.push([r + 1, c]);
				}
			}
			//} // r, c 0,0 ~ 9,9까지 제한 
		} // searchFunction

		var LeftWhiteArry_blank_length = returnUniqeLength(leftWhiteArry_blank);	
		console.log(LeftWhiteArry_blank_length.unique_length);		

		// 배열의 길이가 0이면 해당 흰돌 삭제
		if (LeftWhiteArry_blank_length.unique_length == 0) {
			leftWhiteArry.forEach(function (item) {
				dataList_copy[dataIndex][item[0]][item[1]] = 0;
			});
		}

		leftWhiteArry_blank = [];
	} // 1.왼쪽 배열이 존재하면 

	// 2.위쪽 배열이 존재하면 
	if (topWhiteArry.length > 0) {
		topWhiteArry.forEach(function (item) {
			searchFunction(item[0], item[1]);
		});
		var tempArray = [];

		function searchFunction(r, c) {
			tempArray = [];
			// r, c 좌표 영역 지정 
			// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
			//if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
			// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
			// 좌
			if (dataList_copy[dataIndex][r][c - 1] == 0) {
				topWhiteArry_blank.push([r, c - 1]);
				tempArray.push([r, c - 1]);
			}
			// 상
			if (r - 1 >= 0) {
				if (dataList_copy[dataIndex][r - 1][c] == 0) {
					topWhiteArry_blank.push([r - 1, c]);
					tempArray.push([r - 1, c]);
				}
			}
			// 우
			if (dataList_copy[dataIndex][r][c + 1] == 0) {
				topWhiteArry_blank.push([r, c + 1]);
				tempArray.push([r, c + 1]);
			}
			// 하
			if (r + 1 <= 9) {
				if (dataList_copy[dataIndex][r + 1][c] == 0) {
					topWhiteArry_blank.push([r + 1, c]);
					tempArray.push([r + 1, c]);
				}
			}
			//} // r, c 0,0 ~ 9,9까지 제한 
		} // searchFunction

		var topWhiteArry_blank_length = returnUniqeLength(topWhiteArry_blank);	
		console.log(topWhiteArry_blank_length.unique_length);		

		// 배열의 길이가 0이면 해당 흰돌 삭제
		if (topWhiteArry_blank_length.unique_length == 0) {
			topWhiteArry.forEach(function (item) {
				dataList_copy[dataIndex][item[0]][item[1]] = 0;
			});
		}

		topWhiteArry_blank = [];
	} // 1.위쪽 배열이 존재하면 

	// 3.오른쪽 배열이 존재하면 
	if (rightWhiteArry.length > 0) {
		rightWhiteArry.forEach(function (item) {
			searchFunction(item[0], item[1]);
		});
		var tempArray = [];

		function searchFunction(r, c) {
			tempArray = [];
			// r, c 좌표 영역 지정 
			// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
			//if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
			// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
			// 좌
			if (dataList_copy[dataIndex][r][c - 1] == 0) {
				rightWhiteArry_blank.push([r, c - 1]);
				tempArray.push([r, c - 1]);
			}
			// 상
			if (r - 1 >= 0) {
				if (dataList_copy[dataIndex][r - 1][c] == 0) {
					rightWhiteArry_blank.push([r - 1, c]);
					tempArray.push([r - 1, c]);
				}
			}
			// 우
			if (dataList_copy[dataIndex][r][c + 1] == 0) {
				rightWhiteArry_blank.push([r, c + 1]);
				tempArray.push([r, c + 1]);
			}
			// 하
			if (r + 1 <= 9) {
				if (dataList_copy[dataIndex][r + 1][c] == 0) {
					rightWhiteArry_blank.push([r + 1, c]);
					tempArray.push([r + 1, c]);
				}
			}
			//} // r, c 0,0 ~ 9,9까지 제한 
		} // searchFunction

		var rightWhiteArry_blank_length = returnUniqeLength(rightWhiteArry_blank);	
		console.log(rightWhiteArry_blank_length.unique_length);		

		// 배열의 길이가 0이면 해당 흰돌 삭제
		if (rightWhiteArry_blank_length.unique_length == 0) {
			rightWhiteArry.forEach(function (item) {
				dataList_copy[dataIndex][item[0]][item[1]] = 0;
			});
		}

		rightWhiteArry_blank = [];
	} // 1.위쪽 배열이 존재하면 

	// 4.아래쪽 배열이 존재하면 
	if (bottomWhiteArry.length > 0) {
		bottomWhiteArry.forEach(function (item) {
			searchFunction(item[0], item[1]);
		});
		var tempArray = [];

		function searchFunction(r, c) {
			tempArray = [];
			// r, c 좌표 영역 지정 
			// r-1 > -1 && r+1 < 10 && c-1 > -1 && c+1 < 10 			
			//if ((r - 1 > -1 && r + 1 < 10) && (c - 1 > -1 && c + 1 < 10)) {
			// 좌 상 우 하 에 흰돌 있으면 저장 후 데이터 교체
			// 좌
			if (dataList_copy[dataIndex][r][c - 1] == 0) {
				bottomWhiteArry_blank.push([r, c - 1]);
				tempArray.push([r, c - 1]);
			}
			// 상
			if (r - 1 >= 0) {
				if (dataList_copy[dataIndex][r - 1][c] == 0) {
					bottomWhiteArry_blank.push([r - 1, c]);
					tempArray.push([r - 1, c]);
				}
			}
			// 우
			if (dataList_copy[dataIndex][r][c + 1] == 0) {
				bottomWhiteArry_blank.push([r, c + 1]);
				tempArray.push([r, c + 1]);
			}
			// 하
			if (r + 1 <= 9) {
				if (dataList_copy[dataIndex][r + 1][c] == 0) {
					bottomWhiteArry_blank.push([r + 1, c]);
					tempArray.push([r + 1, c]);
				}
			}
			//} // r, c 0,0 ~ 9,9까지 제한 
		} // searchFunction

		var bottomWhiteArry_blank_length = returnUniqeLength(bottomWhiteArry_blank);	
		console.log(bottomWhiteArry_blank_length.unique_length);		

		// 배열의 길이가 0이면 해당 흰돌 삭제
		if (bottomWhiteArry_blank_length.unique_length == 0) {
			bottomWhiteArry.forEach(function (item) {
				dataList_copy[dataIndex][item[0]][item[1]] = 0;
			});
		}

		bottomWhiteArry_blank = [];
	} // 4.아래쪽 배열이 존재하면 

} // whiteDelete