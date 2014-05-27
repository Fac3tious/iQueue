function showResultsList() {

	if ($("#searchField").val() != null && $("#searchField").val() != '') {

		var listUrl = "../ListSearchResults" + "?keywords="
				+ encodeURIComponent($("#searchField").val());

		$
				.post(
						listUrl,
						{},
						function(data, status) {

							results = jQuery.parseJSON(data);
							var itemsList = "";
							var itemsListArticles = "";
							var itemsListVideos = "";
							var itemsListAudios = "";

							$
									.each(
											results,
											function(key, val) {

												var content = "<div class='div_wrap'><table><tr><th colspan='4' class='td_title'>"
														+ "<span>"
														+ val.itemType
														+ " :</span>"
														+ val.itemName
														+ "</th><tr><th rowspan='3' class='thumbnail'><img src='"
														+ val.itemImage
														+ "' /></th><td colspan='2'>"
														+ val.itemText
														+ "</td></tr></tr><tr><td>"
														+ val.timestamp
														+ "</td><td>"
														+ val.timestamp
														+ "</td></tr><tr><td colspan='2'><a href='"
														+ val.itemLink
														+ "' class='link' target='_blank'>"
														+ val.itemLink
														+ "</a></td></tr></table></div>";

												itemsList += content;

												if (val.itemCategory == "Article") {

													itemsListArticles += content;
												}
												if (val.itemCategory == "Video") {

													itemsListVideos += content;
												}
												if (val.itemCategory == "Audio") {

													itemsListAudios += content;
												}

											});

							$("#tabs-content-1").html(itemsList);
							$("#tabs-content-2").html(itemsListArticles);
							$("#tabs-content-3").html(itemsListVideos);
							$("#tabs-content-4").html(itemsListAudios);

						});

	} else {
		alert('Please type search keyword.');
	}
}
