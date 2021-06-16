<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>

<head>
    <!--
    Highway Data Examiner (HDX) page
    Load and view data files related to Travel Mapping (TM) related
    academic data sets. (Formerly used Clinched Highway Mapping (CHM)
    data.)
    Primary Author: Jim Teresco, Siena College, The College of Saint Rose
    Additional authors: Razie Fathi, Arjol Pengu, Maria Bamundo, Clarice Tarbay,
        Michael Dagostino, Abdul Samad, Eric Sauer

    (Pre-git) Modification History:
    2011-06-20 JDT  Initial implementation
    2011-06-21 JDT  Added .gra support and checkbox for hidden marker display
    2011-06-23 JDT  Added .nmp file styles
    2011-08-30 JDT  Renamed to HDX, added more styles
    2013-08-14 JDT  Completed update to Google Maps API V3
    2016-06-27 JDT  Code reorganization, page design updated based on TM
-->
<title>Highway Data Examiner</title>
<!-- /lib/tmphpfuncs.php: common PHP functionality for Travel Mapping -->
<!-- mysqli connecting to database TravelMapping on localhost -->
<!-- /lib/tmphpfuncs.php END -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<link rel="stylesheet" href="/leaflet/BeautifyMarker/leaflet-beautify-marker-icon.css">
<!-- bring in common JS libraries from TM for maps, etc. -->
<!-- tm_common_js from tmphpfuncs.php START -->
<!-- Map API functionality -->
<script type="text/javascript">
var here_map_id = "cVAkOyu3tNFJjheS1CSo";
var here_map_code = "TSP0MYr4patEWMQiSciJvQ";
var tf_map_key = "a01bf5477a474aeea8312a481dec2d8f";
var mapbox_token = "OLDMAPBOX:pk.eyJ1IjoidGVyZXNjb2oiLCJhIjoiY2ppM3ZsZmI2MDJqaTNwbzN2YTc3YTl5OSJ9.rwWcKHerj5WKGMIPAq2prA";
</script>
  <link rel="stylesheet" href="/leaflet-1.5.1/leaflet.css" />
  <script src="/leaflet-1.5.1/leaflet.js"></script>
  <script src="/leaflet-1.5.1/leaflet-providers.js"></script>
  <script type="text/javascript" src="https://maps.stamen.com/js/tile.stamen.js?v1.3.0"></script>
  <!-- jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <!-- TableSorter -->
  <script src="/lib/jquery.tablesorter.min.js" type="text/javascript"></script>
  <!-- clipboard.js -->
  <script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script><!-- tm_common_js from tmphpfuncs.php END -->
<script src="/leaflet/BeautifyMarker/leaflet-beautify-marker-icon.js"></script>
<!-- load in needed JS functions -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min.js"></script>
<script src="tmlib/tmjsfuncs.js" type="text/javascript"></script>
<script src="hdxjsfuncs.js" type="text/javascript"></script>
<script src="hdxqs.js" type="text/javascript"></script>
<script src="hdxinit.js" type="text/javascript"></script>
<script src="hdxav.js" type="text/javascript"></script>
<script src="hdxbreakpoints.js" type="text/javascript"></script>
<script src="hdxcallbacks.js" type="text/javascript"></script>
<script src="hdxvisualsettings.js" type="text/javascript"></script>
<script src="hdxcustomtitles.js" type="text/javascript"></script>
<script src="hdxavcp.js" type="text/javascript"></script>
<script src="hdxvertexselector.js" type="text/javascript"></script>
<script src="hdxhover.js" type="text/javascript"></script>
<script src="hdxpseudocode.js" type="text/javascript"></script>
<script src="hdxnoav.js" type="text/javascript"></script>
<script src="hdxvertexextremesav.js" type="text/javascript"></script>
<script src="hdxedgeextremesav.js" type="text/javascript"></script>
<script src="hdxextremepairsav.js" type="text/javascript"></script>
<script src="hdxtravspanavs.js" type="text/javascript"></script>
<script src="hdxbfchav.js" type="text/javascript"></script>
<script src="hdxlinear.js" type="text/javascript"></script>
<script src="hdxpresort.js" type="text/javascript"></script>
<script src="hdxgraphsearchbox.js" type="text/javascript"></script>
<script src="hdxkruskalav.js" type="text/javascript"></script>
<script src="hdxdegreeav.js" type="text/javascript"></script>
<script src="hdxdfsrecav.js" type="text/javascript"></script>
<script src="hdxinstructions.js" type="text/javascript"></script>
<script src="hdxclosestpairsrecav.js" type="text/javascript"></script>
<!--<link rel="stylesheet" type="text/css" href="supplmentalTypeAhead.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">-->




<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css"/>
<link rel="stylesheet" type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" href="https://travelmapping.net/css/travelMapping.css"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="hdx.css" />
</head>

<style>
	.menubar {
  		font-size: 10pt;
  		font-style: normal;
 		font-family: sans-serif;
  		text-align: center;
  		position: relative;
 		padding-right: 8px;
  		padding-bottom: 2px;
  		margin-top: 0px;
  		margin-bottom: 8px;
  		height: auto;
  		background: rgb(47, 47, 47);
  		color: #ffffff;
  		border: 3px solid rgb(47, 47, 47);
}
</style>

<body onload="HDXInit();" ondragover="allowdrop(event)" ondrop="drop(event)">
<p class="menubar">
  HDX: <span id="startUp">To begin, select a graph to display.</span>
  <span id="filename"></span>
  <span id="status"></span>
  <span id="currentAlgorithm"></span>
</p>
<div id="topControlPanel">
  <table id="topControlPanelTable">
    <tbody>
      <tr>
	<td id="topControlPanelAV1">
	  <button id="startPauseButton" type="button" onclick="startPausePressed()">Start</button>
	  </td><td id="topControlPanelAV2">
	  <select id="speedChanger" onchange="speedChanged()">
	    <option value="0">Run To Completion</option>
        <option value="0">Jump To Breakpoint</option>
	    <option value="1">Fastest possible</option>
	    <option value="5">Extremely fast</option>
	    <option value="20">Very fast</option>
	    <option value="50" selected>Fast</option>
	    <option value="100">Medium speed</option>
	    <option value="250">Pretty slow</option>
	    <option value="500">Slow</option>
	    <option value="1000">Painfully slow</option>
	    <option value="-1">Step</option>
	  </select>
	  </td><td id="topControlPanelAV3">
	  <input id="pseudoCheckbox" type="checkbox" name="Pseudocode-level AV" checked onclick="showHidePseudocode();cleanupBreakpoints()" />&nbsp;Trace Pseudocode<br>
	  </td><td id="topControlPanelAV4">
	  <input id="resetButton" type="button" value="Reset AV" onclick="resetPressed();cleanupBreakpoints()" />
	<!-- if any more AV-specific entries are added, they need to
	     be dealt with in showTopControlPanel() -->
	<td>
	  <input id="loadOptionsButton" type="button" value="Load Data Options" id="loadDataPanelShow" onClick="loadDataOptionsPressed()"/>
	</td>
	<td>
	  <input id="datatablesCheckbox" type="checkbox" name="Datatables" checked onclick="showHideDatatables()" />&nbsp;Show Data Tables<br>
	</td>
	<td id="topControlPanelShowMarkers">
          <input id="showMarkers" type="checkbox" name="Show Markers" onclick="showMarkersClicked()" checked />&nbsp;Show Markers
	</td>
      </tr>
    </tbody>
  </table>
</div>
<div id="map">
</div>
<!--<div id="about">

		<h3>
			About METAL HDX
		</h3>

		<p>
			METAL HDX visualizes common computer scicence algorithms using graphs based on real world maps.  Need help?  A tutorial can be found <a href="tutorial.html">here</a>
		</p>


</div>-->
<div id="loadDataPanel">
<!-- <table id="loadDataTable" class="gratable">
      <thead>
	<tr><th>Load Data:</th></tr>
      </thead>
      <tbody>
	<tr><td> Use this panel to load one of METAL's graphs right
	    from METAL's database (Options 1 and 2), or to upload any
	    data file in a format recognized by HDX from your computer
	    (Option 3).
	</td></tr>
	<tr>
	  <td>
	    <b>Option 1: </b>Search for a METAL "collapsed" graph by name.<br />Start typing in the box below for suggestions.
	    <div id="the-basics">
	      <input class="typeahead" type="text" id="searchBox" placeholder="Pick a Graph">

	    </div>
	    Once you have selected a graph from the list of suggestions, press Enter to load it.
	  </td>
	</tr>
	<tr>
	  <td>
	    <div>

	    </div>
	  </td>
	</tr>


	<tr><td>
	    <input type="button" value="Cancel" id="hideLoadDataPanel" onClick="loadDataPanelCancelPressed();" disabled>
	</td></tr>
      </tbody>
    </table>-->




   <!--<p style="text-align: center">
	   Search for a graph in our database
   </p>

	<button type="button" id="basic" class="opt">Basic Search</button>-->

	<!--<div id="the-basics">
	      <input class="typeahead" type="text" id="searchBox" placeholder="Pick a Graph">

</div>-->

	<!--<button type="button" class="opt">Advanced Search</button>
	<br><p style="{font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 24px;}">or</p><br>-->
	<!--<button type="button" class="opt">Upload File</button>-->

	<!--<label for="fileToLoad" id="uploadLabel">Upload File</label>

	<br>

	<h3>
			About METAL HDX
		</h3>

		<p class="descr">
			METAL HDX visualizes common computer scicence algorithms using graphs based on real world maps.
		</p>

		<br>
		<br>
		<p class="descr">
		Need help?  A tutorial can be found <a href="tutorial.html" target="_blank">here</a>
		</p>-->




</div>

	<script id = "loadPanel">


			var box = document.createElement("input");
			box.class = "typeahead";
			box.type = "text";
			box.id = "searchBox";
			box.placeholder = "Pick a Graph";
			console.log("Current box:" + box);



		function basicMenu()
		{

			var dataPanel = document.getElementById("loadDataPanel");

			dataPanel.innerHTML = "";

      //Back button after the user clicks basic search
			var back = document.createElement("button");
			back.setAttribute("id", "back");
			back.innerHTML = "Back";
			back.addEventListener("click", defaultMenu);


      //spacing for the dataPanel
			var br = document.createElement("br");
			dataPanel.appendChild(br);
			dataPanel.appendChild(br);
			dataPanel.appendChild(br);


      //Instructions for the user when they click on the basic search button
			var instructions = document.createElement("p");
			instructions.innerHTML = "Search for a graph to display";
			dataPanel.appendChild(instructions);


      //the-basics div tag
			var basic = document.createElement("div");
			basic.id = "the-basics";

      //next button under the graph search box
      var start = document.createElement("button");
			start.setAttribute("id", "vis");
			start.innerHTML = "Next";


      //append all of the tags together
			basic.appendChild(box);
			dataPanel.appendChild(basic);
      dataPanel.appendChild(back);
			dataPanel.appendChild(start);



			//start.addEventListener("click", defaultMenu);


		/*	<div id="the-basics">
	      <input class="typeahead" type="text" id="searchBox" placeholder="Pick a Graph">

	    </div>*/

			//HDXGraphSearchInit();

			console.log("made it 10");


		}
		function defaultMenu()
		{
			var mainbox = document.getElementById("loadDataPanel");

			//clear it
			mainbox.innerHTML = "";

			var h3 = document.createElement("h3");
			h3.innerHTML = "METAL HDX";
			mainbox.appendChild(h3);

			var intro = document.createElement("p");
			intro.setAttribute("class", "descr");
			intro.setAttribute("id", "overview");
			intro.innerHTML = "Visualize algorithms using graphs based on real world maps.";
			mainbox.appendChild(intro);

			var br = document.createElement("br");
			mainbox.appendChild(br);


			var instruct = document.createElement("p");
			instruct.innerHTML = "Search for a graph in our database";

			mainbox.appendChild(instruct);

			var basic = document.createElement("button");
			basic.setAttribute("class", "opt");
			basic.innerHTML = "Basic Search";

			mainbox.appendChild(basic);

      //event listener for the basic menu to go back
			basic.addEventListener("click", basicMenu);

			var advanced = document.createElement("button");
			advanced.setAttribute("class", "opt");
			advanced.innerHTML = "Advanced Search";
			mainbox.appendChild(advanced);




			mainbox.appendChild(br);

			var or = document.createElement("p");
			or.setAttribute("id", "or")
			or.innerHTML = "or";

			mainbox.appendChild(or);


			var uploadLabel = document.createElement("label");
			uploadLabel.setAttribute("for", "fileToLoad");
			uploadLabel.setAttribute("id", "uploadLabel");
			uploadLabel.innerHTML = "Upload File";
			mainbox.appendChild(uploadLabel);

			mainbox.appendChild(br);

			var uploadIn = document.createElement("input");
			uploadIn.setAttribute("id", "fileToLoad");
			uploadIn.setAttribute("name", "fileToLoad");
			uploadIn.setAttribute("type", "file");
			uploadIn.setAttribute("value", "Start");
			uploadIn.setAttribute("accept", ".tmg, .wpt, .pth, .nmp, .gra, .wpl");
			uploadIn.setAttribute("onChange", "HDXStartFileselectorRead('fileToLoad')");

			var bod = document.querySelector("body");

			bod.appendChild(uploadIn);
			mainbox.appendChild(br);

			var help = document.createElement("p");
			help.setAttribute("class", "descr");
			help.innerHTML = "Need help?  A tutorial can be found <a href='tutorial.html' target='_blank'>here</a>";
			mainbox.appendChild(help);




		}
		defaultMenu();
		</script>

<!--<input id="fileToLoad" name="fileToLoad" type="file"  value="Start" accept=".tmg, .wpt, .pth, .nmp, .gra, .wpl" onchange="HDXStartFileselectorRead('fileToLoad')">-->
<div id="algorithmSelectionPanel" style="display=none;">
<!-- Select an Algorithm to Visualize:
	 <select id="AlgorithmSelection" onchange="algorithmSelectionChanged()">-->
	    <!-- filled in with options by JS code in hdxAV.initOnLoad() -->
	 <!-- </select>
	  <input type="button" value="Done" id="algOptionsDone" onClick="algOptionsDonePressed(); createVariableSelector();">-->
  <table id="algorithmSelectionPanelTable" style="display=none;" class="gratable">
    <thead>
      <tr><th>Select an Algorithm to Visualize</th></tr>
    </thead>
    <tbody>
      <!--<tr><td><p>To perform an algorithm visualization on the data
	  currently displayed, choose an algorithm and the options you
	  would like to use, then press "Done".<br />  To explore the
	  data on the map manually with no algorithm visualization,
	  choose the "No Algorithm Visualization" option.</p>
      </td></tr>-->
      <tr>
	<td>
	  <select id="AlgorithmSelection" onchange="algorithmSelectionChanged()">-->
	    <!-- filled in with options by JS code in hdxAV.initOnLoad() -->
	 </select>

	</td>
      </tr>
      <tr>
	<td id="algorithmOptions"></td>

      </tr>
      <tr>
	<td>
	  <input type="button" value="Visualize" id="algOptionsDone" onClick="algOptionsDonePressed(); createVariableSelector();">
	</td>
      </tr>
    </tbody>
  </table>
</div>
<div id="avStatusPanel">
  <table id="avStatusTable" class="gratable">
    <thead><tr><th>Algorithm Visualization Status</th></tr><thead>
      <tbody id="algorithmVars">
	<tr><td id="algorithmStatus"></td></tr>
	<tr><td id="pseudo">
	    <span id="pseudoText" style="display:none;">Select an algorithm to view pseudocode.</span>
	  </td>
	</tr>
      </tbody>
  </table>
</div>

</div>
<div id="datatable" draggable="false"  ondragstart="drag(event)">
</div>
  <!-- <table id="instructions">
        <thead>
            <tr ><th id="instructionsHeader">Using METAL's Highway Data Examiner (HDX)</th></tr>
        </thead>
        <tbody>
            <tr>
                <td class="tabs" id="instructionTab1">Maps/Graphs</td>
                <td class="tabs" id="instructionTab2">AV Control Panel</td>
                <td class="tabs" id="instructionTab3">AV Status Panel</td>
                <td class="tabs" id="instructionTab4">Code/Breakpoints</td>
                <td class="tabs" id="instructionTab5">Credits</td>
            </tr>
            <tr>
                <td id="instructionsBody">HDX's user interface is
                intended to be self-explanatory, but some of its
                features might not be obvious.  Select among the tabs
                above to learn how to get the most out
                of <a href="https://courses.teresco.org/metal/">METAL</a>
                and HDX.  This panel will close automatically after
                data is loaded into HDX using the panel to the left.<br />
		  <b>What's New?</b><br />  The 2019 Summer Scholars
		project at <a href="https://www.siena.edu">Siena
		College</a> added new algorithms (Kruskal's algorithm,
		a recursive depth-first traversal, a vertex degree
		search) new options and features in existing
		algorithms, support for conditional breakpoints, plus
		many user interface improvements and general bug
		fixes.  Enjoy!<td>
            <tr>
        </tbody>
    </table>-->
</body>
</html>
