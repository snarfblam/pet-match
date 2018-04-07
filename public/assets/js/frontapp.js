// var tempString = "For your abominable acts. you shall be lashed. To. The Slave Stick!";

// var space = ' ';
// var period = '.';

// // splitString(tempString, space);
// splitString(tempString, period);

// api key
var key = "1b6dad2788669a0591d7860828345278";
// array that will hold the shelter's unique ID's
var promiseArr = [];

// runs first ajax call on button click. 
$("#submit").on("click", function()
{
	event.preventDefault();

	// variables that hold values entered by user. based on what search parameters the user enters
	var zip = $("#zipcodeInput").val().trim();
	var animal = $("#animalTypeInput").val().trim();
	// var breed = $("#breedInput").val().trim();

	var count = 10;

	// query string for first call
	var queryURL = "http://api.petfinder.com/pet.find?format=json&key=" + key + "&location=" + zip + "&animal="+ animal + "&output=full&count=10&callback=?";

	// first ajax call
	$.ajax(
	{
		url: queryURL,
		jsonp: "callback",
		dataType: "jsonp",
		method: "GET"
	}).then(function(response)
	{
		console.log("Success!");
		console.log(response);

		// loop that will take info from response and make it useable, will repeat until we have 10 animals
		for(var i = 0; i < count; i++)
		{
			// short cut so that we can use the values of 'response' more easily
			var results = response.petfinder.pets.pet[i];

			// variable for new div that will hold all of the information we want to display for the animal
			var animalDiv = $("<div>").addClass("animal");
			// variable to hold the animals name, sets it as an h3
			var aniName = $("<h3>").text("Name: " + results.name.$t);
			// variable that holds the animals picture
			var newImage = $("<img>").attr("src", results.media.photos.photo[3].$t);
			// variable that holds the animals description provided by the shelter
			var info = $("<p>").text(results.description.$t);
			// variable to hold the unique ID for the shelter the animal comes from, will be used in another api request
			var shelter = results.shelterId.$t;

			// div appends our variables
			animalDiv.append(aniName);
			animalDiv.append(newImage);
			animalDiv.append(info);

			// prepends the info that is already in animalDiv to our html page
			$("#apiView").prepend(animalDiv);

			// pushes each shelter's unique ID to an array to be used by a second ajax call that will return the shelter's address
 			promiseArr.push(shelterCall(shelter));
		}
		// 
		return Promise.all(promiseArr);

	}).then(function(promiseArrData)
	{
		console.log(promiseArrData);
		promiseArrData.forEach(function(response, index)
		{
			console.log(response);

			var name = response.petfinder.shelter.name.$t;

			var address1 = response.petfinder.shelter.address1.$t;
			var address2 = response.petfinder.shelter.address2.$t;
			var city = response.petfinder.shelter.city.$t;
			var state = response.petfinder.shelter.state.$t;

			var fullAddress = $("<p>").text(address1 + ", " + address2 + ", " + city + ", " + state);

			var phone = $("<p>").text(response.petfinder.shelter.phone.$t);

			var shelterDiv = $("<div>").addClass("shelter");
			var locale = $("<h4>").text("Name of Shelter: " + name);

			shelterDiv.append(locale);
			shelterDiv.append(fullAddress);
			shelterDiv.append(phone);

			$(".animal").eq(index).append(shelterDiv);
		});
	}).catch(function(error)
	{
		console.log(error);
	});
});

function shelterCall(shelter)
{
	var queryURL2 = "http://api.petfinder.com/shelter.get?format=json&key=" + key + "&id=" + shelter + "&callback=?";

	return $.ajax(
	{
		url: queryURL2,
		jsonp: "callback",
		dataType: "jsonp",
		method: "GET"
	});
}

/////////////////////////////////////////////////////////////

/*This function will be used at a later date. Should cut info from the pet's description that matches what the user is looking for*/

// function splitString(stringToSplit, separator)
// {
// 	var stringArray = stringToSplit.split(separator);

// 	console.log("Function Start");

// 	console.log("The original string is: '" + stringToSplit + "'");
// 	console.log("The separator is: '" + separator + "'");
// 	console.log("The array has " + stringArray.length + " elements: " + stringArray.join('/'));

// }

/////////////////////////////////////////////////////////////