@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Изменение апартаментов
        </div>

        <div class="card-body">
            <form action="{{ route("payments.update", [$model->id]) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="form-group {{ $errors->has('date') ? 'has-error' : '' }}">
                    <label for="name">Текст комментария</label>
                    <input class="date form-control" type="text" id="date" name="date" value="{{ old('date', isset($model) ? $model->date : '') }}">
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

                <div class="form-group {{ $errors->has('source') ? 'has-error' : '' }}">
                    <label for="name">Источник</label>
                    <select class="form-control selectpicker" name="source" id="source">
                        @foreach(\App\Models\Payment::PAYMENT_TYPES as $key => $value)
                            <option value="{{$key}}" @if(isset($model->source) == $key) selected @endif>{{$value}}</option>
                        @endforeach
                    </select>
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