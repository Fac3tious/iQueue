package com.iqueue;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.Query;
import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.iqueue.utilities.CallbackUtilities;
import com.iqueue.utilities.Operations;
import com.iqueue.utilities.URLUtilities;

@SuppressWarnings("serial")
public class ListSearchResultsServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		response.getWriter().println(list(request));
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		response.getWriter().println(list(request));
	}

	private String list(HttpServletRequest request) {

		String answer = null;

		// if (JsonpfyProperties.authenticate(request)) {

		JSONArray entities = listData(URLUtilities.decode(request
				.getParameter("keywords")));

		answer = CallbackUtilities.getCallback(
				request.getParameter("callback"), entities.toString());

		// }

		return answer;
	}

	private JSONArray listData(String keywords) {

		Query query = new Query("IqueueItems");

		// query.setFilter(new FilterPredicate("keywords",
		// FilterOperator.GREATER_THAN_OR_EQUAL, keywords));
		return Operations.jsonQueryTextFilter(query, keywords);
	}

}
