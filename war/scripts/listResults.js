function showResultsList() {

	if ($("#searchField").val() != null && $("#searchField").val() != '') {

		var listUrl = "ListSearchResults" + "?keywords="
				+ encodeURIComponent($("#searchField").val());

		$.post(listUrl, {}, function(data, status) {

			results = jQuery.parseJSON(data);
			var itemsList = "";

			$.each(results, function(key, val) {
		
				itemsList += "<table><tr><th colspan='4'>" + val.itemName
						+ "</th>" + "<tr><th rowspan='3'><img src='" + val.itemImage
						+ "' /></th>" + "<th colspan='2'>" + val.itemText + "</th>"
						+ "</tr><tr><td>" + val.timestamp + "</td>"
						+ "<td>Date</td></tr>"
						+ "<tr><th colspan='2'><a href='" + val.itemLink
						+ "' target='_blank'>" + val.itemLink + "</th>"
						+ "</tr></table><br />";
				
			});
			
			resultsPanel.innerHTML = itemsList;

		});

	} else {
		alert('Please type search keyword.');
	}
}