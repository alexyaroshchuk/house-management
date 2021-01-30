@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Создать пользователя
        </div>

        <div class="card-body">
            <form action="{{ route("users.store") }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
                    <label for="name">Имя</label>
                    <input type="text" id="name" name="name" class="form-control" value="{{ old('name', isset($model) ? $model->name : '') }}">
                    @if($errors->has('name'))
                        <em class="invalid-feedback">
                            {{ $errors->first('name') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('email') ? 'has-error' : '' }}">
                    <label for="name">Почта</label>
                    <input type="text" id="email" name="email" class="form-control" value="{{ old('email', isset($model) ? $model->email : '') }}">
                    @if($errors->has('email'))
                        <em class="invalid-feedback">
                            {{ $errors->first('email') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('role') ? 'has-error' : '' }}">
                    <label for="name">Роль</label>
                    <select class="form-control selectpicker" name="role" id="role">
                        @foreach(\App\Models\User::ROLES as $key => $value)
                            <option value="{{$key}}" @if(isset($model->role) && $model->role == $key) selected @endif>{{$value}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group {{ $errors->has('password') ? 'has-error' : '' }}">
                    <label for="password">Пароль</label>
                    <input type="text" id="password" name="password" class="form-control" value="{{ old('password', isset($model) ? $model->password : '') }}">
                    @if($errors->has('password'))
                        <em class="invalid-feedback">
                            {{ $errors->first('password') }}
                        </em>
                    @endif
                </div>

                <div>
                    <a class="btn btn-xs btn-danger" href="{{route('users.index')}}">
                        Назад
                    </a>
                    <input class="btn btn-xs btn-success" type="submit" value="Сохранить">
                </div>
            </form>
        </div>
    </div>

@endsection
