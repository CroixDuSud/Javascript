function generateYear()
{
	var currentDate = new Date();
	var yearSelector = document.getElementById("year");

	for(var i=1900; i<=currentDate.getFullYear(); i++)
	{
		var opt = document.createElement("option");
		opt.value = i;
		opt.innerHTML = i;
		yearSelector.add(opt);
	}
	/*
	var currentDate = new Date();
	for(var i = 1900; i <= currentDate.getFullYear(); i++)
	{
		document.write('<option value="'+i+'">'+i+'</option>');
	}
	*/
}

function generateDay()
{
	for(var j=1; j<=31)
}

function calculate(this)
{
	var y = document.form.year.value;
	var m = document.form.month.value;
	var d = document.form.day.value;
	var inputDate = new Date(y, m, d,"","","","");
	inputDate.getTime();

	var diff = 

	var bd = document.getElementById("byDay");
	var bm = document.getElementById("byMonth");
	var by = document.getElementById("byYear");

	if(bd.checked == true)
	{
		alert(diff = diff*1000*3600*24);
	}
	else if(bm.checked == true)
	{
		alert(diff = diff*1000*3600*24*30);
	}
	else
	{
		alert(diff*1000*3600*24*30*365);
	}
}

function blabla()
{
	var monthStart = new Date(year, month, 1);
	var monthEnd = new Date(year, month + 1, 1);
	var monthLength = new Date(monthEnd - monthStart) / (1000*3600*24);	

}

function getNumberOfDays(year, month)
{
	var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
	return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	
}