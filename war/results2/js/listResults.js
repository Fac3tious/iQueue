function showResultsList() {

	if ($("#searchField").val() != null && $("#searchField").val() != '') {

		var listUrl = "ListSearchResults" + "?keywords="
				+ encodeURIComponent($("#searchField").val());

		$.post(listUrl, {}, function(data, status) {

			results = jQuery.parseJSON(data);
			var itemsList = "";

			$.each(results, function(key, val) {
		
				itemsList += "<div class='div_wrap'><table><tr><th colspan='4' class='td_title'>" + val.itemName
						+ "</th>" + "<tr><th rowspan='3' class='thumbnail'><img src='" + val.itemImage
						+ "' /></th>" + "<th colspan='2'>" + val.itemText + "</th>"
						+ "</tr><tr><td>" + val.timestamp + "</td>"
						+ "<td>Date</td></tr>"
						+ "<tr><td colspan='2'><a href='" + val.itemLink
						+ "' target='_blank' class='link'>" + val.itemLink + "</td>"
						+ "</tr></table></div>";
				
			});
			
			resultsPanel.innerHTML = itemsList;

		});

	} else {
		alert('Please type search keyword.');
	}
}