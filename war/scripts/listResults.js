function showResultsList() {

	$("#homePage").hide();
	$("#tabs").show();

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

												var thumbnail = "<a href='"
														+ val.itemLink
														+ "' class='link' target='_blank'><img src='"
														+ val.itemImage
														+ "' /></a>";
												if (val.itemCategory == "Video"
														|| val.itemCategory == "Audio") {

													thumbnail = '<embed width="125" height="125" src="'
															+ val.itemLink
															+ '" type="application/x-shockwave-flash"></embed>';

													/*
													 * thumbnail = '<iframe
													 * width="125" height="100"
													 * src="' + val.itemLink +
													 * '"></iframe>';
													 */
												}

												var content = "<div class='div_wrap'><table><tr><th colspan='4' class='td_title'>"
														+ "<span>"
														+ val.itemType
														+ ": </span><a href='"
														+ val.itemLink
														+ "' class='link' target='_blank'>"
														+ val.itemName
														+ "</a></th><tr><th rowspan='3' class='thumbnail'>"
														+ thumbnail
														+ "</th><td colspan='2'>"
														+ val.itemText
														+ "</td></tr></tr><tr><td>"
														+ val.itemTime
														+ "</td><td>"
														+ val.itemDate
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

							if (itemsListArticles != "") {
								$("#tabs-content-2").html(itemsListArticles);
							}

							if (itemsListVideos != "") {
								$("#tabs-content-3").html(itemsListVideos);
							}

							if (itemsListAudios != "") {
								$("#tabs-content-4").html(itemsListAudios);
							}

						});

	} else {
		alert('Please type search keyword.');
	}
}

function showHomePage() {

	return '<div class="clearfix colelem" id="pbuttonu86">'
			+ '<!-- group -->'
			+ '<div class="Button rounded-corners clearfix grpelem" id="buttonu86">'
			+ '	<!-- container box -->'
			+ '	<div class="clearfix grpelem" id="u89-4">'
			+ '		<!-- content -->'
			+ '		<p>&nbsp;&nbsp; Article</p>'
			+ '	</div>'
			+ '	<div class="rounded-corners grpelem" id="u88">'
			+ '		<!-- simple frame -->'
			+ '	</div>'
			+ '</div>'
			+ '<div class="Button rounded-corners clearfix grpelem" id="buttonu124">'
			+ '	<!-- container box -->'
			+ '	<div class="clearfix grpelem" id="u127-4">'
			+ '		<!-- content -->'
			+ '		<p>&nbsp;&nbsp; Video</p>'
			+ '	</div>'
			+ '	<div class="rounded-corners grpelem" id="u126">'
			+ '		<!-- simple frame -->'
			+ '	</div>'
			+ '</div>'
			+ '<div class="Button rounded-corners clearfix grpelem" id="buttonu128">'
			+ '	<!-- container box -->'
			+ '	<div class="clearfix grpelem" id="u131-4">'
			+ '		<!-- content -->' + '		<p>&nbsp;&nbsp; Audio</p>' + '	</div>'
			+ '	<div class="rounded-corners grpelem" id="u130">'
			+ '		<!-- simple frame -->' + '	</div>' + '</div>' + '</div>'
			+ '<div class="verticalspacer"></div>' + '</div>';

}
