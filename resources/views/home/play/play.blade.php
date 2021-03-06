<!DOCTYPE html>

<html>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="ie-comp" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />  
    <meta name="keywords" content="音乐,音乐下载,九天音乐,九天音乐网,免费,下载,播放,歌曲试听,原创音乐,独立音乐,音乐人,高品质音乐,民谣歌曲,最新专辑,MV,9sky,唱片购买" />
    <meta name="description" content="九天音乐网是目前国内最悠久的音乐服务品牌，为用户提供高品质音乐免费试听、正版音乐下载、MV观看、唱片购买。平台汇聚了众多优质音乐人和歌手，拥有流行、民谣、电子、摇滚等十多个流派的原创音乐作品。" />
    <title>正在播放</title>
</head>
    <link rel="stylesheet" href="/home/css/jquery.mCustomScrollbar.min.css" />
    <link rel="stylesheet" href="/home/css/style1.css?v=1.0" />
    <script src="/home/js/jquery-1.12.2.min.js"></script>
    <script src="/home/js/jquery.mCustomScrollbar.js"></script>
    <script src="/home/js/jquery.mousewheel.js"></script>
    <script src="/home/js/jquery.cookie.js"></script>
    <!-- jplayer -->
    <script src="/home/js/jquery-ui-min.js"></script>
    <script src="/home/js/jquery.jplayer.js"></script>
    <script src="/home/js/jplayer.playlist.js"></script>
    <script src="/home/js/jquery.lrc-min.js"></script>
    <script src="/home/js/lrc.js"></script>
    <script src="/home/js/jmap.js"></script>
    <script src="/home/js/play.js"></script>
    <script src="/home/js/myconfirm.js"></script>
    <!--[if lt IE 9]>
            <script type="text/javascript" th:src="${staticUrl}/js/html5.js"></script>
    <![endif]-->
    <style>
    .swiper-container{background: none;width: 55%; margin-top: 100px; margin-left: 15%; float: left;}
    .swiper-container .music_list {
        font-size: 18px;
        height: 370px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow:auto;
    }
    .swiper-container1{background: none;width: 100%;height: 200px; float: left; overflow: hidden; position: relative;}
    .swiper-container1 .lrc_list {
        font-size: 18px;
        height: 200px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .bg_class{
    	background-size: cover;
	    -webkit-filter: blur(7px);
	    -moz-filter: blur(7px);
	    -o-filter: blur(7px);
	    -ms-filter: blur(7px);
	    filter: blur(7px);
	    position: fixed
    }
     .open{width: 100%;height:100%; position: fixed; background: rgba(0,0,0,0.7);display:none;z-index:99999;}
    .tan{width: 522px;height:253px; position: absolute;top:0; left: 0; right:0; bottom:0; margin: auto; background: #fff; border-radius: 5px;}
    .tan h3{width: 100%; font-size: 18px; color: #444; text-align: center; line-height: 60px; position: relative;}
    .tan .close{position:absolute;width:25px; height:25px; font-size: 25px; top: 0px; right: 20px; font-family: Arial;cursor: pointer;}
    .text_delete{width: 100%; text-align: center; line-height: 80px; font-size: 18px;}
    .text_delete img{margin-right: 20px;}
    .but{margin-top:30px; text-align: center;font-weight: bold;}
    .but button{margin: 0 10px; font-size: 16px;}
    .close{width:25px; height:25px; right:20px; top:5px; font-size: 35px;}
    .ok{width: 128px;height:40px;bottom: 38px; left: 196px; color: #fff; background: #E85252; border-radius: 10px; line-height: 40px; text-align: center;}
    .cance{width: 128px;height:40px;bottom: 38px; left: 344px; color: #9b9b9b; background: none; border-radius: 10px; border: 1px solid #9b9b9b;text-align: center; line-height: 40px;}
	</style>
<body>
	<div class="open">
	    <div class="tan">
	        <h3>因你而乐 <a class="close"><img src="/home/images/x.jpg" /></a></h3>
	        <p class="text_delete"><img src="/home/images/delete.jpg" />确定要删除此歌曲？</p>
	        <div class="but">
	            <button class="ok">确定</button>
	            <button class="cance">取消</button>
	        </div>
	    </div>
	</div>
	<div class="bg_class" style="background-image: url(/home/images/1111.jpg)">
	</div>
	<div class="music_bg">
	<div id="jquery_jplayer_2" class="jp-jplayer"></div>
	<div id="lrcWrap"></div>
	    <div class="fixedbg"></div>
	    <div class="boxxx">
	        <div class="music_txt">
	            <div class="music_logo">
	            	<a href="/" target="_blank" style="font-family:'隶书';font-size:60px;">
	            		<!-- <img src="/images/music.png" /> -->
	            		因乐网
	            	</a>
	            </div>
	            <ul class="ul-title">
	                <li class="li1">歌曲名</li>
	                <li class="li2">音乐人</li>
	                <li class="li3">时长</li>
	                <li class="li4">&nbsp;</li>
	            </ul>
	            <div class="swiper-container"><!--music_list-->
	                <div class="swiper-wrapper">
	                    <div class="music_list mCustomScrollbar">
	                    </div>
	                </div>
	            </div>
	            <div class="music_right">
	                <div class="musicright_box1">
	                   <a href="###" id="playhref" target="_blank">
	                    <img src="/home/images/1111.jpg" id="playimg" width="185" height="185" />
	                    <em></em>
	                    </a>
	                </div>
	                <div class="musicright_box2"></div>
	                <div class="musicright_box3"></div>
	                <div class="musicright_box4">
		                <div class="swiper-container1"><!--music_list-->
		                        <div class="swiper-wrapper">
		                            <div class="lrc_list" id="lrc_list">
		                              
		                            </div>
		                        </div>
		                </div>
	                </div>
	            </div>
	        </div>
	        <div class="music_controller" id="jp_container_1">
	            <div class="jp-playlist" style="height: 500px; overflow-y: auto; display:none">
				 <ul>
					 <!-- The method Playlist.displayPlaylist() uses this unordered list -->
					 <li></li>
				 </ul>
			    </div>
	            <div class="operation">
	                <div class="tion_box tion_box1">
	                    <div class="prev jp-previous"><img src="/home/images/left.png" width="100%" /></div>
	                    <div class="on_off jp-play"><img src="/home/images/play.png" width="100%" /></div>
	                    <div class="on_off jp-pause"><img src="/home/images/zhong.png" width="100%" /></div>
	                    <div class="next jp-next"><img src="/home/images/right.png" width="100%" /></div>
	                </div>
	                <div class="tion_box tion_box2">
	                    <span class="jp-current-time">00:00</span>
	                    <div class="time_jindu" id="progreeBar">
	                        <div class="time_line jp-seek-bar"><a></a>
	                         <div class="time_hong jp-play-bar"></div>
	                        </div>
	                        <a class="time_dian" href="#####"></a>
	                    </div>
	                    <span class="right jp-duration"></span>
	                </div>
	                <div class="tion_box tion_box4">
	                    <img onclick="myloop(this)" src="/home/images/repeat.png" />
	                </div>
	                <div class="tion_box tion_box3">
	                    <span class="jp-mute"><img src="/home/images/i_3.png" /></span>
	                    <span class="jp-unmute"><img src="/home/images/i_4.png" /></span>
	                    <div class="time_jindu_v" id="soundBar">
	                        <div class="time_line_v jp-volume-bar"><a></a>
	                        <div class="time_hong_v jp-volume-bar-value"></div>
	                        </div>
	                        <div class="time_dian_v"></div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
<script>
//<![CDATA[
	var myPlaylist;
	$(document).ready(function(){
		 var lrc_list_map = new Map();
    	var $lrc=$("#lrcWrap").lrc({scrollAnimate: "line"});
	    myPlaylist = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_2"
		}, [], {
		playlistOptions: {
			enableRemoveControls: true
		},
		ready: function (event) {
			
		},
		timeupdate: function(event) {
			time = event.jPlayer.status.currentTime;
		
		},
		play: function(event) {
			$("#playimg").attr("src",myPlaylist.playlist[myPlaylist.current].musiciancover);
			$("#playhref").attr("href","/disc/detail?id="+myPlaylist.playlist[myPlaylist.current].discId);
			$(".bg_class").css("background-image","url('"+myPlaylist.playlist[myPlaylist.current].musiciancover+"')");
			$(".musicright_box2").html(myPlaylist.playlist[myPlaylist.current].songName);
			$(".musicright_box3").html("<a href='/musician/detail?id="+myPlaylist.playlist[myPlaylist.current].musicianId+"' target='_blank'>"+myPlaylist.playlist[myPlaylist.current].musician+"</a>");
			$(document).attr("title","正在播放-"+myPlaylist.playlist[myPlaylist.current].songName);
			var songId = myPlaylist.playlist[myPlaylist.current].songId;
			if(lrc_list_map.get(songId)!=null && lrc_list_map.get!=undefined&&lrc_list_map.get(songId)!="error"){
						if(time==0) {
							$.lrc.start(lrc_list_map.get(songId), function() {
								return time;
							});
						}
			}else if(lrc_list_map.get(songId)=="error"){
				$.lrc.stop(); 
				$("#lrc_list  .mCSB_container").empty();
				$("#lrc_list  .mCSB_container").html("<p>该歌曲暂时没有歌词</p>");
				$(".lrc_list").mCustomScrollbar("update");
			}else{
				$.lrc.stop();
				$("#lrc_list  .mCSB_container").empty();
				$.ajax({
					   type: 'get',
					   cache:false,
					   url: "/main/musician/song/lyric?id="+songId,
					   success: function(results){
						   if(results.code=="0000"&&results.data.lyric!=""){
								lrc_list_map.put(songId,results.data.lyric);
								$.lrc.start(results.data.lyric, function() {
									return time;
								});
						   }else{
							   lrc_list_map.put(songId,"error");
							   $("#lrc_list  .mCSB_container").html("<p>该歌曲暂时没有歌词</p>");
							   $.lrc.stop(); 
						   }
						   $(".lrc_list").mCustomScrollbar("update");
					   },
					   error: function(results){
						   lrc_list_map.put(songId,"error");
						   $("#lrc_list  .mCSB_container").html("<p>该歌曲暂时没有歌词</p>");
						   $.lrc.stop(); 
						   $(".lrc_list").mCustomScrollbar("update");
					   }
					})
					
			}
		},
		ended:function(event){
			$.lrc.stop(); 
			$("#lrc_list  .mCSB_container").html("<p>歌曲播放完毕！</p>");
			$(".lrc_list").mCustomScrollbar("update");

		},
		swfPath: "/js",  		//存放jplayer.swf的决定路径
		solution:"html, flash", //支持的页面
		supplied: "mp3",		//支持的音频的格式
		wmode: "window",
		loop:true,
		shuffled:true
	});


	var obj = {
		mid: '{{$rs->mid}}',
		mname: '{{$rs->mname}}',
		sname: '{{$rs->sname}}',
		aname: '{{$rs->aname}}',
		photp: '{{$rs->photp}}',
		url  : '{{$rs->urll}}'

	};

	console.log(obj);

	var lists = formatSong([{
		'commentNum':0,
		'designNotes':'',
		'discCoverUrl': obj.photp,
		'discId':'1458',
		'duration':'04:31',
		'giftNum':0,
		'id':'4717',
		'isCollected':'N',
		'lyricUrl':'http://sp.9sky.com/null',
		'musician':obj.sname,
		'musicianId':'1008147',
		'mvId':null,
		'songName': obj.mname,
		'songUrl': obj.url
	}]);

	myPlaylist.setPlaylist(lists);
});
function myloop(obj){
	myPlaylist.loop = false;
	myPlaylist.oneloop = true;
	myPlaylist.randomloop = false;
	$(obj).parent().html("<img onclick=\"loopone(this)\" src=\"/home/images/one.png\"/>");
}
function loopone(obj){
	myPlaylist.loop = false;
	myPlaylist.oneloop = false;
	myPlaylist.randomloop = true;
	$(obj).parent().html("<img onclick=\"looprandom(this)\"  src=\"/home/images/random.png\"/>");
}
function looprandom(obj){
	myPlaylist.loop = true;
	myPlaylist.oneloop = false;
	myPlaylist.randomloop = false;
	$(obj).parent().html("<img onclick=\"myloop(this)\" src=\"/home/images/repeat.png\"/>");
}
function myConfirm(){
	$(".open").show();
	this.ok = function(){
		 return true;
	}
	this.close = function(){
		 $(".open").hide();
		  return false;
	}
}

//]]>
</script>
</body>
</html>