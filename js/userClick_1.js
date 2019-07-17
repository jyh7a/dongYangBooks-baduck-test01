// 내가클릭한곳 알아야함(테이블과 data 일치 시켜야함)
// 클릭한곳을 data를 검은색(2) 으로 바꾸고
// makeBaduckPan실행

tr.on('click', function (e) {
	willWhiteDeath_Top = [];
	willWhiteDeath_Bottom = [];
	willWhiteDeath_Left = [];
	willWhiteDeath_Right = [];
	willWhiteDeathTostring = [];

	if (clickFlag) {

		dataIsCahnge = true;

		var row = e.currentTarget; // 행
		var col = e.target; // 열
		var rowIndex = $.inArray(row, tr); // 내가클릭한 행
		var colIndex = $.inArray(col, td) % 10; // 내가클릭한 열


		isDataChange = dataChange(rowIndex, colIndex);
		whiteDelete(rowIndex, colIndex);

		setTimeout(function () {
			makeBaduckPan();
			setTimeout(function(){
				makeBaduckPan(true);
				whiteFirstClick = true;
			},0)
		}, 0)
	}
}); // tr click

// 검은돌을 클릭해 흰돌을 지운다
function whiteDelete(rowIndex, colIndex) {
	/*debugger;*/
	// 자신이클릭한곳으로부터 상, 하, 좌, 우 공간 있는지 체크 
	var spcObj = spaceWhiteCheck(rowIndex, colIndex);
	doWhiteDelete(willWhiteDeath_Left, 'willWhiteDeath_Left');
	/*whiteCheck(spcObj, rowIndex, colIndex);*/
}



// 흰돌의 주변(상하좌우)공간과 검은돌(2)인지 죽모돌(3)인지 체크후 판별
/*function whiteCheck(spcObj, rowIndex, colIndex) {
	if(spcObj.top){
		var cR = --rowIndex;
		var cC = colIndex;		
	}	
}*/

function whiteCheckFail() {
	clickFlag = false;
	setTimeout(function () {
		dataInit();
		alert('땡! 오답입니다');
		clickFlag = true;
	}, 500);
}


function spaceWhiteCheck(rowIndex, colIndex, auto) {
	var top, bottom, left, right;
	var whiteAround = [];
	var white = [];
	var correctNum = 1;
	var index = 0;

	auto ? (function () {}) : (whiteTotalCorrectNum = 0);

	/*if (willWhiteDeath.length > 0) {
		for (var i = 0; i < willWhiteDeath.length; i++) {
			willWhiteDeathTostring[i] = willWhiteDeath[i].toString();
		}
		willWhiteDeathTostring.filter(function (item, pos, self) {
			//console.log(self.indexOf(item), pos);
			return self.indexOf(item) == pos;
		});
		//console.log('willWhiteDeathTostring', willWhiteDeathTostring);
	}*/

	// 자기 자신 체크
	if (auto) {
		if (rowIndex - 1 >= 0 && rowIndex + 1 <= 9 && colIndex - 1 >= 0 && colIndex + 1 <= 9) {
			if (dataList_copy[dataIndex][rowIndex][colIndex] == 1) {
				//console.log('자기자신 흰색');
				white = []; //자신
				white.push([rowIndex, colIndex]); //자신
				dataList_copy[dataIndex][white[0][0]][white[0][1]] = 3;
				willWhiteDeath.push([white[0][0], white[0][1]]);
				whiteAround.push([rowIndex - 1, colIndex]); //상
				whiteAround.push([rowIndex, colIndex - 1]); //좌
				whiteAround.push([rowIndex, colIndex + 1]); //우
				whiteAround.push([rowIndex + 1, colIndex]); //하

				whiteAround.forEach(function (item, index, array) {
					if ((item[0] >= 0 && item[0] <= 9) && (item[1] >= 0 && item[1] <= 9)) {
						if (dataList_copy[dataIndex][item[0]][item[1]] == 0) {
							/*whiteTotalCorrectNum += correctNum;*/

						}
						/*setTimeout(function () {
							if (dataList_copy[dataIndex][item[0]][item[1]] == 1) {
								spaceWhiteCheck(item[0], item[1], true);
							}
						}, 0);*/
					}
				});
			}
		}
	}
	

	// 상 체크	
	if (rowIndex - 1 >= 0) {
		if (dataList_copy[dataIndex][rowIndex - 1][colIndex] == 1 ||
			dataList_copy[dataIndex][rowIndex - 1][colIndex] == 3) {

			if (dataList_copy[dataIndex][rowIndex - 1][colIndex] == 1) {
				//console.log('위쪽 흰색있음');				
				white = []; //자신
				whiteAround = [];
				white.push([rowIndex - 1, colIndex]); //자신
				dataList_copy[dataIndex][white[0][0]][white[0][1]] = 3;
				willWhiteDeath.push([white[0][0], white[0][1]]);
				willWhiteDeath_Top.push([white[0][0], white[0][1]]);
				if (auto) willWhiteDeath_Left.push([white[0][0], white[0][1]]);

				whiteAround.push([rowIndex - 2, colIndex]); //상
				whiteAround.push([rowIndex - 1, colIndex - 1]); //좌
				whiteAround.push([rowIndex - 1, colIndex + 1]); //우
				whiteAround.push([rowIndex, colIndex]); //하

				whiteAround.forEach(function (item, index, array) {
					if ((item[0] >= 0 && item[0] <= 9) && (item[1] >= 0 && item[1] <= 9)) {
						if (dataList_copy[dataIndex][item[0]][item[1]] == 0) {
							/*whiteTotalCorrectNum += correctNum;*/
						}
						/*setTimeout(function () {*/
						if (dataList_copy[dataIndex][item[0]][item[1]] == 1) {
							willWhiteDeath_Top.push([item[0], item[1]]);
							if (auto) willWhiteDeath_Left.push([item[0], item[1]]);
							spaceWhiteCheck(item[0], item[1], true);
						}
						/*}, 0);*/
					}
				});
				/*	console.log('white', white);
					console.log('whiteAround', whiteAround);*/
			}
			top = true;
		}
	}
	// 하 체크
	if (rowIndex + 1 <= 9) {
		if (dataList_copy[dataIndex][rowIndex + 1][colIndex] == 1 ||
			dataList_copy[dataIndex][rowIndex + 1][colIndex] == 3) {

			if (dataList_copy[dataIndex][rowIndex + 1][colIndex] == 1) {
				//console.log('아래쪽 흰색있음');
				white = []; //자신
				whiteAround = [];
				white.push([rowIndex + 1, colIndex]); //자신
				dataList_copy[dataIndex][white[0][0]][white[0][1]] = 3;
				willWhiteDeath.push([white[0][0], white[0][1]]);
				willWhiteDeath_Bottom.push([white[0][0], white[0][1]]);
				if (auto) willWhiteDeath_Left.push([white[0][0], white[0][1]]);
				if (whiteFirstClick) {					
					willWhiteDeath_Left.push([white[0][0], white[0][1]]);
				}

				whiteAround.push([rowIndex, colIndex]); //상
				whiteAround.push([rowIndex + 1, colIndex - 1]); //좌
				whiteAround.push([rowIndex + 1, colIndex + 1]); //우
				whiteAround.push([rowIndex + 2, colIndex]); //하

				whiteAround.forEach(function (item, index, array) {
					if ((item[0] >= 0 && item[0] <= 9) && (item[1] >= 0 && item[1] <= 9)) {
						if (dataList_copy[dataIndex][item[0]][item[1]] == 0) {
							/*whiteTotalCorrectNum += correctNum;*/
						}
						/*setTimeout(function () {*/
						if (dataList_copy[dataIndex][item[0]][item[1]] == 1) {	
							if (auto) willWhiteDeath_Left.push([item[0], item[1]]);
							if (whiteFirstClick) {
								willWhiteDeath_Left.push([item[0], item[1]]);
								whiteFirstClick = false;
							}							
							spaceWhiteCheck(item[0], item[1], true);							
						}
						/*}, 0);*/
					}
				});
				/*console.log('white', white);
				console.log('whiteAround', whiteAround);*/
			}
			bottom = true;
		}
	}

	// 좌 체크
	if (colIndex - 1 >= 0) {
		if (dataList_copy[dataIndex][rowIndex][colIndex - 1] == 1 ||
			dataList_copy[dataIndex][rowIndex][colIndex - 1] == 3) {

			if (dataList_copy[dataIndex][rowIndex][colIndex - 1] == 1) {
				//console.log('왼쪽 흰색있음');				
				white = []; //자신
				whiteAround = [];
				white.push([rowIndex, colIndex - 1]); //자신
				dataList_copy[dataIndex][white[0][0]][white[0][1]] = 3;
				if (auto) willWhiteDeath_Left.push([white[0][0], white[0][1]]);
				if (whiteFirstClick) {					
					willWhiteDeath_Left.push([white[0][0], white[0][1]]);
				}

				whiteAround.push([rowIndex - 1, colIndex - 1]); //상
				whiteAround.push([rowIndex, colIndex - 2]); //좌
				whiteAround.push([rowIndex, colIndex]); //우
				whiteAround.push([rowIndex + 1, colIndex - 1]); //하

				whiteAround.forEach(function (item, index, array) {
					if ((item[0] >= 0 && item[0] <= 9) && (item[1] >= 0 && item[1] <= 9)) {
						if (dataList_copy[dataIndex][item[0]][item[1]] == 0) {
							/*whiteTotalCorrectNum += correctNum;*/
						}
						/*setTimeout(function () {*/
						if (dataList_copy[dataIndex][item[0]][item[1]] == 1) {		
							if (auto) willWhiteDeath_Left.push([item[0], item[1]]);
							if (whiteFirstClick) {
								willWhiteDeath_Left.push([item[0], item[1]]);
								whiteFirstClick = false;
							}
							spaceWhiteCheck(item[0], item[1], true);
						}
						/*}, 0);*/
					}
				});

			}
			left = true;
		}
	}



	// 우 체크
	if (colIndex + 1 <= 9) {
		if (dataList_copy[dataIndex][rowIndex][colIndex + 1] == 1 ||
			dataList_copy[dataIndex][rowIndex][colIndex + 1] == 3) {

			if (dataList_copy[dataIndex][rowIndex][colIndex + 1] == 1) {
				//console.log('오른쪽 흰색있음');
				white = []; //자신
				whiteAround = [];
				white.push([rowIndex, colIndex + 1]); //자신
				dataList_copy[dataIndex][white[0][0]][white[0][1]] = 3;
				willWhiteDeath.push([white[0][0], white[0][1]]);
				if (auto) willWhiteDeath_Left.push([white[0][0], white[0][1]]);

				willWhiteDeath_Right.push([white[0][0], white[0][1]]);
				whiteAround.push([rowIndex - 1, colIndex + 1]); //상
				whiteAround.push([rowIndex, colIndex]); //좌
				whiteAround.push([rowIndex, colIndex + 2]); //우
				whiteAround.push([rowIndex + 1, colIndex + 1]); //하

				whiteAround.forEach(function (item, index, array) {
					if ((item[0] >= 0 && item[0] <= 9) && (item[1] >= 0 && item[1] <= 9)) {
						if (dataList_copy[dataIndex][item[0]][item[1]] == 0) {
							/*whiteTotalCorrectNum += correctNum;*/
						}
						/*setTimeout(function () {*/
						if (dataList_copy[dataIndex][item[0]][item[1]] == 1) {
							whiteFirstLeftClick = false;
							willWhiteDeath_Right.push([item[0], item[1]]);
							if (auto) willWhiteDeath_Left.push([item[0], item[1]]);
							spaceWhiteCheck(item[0], item[1], true);
						}
						/*}, 0);*/
					}
				});
				/*console.log('white', white);
				console.log('whiteAround', whiteAround);*/
			}
			right = true;
		}
	}




	if (!auto) {
		if ((top == undefined && bottom == undefined && left == undefined && right == undefined)) {
			if (isDataChange != -1) whiteCheckFail();
		}
	}

	
	return {
		top: top,
		bottom: bottom,
		left: left,
		right: right
	};
}



// 흰돌 지워주는 함수
function doWhiteDelete(direction, str) {
	var empty = 0;
	console.log(str, direction);
	/*console.log(willWhiteDeath);*/
	console.log('');
	direction.forEach(function (item, index, array) {
		// 아이템의 상하좌우가 모두 검은돌(2) 이거나 죽을지도모르는 흰돌(3)이면 삭제			
		//console.log(item);
		if (item[0] >= 0 && item[0] <= 9 && item[1] >= 0 && item[1] <= 9) {
			if (item[0] - 1 >= 0) {
				/*if (dataList_copy[dataIndex][item[0] - 1][item[1]] == 2) {
					//console.log('상')
					whiteTotalCorrectNum++;
				}
				if (dataList_copy[dataIndex][item[0] - 1][item[1]] != 3) {
					empty++;
				}*/
				if (dataList_copy[dataIndex][item[0] - 1][item[1]] == 0 ||
					dataList_copy[dataIndex][item[0] - 1][item[1]] == 1) {
					empty++;
				}
			}
			if (item[0] + 1 <= 9) {
				/*if (dataList_copy[dataIndex][item[0] + 1][item[1]] == 2) {
					//console.log('하')
					whiteTotalCorrectNum++;
				}
				if (dataList_copy[dataIndex][item[0] + 1][item[1]] != 3) {
					empty++;
				}*/
				if (dataList_copy[dataIndex][item[0] + 1][item[1]] == 0 ||
					dataList_copy[dataIndex][item[0] + 1][item[1]] == 1) {
					empty++;
				}
			}
			if (item[1] - 1 >= 0) {
				/*if (dataList_copy[dataIndex][item[0]][item[1] - 1] == 2) {
					//console.log('좌')
					whiteTotalCorrectNum++;
				}
				if (dataList_copy[dataIndex][item[0]][item[1] - 1] != 3) {
					empty++;
				}*/
				if (dataList_copy[dataIndex][item[0]][item[1] - 1] == 0 ||
					dataList_copy[dataIndex][item[0]][item[1] - 1] == 1) {
					empty++;
				}
			}
			if (item[1] + 1 <= 9) {
				/*if (dataList_copy[dataIndex][item[0]][item[1] + 1] == 2) {
					//console.log('우')
					whiteTotalCorrectNum++;
				}
				if (dataList_copy[dataIndex][item[0]][item[1] + 1] != 3) {
					empty++;
				}*/
				if (dataList_copy[dataIndex][item[0]][item[1] + 1] == 0 ||
					dataList_copy[dataIndex][item[0]][item[1] + 1] == 1) {
					empty++;
				}
			}
		}
	});
	console.log(empty);
	//console.log(empty);
	//console.log(whiteTotalCorrectNum);
	/*if (whiteTotalCorrectNum == empty) {
		direction.forEach(function (item, index, array) {
			dataList_copy[dataIndex][item[0]][item[1]] = 0;
		});
		direction = [];
	}*/
	if (empty == 0) {
		direction.forEach(function (item, index, array) {
			dataList_copy[dataIndex][item[0]][item[1]] = 0;
		});
		direction = [];
	}
	empty = 0;
	whiteTotalCorrectNum = 0;
}