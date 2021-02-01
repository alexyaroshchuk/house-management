@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Добавить комментарий
        </div>

        <div class="card-body">
            <form action="{{ route("payments.store") }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group {{ $errors->has('date') ? 'has-error' : '' }}">
                    <label for="name">Текст комментария</label>
                    <input type="date" id="date" name="date" class="form-control" value="{{ old('date', isset($model) ? $model->date : '') }}">
                    @if($errors->has('date'))
                        <em class="invalid-feedback">
                            {{ $errors->first('date') }}
                        </em>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('recommend_payment') ? 'has-error' : '' }}">
                    <label for="name">Рекомендованая оплата</label>
                    <input type="text" id="recommend_payment" name="recommend_payment" class="form-control" value="{{ old('recommend_payment', isset($model) ? $model->recommend_payment : '') }}">
                    @if($errors->has('recommend_payment'))
                        <em class="invalid-feedback">
                            {{ $errors->first('recommend_payment') }}
                        </em>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('fact_payment') ? 'has-error' : '' }}">
                    <label for="name">Фактическая оплата</label>
                    <input type="text" id="fact_payment" name="fact_payment" class="form-control" value="{{ old('fact_payment', isset($model) ? $model->fact_payment : '') }}">
                    @if($errors->has('fact_payment'))
                        <em class="invalid-feedback">
                            {{ $errors->first('fact_payment') }}
                        </em>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('fact_payment_in_hrn') ? 'has-error' : '' }}">
                    <label for="name">Фактическая оплата в грн</label>
                    <input readonly type="text" id="fact_payment_in_hrn" name="fact_payment_in_hrn" class="form-control" value="{{ old('fact_payment_in_hrn', isset($model) ? $model->fact_payment_in_hrn : '') }}">
                    @if($errors->has('fact_payment_in_hrn'))
                        <em class="invalid-feedback">
                            {{ $errors->first('fact_payment_in_hrn') }}
                        </em>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('currency') ? 'has-error' : '' }}">
                    <label for="name">Валюта</label>
                    <select class="form-control selectpicker" name="currency" id="currency">
                        @foreach(\App\Models\Payment::CURRENCY as $key => $value)
                            <option value="{{$key}}" @if(isset($model->currency) == $key) selected @endif>{{$value}}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group {{ $errors->has('source') ? 'has-error' : '' }}">
                    <label for="name">Источник</label>
                    <select class="form-control selectpicker" name="source" id="source">
                        @foreach(\App\Models\Payment::PAYMENT_TYPES as $key => $value)
                            <option value="{{$key}}" @if(isset($model->source) == $key) selected @endif>{{$value}}</option>
                        @endforeach
                    </select>
                </div>

                <input hidden type="text" id="apartment_id" name="apartment_id" class="form-control" value="{{ old('apartment_id', isset($apartment_id) ? $apartment_id : '') }}">
                <div>
                    <a class="btn btn-xs btn-danger" href="{{route('apartments.show', $apartment_id)}}">
                        Назад
                    </a>
                    <input class="btn btn-xs btn-success" type="submit" value="Сохранить">
                </div>
            </form>
        </div>
    </div>

@endsection