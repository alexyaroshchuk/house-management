@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Создать объект
        </div>

        <div class="card-body">
            <form action="{{ route("apartments.store") }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group {{ $errors->has('type') ? 'has-error' : '' }}">
                    <label for="name">Тип</label>
                    <select class="form-control selectpicker readonly" name="type" id="type">
                        @foreach(\App\Models\Apartment::TYPES as $key => $value)
                            <option value="{{$key}}" @if(isset($model->type) && $model->type == $value) selected @endif>{{$value}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group {{ $errors->has('number') ? 'has-error' : '' }}">
                    <label for="name">Номер объекта</label>
                    <input type="text" id="number" name="number" class="form-control" value="{{ old('number', isset($model) ? $model->number : '') }} readonly">
                    @if($errors->has('number'))
                        <em class="invalid-feedback">
                            {{ $errors->first('number') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('price') ? 'has-error' : '' }}">
                    <label for="name">Цена</label>
                    <input type="text" id="price" name="price" class="form-control" value="{{ old('price', isset($model) ? $model->price : '') }}">
                    @if($errors->has('price'))
                        <em class="invalid-feedback">
                            {{ $errors->first('price') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('space') ? 'has-error' : '' }}">
                    <label for="name">Площадь</label>
                    <input type="text" id="space" name="space" class="form-control" value="{{ old('space', isset($model) ? $model->space : '') }}">
                    @if($errors->has('space'))
                        <em class="invalid-feedback">
                            {{ $errors->first('space') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('floor') ? 'has-error' : '' }}">
                    <label for="name">Этаж</label>
                    <input type="text" id="floor" name="floor" class="form-control" value="{{ old('floor', isset($model) ? $model->floor : '') }} readonly">
                    @if($errors->has('floor'))
                        <em class="invalid-feedback">
                            {{ $errors->first('floor') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
                    <label for="name">Статус</label>
                    <select class="form-control selectpicker" name="status" id="status">
                        @foreach(\App\Models\Apartment::STATUSES as $key => $value)
                            <option value="{{$key}}" @if(isset($model->status) && $model->status == $value) selected @endif>{{$value}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group {{ $errors->has('contract_number') ? 'has-error' : '' }}">
                    <label for="name">Номер договора</label>
                    <input type="text" id="contract_number" name="contract_number" class="form-control" value="{{ old('contract_number', isset($model) ? $model->contract_number : '') }}">
                    @if($errors->has('contract_number'))
                        <em class="invalid-feedback">
                            {{ $errors->first('contract_number') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('first_payment') ? 'has-error' : '' }}">
                    <label for="name">Первый платеж</label>
                    <input type="text" id="first_payment" name="first_payment" class="form-control" value="{{ old('first_payment', isset($model) ? $model->first_payment : '') }}">
                    @if($errors->has('first_payment'))
                        <em class="invalid-feedback">
                            {{ $errors->first('first_payment') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('correct_payment') ? 'has-error' : '' }}">
                    <label for="name">Корректирующий платеж</label>
                    <input type="text" id="correct_payment" name="correct_payment" class="form-control" value="{{ old('correct_payment', isset($model) ? $model->correct_payment : '') }}">
                    @if($errors->has('correct_payment'))
                        <em class="invalid-feedback">
                            {{ $errors->first('correct_payment') }}
                        </em>
                    @endif
                </div>


                <div>
                    <a class="btn btn-xs btn-danger" href="{{route('apartments.index')}}">
                        Назад
                    </a>
                    <input class="btn btn-xs btn-success" type="submit" value="Сохранить">
                </div>
            </form>
        </div>
    </div>

@endsection