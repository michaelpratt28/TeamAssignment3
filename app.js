var app = angular.module('NewsApp', []);

app.controller('NewsCtrl', function ($scope, $http) {

    $scope.sources = [
        { name: 'BBC News', sourceName: 'bbc-news', imgUrl: 'bbc-sm.png', topStories: [], primary: '#9a0e15', secondary: '#ffffff' },
        { name: 'Business Insider', sourceName: 'business-insider', imgUrl: 'bi-sm.png', topStories: [], primary: '#20617b', secondary: '#ffffff' },
        { name: 'BuzzFeed', sourceName: 'buzzfeed', imgUrl: 'bf-sm.png', topStories: [], primary: '#eb382e', secondary: '#ffffff' },
        { name: 'CNBC', sourceName: 'cnbc', imgUrl: 'cnbc-sm.png', topStories: [], primary: '#533e96', secondary: '#ffffff' },
        { name: 'CNN', sourceName: 'cnn', imgUrl: 'cnn-sm.png', topStories: [], primary: '#c91921', secondary: '#ffffff' },
        { name: 'ESPN', sourceName: 'espn', imgUrl: 'espn-sm.png', topStories: [], primary: '#c8232d', secondary: '#ffffff' },
        { name: 'Google News', sourceName: 'google-news', imgUrl: 'google-sm.png', topStories: [], primary: '#42af61', secondary: '#ffffff' },
        { name: 'Newsweek', sourceName: 'newsweek', imgUrl: 'nw-sm.png', topStories: [], primary: '#e82635', secondary: '#f2f2f2' },
        { name: 'The Huffington Post', sourceName: 'the-huffington-post', imgUrl: 'hp-sm.png', topStories: [], primary: '#347163', secondary: '#ffffff' },
        { name: 'The New York Times', sourceName: 'the-new-york-times', imgUrl: 'nyt-sm.png', topStories: [], primary: '#060708', secondary: '#ffffff' },
        { name: 'The Verge', sourceName: 'the-verge', imgUrl: 'tv-sm.png', topStories: [], primary: '#000000', secondary: '#eeeeee' },
        { name: 'The Wall Street Journal', sourceName: 'the-wall-street-journal', imgUrl: 'wsj-sm.png', topStories: [], primary: '#171717', secondary: '#ffffff' },
        { name: 'The Washington Post', sourceName: 'the-washington-post', imgUrl: 'wp-sm.png', topStories: [], primary: '#000000', secondary: '#ffffff' },
        { name: 'Time', sourceName: 'time', imgUrl: 'time-sm.png', topStories: [], primary: '#ef291a', secondary: '#fbfefe' },
        { name: 'USA Today', sourceName: 'usa-today', imgUrl: 'usat-sm.png', topStories: [], primary: '#1aa0d7', secondary: '#ffffff' },
        { name: 'Wired', sourceName: 'wired-de', imgUrl: 'w-sm.png', topStories: [], primary: '#000000', secondary: '#d9d9d9' }
    ]

    $scope.topStories = [];

    $scope.key = '7250848b7b8c4776be033ea1bede9000';

    function getSources() {
        $scope.sources.forEach(function (element) {
            var url = 'https://newsapi.org/v1/articles?source=' + element.sourceName + '&sortBy=top&apiKey=' + $scope.key;
            $http.get(url)
                .then(function (response) {
                    element.topStories = response.data.articles;
                });
        });
    }

    getSources();

    $scope.activeSource = '';

    $scope.selectSource = function (source) {
        //var source = $scope.sources[idx];
        if ($scope.activeSource != source) {
            $scope.topStories = source.topStories;
            $scope.activeSource = source;
        } else {
            $scope.topStories = [];
            $scope.activeSource = '';
        }
    }

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    $scope.formatDate = function (date) {
        var today = new Date();
        var d = "";
        var a = "AM"
        if (today.getDay() == d.getDate()) { 
                d = "Today"; 
        } else { 
            d = days[date.getDay()]; 
        }
        var h = date.getHours();
        var m = date.getMinutes();

        if (h >= 12) {
            h = h - 12;
            dd = "PM";
        }

        return d + " " + h + ":" + m + " " + a;
    }

    $scope.goTo = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
});

app.directive('backImg', function () {
    return function (scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
        });
    };
});

app.directive('backColor', function () {
    return function (scope, element, attrs) {
        var colors = attrs.backColor.split(" ");
        element.css({
            'background-color': colors[0],
            'color': colors[1]
        })
    }
})