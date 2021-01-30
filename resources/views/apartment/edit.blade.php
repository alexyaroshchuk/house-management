@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Изменение апартаментов
        </div>

        <div class="card-body">
            <form action="{{ route("apartments.update", [$model->id]) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="form-group {{ $errors->has('type') ? 'has-error' : '' }}">
                    <label for="name">Тип</label>
                    <select class="form-control selectpicker" name="type" id="type" >
                        @foreach(\App\Models\Apartment::TYPES as $key => $value)
                            <option disabled value="{{$key}}" @if(isset($model->type) && $model->type == $value) selected @endif>{{$value}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group {{ $errors->has('number') ? 'has-error' : '' }}">
                    <label for="name">Номер</label>
                    <input readonly type="text" id="number" name="number" class="form-control" value="{{ old('number', isset($model) ? $model->number : '') }}">
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
                    <input readonly type="text" id="floor" name="floor" class="form-control" value="{{ old('floor', isset($model) ? $model->floor : '') }}">
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
                            <option value="{{$key}}" @if(isset($model->status) && $model->status == $value) selected="selected" @endif>{{$value}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group {{ $errors->has('count_payments') ? 'has-error' : '' }}">
                    <label for="name">Кол-во платежей</label>
                    <input type="text" id="count_payments" name="count_payments" class="form-control" value="{{ old('count_payments', isset($model) ? $model->count_payments : '') }}">
                    @if($errors->has('count_payments'))
                        <em class="invalid-feedback">
                            {{ $errors->first('count_payments') }}
                        </em>
                    @endif
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
