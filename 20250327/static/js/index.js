
//监听输入
function inputChange(e, inputId, tbodyId, tableId) {

    getRelationalStockList($(e).val(), inputId, tbodyId, tableId);
}

//获取相关的股票列表

var to_text = "";
var input_id;
var selectStockName = null;

function getRelationalStockList(val, inputId, tbodyId, tableId) {
    if (val) {
        input_id = inputId;
        val = val.toUpperCase();

        var regex = eval("/^" + val + "/");
        selectStockName = null;
        //获取开头匹配的股票

        let list = s.filter((name) => {
            return regex.test(name.c) || regex.test(name.n);
        });


        //如果搜索结果只有一项并且完全匹配，默认选中
        if (list.length == 1 && (val == list[0].c || val == list[0].n)) {
            selectStockName = val;
        }
	
        /*if (list.length === 0) {
			$("#instr tr td").css("display", "none");
        }*/

        //清除子节点
        $("#" + tbodyId)
            .children()
            .remove();

        //重新添加子节点并给其绑定点击事件
        list.forEach((item) => {

            if (regex.test(item.n)) {
                $("#" + tbodyId).append(
                    '<tr id=' + item.n + '  code=' + item.c + ' class="gets2" style="cursor:pointer;text-align:center;">' +
                    '<td>' + item.c + '</td>' +
                    '<td><span style="color: red;">' +
                    val +
                    "</span>" +
                    item.n.substring(val.length) +
                    "</td></tr>"
                );
            } else {
                $("#" + tbodyId).append(
                    '<tr id=' + item.n + '  code=' + item.c + ' class="gets2" style="cursor:pointer;text-align:center;">' +
                    '<td><span style="color: red;">' + val +
                    "</span>" +
                    item.c.substring(val.length) + '</td>' +
                    '<td>' +
                    item.n +
                    "</td></tr>"
                );
				
				
            }

            $("#" + item.n).each(function () {
                $("#" + item.n).on("click", function (e) {
                    selectStockName = e.currentTarget.id;
					$('#gupiao').val(selectStockName)
					$('#gupiao1').val(selectStockName)
					$('#gupiao2').val(selectStockName)
					$('#gupiao3').val(selectStockName)
                    $("#" + tbodyId)
                        .children()
                        .remove();
                    $("#" + tableId).css("display", "none");
                });
            });
        });
    }
    if (val) {
        $("#" + tableId).css("display", "block");
    } else {
        $("#" + tableId).css("display", "none");
    }
}
//错误弹窗
function errowFrame() {
	$(".van-overlay").show();
    $(".error").show();
	$("#instr tr td").css("display", "none");
	$("#gupiao,#gupiao1,#gupiao2,#gupiao3").val("");
    setTimeout(function () {
        $(".error").hide();
		$(".van-overlay").hide();
    }, 1500);
}
