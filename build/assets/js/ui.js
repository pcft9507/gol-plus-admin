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
})
