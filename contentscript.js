var baseUrl = "http://laterthis.com/post?stand_alone=true";
var url;
var title;
var selection 

function save() {
	chrome.tabs.getSelected(null , function(tab) {
		url = (tab.url);
 		title = (tab.title);
		chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
		  selection = (response.data);
			chrome.tabs.update(tab.id, {url: baseUrl + '&link_url=' + encodeURIComponent(url) + '&link_title=' + encodeURIComponent(title) + '&link_comment=' + encodeURIComponent(selection)});
		});
	});
}

function goto() {
	chrome.tabs.getSelected(null , function(tab) {
		chrome.tabs.update(tab.id, {url: 'http://laterthis.com/my_links/'});
	});
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getSelection")
  	sendResponse({data: window.getSelection().toString()});
  else
  	sendResponse({});
});