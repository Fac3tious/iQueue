package com.iqueue;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.Entity;
import com.iqueue.utilities.CallbackUtilities;
import com.iqueue.utilities.Operations;
import com.iqueue.utilities.URLUtilities;

@SuppressWarnings("serial")
public class SaveIqueueItemServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		response.getWriter().println(save(request));
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		response.getWriter().println(save(request));
	}

	private String save(HttpServletRequest request) {

		String answer = null;

		// if (JsonpfyProperties.authenticate(request)) {

		String itemId = saveData(request);

		answer = CallbackUtilities.getCallback(
				request.getParameter("callback"), itemId);

		// }
		return answer;
	}

	private String saveData(HttpServletRequest request) {

		Entity entity = new Entity("IqueueItems");

		entity.setProperty("timestamp", System.currentTimeMillis() + "");

		entity.setProperty("itemName", URLUtilities
				.decode(request.getParameter("itemName")));
		entity.setProperty("itemLink",
				URLUtilities.decode(request.getParameter("itemLink")));
		entity.setProperty("itemImage",
				URLUtilities.decode(request.getParameter("itemImage")));
		entity.setProperty("itemType",
				URLUtilities.decode(request.getParameter("itemType")));
		entity.setProperty("itemCategory",
				URLUtilities.decode(request.getParameter("itemCategory")));
		entity.setProperty("itemText",
				URLUtilities.decode(request.getParameter("itemText")));
		entity.setProperty("keywords",
				URLUtilities.decode(request.getParameter("keywords")));

		return Operations.save(entity);
	}

}
