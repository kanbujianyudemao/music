(function($,window,document,undefined){var host;var kw_comment_rows=10;var kw_comment_flagPage=false;var kw_comment_commentNum=0;var sourceId=0;var kw_comment_type="";var cssFlag=false;var wordNum=300;var commentObj={};var locationHref=window.location.href;var sqFlg=false;var uid=getCookie("userid")||0;var gid=getCookie("gid")||"";var userHead=getCookie("pic3")||"http://www.kuwo.cn/static/image/comment/def60.jpg".replace(/(^\")|(\"$)/g,"");window.init_comment_model=function(paramObj){commentObj=paramObj;wordNum=paramObj.wordNum;sourceId=paramObj.id;kw_comment_type=paramObj.digest;createOthersWindow();commentModel()};function createOthersWindow(){var oDiv=document.createElement("div");oDiv.id="commentArea";var oBox=document.getElementById(commentObj.boxName);oBox.appendChild(oDiv);oDiv.style.display="none";var delWindow='<div class="end_box"></div><div class="popup_mask"></div><div class="popup delWindow" style="display:none"><div class="titleBox"><p>删除评论</p><a href="javascript:;" class="closeDlWindow"></a></div><p class="desc">确定要删除评论吗？</p><div class="btnBox"><a href="javascript:;" class="cancel">取消</a><a href="javascript:;" class="confirm">确定</a></div></div>';var reportWindow='<div class="popup reportWindow" style="display:none"><div class="titleBox"><p>举报原因</p><a href="javascript:;" class="closeDlWindow"></a></div><div class="resultList"><div class="resultItem"><div class="checkBox"></div><span>广告、垃圾虚假信息</span></div><div class="resultItem"><div class="checkBox"></div><span>人身攻击、辱骂行为</span></div><div class="resultItem"><div class="checkBox"></div><span>政治、色情、暴力、血腥</span></div><div class="resultItem"><div class="checkBox"></div><span>其他原因</span></div><textarea></textarea></div><div class="btnBox"><a href="javascript:;" class="report">提交</a></div></div>';var oBody=document.getElementsByTagName("body")[0];var oCommentOther=document.createElement("div");oCommentOther.id="commentTips";oBody.appendChild(oCommentOther);document.getElementById("commentTips").innerHTML=delWindow+reportWindow}function commentModel(){$("#commentArea").html('<p class="title_">评论<span class="num">0条评论</span></p><img class="commentCover" src='+userHead+' onerror="imgOnError(this,60)" /><div id="message" class="msg"><div class="textBox"><textarea id="messageCon" class="scrollBox msgCon"></textarea><span class="msgTips">分享你的音乐见解</span></div><a href="javascript:;" id="messageBtn" class="msgBtn">评论</a><span class="emotion"></span><span class="wbsq"></span><span class="word">已输入<span class="length">0</span>个字</span><div class="faceBox scrollBox"></div></div><div class="listBox"><h4>精彩评论</h4><div id="rec_list"></div></div><div class="listBox"><h4>最新评论<span class="newNum">0条评论</span></h4><div id="list"></div></div><div class="pageComment"></div>');loadRecCommentList(kw_comment_type,1);commentBind()}function loadRecCommentList(digest,pn){$.ajax({url:"http://comment.kuwo.cn/com.s?type=get_rec_comment&uid="+uid+"&prod=newWeb&digest="+digest+"&sid="+sourceId+"&page="+pn+"&rows="+kw_comment_rows+"&f=web&gid="+gid,dataType:"jsonp",type:"get",jsonp:"jpcallback",jsonpCallback:"getRecCommentListFn",success:function(data){var rows=20;if(data.rows!=""){$("#rec_list").html("").show();var datarows=data.rows.length;for(var i=0;i<datarows;i++){if(i==datarows-1){$("#rec_list").append(createReplyBox(data.rows[i],true))}else{$("#rec_list").append(createReplyBox(data.rows[i]))}if(data.rows[i].is_like=="true"){$("#rec_list .praise").eq(i).addClass("praised")}}$(".listBox").eq(0).show()}else{$(".listBox").eq(0).hide()}loadCommentList(kw_comment_type,1,rows);if(!cssFlag){var oHead=document.getElementsByTagName("head")[0];var oCssLink=document.createElement("link");oCssLink.href="/static/css/web/comment/comm_COMMENT.css";oCssLink.rel="stylesheet";oCssLink.type="text/css";oHead.appendChild(oCssLink);cssFlag=true}$("#commentArea").show()},error:function(e){}})}function loadCommentList(digest,pn,rows){var customRows=20;var createRows=rows||20;$.ajax({url:"http://comment.kuwo.cn/com.s?type=get_comment&uid="+uid+"&prod=newWeb&digest="+digest+"&sid="+sourceId+"&page="+pn+"&rows="+customRows+"&f=web&gid="+gid,dataType:"jsonp",type:"get",jsonp:"jpcallback",jsonpCallback:"getCommentListFn",success:function(data){if(data.rows.length!=0){$("#list").html("");var pageStrCom=createPage(parseInt(data.totalPage),parseInt(data.currentPage));$(".pageComment").html(pageStrCom).show();var rowsLen=data.rows.length;if(rowsLen>=createRows){rowsLen=createRows}for(var i=0;i<rowsLen;i++){if(i==rowsLen-1){$("#list").append(createReplyBox(data.rows[i],true))}else{$("#list").append(createReplyBox(data.rows[i]))}if(data.rows[i].is_like=="true"){$("#list .praise").eq(i).addClass("praised")}}kw_comment_commentNum=parseInt(data.total);$("#commentArea .title_ .num,.newNum").html(kw_comment_commentNum+"条评论");$(".goComment span").html(kw_comment_commentNum);if(kw_comment_flagPage){$(window).scrollTop($(".title_").offset().top-10)}}else{$("#list").html("恭喜你，快来抢沙发吧！").addClass("noComment");$("#list").prev().hide()}if(!cssFlag){var oHead=document.getElementsByTagName("head")[0];var oCssLink=document.createElement("link");oCssLink.href="css/comm_COMMENT.css";oCssLink.rel="stylesheet";oCssLink.type="text/css";oHead.appendChild(oCssLink);cssFlag=true}$("#commentArea").show()},error:function(e){}})}function commentBind(){var checkReply="";var commentId="";var praiseFlag=false;$(".praise").live("click",function(){if(uid==0){login();return}if(!praiseFlag){praiseFlag=true;var _this=$(this);var num=_this.html();var flag=eval(_this.attr("data-flag"));var box=_this.parents(".box");var cId=box.attr("data-id");var praiseUrl="";num=num==""?0:num;if(!flag){praiseUrl="http://comment.kuwo.cn/com.s?type=click_like&prod=newWeb&uid="+uid+"&cid="+cId+"&sid="+sourceId+"&digest="+kw_comment_type+"&f=web&gid="+gid}else{praiseUrl="http://comment.kuwo.cn/com.s?type=cancel_like&prod=newWeb&uid="+uid+"&cid="+cId+"&sid="+sourceId+"&digest="+kw_comment_type+"&f=web&gid="+gid}$.ajax({type:"get",url:praiseUrl,dataType:"json",success:function(data){if(!flag){if(num.toString().indexOf("w")==-1){_this.html(parseInt(num)+1)}_this.attr("data-flag","true");_this.addClass("praised")}else{if(num.toString().indexOf("w")==-1){_this.html((parseInt(num)-1)<=0?"":(parseInt(num)-1))}_this.attr("data-flag","false");_this.removeClass("praised")}},complete:function(){praiseFlag=false},error:function(){praiseFlag=false}})}});var replyShow=false;$(".reply").live("click",function(){if(uid==0){login();return}var contentComment=$(this).parents(".contentComment");if(!contentComment.find("#rMessage").html()){$("#rMessage").remove();replyShow=false}if(!replyShow){contentComment.append('<div id="rMessage" class="msg"><div class="textBox"><textarea id="rMessageCon" class="scrollBox msgCon"></textarea></div><a href="javascript:;" id="rMessageBtn" class="msgBtn">回复</a><span class="emotion"></span><span class="wbsq"></span><span class="word">已输入<span class="length">0</span>个字</span><div class="faceBox scrollBox"></div></div>');var message=$("#rMessageCon");var content=$(this).parents(".contentComment");var name=content.find(".user a").html()+"：";commentId=$(this).parents(".box").attr("data-id");checkReply="回复"+name;$("#rMessage").attr("data-memo",checkReply);message.val(checkReply);message.focus();message.attr("data-reply","true");replyShow=true}else{$("#rMessage").remove();replyShow=false}});$(".msgBtn").live("click",function(){if(uid==0){login();return}var oMsg=$(this).parents(".msg");var oMsgCon=oMsg.find(".msgCon");var messageCon=oMsgCon.val().replace(/(^\s+)|(\s+$)/g,"");var domStr="";var isReply=eval(oMsgCon.attr("data-reply"))||false;var dataCon="";var msgUrl="";var currentPage=$(".pageComment .current").html()||"1";if(isReply){var replyCon=messageCon.substring(messageCon.indexOf("：")+1).replace(/(^\s+)|(\s+$)/g,"");if(replyCon==""){oMsgCon.val(checkReply);show_end_box("内容不能为空噢");return}else{if(replyCon.length<5){show_end_box("评论不能少于5个字噢");return}}dataCon=replyCon;oMsgCon.attr("data-reply","false");msgUrl="http://comment.kuwo.cn/com.s?type=post_comment&prod=newWeb&uid="+uid+"&digest="+kw_comment_type+"&sid="+sourceId+"&reply="+commentId+"&f=web&gid="+gid}else{if(messageCon==""){oMsgCon.val("");show_end_box("内容不能为空噢");return}else{if(messageCon.length<5){show_end_box("评论不能少于5个字噢");return}}dataCon=messageCon;msgUrl="http://comment.kuwo.cn/com.s?type=post_comment&prod=newWeb&uid="+uid+"&digest="+kw_comment_type+"&sid="+sourceId+"&f=web&gid="+gid}$.ajax({type:"post",dataType:"json",data:dataCon,url:msgUrl,success:function(data){var info=data.info;if(info==undefined){show_end_box("评论太频繁了，休息一会吧!");if(isReply){oMsgCon.attr("data-reply","true")}}else{show_end_box("评论成功!");if($("#list").hasClass("noComment")){$("#list").html("").removeClass("noComment")}if(currentPage=="1"){if(isReply){domStr=createReplyBox(info)}else{domStr=createCommentBox(info)}$("#list").prepend(domStr);if($("#list").children().length==kw_comment_rows+1){setTimeout(function(){loadCommentList(kw_comment_type,1)},500)}}else{setTimeout(function(){loadCommentList(kw_comment_type,1)},500)}if(oMsg.attr("id")=="rMessage"){oMsg.remove();replyShow=false}oMsgCon.val("");oMsg.find(".length").html(0);kw_comment_commentNum=parseInt(kw_comment_commentNum)+1;$("#commentArea .title_ .num,.newNum").html(kw_comment_commentNum+"条评论");$(".goComment span").html(kw_comment_commentNum);$("#commentArea .textBox .msgTips").show();if(isReply){picLog("replyCount")}else{picLog("comentCount")}}},error:function(){show_end_box("评论失败，请稍后重试!");oMsgCon.attr("data-reply","true")}})});$(".msgCon").live("keydown keyup blur focus",function(event){if(uid==0){login();return}var _this=$(this);var val=_this.val();var len=val.length;var word=_this.parents(".msg").find(".length");var num;if(_this.attr("id")=="rMessageCon"){var memo=$("#rMessage").attr("data-memo");if(checkReply!=""&&val.substring(0,checkReply.length)==checkReply){_this.attr("data-reply","true")}else{_this.attr("data-reply","false")}if(val.indexOf(memo)>-1){if(len-memo.length>wordNum){var tmp=val.substring(memo.length,wordNum+memo.length);_this.val(memo+tmp)}num=(wordNum-(len-memo.length))<0?wordNum:(len-memo.length)}else{if(len>wordNum){_this.val(val.substring(0,wordNum))}num=wordNum-len<0?wordNum:len}}else{if(len>wordNum){_this.val(val.substring(0,wordNum))}num=wordNum-len<0?wordNum:len;if(event.type=="focusin"){$("#commentArea .textBox .msgTips").hide()}else{if(event.type=="focusout"&&val==""){$("#commentArea .textBox .msgTips").show()}}}word.html(num)});$("#commentArea .textBox .msgTips").live("click",function(){$("#commentArea .textBox .msgTips").hide();$("#messageCon").focus()});$(".delete").live("click",function(){var body_h=$("body").height();$(".popup_mask").height(body_h+20).show();$(".delWindow").show();var delEleId=$(this).parents(".box").attr("data-id");var delEleIndex=$(this).parents(".box").index();$(".delWindow .confirm").attr("data-delid",delEleId);$(".delWindow .confirm").attr("data-index",delEleIndex);return});$(".closeDlWindow,.cancel,.confirm").live("click",function(){$(".popup").hide();$(".popup_mask").hide()});$(".delWindow .confirm").live("click",function(){var delId=$(this).attr("data-delid");var delEleIndex=$(this).attr("data-index");var currentPage=$(".pageComment .current").html()||"1";$.ajax({url:"http://comment.kuwo.cn/com.s?type=del_scomment&prod=newWeb&digest="+kw_comment_type+"&sid="+sourceId+"&uid="+uid+"&cid="+delId+"&f=web&gid="+gid,type:"get",dataType:"json",success:function(data){if(data.result=="error"){show_end_box("删除失败，请稍后重试!");return}if(currentPage==1&&$("#list").children().length<=kw_comment_rows){$("#list .box").eq(delEleIndex).remove();kw_comment_commentNum=parseInt(kw_comment_commentNum)-1;if(kw_comment_commentNum==0){$("#list").html("恭喜你，快来抢沙发吧！").addClass("noComment");$("#list").prev().hide()}$("#commentArea .title_ .num,.newNum").html(kw_comment_commentNum+"条评论");$(".goComment span").html(kw_comment_commentNum)}else{loadCommentList(kw_comment_type,currentPage)}},error:function(){show_end_box("删除失败，请稍后重试!")}})});$(".box").live("mouseenter",function(){var _this=$(this);var theUid=_this.attr("data-uid");var delete_=_this.find(".delete");var delLine=_this.find(".delLine");_this.find(".commentReport").show();if(uid==theUid){delete_.show();delLine.show()}});$(".box").live("mouseleave",function(){var _this=$(this);var delete_=_this.find(".delete");var delLine=_this.find(".delLine");_this.find(".commentReport").hide();delete_.hide();delLine.hide()});$(".emotion").live("click",function(){if(uid==0){login();return}createFace();var faceBox=$(this).parents(".msg").find(".faceBox");faceBox.is(":hidden")?faceBox.show():faceBox.hide();return false});$(document).live("click",function(){$(".faceBox").hide()});$(".faceBox img").live("click",function(){var oMsgCon=$(this).parents(".msg").find(".msgCon");var messageCon=oMsgCon.val();$(".faceBox").hide();insertText(oMsgCon[0],"["+this.alt+"]")});$(".pageComment a").live("click",function(){var oClass=$(this).attr("class");$(".faceBox").hide();faceShow=false;if(oClass.indexOf("no")>-1){return}kw_comment_flagPage=true;var pn=1;var goPnNum=$(this).html().toLowerCase();if(goPnNum=='<img src="http://image.kuwo.cn/website/pc/page/prev.png">'||goPnNum=='<img src="'+host+'http://image.kuwo.cn/website/pc/page/prev.png">'){pn=parseInt($(".pageComment .current").html())-1}else{if(goPnNum=='<img src="http://image.kuwo.cn/website/pc/page/next.png">'||goPnNum=='<img src="'+host+'http://image.kuwo.cn/website/pc/page/next.png">'){pn=parseInt($(".pageComment .current").html())+1}else{pn=parseInt($(this).html())}}commentPageNum=pn;if(pn==1){loadRecCommentList(kw_comment_type,pn)}else{$("#rec_list").html("");$(".listBox").eq(0).hide();loadCommentList(kw_comment_type,pn)}});$(".commentShareBox").live("mouseenter",function(){$(this).find(".commentSharecontent").show()});$(".commentShareBox").live("mouseleave",function(){$(this).find(".commentSharecontent").hide()});$(".commentShareBox .quickShare").live("click",function(){if(!sourceId){return}var shareToObj=$(this);var shareTo=shareToObj.attr("data-cmd");var songLink="http://www.kuwo.cn/yinyue/"+sourceId+"?catalog=yueku2016&qq-pf-to=pcqq.c2c";var main=$(this).parents(".main");var commentCon=main.find(".replyCon").html().replace(/<[^>]+>/g,"");var userName=main.find(".user a").html();var shareTxt=commentCon+"。"+userName+"评论了歌曲：《"+commentObj.name+"》(来自@酷我音乐)。";if(shareToObj.hasClass("new_sina")){picLog("sinaShareCount")}addShareFn(shareTo,encodeURIComponent(shareTxt),songLink,commentObj.pic)});var reportId;$(".commentReport").live("click",function(){if(uid==0){login();return}var body_h=$("body").height();reportId=$(this).parents(".box").attr("data-id");$(".reportWindow .checkBox").removeClass("ischecked");$(".popup_mask").height(body_h+20).show();$(".reportWindow").show()});$(".reportWindow .checkBox").live("click",function(){$(".reportWindow .checkBox").removeClass("ischecked");var _this=$(this);_this.addClass("ischecked");if(_this.parent().index()==3){$(".reportWindow textarea").show().focus()}else{$(".reportWindow textarea").hide().val("")}});$(".reportWindow .report").live("click",function(){var reportTextArea=$(".reportWindow textarea");var reportCon=reportTextArea.val();if($(".ischecked").length==0){show_end_box("请选择举报类型");return}else{if(!reportTextArea.is(":hidden")&&reportCon==""){show_end_box("请填写举报原因");return}}var rtype=$(".ischecked").parent().index()+1;var postData="";if(reportCon!=""){postData="&postdata="+reportCon}var url="http://comment.kuwo.cn/com.s?type=report_comment&prod=newWeb&digest="+kw_comment_type+"&sid="+sourceId+"&uid="+uid+"&cid="+reportId+"&rtype="+rtype+postData+"&f=web&gid="+gid;$.ajax({url:url,dataType:"json",type:"get",success:function(data){if(data.result=="ok"){show_end_box("举报成功，我们会尽快处理");$(".reportWindow").hide();$(".popup_mask").hide()}else{show_end_box("请稍后重试")}},error:function(){show_end_box("请稍后重试")}})})}function createCommentBox(jsondata){var likeNum=jsondata.like_num==0?"":jsondata.like_num;var timeSlot=timeFormat(jsondata.time);var userName=decodeURIComponent(jsondata.u_name.replace(/\+/g,"%20"));var jumpHome="http://www.kuwo.cn/www/user/home";if(likeNum>100000){likeNum=parseInt(likeNum/10000)+"w"}if(uid==0){jumpHome="javascript:login();"}if(userName==""){userName="酷小我_"+parseInt(Math.random()*10000)}return'<div class="box" data-id="'+jsondata.id+'" data-uid="'+jsondata.u_id+'"><div class="picBox"><a href="'+jumpHome+'"><img class="head" src='+userHead+' onerror="imgOnError(this,60)" alt="" /></a></div><div class="contentComment"><div class="main"><div class="replyBox"><span class="user"><a href="'+jumpHome+'">'+userName+'</a></span><span class="replyCon">'+filterFace(jsondata.msg)+'</span><span class="commentReport">举报</span><div class="commentShareBox"><span class="commentShare">分享</span><div class="commentSharecontent"><a href="javascript:;" class="quickShare new_sina" data-cmd="tsina" title="分享到新浪微博"></a><a href="javascript:;" class="quickShare new_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="javascript:;" class="quickShare new_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="javascript:;" class="quickShare new_douban" data-cmd="douban" title="分享到豆瓣网"></a><a href="javascript:;" class="quickShare new_renren" data-cmd="renren" title="分享到人人网"></a></div></div></div></div><div class="info_"><a class="reply" href="javascript:;">回复</a><a class="praise" data-flag="'+jsondata.is_like+'" href="javascript:;">'+likeNum+'</a><span class="delLine"></span><a class="delete" href="javascript:;">删除</a><span class="time">'+timeSlot+"</span></div></div></div>"}function createReplyBox(info,isLast){var reply=info.reply;var replyStr="";var likeNum=info.like_num==0?"":info.like_num;var time=getUnixTime(info.time);var timeSlot=timeFormat(time);var userName=decodeURIComponent(info.u_name.replace(/\+/g,"%20"));if(userName==""){userName="酷小我_"+parseInt(Math.random()*10000)}var commentUid=info.u_id;var others="";var pic="";var jumpHome="http://www.kuwo.cn/www/user/home";if(likeNum>100000){likeNum=parseInt(likeNum/10000)+"w"}if(uid==0){jumpHome="javascript:login();"}if(reply!=undefined){var replyUid=reply.u_id;var replyOthers="";var replyJumpHome="http://www.kuwo.cn/www/user/home";var replyName=decodeURIComponent(reply.u_name.replace(/\+/g,"%20"));if(replyName==""){replyName="酷小我_"+parseInt(Math.random()*10000)}if(uid!=replyUid){replyOthers="?vuid="+replyUid}if(uid!=0){replyJumpHome+=replyOthers}else{replyJumpHome=jumpHome}replyStr='<div class="commentBox"><p class="commentCon"><span class="userComment"><a href="'+replyJumpHome+'">'+replyName+"</a>：</span>"+filterFace(reply.msg)+"</p></div>"}else{replyStr=""}var boxclass="box";if(isLast){boxclass="box boxLast"}if(uid!=commentUid){others="?vuid="+commentUid;pic='"'+info.u_pic+'"'}else{pic=userHead}if(uid!=0){jumpHome+=others}return'<div class="'+boxclass+'" data-id="'+info.id+'" data-uid="'+info.u_id+'"><div class="picBox"><a href="'+jumpHome+'"><img class="head" src='+pic+' onerror="imgOnError(this,60)" alt="" /></a></div><div class="contentComment"><div class="main"><div class="replyBox"><span class="user"><a href="'+jumpHome+'">'+userName+'</a></span><span class="replyCon">'+filterFace(info.msg)+'</span><span class="commentReport">举报</span><div class="commentShareBox"><span class="commentShare">分享</span><div class="commentSharecontent"><a href="javascript:;" class="quickShare new_sina" data-cmd="tsina" title="分享到新浪微博"></a><a href="javascript:;" class="quickShare new_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="javascript:;" class="quickShare new_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="javascript:;" class="quickShare new_douban" data-cmd="douban" title="分享到豆瓣网"></a><a href="javascript:;" class="quickShare new_renren" data-cmd="renren" title="分享到人人网"></a></div></div></div></div>'+replyStr+'<div class="info_"><a class="reply" href="javascript:;">回复</a><a class="praise" data-flag="'+info.is_like+'" href="javascript:;">'+likeNum+'</a><span class="delLine"></span><a class="delete" href="javascript:;">删除</a><p class="time">'+timeSlot+"</p></div></div></div>"}function getUnixTime(dateStr){var newstr=dateStr.replace(/-/g,"/");var date=new Date(newstr);var time_str=date.getTime().toString();return time_str.substr(0,10)}function timeFormat(time){if(!time){return false}var now,diff,ret,t,y,m,d,h,i,s;now=Date.parse(new Date())/1000;diff=now-time;t=new Date();t.setTime(time*1000);y=t.getFullYear();m=t.getMonth()+1;d=t.getDate();h=t.getHours();i=t.getMinutes();s=t.getSeconds();m=m>9?m:"0"+m;d=d>9?d:"0"+d;h=h>9?h:"0"+h;i=i>9?i:"0"+i;s=s>9?s:"0"+s;if(diff>(60*60*24)){ret=y+"-"+m+"-"+d+" "+h+":"+i+":"+s}else{if(diff>(60*60)){ret=parseInt(diff/3600)+"小时前"}else{if(diff>60){ret=parseInt(diff/60)+"分钟前"}else{ret="刚刚"}}}return ret}function filterFace(msg){if(msg.match(/<[^>]+>/g)){msg=msg.replace(/</g,"").replace(/>/g,"")}msg=msg.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"[微笑]");var filterMsg=msg.replace(/\[[\u4e00-\u9fa5]+\]/g,function(faceName){faceName=faceName.substring(1,faceName.length-1);if(emojiConfig[faceName]){return'<img src="http://www.kuwo.cn/static/image/comment/face/'+emojiConfig[faceName]+'.png" />'}else{return"["+faceName+"]"}});return filterMsg}function createFace(){var faceStr="";for(var item in emojiConfig){faceStr+='<img src="http://www.kuwo.cn/static/image/comment/face/'+emojiConfig[item]+'.png" title="'+item+'" alt="'+item+'" />'}$(".faceBox").html(faceStr)}function show_end_box(msg){if($(".end_box").css("display")=="block"){return}$(".end_box").show().html(msg);setTimeout(function(){$(".end_box").hide().html("")},2000)}function createPage(total,currentPg){var pageHtml="";if(total>1){if(currentPg!=1){pageHtml+='<a hidefocus href="javascript:;" class="prev"><img src="http://image.kuwo.cn/website/pc/page/prev.png" /></a>'}else{pageHtml+='<a hidefocus href="javascript:;" class="noprev"><img src="http://image.kuwo.cn/website/pc/page/prev.png" /></a>'}pageHtml+='<a hidefocus  href="javascript:;" '+(currentPg==1?'class="current"':'class=""')+">1</a>";if(currentPg>4){pageHtml+='<span class="point">...</span>'}for(var i=(currentPg>=4?(currentPg-2):2);i<=(currentPg+2>=total?(total-1):(currentPg+2));i++){if(currentPg==i){pageHtml+='<a hidefocus href="javascript:;" class="current">'+i+"</a>"}else{pageHtml+='<a hidefocus href="javascript:;" class="">'+i+"</a>"}}if(currentPg+3<total){pageHtml+='<span class="point">...</span>'}if(total!=1){pageHtml+='<a hidefocus href="javascript:;" '+(currentPg==total?'class="current"':'class=""')+">"+total+"</a>"}if(currentPg!=total){pageHtml+='<a hidefocus href="javascript:;" class="next"><img src="http://image.kuwo.cn/website/pc/page/next.png" /></a>'}else{pageHtml+='<a hidefocus href="javascript:;" class="nonext"><img src="http://image.kuwo.cn/website/pc/page/next.png" /></a>'}}return pageHtml}function addShareFn(to,contTxt,shareUrl,pic){if(to=="renren"){url="http://widget.renren.com/dialog/share?resourceUrl="+encodeURIComponent(shareUrl)+"&title="+contTxt+"&description=&pic="+pic}if(to=="qzone"){url="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url= "+encodeURIComponent(shareUrl)+"&title="+contTxt+"&pics="+pic}if(to=="tqq"){url="http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&url= "+encodeURIComponent(shareUrl)+"&appkey=801109997&assname=kuwo-music&title="+contTxt+"&pic="+pic}if(to=="tsina"){url="http://service.weibo.com/share/share.php?c=spr_web_kuwo_changba&appkey=2972927130&url="+encodeURIComponent(shareUrl)+"&title="+contTxt+"&pic="+pic+"&searchPic=false&style=simple"}if(to=="douban"){url="http://www.douban.com/share/service?href="+encodeURIComponent(shareUrl)+"&name=酷我音乐&text="+contTxt+"&pic="+pic}window.open(url)}function openWindow(k,type,name,width,height){window.open(k,name,"width="+width+",height="+height+",menubar=0,scrollbars=1,status=1,titlebar=0,toobar=0,location=1,resizable=yes")}function insertText(obj,str){if(document.selection){var sel=document.selection.createRange();sel.text=str}else{if(typeof obj.selectionStart==="number"&&typeof obj.selectionEnd==="number"){var startPos=obj.selectionStart,endPos=obj.selectionEnd,cursorPos=startPos,tmpStr=obj.value;obj.value=tmpStr.substring(0,startPos)+str+tmpStr.substring(endPos,tmpStr.length);cursorPos+=str.length;obj.selectionStart=obj.selectionEnd=cursorPos}else{obj.value+=str}}obj.focus()}var emojiConfig={"微笑":"emoji_1","哭":"emoji_2","难过":"emoji_3","发火":"emoji_4","奇怪":"emoji_5","尴尬":"emoji_6","可爱":"emoji_7","害怕":"emoji_8","囧":"emoji_9","闭嘴":"emoji_10","脸红":"emoji_11","亲亲":"emoji_12","喜欢":"emoji_13","睡觉":"emoji_14","大哭":"emoji_15","使坏":"emoji_16","嘲笑":"emoji_17","晕":"emoji_18","大爱":"emoji_19","鄙视":"emoji_20","奋斗":"emoji_21","汗":"emoji_22","不屑":"emoji_23","吐":"emoji_24","挖鼻孔":"emoji_25","拜托":"emoji_26","美味":"emoji_27","害羞":"emoji_28","期待":"emoji_29","困":"emoji_30","辩论":"emoji_31","拜拜":"emoji_32","糗大了":"emoji_33","爱钱":"emoji_34","书呆子":"emoji_35","沉默":"emoji_36","委屈":"emoji_37","大叫":"emoji_38","打你":"emoji_39","惊讶":"emoji_40","耍酷":"emoji_41","烧香":"emoji_42","卖萌":"emoji_43","羞羞":"emoji_44","藐视":"emoji_45","高兴":"emoji_46","疑问":"emoji_47","大笑":"emoji_48","开心":"emoji_49","骷髅":"emoji_50","群众":"emoji_51","合作":"emoji_52","挑衅":"emoji_53","棒":"emoji_54","差":"emoji_55","剪刀手":"emoji_56","可以":"emoji_57","客气":"emoji_58","嘴唇":"emoji_59","西瓜":"emoji_60","苹果":"emoji_61","红心":"emoji_62","小狗":"emoji_63","小猫":"emoji_64","礼物":"emoji_65","鲜花":"emoji_66","残花":"emoji_67","咖啡":"emoji_68","米饭":"emoji_69","胶囊":"emoji_70","菜刀":"emoji_71","炸弹":"emoji_72","粑粑":"emoji_73","心":"emoji_74","心碎":"emoji_75","花":"emoji_76","树叶":"emoji_77","日历":"emoji_78","小熊":"emoji_79","蛋糕":"emoji_80","太阳":"emoji_81","彩虹":"emoji_82","皇冠":"emoji_83","雪花":"emoji_84","医药箱":"emoji_85","音乐":"emoji_86","汽车":"emoji_87","红酒":"emoji_88","画画":"emoji_89","飞机":"emoji_90","猪头":"emoji_91","创可贴":"emoji_92","信":"emoji_93","足球":"emoji_94","蜡烛":"emoji_95","星星":"emoji_96","月亮":"emoji_97","闪电":"emoji_98","杯子":"emoji_99","黄钻":"emoji_100","照相":"emoji_101","滑冰":"emoji_102","下雨":"emoji_103","手套":"emoji_104","蘑菇":"emoji_105","章鱼":"emoji_106","梨":"emoji_107","马":"emoji_108","云":"emoji_109","威武":"emoji_110"}})(jQuery,window,document);function jsonError(a){}function imgOnError(b,a){var c="";if(a==60){c="http://www.kuwo.cn/static/image/comment/def60.jpg"}b.src=c;b.onerror=null}function login(){$(".login").show();$(".loginShadow").show()};