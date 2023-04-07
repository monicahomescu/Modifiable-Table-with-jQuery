function generateRow(fill) {
    var row = ""
    row += "<tr><td><button>-</button></td>"
    for (var i = 0; i < 5; i += 1)
        row += "<td>" + fill + "</td>"
    row += "<td><button>+</button></td></tr>"
    return row
}

function createTable() {
    for (var i = 0; i < 5; i += 1)
        $("table").append(generateRow(i + 1))
}

function executeButton() {
    if ($(this).text() == "+") {
        $(this).closest("tr").after(generateRow("<input>"))
        $("button").unbind()
        $("input").unbind()
        $("button").click(executeButton)
        $("input").change(checkInput)
    }
    else
        if ($(this).text() == "-") {
            $(this).closest("tr").remove()
            $("table").prepend($("<tr>"))
            $("table tr:first").css({"border": "none"})
        }
}

function checkInput() {
    var count = 0
    $(this).closest("tr").find("td input").each(function() {
        if (this.value != "")
            count += 1
    })
    if (count == 5) {
        var row = ""
        row += "<tr><td><button>-</button></td>"
        $(this).closest("tr").find("td input").each(function() {
              row += "<td>" + this.value + "</td>"
        })
        row += "<td><button>+</button></td></tr>"
        $(this).closest("tr").replaceWith(row)
        $("button").unbind()
        $("button").click(executeButton)
    }
}

$(document).ready(function() {
    createTable()
    $("button").click(executeButton)
    $("input").change(checkInput)
});