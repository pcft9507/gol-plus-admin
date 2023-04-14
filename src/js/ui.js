$(document).ready(function () {
  // 인풋 라인 활성화
  $('.effect-1').on('blur', function (){
    var valueLength = $(this).val().length;
    if (valueLength > 0) {
      $(this).addClass('is-active');
    } else {
      $(this).removeClass('is-active');
    }
  });

  // 인풋 레이블
  $('.effect-1').inpLabel();
})

$.fn.inpLabel = function () {
  let inpArray = [];
  let inpId = [];
  let inpPlaceholder = [];
  return this.each(function (i) {
    inpArray[i] = $(this);
    inpId[i] = $(this).attr('id');
    inpPlaceholder[i] = $(this).attr('placeholder');
    inpArray[i].after('<label for="' + inpId[i] + '" class="inp-label">' + inpPlaceholder[i] + '</label>');
  });
}

// 추천 상담 리스트 모바일에서 지정된 칼럼만 나오게 하기
function reponsiveTableColumn(colIdx) {
  var dataTbl = $('#dataTable');
  dataTbl.addClass('reponsive-table');
  var inpIdx = [];
  inpIdx = colIdx;
  var dataTblRowLength = dataTbl.find('tbody tr').length;
  inpIdx.forEach(function (i) {
    $('#dataTable thead th').eq(i).addClass('mo-view');
    for (var j = 0; j < dataTblRowLength;j++) {
      $('#dataTable tbody tr').eq(j).find('td').eq(i).addClass('mo-view');
    }
  });
}