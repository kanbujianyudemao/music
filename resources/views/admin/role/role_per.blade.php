@extends('layout.admins')

@section('title', $title)

@section('content')
<style type="text/css">
    .permission{
        width: 150px;
        height: 40px;
    }
</style>
<div class="mws-panel grid_8">
	<div class="mws-panel-header">
    	<span>{{$title}}</span>
    </div>
    <div class="mws-panel-body no-padding">

		@if (count($errors) > 0)
		    <div class="mws-form-message error">
	        	错误信息
	            <ul>
	            	@foreach ($errors->all() as $error)
		                <li>{{ $error }}</li>
		            @endforeach
	            </ul>
	        </div>
		@endif
    	<form action="/admin/do_role_per?id={{$role->id}}" method='post' class="mws-form">
    		<div class="mws-form-inline">
    			<div class="mws-form-row">
    				<label class="mws-form-label">角色名</label>
    				<div class="mws-form-item">
    					<input type="text" class="small" name='role_name' value='{{$role->role_name}}'>
    				</div>
    			</div>
    			<div class="mws-form-row">
                    <label class="mws-form-label">权限名</label>
                    <div class="mws-form-item clearfix">
                        <ul class="mws-form-list inline">
                            @foreach($per as $k=>$v)
                            <li class="permission">
                                <label><input type="checkbox"  name='per_id[]' value='{{$v->id}}' @if(in_array($v->id, $arr)) checked  @endif>{{$v->per_name}}</label>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
    		</div>
    		<div class="mws-button-row">
    			{{csrf_field()}}
    			<input type="submit" class="btn btn-primary" value="添加">
    			
    			
    		</div>
    	</form>
    </div>    	
</div>
@stop

@section('js')
<script>
	$('.mws-form-message').delay(3000).fadeOut(2000);
</script>
@stop
