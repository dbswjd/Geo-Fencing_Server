var fs = require('fs');

var xml = fs.readFileSync('../data/313-4F-3D-190612.gml','utf-8')

var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();
var xmlDoc = parser.parseFromString(xml,"test/xml");

//rooms
var roomArray = new Array();
var cellSpaceMembers = xmlDoc.getElementsByTagName("core:cellSpaceMember");
for (var cellSpaceMember=0; cellSpaceMember<cellSpaceMembers.length; cellSpaceMember++){
    var roomInfo = new Object();

    var name = cellSpaceMembers[cellSpaceMember].getElementsByTagName("gml:name");
    roomInfo.name = name[0].textContent;
    
    var wallsArray = new Array();
    var LinearRings = cellSpaceMembers[cellSpaceMember].getElementsByTagName("gml:LinearRing");
    for (var LinearRing=0; LinearRing<LinearRings.length; LinearRing++){
        var wallArray = new Array();
        var positions = LinearRings[LinearRing].getElementsByTagName("gml:pos");
        for (var pos=0; pos<positions.length; pos++){
            var obj = positions[pos].textContent.toString().split(' ');
            wallArray.push(obj);
        }
        wallsArray.push(wallArray);
    }
    roomInfo.walls = wallsArray;

    var doorArray = new Array();
    var partialboundedBy = cellSpaceMembers[cellSpaceMember].getElementsByTagName("core:partialboundedBy");
    for (var i=0; i<partialboundedBy.length; i++){
        var door = partialboundedBy[i].toString().split('"');
        door = door[3].replace('#', '');
        doorArray.push(door);
    }
    roomInfo.doors = doorArray;
    
    roomArray.push(roomInfo);
}

//boundaries
var BoundaryArray = new Array();
var cellSpaceBoundaryMember = xmlDoc.getElementsByTagName('core:cellSpaceBoundaryMember');
for (var boundaryIndex = 0 ; boundaryIndex < cellSpaceBoundaryMember.length; boundaryIndex++){
    var BoundaryInfo = new Object();

    var name = cellSpaceBoundaryMember[boundaryIndex].getElementsByTagName('gml:name')[0].textContent;
    BoundaryInfo.name = name;
   
    var position = cellSpaceBoundaryMember[boundaryIndex].getElementsByTagName('gml:pos');
    var positionInfo = new Array();
    for (var pos = 0; pos < position.length; pos++){
        var data = position[pos].textContent.trim().split(' ');
        positionInfo.push(data);
    }
    BoundaryInfo.position = positionInfo;
    BoundaryArray.push(BoundaryInfo);
}

//merge
var totalInfo = new Object();
totalInfo.rooms = roomArray;
totalInfo.boundary = BoundaryArray;
        
var jsonInfo = JSON.stringify(totalInfo);

//write
fs.writeFile('../data/313-4F.json', jsonInfo, 'utf8', function(err){
    console.log('gml to json complete');
});

