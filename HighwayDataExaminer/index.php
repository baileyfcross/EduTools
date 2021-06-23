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
        Michael Dagostino, Abdul Samad, Eric Sauer, Spencer Moon

    (Pre-git) Modification History:
    2011-06-20 JDT  Initial implementation
    2011-06-21 JDT  Added .gra support and checkbox for hidden marker display
    2011-06-23 JDT  Added .nmp file styles
    2011-08-30 JDT  Renamed to HDX, added more styles
    2013-08-14 JDT  Completed update to Google Maps API V3
    2016-06-27 JDT  Code reorganization, page design updated based on TM
-->
<title>Highway Data Examiner</title>
<?php

  if (!file_exists("tmlib/tmphpfuncs.php")) {
    echo "<h1 style='color: red'>Could not find file <tt>".__DIR__."/tmlib/tmphpfuncs.php</tt> on server.  <tt>".__DIR__."/tmlib</tt> should contain or be a link to a directory that contains a Travel Mapping <tt>lib</tt> directory.</h1>";
    exit;
  }

 require "tmlib/tmphpfuncs.php";


?>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<link rel="stylesheet" href="/leaflet/BeautifyMarker/leaflet-beautify-marker-icon.css">
<!-- bring in common JS libraries from TM for maps, etc. -->
<?php tm_common_js(); ?>
<script src="/leaflet/BeautifyMarker/leaflet-beautify-marker-icon.js"></script>
<!-- load in needed JS functions -->
<?php
  if (!file_exists("tmlib/tmjsfuncs.js")) {
    echo "<h1 style='color: red'>Could not find file <tt>".__DIR__."/tmlib/tmpjsfuncs.js</tt> on server.  <tt>".__DIR__."/tmlib</tt> should contain or be a link to a directory that contains a Travel Mapping <tt>lib</tt> directory.</h1>";
    exit;
  }

?>

<?php

$result = tmdb_query("SELECT * FROM graphTypes");

  echo '<script type="text/javascript">
  		var categoryOptions = [];
		var labels = [];
		';

  while ($row = $result->fetch_array()) {

     //echo "<option value=\"".$row['category']."\">".$row['descr']."</option>\n";
	 echo 'categoryOptions.push("'.$row['category'].'");';
	 echo 'labels.push("'.$row['descr'].'");';




  }
  echo 'console.log("made it 20");</script>';

  $result->free();

?>

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
<link rel="stylesheet" type="text/css" href="supplmentalTypeAhead.css"/>
<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">-->


<?php
// function to generate the file load html
function hdx_load_file_entries() {
  echo <<<ENDOFSTUFF
		<tr><td id="selects" class="loadcollapse">
		<b>Option 2: </b>Search for a METAL graph by characteristics.<br />Select desired graph characteristics then press "Get Graph List" to see matching graphs.<br>
		Sort criteria:
		<select id = "orderOptions">
			<option value = "alpha">Alphabetical</option>
			<option value = "small">Size (small)</option>
			<option value = "large">Size (large)</option>
		</select>
		<br>
		<a target="_blank" href="https://courses.teresco.org/metal/graph-formats.shtml">Graph format</a>:
		<select id = "restrictOptions">
			<option value = "collapsed">Collapsed (most likely you want this)</option>
			<option value = "traveled">Traveled (include traveler info)</option>
			<option value = "simple">Simple (straight line edges only)</option>
			<option value = "all">All</option>
		</select>
		<br>
		Graph category:
		<select id = "categoryOptions">
				<option value="all">All Graphs</option>
ENDOFSTUFF;
  $result = tmdb_query("SELECT * FROM graphTypes");

  echo '<script type="text/javascript">var categoryOptions = [];';

  while ($row = $result->fetch_array()) {

     //echo "<option value=\"".$row['category']."\">".$row['descr']."</option>\n";
	 echo

	 		'categoryOptions.push('.$row['category']."\">".$row['descr'].');';



  }
  echo '</script>';

  $result->free();
  echo <<<ENDOFSTUFF
		</select>
		<br>
		Size from
		<input type="number" min="1" value="1" id="minVertices" style="width:6rem;">
		to
		<input type="number" min="1" value="2000" id="maxVertices" style="width:6rem;">
		vertices
		<br>
		<input type="button" value="Get Graph List" onclick="HDXFillGraphList(event)">
	  </td>
	  </tr>
      <tr><td class="loadcollapse">
	  <b>Option 3:</b>Select and upload a data file from your computer.<br />
          <input id="fileToLoad" type="file"  value="Start" onchange="HDXStartFileselectorRead('fileToLoad')">
      </td></tr>
ENDOFSTUFF;
}
?>


<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css"/>
<link rel="stylesheet" type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" href="https://travelmapping.net/css/travelMapping.css"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="hdx.css" />
</head>

<style>
	
</style>

<body onload="HDXInit();" ondragover="allowdrop(event)" ondrop="drop(event)" style="background-color: rgb(47, 47, 47)">
<div class="menubar">
	<div id="info">
  <span id="startUp">To begin, select a graph to display.</span>
  <span id="filename"></span><br>
  <span id="status"></span>
  <span id="currentAlgorithm"></span>
	</div>
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
	  </td><td >
		  <div id="topControlPanelAV3">
		  <input id="showMarkers" type="checkbox" name="Show Markers" onclick="showMarkersClicked()" checked />&nbsp;Show Markers<br>
		  <input id="pseudoCheckbox" type="checkbox" name="Pseudocode-level AV" checked onclick="showHidePseudocode();cleanupBreakpoints()" />&nbsp;Trace Pseudocode<br>
		  <input id="datatablesCheckbox" type="checkbox" name="Datatables" checked onclick="showHideDatatables()" />&nbsp;Show Data Tables
		  </div>
	  	  
	</td>
	  </td><td id="topControlPanelAV4">
	  <input id="resetButton" type="button" value="Reset AV" onclick="resetPressed();cleanupBreakpoints()" />
	<!-- if any more AV-specific entries are added, they need to
	     be dealt with in showTopControlPanel() -->
	<!--<td>
	  <input id="loadOptionsButton" type="button" value="Load Data Options" id="loadDataPanelShow" onClick="loadDataOptionsPressed()"/>
	</td>
	<td>
	  <input id="datatablesCheckbox" type="checkbox" name="Datatables" checked onclick="showHideDatatables()" />&nbsp;Show Data Tables<br>
	</td>-->
	<!--<td id="topControlPanelShowMarkers">
          <input id="showMarkers" type="checkbox" name="Show Markers" onclick="showMarkersClicked()" checked />&nbsp;Show Markers<br>
		  <input id="pseudoCheckbox" type="checkbox" name="Pseudocode-level AV" checked onclick="showHidePseudocode();cleanupBreakpoints()" />&nbsp;Trace Pseudocode<br>
		  <input id="datatablesCheckbox" type="checkbox" name="Datatables" checked onclick="showHideDatatables()" />&nbsp;Show Data Tables
	</td>-->
      </tr>
    </tbody>
  </table>
  
</div>
<div id="title">
		<p id = "titleh1">
			METAL HDX
</p>
  </div>
</div>
<!--<div id="topControlPanel">
	<p>
		Control Panel
	</p>-->
<!--<button id="startPauseButton" type="button" onclick="startPausePressed()">Start</button>
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
	  <input id="pseudoCheckbox" type="checkbox" name="Pseudocode-level AV" checked onclick="showHidePseudocode();cleanupBreakpoints()" />&nbsp;Trace Pseudocode<br>
	  <input id="loadOptionsButton" type="button" value="Load Data Options" id="loadDataPanelShow" onClick="loadDataOptionsPressed()"/>
	  <input id="datatablesCheckbox" type="checkbox" name="Datatables" checked onclick="showHideDatatables()" />&nbsp;Show Data Tables<br>
	  <input id="showMarkers" type="checkbox" name="Show Markers" onclick="showMarkersClicked()" checked />&nbsp;Show Markers-->
	  <!--<table id="topControlPanelTable">
    <tbody>
      <tr>
	<td id="topControlPanelAV1">
	  <button id="startPauseButton" type="button" onclick="startPausePressed()">Start</button>
	  <input id="resetButton" type="button" value="Reset" onclick="resetPressed();cleanupBreakpoints()" />
	  </td>
	  </td>--><!--<td id="topControlPanelAV4">
	  </td>-->
	  <!--</tr>
<tr>
	  <td id="topControlPanelAV2">
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
	  </td>
</tr>
<tr>
	<td id="topControlPanelAV3">
	  <div id="check">
			<input id="pseudoCheckbox" type="checkbox" name="Pseudocode-level AV" checked onclick="showHidePseudocode();cleanupBreakpoints()" />&nbsp;Trace Pseudocode<br>
			<input id="datatablesCheckbox" type="checkbox" name="Datatables" checked onclick="showHideDatatables()" />&nbsp;Show Data Tables<br>
			<input id="showMarkers" type="checkbox" name="Show Markers" onclick="showMarkersClicked()" checked />&nbsp;Show Markers
	  </div>
</tr>
<tr>
--><!-- if any more AV-specific entries are added, they need to
	     be dealt with in showTopControlPanel() -->

	  <!--<input id="loadOptionsButton" type="button" value="Load Data Options" id="loadDataPanelShow" onClick="loadDataOptionsPressed()"/>-->

	
	 <!-- <input id="datatablesCheckbox" type="checkbox" name="Datatables" checked onclick="showHideDatatables()" />&nbsp;Show Data Tables<br>-->
	
	<!--<td id="topControlPanelShowMarkers">-->
        <!--  <input id="showMarkers" type="checkbox" name="Show Markers" onclick="showMarkersClicked()" checked />&nbsp;Show Markers-->
	<!--</td>-->
     <!-- </tr>
    </tbody>
  </table>
</div>-->
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
	      <input class="typeahead" type="text" id="searchBox" placeholder="Pick a Graph"><br />
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
	<script>

		function basicMenu()
		{

      //Calls the Fucntions for the Graph Search box to Initiate
      HDXGraphSearchInit();
      HDXGraphBoxStart();

      //Creates and sets the attributes pf our search bar
      var box = document.createElement("input");
			box.setAttribute("class", "typeahead");
			box.setAttribute("type", "text");
			box.setAttribute("id", "searchBox");
			box.setAttribute("placeholder", "Pick a Graph");

      //Datapanel to contain all of the elements
			var dataPanel = document.getElementById("loadDataPanel");
			dataPanel.innerHTML = "";

      //Back Button
			var back = document.createElement("button");
			back.setAttribute("id", "back");
			back.innerHTML = "Back";
			dataPanel.appendChild(back);
      back.addEventListener("click", HDXGraphSearchCleanup());
			back.addEventListener("click", defaultMenu);

      //Spacing on the panel
			var br = document.createElement("br");
			dataPanel.appendChild(br);
			dataPanel.appendChild(br);
			dataPanel.appendChild(br);


      //Instructions for the Grpah Search Box
			var instructions = document.createElement("p");
			instructions.innerHTML = "Search for a graph to display";
			dataPanel.appendChild(instructions);

      //Container for the input element
			var basic = document.createElement("div");
			basic.setAttribute("id", "the-basics");
			basic.appendChild(box);

      //puts the basic variable with the child box into the dataPanel
			dataPanel.appendChild(basic);

      //makes the next button
			var start = document.createElement("button");
			start.setAttribute("id", "vis");
			start.innerHTML = "Next";
			dataPanel.appendChild(start);

		}

		function advancedMenu()
		{
			var dataPanel = document.getElementById("loadDataPanel");

			dataPanel.innerHTML = "";

			var br = document.createElement("br");

			var back = document.createElement("button");
			back.setAttribute("id", "back2");
			back.innerHTML = "Back";

			dataPanel.appendChild(back);

			container = document.createElement("div");
			container.setAttribute("id", "selects")

			var title = document.createElement("h4");
			title.innerHTML = "Advanced Search";
			container.appendChild(title);

			back.addEventListener("click", defaultMenu);

			var sortP = document.createElement("p");
			sortP.innerHTML = "Sort by";
			container.appendChild(sortP);
			container.innerHTML += "<br>";

			var select = document.createElement("select");
			select.setAttribute("id", "orderOptions");

			var opt1 = document.createElement("option");
			opt1.setAttribute("value", "alpha");
			opt1.innerHTML = "Alphabetical";
			select.appendChild(opt1);

			var opt2 = document.createElement("option");
			opt2.setAttribute("value", "small");
			opt2.innerHTML = "Smallest First";
			select.appendChild(opt2);

			var opt3 = document.createElement("option");
			opt3.setAttribute("value", "large");
			opt3.innerHTML = "Largest First";
			select.appendChild(opt3);

			container.appendChild(select);
			container.innerHTML += "<br>";



			var formatP = document.createElement("p");
			formatP.innerHTML = "Format";
			container.appendChild(formatP);
			container.innerHTML += "<br>";

			var select2 = document.createElement("select");
			select2.setAttribute("id", "restrictOptions");

			var optA = document.createElement("option");
			optA.setAttribute("value", "collapsed");
			optA.innerHTML = "Collapsed (standard format)";
			select2.appendChild(optA);

			var optB = document.createElement("option");
			optB.setAttribute("value", "traveled");
			optB.innerHTML = "Traveled (include traveler info)";
			select2.appendChild(optB);

			var optC = document.createElement("option");
			optC.setAttribute("value", "simple");
			optC.innerHTML = "Simple (straight line edges only)";
			select2.appendChild(optC);

			var optD = document.createElement("option");
			optD.setAttribute("value", "all");
			optD.innerHTML = "All";
			select2.appendChild(optD);

			container.appendChild(select2);
			container.innerHTML += "<br>";

			var categoryP = document.createElement("p");
			categoryP.innerHTML = "Category";
			container.appendChild(categoryP);
			container.innerHTML += "<br>";

			var select3 = document.createElement("select");
			select3.setAttribute("id", "categoryOptions");

			var optAll = document.createElement("option");
			optAll.setAttribute("value", "all");
			optAll.innerHTML = "All Graphs";
			select3.appendChild(optAll);


			for (let i = 0; i < labels.length; i++)
			{
				let category = document.createElement("option");
				category.innerHTML = labels[i];
				select3.appendChild(category);
			}

			container.appendChild(select3);
			container.innerHTML += "<br>";


			var sizeP = document.createElement("p");
			sizeP.innerHTML = "Vertices";
			sizeP.setAttribute("id", "vert");
			container.appendChild(sizeP);
			container.innerHTML += "<br>";

			var min = document.createElement("input");
			min.setAttribute("type", "number");
			min.setAttribute("min", "1");
			min.setAttribute("value", "1");
			min.setAttribute("id", "minVertices");
			min.setAttribute("style", "width:5rem;");
			container.appendChild(min);

			var sizeP2 = document.createElement("p");
			sizeP2.innerHTML = "to";
			sizeP2.setAttribute("id", "to");
			container.appendChild(sizeP2);

			var max = document.createElement("input");
			max.setAttribute("type", "number");
			max.setAttribute("min", "1");
			max.setAttribute("value", "2000");
			max.setAttribute("id", "maxVertices");
			max.setAttribute("style", "width:5rem;");
			container.appendChild(max);
			container.innerHTML += "<br>";


			var getList = document.createElement("input");
			getList.setAttribute("type", "button");
			getList.setAttribute("value", "Get Graph List");
			getList.setAttribute("id", "getlist");
			getList.setAttribute("onclick", "HDXFillGraphList(event)");
			container.appendChild(getList);
			container.innerHTML += "<br>";

			dataPanel.appendChild(container);

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
			intro.innerHTML = "Visualize algorithms using graphs based on real world map data.";
			mainbox.appendChild(intro);

			var br = document.createElement("br");
			mainbox.appendChild(br);


			var instruct = document.createElement("p");
			instruct.innerHTML = "Search for a graph in our database";

			mainbox.appendChild(instruct);

			var basicSearch = document.createElement("button");
			basicSearch.setAttribute("class", "opt");
			basicSearch.innerHTML = "Basic Search";

			mainbox.appendChild(basicSearch);

			basicSearch.addEventListener("click", basicMenu);

			var advanced = document.createElement("button");
			advanced.setAttribute("class", "opt");
			advanced.innerHTML = "Advanced Search";
			mainbox.appendChild(advanced);

			advanced.addEventListener("click", advancedMenu);



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
</div>

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


	<!--<div id="algorithmOptions">

	</div>-->

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
	<tr id = "pscode"><td id = "pscoded">Pseudocode</td></tr>
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
</body>
</html>
<?php tmdb_close();?>
