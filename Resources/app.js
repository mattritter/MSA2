var win = Titanium.UI.createWindow({
    title : '',
    backgroundColor : '#fff',
});

openMenu = function() {

    Ti.API.info('Down we go!');

    menuClosed = false;

    navContainer.animate(navShortUp);

    setTimeout(function() {

        navContainer.animate(navDown);

    }, 250);

};

closeMenu = function() {

    Ti.API.info('Up we go!');

    menuClosed = true;

    navContainer.animate(navShortDown);

    setTimeout(function() {

        navContainer.animate(navUp);

    }, 250);

};

var main = Ti.UI.createWindow({
    backgroundColor : "#ccc",
    navBarHidden : true,
    url : 'win1.js'
});

var navGroup = Ti.UI.iPhone.createNavigationGroup({
    window : main,
    bottom : 100,
});

win.add(navGroup);

var navContainer = Ti.UI.createView({
    width : 320,
    height : 400,
    top : -325,
    left : 0,
    zIndex : 9999,
});

win.add(navContainer);

var nav = Ti.UI.createView({
    height : 325,
    width : 320,
    top : 0,
    backgroundImage : 'images/navBackground.png',
    opacity : 1.0,
});

navContainer.add(nav);

var logoIcon = Ti.UI.createImageView({
    backgroundImage : 'images/logo.png',
    width : 75,
    height : 75,
    bottom : 0,
    left : 20,
});

navContainer.add(logoIcon);

var navData = [{
    navItem : "FAVORITES",
    icon : 'images/icons/note.png',
    backgroundColor : 'green',
}, {
    navItem : "CONCERTS",
    icon : 'images/icons/guitar.png',
    backgroundColor : 'purple',
}, {
    navItem : "VIP ROOM",
    icon : 'images/icons/vip.png',
    backgroundColor : 'blue',
}, {
    navItem : "NEWS",
    icon : 'images/icons/newspaper.png',
    backgroundColor : 'red',
}];

var tableData = [];

for (var i = 0; i < navData.length; i++) {

    var row = Ti.UI.createTableViewRow({
        color : '#000',
        height : Ti.UI.SIZE,
        windowBackColor : navData[i].backgroundColor,
        name : navData[i].navItem,
        icon : navData[i].icon,
        selectedBackgroundColor : '#171717',
    });

    var title = Ti.UI.createLabel({
        text : navData[i].navItem.toUpperCase(),
        color : '#c8c8c8',
        width : 250,
        left : 65,
        top : 10,
        bottom : 5,
        height : 'auto',
        font : {
            fontFamily : 'Trade Gothic LT Std',
            fontSize : 26,
        }
    });

    var icon = Ti.UI.createImageView({
        image : navData[i].icon,
        width : 35,
        left : 20,
    });

    row.add(icon);

    row.add(title);

    row.addEventListener('click', function(e) {

        var second = Ti.UI.createWindow({
            navBarHidden : true,
            backgroundColor : e.rowData.windowBackColor,
        });

        var label = Ti.UI.createLabel({
            text : e.rowData.name,
            color : '#fff',
        });

        second.add(label);

        navGroup.open(second, {
            animated : false,
        });

        closeMenu();

    });

    tableData.push(row);

}

var table = Ti.UI.createTableView({
    data : tableData,
    top : 40,
    left : 0,
    right : 0,
    bottom : 20,
    backgroundColor : 'transparent',
    separatorColor : 'transparent',
    scrollable : true,
});

nav.add(table);

var navShortDown = Ti.UI.createAnimation({
    top : 0,
    curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    duration : 250
});

var navDown = Ti.UI.createAnimation({
    top : -25,
    curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    duration : 250
});

var navShortUp = Ti.UI.createAnimation({
    top : -350,
    curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    duration : 250
});

var navUp = Ti.UI.createAnimation({
    top : -325,
    curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    duration : 250
});

var menuClosed = true;

var startStopButton = Titanium.UI.createImageView({
    backgroundImage : 'images/play.png',
    height : 65,
    width : 65,
    bottom : 55,
});

var pauseResumeButton = Titanium.UI.createImageView({
    backgroundImage : 'images/pause.png',
    height : 65,
    width : 65,
    bottom : 55,
    visible : false,
});

var playerView = Titanium.UI.createView({
    backgroundImage : 'images/navBackground.png',
    height : 50,
    width : 320,
    bottom : 50,
});

win.add(playerView);

var ad = Titanium.UI.createImageView({
    backgroundImage : 'images/tempad.png',
    height : 50,
    width : 320,
    bottom : 0,
});

win.add(ad);

win.add(startStopButton);
win.add(pauseResumeButton);

var volumeUp = Titanium.UI.createButton({
    title : 'Volume++',
    height : 40,
    width : 145,
    left : 10,
    bottom : 20
});

//win.add(volumeUp);

var volumeDown = Titanium.UI.createButton({
    title : 'Volume--',
    height : 40,
    width : 145,
    right : 10,
    bottom : 20
});

//win.add(volumeDown);

var audioPlayer = Ti.Media.createAudioPlayer({
    url : 'http://67.223.226.139:21000',
    allowBackground : true
});

//Allow for background streaming in iOS
Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;

startStopButton.addEventListener('click', function() {

    audioPlayer.start();
    startStopButton.visible = false;
    pauseResumeButton.visible = true;

});

pauseResumeButton.addEventListener('click', function() {

    audioPlayer.pause();
    pauseResumeButton.visible = false;
    startStopButton.visible = true;

});

volumeDown.addEventListener('click', function() {
    if (audioPlayer.volume > 0) {
        if (audioPlayer.volume < 0.1) {
            audioPlayer.volume = 0;
        } else {
            audioPlayer.volume -= 0.1;
        }
        var roundedVolume = Math.round(audioPlayer.volume * 1000) / 1000;
        volumeDown.title = 'Volume-- (' + roundedVolume + ')';
        volumeUp.title = 'Volume++';
    }

});

volumeUp.addEventListener('click', function() {
    if (audioPlayer.volume < 1.0) {
        audioPlayer.volume += 0.1;
        var roundedVolume = Math.round(audioPlayer.volume * 1000) / 1000;
        volumeUp.title = 'Volume++ (' + roundedVolume + ')';
        volumeDown.title = 'Volume--';
    }
});

audioPlayer.addEventListener('progress', function(e) {
    Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
});

audioPlayer.addEventListener('change', function(e) {
    Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
});

logoIcon.addEventListener('click', function(e) {

    if (menuClosed === true) {

        openMenu();

    } else {

        closeMenu();

    }

});

win.open(); 