// var tempString = "For your abominable acts. you shall be lashed. To. The Slave Stick!";

// var space = ' ';
// var period = '.';

// // splitString(tempString, space);
// splitString(tempString, period);
var key = "1b6dad2788669a0591d7860828345278";
var promiseArr = [];

// runs ajax calls on button click. 
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

		for(var i = 0; i < count; i++)
		{
			var results = response.petfinder.pets.pet[i];

			var animalDiv = $("<div>").addClass("animal");
			var aniName = $("<h3>").text("Name: " + results.name.$t);
			var newImage = $("<img>").attr("src", results.media.photos.photo[2].$t);
			var info = $("<p>").text(results.description.$t);
			var shelter = results.shelterId.$t;

			animalDiv.append(aniName);
			animalDiv.append(newImage);
			animalDiv.append(info);
			$("#apiView").prepend(animalDiv);

			promiseArr.push(secondCall(shelter));
		}
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

function secondCall(shelter)
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