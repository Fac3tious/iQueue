package com.iqueue.utilities;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.labs.repackaged.org.json.JSONArray;

public class Operations {

	public static JSONArray jsonQuery(final Query q) {

		return jsonQuery(q, null);
	}

	public static JSONArray jsonQuery(final Query q, final String returnField) {

		JSONArray jsonArray = new JSONArray();

		DatastoreService datastore = DatastoreServiceFactory
				.getDatastoreService();

		PreparedQuery pq = datastore.prepare(q);

		for (Entity result : pq.asIterable()) {

			jsonArray.put(ConvertEntityToJson.getJson(result, returnField));
		}

		return jsonArray;
	}

	public static String save(Entity entity) {

		DatastoreService datastore = DatastoreServiceFactory
				.getDatastoreService();

		datastore.put(entity);

		String id = entity.getKey().getName();

		if (id == null) {
			id = Long.toString(entity.getKey().getId());
		}
		return id;
	}

	public static JSONArray jsonQueryTextFilter(final Query q,
			final String filter) {

		JSONArray jsonArray = new JSONArray();

		DatastoreService datastore = DatastoreServiceFactory
				.getDatastoreService();

		PreparedQuery pq = datastore.prepare(q);

		for (Entity result : pq.asIterable()) {

			String keywords = (String) result.getProperty("keywords");
			
			if (keywords.toLowerCase().contains(filter.toLowerCase())) {
				jsonArray.put(ConvertEntityToJson.getJson(result, null));

			} else {

				String text = (String) result.getProperty("itemText");

				if (text.toLowerCase().contains(filter.toLowerCase())) {
					jsonArray.put(ConvertEntityToJson.getJson(result, null));

				} else {

					String title = (String) result.getProperty("itemName");
					if (title.toLowerCase().contains(filter.toLowerCase())) {
						jsonArray
								.put(ConvertEntityToJson.getJson(result, null));
					}
				}
			}
		}

		return jsonArray;
	}
}
