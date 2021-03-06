@extends('layout.home')
    <link rel="stylesheet" type="text/css" href="/home/css/special.css">
    <link rel="stylesheet" type="text/css" href="/css/main-201505211743.css">
    <link rel="stylesheet" type="text/css" href="/css/main-201505211743_.css">
    <!-- <link rel="stylesheet" type="text/css" href="/css/style2.0.css"> -->
@section('content')
<div class="navWrap">
    <div class="nav">
        <ul class="homeNav">
            <li><a class="normal" href="/">首页</a></li>
            <li><a class="normal"  href="/home/paihang">榜单</a></li>
            <li><a class="normal"  href="/home/list">歌手</a></li>
            <li><a class="normal"  href="/home/music">音乐</a></li>
            <li><a class="normal active"  href="/home/specialshow">歌单</a></li>
            <li><a class="normal"  href="/home/personal">我的音乐</a></li>
        </ul>
    </div>
</div>
<div class="wrap alm2 clear_fix specialPage">
  <div class="mbx">我的位置 &gt; <a title="乐库" href="/">首页</a> &gt; <a title="精选辑" href="/home/special/myspecial">我的歌单</a> &gt; <span>歌单歌曲列表</span></div>
  <div class="l">
      <div class="pic">
          <img alt="可爱的小动物" src="{{$res->photo}}" height="148" width="148" />
      </div>
      <p class="detail">
          <span>昵称：</span>{{$res->uname}}<br />
          <span>账号：</span>{{$res->username}}<br />
          <span>心情：</span>开心<br />
      </p>
      <div class="intro"><p><span>简介：</span>萌萌的小动物最惹人喜爱。</p></div>
      <p class="more" onclick="show(this,event)">更多 &gt;&gt;</p>
      <p class="more_intro">萌萌的小动物最惹人喜爱。<span></span></p>
  </div>
  <div class="r">
      <div id="songs" class="list1">
          <strong>&lt;{{$special->title}}&gt; - 歌曲列表</strong>
          <h4 class="dq">
          <a href="javascript:void(0)"  class="pc_temp_btn_s02 pc_temp_bicon_play"  title="播放" hidefocus="true"></a>
          </h4>
          <ul>
               @foreach($music as $k=>$v)              
              <li>
                <a title="{{$v->sname}} - {{$v->mname}}" hidefocus="true" href="javascript:;" data="C3967DE92CF781436E29B2E30ACFA0E7|140200">
                  <span  class="share" title="分享" ></span>
                  <span class="listen" title="播放"></span>
                  <span class="num1">@if($k+1>=10) {{$k+1}} @else 0{{$k+1}} @endif</span>
                  <span class="text">
                    <i style="display:block;">{{$v->sname}} - {{$v->mname}}
                    <span style="display: block;float: right;margin-left: 200px;"> {{'<'.$v->aname.'>'}}</span>
                    </i>
                  </span>
                </a>
              </li>
              @endforeach
          </ul>
      </div>
  </div>
</div>
@stop

@section('js')

@stop