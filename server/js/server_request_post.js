var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request,response){
    // 1. post로 전달된 데이터를 담을 변수를 선언
    var postdata = '';
    // 2. request객체에 on( ) 함수로 'data' 이벤트를 연결
    request.on('data', function (data) {
        // request 객체에서 data 이벤트가 발생하면 data 변수를 callback 함수에 담아서 내부 로직 실행
        // 3. data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 저장
        postdata = postdata + data;
    });

    // 4. request객체에 on( ) 함수로 'end' 이벤트를 연결
    request.on('end', function () {
        // request 객체에서 end 이벤트가 발생하면 내부 로직을 실행 
        // end 이벤트는 callback 시에 전달되는 값이 없습니다.
        // 5. end 이벤트가 발생하면(end는 한버만 발생한다) 3번에서 저장해둔 postdata 를 querystring 으로 객체화
        var parsedQuery = JSON.parse(postdata);
        // 6. 객체화된 데이터를 로그로 출력
        console.log(parsedQuery);
        var lat = parsedQuery.location.lat;
        var lng = parsedQuery.location.lng;
        var jsonInfo = JSON.stringify(parsedQuery);
        fs.writeFile('../data/location.json', jsonInfo, 'utf8', function(err){
            console.log('update location');
        });
        // 7. 성공 HEADER 와 데이터를 담아서 클라이언트에 응답처리
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end('lat:'+lat+' lng:'+lng);
        //console.log(result);
    });
});

server.listen(4000, function(){
    console.log('Server is running on port 4000 ...');
});