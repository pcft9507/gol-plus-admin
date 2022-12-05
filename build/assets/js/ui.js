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