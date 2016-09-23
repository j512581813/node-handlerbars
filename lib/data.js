var data_json = function getWeatherData(){
    return {
        locations: [
			{
				name: 'Portland',
				forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				weather: 'Overcast',
				temp: '54.1 F (12.3 C)',
			},
			{
				name: 'Bend',
				forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				weather: 'Partly Cloudy',
				temp: '55.0 F (12.8 C)',
			},
			{
			name: 'Manzanita',
			forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
			iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
			weather: 'Light Rain',
			temp: '55.0 F (12.8 C)',
			},
		],
	};
}
var image_data = function image_data(){
	    return {
        img: [
			{
				id: '72031',
				title: 'wallpaper',
				url: 'http://www.socwall.com/images/wallpapers/72031-290x260.jpg',
			},
			{
				id: '72032',
				title: 'wallpaper',
				url: 'http://www.socwall.com/images/wallpapers/72032-290x260.jpg',
			},
			{
				id: '72041',
				title: 'wallpaper',
				url: 'http://www.socwall.com/images/wallpapers/72041-290x260.jpg',
			},
			{
				id: '72042',
				title: 'wallpaper',
				url: 'http://www.socwall.com/images/wallpapers/72042-290x260.jpg',
			},
			{
				id: '72043',
				title: 'wallpaper',
				url: 'http://www.socwall.com/images/wallpapers/72043-290x260.jpg',
			},
			{
				id: '72033',
				title: 'wallpaper',
				url: 'http://www.socwall.com/images/wallpapers/72033-290x260.jpg',
			},
			{
				id: '72034',
				title: 'wallpaper',
				url: 'http://www.socwall.com/images/wallpapers/72134-290x260.jpg',
			},
			{
				id: '72037',
				title: 'far',
				url: 'http://www.socwall.com/images/wallpapers/72171-290x260.jpg',
			},
			{
				id: '72038',
				title: 'عغنل',
				url: 'http://www.socwall.com/images/wallpapers/72172-290x260.jpg',
			},
		],
	};
}
exports.data = data_json;
exports.image_data = image_data;