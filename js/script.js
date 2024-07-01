/* ---------------------------
  定義
----------------------------- */
// 乱数発生
function random_number(min,max) {
  let random = Math.floor( Math.random() * (max - min + 1) ) + min;
  return random;
}

/* ---------------------------
  font-familyの登録
----------------------------- */
// 欧文フォント
array_en = new Array();
array_en =
[
  { name: "Montserrat", weight: ["300","700"] },
  { name: "Roboto", weight: ["300","700"] },
  { name: "Lato", weight: ["300","700"] },
  { name: "Playfair+Display", weight: ["400","700"] },
  { name: "Jost", weight: ["300","400","600"] },
  { name: "Playball", weight: ["400"] },
  { name: "Cormorant+Infant", weight: ["300","500","700"] },
  { name: "Josefin+Sans", weight: ["400","600"] },
  { name: "Caveat", weight: ["400","700"] },
  { name: "Styles", weight: ["400"] },
  { name: "Lora", weight: ["400","700"] },
  { name: "Cinzel", weight: ["400","500"] },
  { name: "Quicksand", weight: ["400","700"] }
]

// 日本語フォント
array_ja = new Array();
array_ja =
[
  { name: "Noto+Sans+JP", weight: ["400"] },
  { name: "Noto+Serif+JP", weight: ["300","400"] },
  { name: "Shippori+Mincho+B1", weight: ["400"] },
  { name: "Shippori+Mincho", weight: ["400"] },
  { name: "Sawarabi+Gothic", weight: ["400"] },
  { name: "Sawarabi+Mincho", weight: ["400"] },
  { name: "Zen+Kaku+Gothic+Antique", weight: ["400"] }
]


/* ---------------------------
  Google fonts 読み込み
----------------------------- */
// 欧文
let loop_google_font_en = "";
$.each(array_en, function(index,val){
  loop_google_font_en += "family=" + val.name + ":wght@" + val.weight.join(";") + "&";
})
// 日本語
let loop_google_font_ja = "";
$.each(array_ja, function(index,val){
  loop_google_font_ja += "family=" + val.name + ":wght@" + val.weight.join(";") + "&";
})
// linkタグの形へ連結
const link_google_font = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + loop_google_font_en + loop_google_font_ja + 'display=swap">';
$("head").append(link_google_font);


/* ---------------------------
  ランダムにカードを表示
----------------------------- */
// 配列の個数を取得
const array_en_length = array_en.length - 1;
const array_ja_length = array_ja.length - 1;

// カードを表示
for (let i = 0; i < 99; i++) {
  let random_number_en = random_number(0, array_en_length);
  let random_number_ja = random_number(0, array_ja_length);

  //--------------- 英語 ---------------
  // フォント名
  let random_font_en = "font-family:'" + array_en[random_number_en]["name"] + "';";
  random_font_en = random_font_en.replaceAll("+", " ");
  // 太さ
  let array_weight_en_length = array_en[random_number_en]["weight"].length - 1;
  let random_weight_en = "font-weight:" + array_en[random_number_en]["weight"][random_number(0, array_weight_en_length)] + ";";

  //--------------- 日本語---------------
  // フォント名
  let random_font_ja = "font-family:'" + array_ja[random_number_ja]["name"] + "';";
  random_font_ja = random_font_ja.replaceAll("+", " ");
  // 太さ
  let array_weight_ja_length = array_ja[random_number_ja]["weight"].length - 1;
  let random_weight_ja = "font-weight:" + array_ja[random_number_ja]["weight"][random_number(0, array_weight_ja_length)] + ";";

  let random_code =
  '<div class="item" data-fav="all">' +
  '<div class="item-content">' +
  '<div class="display">' +
  '<input class="en" value="About Us" style="' + random_font_en +  random_weight_en + '">' +
  '<input class="ja" value="会社概要" style="' + random_font_ja +  random_weight_ja + '">' +
  '<button class="code"></button>' +
  '<button class="favorite"></button>' +
  '</div>' +
  '</div>' +
  '</div>';

  $("#js-grid").append(random_code);
}

/* ---------------------------
  Muuri
----------------------------- */
let grid = new Muuri(".grid");

// filter
let filterFieldValue = $('input:radio[name="fav"]:checked').val();
function filter() {
  filterFieldValue = $('input:radio[name="fav"]:checked').val();
  grid.filter(function (item) {
    let element = item.getElement(),
    isFilterMatch = !filterFieldValue ? true : (element.getAttribute("data-fav") || '').indexOf(filterFieldValue) != -1;
    return isFilterMatch;
  });
}
$('input:radio[name="fav"]').change(function() {
  filter();
})

/* ---------------------------
  表示テキスト
----------------------------- */
// 表示テキストの変更
$(".en").keyup(function(){
  let en_val = $(this).val();
  $(".en").val(en_val);
})
$(".ja").keyup(function(){
  let ja_val = $(this).val();
  $(".ja").val(ja_val);
})

/* ---------------------------
  font-familyの表示
----------------------------- */
// font-familyの表示の仕込み
$(".display").each(function(){

  let en_font = $(this).find(".en").css("font-family");
  let en_font_nospace = en_font.replaceAll(" ", "+").replaceAll('"', '');
  let en_weight = $(this).find(".en").css("font-weight");

  let ja_font = $(this).find(".ja").css("font-family");
  let ja_font_nospace = ja_font.replaceAll(" ", "+").replaceAll('"', '');
  let ja_weight = $(this).find(".ja").css("font-weight");

  // CSSの記述
  let copy_css =
  '.en {\n  font-family: ' + en_font + ',sans-serif;\n  font-weight: ' + en_weight + ';\n}\n' + '.ja {\n  font-family: ' + ja_font + ',sans-serif;\n  font-weight: ' + en_weight + ';\n}\n';

  // linkタグの記述
  let copy_link =
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link href="https://fonts.googleapis.com/css2?family=' + en_font_nospace + ':wght@' + en_weight + '&family=' + ja_font_nospace + ':wght@' + ja_weight + '&display=swap" rel="stylesheet">';

  // 挿入するテキストエリア
  let copy_css_textarea =
  '<div class="copy"><div class="copy__inner"><textarea>' + copy_link + '</textarea><button>Copy!</button></div><div class="copy__inner"><textarea>' + copy_css + '</textarea><button>Copy!</button></div></div>';

  $(this).after(copy_css_textarea);
})

/* ---------------------------
  modal
----------------------------- */
$(".code").on("click", function(){
  $(this).parent(".display").next(".copy").clone(true).appendTo("#js-modal");
  $("#js-modal-wrapper").fadeIn(400);
})
$(document).click(function(event){
  let target = $(event.target);
  if(target.hasClass('modal')) {
    // closeと内容のリセット
    target.empty().parent(".modal-wrapper").fadeOut(400);
  }
});

/* ---------------------------
  お気に入り登録
----------------------------- */
$(".favorite").on("click", function(){
  $(this).toggleClass("is_active");
  let value_fav = $(this).parents(".item").attr("data-fav");
  if( value_fav.indexOf("fav") > -1 ) {
    $(this).parents(".item").attr("data-fav","all");
  } else {
    $(this).parents(".item").attr("data-fav","all fav");
  }
})

/* ---------------------------
  コードのコピー
----------------------------- */
$(".copy button").on("click", function(){
  console.log("OK");
  $(this).siblings("textarea").select();
	document.execCommand('copy');
})
